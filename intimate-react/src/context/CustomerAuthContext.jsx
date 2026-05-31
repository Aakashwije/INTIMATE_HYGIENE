import { createContext, useContext, useEffect, useState } from "react";
import { fetchCustomerProfile, upsertCustomerProfile } from "../lib/database";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

const CustomerAuthContext = createContext();
const DEFAULT_CUSTOMER_AUTH_URL = "https://hygenc.lk/account";

function normalizeRedirectUrl(url) {
  if (!url) return DEFAULT_CUSTOMER_AUTH_URL;
  const trimmed = url.trim().replace(/\/+$/, "");
  return trimmed.endsWith("/account") ? trimmed : `${trimmed}/account`;
}

const customerAuthRedirectUrl = normalizeRedirectUrl(
  import.meta.env.VITE_CUSTOMER_AUTH_REDIRECT_URL ||
    import.meta.env.VITE_PUBLIC_SITE_URL,
);

export function CustomerAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  const loadProfile = async (nextUser) => {
    if (!nextUser || nextUser.app_metadata?.role === "admin") {
      setProfile(null);
      return;
    }

    try {
      const existing = await fetchCustomerProfile(nextUser.id);
      setProfile(existing);
    } catch {
      const created = await upsertCustomerProfile({
        id: nextUser.id,
        email: nextUser.email,
        name: nextUser.user_metadata?.name || "",
      });
      setProfile(created);
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

    if (error) return { ok: false, error: error.message };
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

    if (error) return { ok: false, error: error.message };
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
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  };

  const saveProfile = async (updates) => {
    if (!user) return { ok: false, error: "Please login first." };
    try {
      const saved = await upsertCustomerProfile({
        ...profile,
        ...updates,
        id: user.id,
        email: user.email,
      });
      setProfile(saved);
      return { ok: true, profile: saved };
    } catch (err) {
      return { ok: false, error: err.message || "Could not save profile." };
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured) await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
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
