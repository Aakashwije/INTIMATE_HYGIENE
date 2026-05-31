import { createContext, useContext, useEffect, useState } from "react";
import { fetchCustomerProfile, upsertCustomerProfile } from "../lib/database";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

const CustomerAuthContext = createContext();
const DEFAULT_CUSTOMER_AUTH_URL = "https://hygenc.lk/account";
const LOCAL_PROFILE_KEY = "hygenc_customer_profiles_v1";

function normalizeRedirectUrl(url) {
  if (!url) return DEFAULT_CUSTOMER_AUTH_URL;
  const trimmed = url.trim().replace(/\/+$/, "");
  return trimmed.endsWith("/account") ? trimmed : `${trimmed}/account`;
}

const customerAuthRedirectUrl = normalizeRedirectUrl(
  import.meta.env.VITE_CUSTOMER_AUTH_REDIRECT_URL ||
    import.meta.env.VITE_PUBLIC_SITE_URL,
);

function getCustomerAuthErrorMessage(error) {
  const message = error?.message || "Something went wrong. Please try again.";
  const normalized = message.toLowerCase();

  if (error?.name === "AbortError" || normalized.includes("timed out")) {
    return "Saved on this browser. Cloud sync took too long, so please check the Supabase project connection before relying on this across devices.";
  }

  if (
    normalized.includes("customer_profiles") ||
    normalized.includes("schema cache")
  ) {
    return "Customer accounts are almost ready. Please run the customer account database setup in Supabase, then try again.";
  }

  if (normalized.includes("email rate limit")) {
    return "Email confirmations are temporarily blocked by Supabase's default sender. Please try login if this account was already created, or enable custom SMTP in Supabase.";
  }

  if (normalized.includes("already registered") || normalized.includes("already exists")) {
    return "This email already has an account. Please login or use forgot password.";
  }

  if (normalized.includes("invalid login credentials")) {
    return "The email or password is incorrect. Please check and try again.";
  }

  return message;
}

function withTimeout(promise, milliseconds, message) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error(message)), milliseconds);
    }),
  ]);
}

function readLocalProfiles() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_PROFILE_KEY) || "{}");
  } catch {
    return {};
  }
}

function getLocalProfile(userId) {
  return readLocalProfiles()[userId] || null;
}

function saveLocalProfile(profile) {
  const profiles = readLocalProfiles();
  profiles[profile.id] = profile;
  localStorage.setItem(LOCAL_PROFILE_KEY, JSON.stringify(profiles));
}

async function signOutCustomerSession() {
  if (!isSupabaseConfigured) return;
  await withTimeout(
    supabase.auth.signOut({ scope: "local" }),
    5000,
    "Customer logout timed out.",
  );
}

export function CustomerAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  const loadProfile = async (nextUser) => {
    if (!nextUser || nextUser.app_metadata?.role === "admin") {
      setProfile(null);
      return;
    }

    const fallbackProfile = getLocalProfile(nextUser.id) || {
      id: nextUser.id,
      email: nextUser.email,
      name: nextUser.user_metadata?.name || "",
      phone: "",
      address: "",
      city: "",
      preferred_payment_method: "Cash on Delivery",
    };
    setProfile(fallbackProfile);

    try {
      const existing = await fetchCustomerProfile(nextUser.id);
      setProfile(existing);
    } catch {
      saveLocalProfile(fallbackProfile);
    }
  };

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;

    let mounted = true;

    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return;
      const sessionUser = data.session?.user || null;
      setUser(sessionUser?.app_metadata?.role === "admin" ? null : sessionUser);
      await loadProfile(sessionUser);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const sessionUser = session?.user || null;
        setUser(sessionUser?.app_metadata?.role === "admin" ? null : sessionUser);
        await loadProfile(sessionUser);
        setLoading(false);
      },
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async ({ email, password, name }) => {
    if (!isSupabaseConfigured) {
      return { ok: false, error: "Supabase Auth is not configured." };
    }

    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: { name },
        emailRedirectTo: customerAuthRedirectUrl,
      },
    });

    if (error) return { ok: false, error: getCustomerAuthErrorMessage(error) };
    if (data.session && data.user) await loadProfile(data.user);
    return { ok: true, needsConfirmation: !data.session };
  };

  const login = async ({ email, password }) => {
    if (!isSupabaseConfigured) {
      return { ok: false, error: "Supabase Auth is not configured." };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) return { ok: false, error: getCustomerAuthErrorMessage(error) };
    if (data.user?.app_metadata?.role === "admin") {
      await supabase.auth.signOut();
      return { ok: false, error: "Please use the admin login page." };
    }
    setUser(data.user);
    await loadProfile(data.user);
    return { ok: true };
  };

  const resetPassword = async (email) => {
    if (!isSupabaseConfigured) {
      return { ok: false, error: "Supabase Auth is not configured." };
    }

    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim().toLowerCase(),
      { redirectTo: customerAuthRedirectUrl },
    );
    if (error) return { ok: false, error: getCustomerAuthErrorMessage(error) };
    return { ok: true };
  };

  const saveProfile = async (updates) => {
    if (!user) return { ok: false, error: "Please login first." };
    const nextProfile = {
      ...profile,
      ...updates,
      id: user.id,
      email: user.email,
    };
    setProfile(nextProfile);
    saveLocalProfile(nextProfile);

    try {
      const saved = await withTimeout(
        upsertCustomerProfile(nextProfile),
        12000,
        "Customer profile save timed out.",
      );
      setProfile(saved);
      saveLocalProfile(saved);
      return { ok: true, profile: saved };
    } catch (err) {
      return {
        ok: true,
        profile: nextProfile,
        warning: getCustomerAuthErrorMessage(err),
      };
    }
  };

  const logout = async () => {
    setUser(null);
    setProfile(null);
    try {
      await signOutCustomerSession();
    } catch {
      // The local UI is already logged out; the next auth check will reconcile.
    }
  };

  return (
    <CustomerAuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isLoggedIn: !!user,
        signUp,
        login,
        logout,
        resetPassword,
        saveProfile,
      }}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCustomerAuth() {
  return useContext(CustomerAuthContext);
}
