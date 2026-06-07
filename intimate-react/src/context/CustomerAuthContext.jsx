import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { fetchCustomerProfile, upsertCustomerProfile } from "../lib/database";
import { auth, isFirebaseConfigured } from "../lib/firebase";

const CustomerAuthContext = createContext();
const DEFAULT_CUSTOMER_AUTH_URL = "https://hygenc.lk/account";
const LOCAL_PROFILE_KEY = "hygenc_customer_profiles_v1";
const ADMIN_EMAIL = (
  import.meta.env.VITE_FIREBASE_ADMIN_EMAIL || "aakashwije92@gmail.com"
).toLowerCase();

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
  const code = error?.code || "";
  const normalized = message.toLowerCase();

  if (normalized.includes("timed out")) {
    return "Saved on this browser. Cloud sync took too long, so please check the Firebase project connection before relying on this across devices.";
  }

  if (code === "auth/email-already-in-use") {
    return "This email already has an account. Please login or use forgot password.";
  }

  if (
    code === "auth/invalid-credential" ||
    code === "auth/user-not-found" ||
    code === "auth/wrong-password"
  ) {
    return "The email or password is incorrect. Please check and try again.";
  }

  if (code === "auth/weak-password") {
    return "Please use a stronger password with at least 6 characters.";
  }

  if (code === "auth/too-many-requests") {
    return "Too many attempts. Please wait a moment and try again.";
  }

  return message.replace(/^Firebase:\s*/i, "").replace(/\s*\(auth\/[^)]+\)\.?$/, "");
}

function withTimeout(promise, milliseconds, message) {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = window.setTimeout(() => reject(new Error(message)), milliseconds);
  });

  return Promise.race([promise, timeout]).finally(() => {
    window.clearTimeout(timeoutId);
  });
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

function isAdminEmail(email) {
  return email?.trim().toLowerCase() === ADMIN_EMAIL;
}

function customerFromFirebaseUser(firebaseUser) {
  if (!firebaseUser || isAdminEmail(firebaseUser.email)) return null;
  return {
    id: firebaseUser.uid,
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName || "",
    metadata: firebaseUser.metadata,
  };
}

async function signOutCustomerSession() {
  if (!isFirebaseConfigured || !auth) return;
  await withTimeout(signOut(auth), 5000, "Customer logout timed out.");
}

export function CustomerAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  const loadProfile = async (nextUser) => {
    if (!nextUser) {
      setProfile(null);
      return;
    }

    const fallbackProfile = getLocalProfile(nextUser.id) || {
      id: nextUser.id,
      email: nextUser.email,
      name: nextUser.displayName || "",
      phone: "",
      address: "",
      city: "",
      preferred_payment_method: "Cash on Delivery",
    };
    setProfile(fallbackProfile);

    try {
      const existing = await fetchCustomerProfile(nextUser.id);
      setProfile(existing || fallbackProfile);
      if (!existing) saveLocalProfile(fallbackProfile);
    } catch {
      saveLocalProfile(fallbackProfile);
    }
  };

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) return undefined;

    let mounted = true;
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!mounted) return;
      const nextUser = customerFromFirebaseUser(firebaseUser);
      setUser(nextUser);
      await loadProfile(nextUser);
      if (mounted) setLoading(false);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const signUp = async ({ email, password, name }) => {
    if (!isFirebaseConfigured || !auth) {
      return { ok: false, error: "Firebase Auth is not configured." };
    }

    const cleanEmail = email.trim().toLowerCase();
    if (isAdminEmail(cleanEmail)) {
      return { ok: false, error: "Please use the admin login page." };
    }

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        cleanEmail,
        password,
      );
      if (name) {
        await updateProfile(credential.user, { displayName: name });
      }
      const nextUser = customerFromFirebaseUser({
        ...credential.user,
        displayName: name || credential.user.displayName,
      });
      const nextProfile = await upsertCustomerProfile({
        id: nextUser.id,
        email: nextUser.email,
        name,
        phone: "",
        address: "",
        city: "",
        preferred_payment_method: "Cash on Delivery",
      });
      setUser(nextUser);
      setProfile(nextProfile);
      saveLocalProfile(nextProfile);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: getCustomerAuthErrorMessage(error) };
    }
  };

  const login = async ({ email, password }) => {
    if (!isFirebaseConfigured || !auth) {
      return { ok: false, error: "Firebase Auth is not configured." };
    }

    const cleanEmail = email.trim().toLowerCase();
    if (isAdminEmail(cleanEmail)) {
      return { ok: false, error: "Please use the admin login page." };
    }

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        cleanEmail,
        password,
      );
      const nextUser = customerFromFirebaseUser(credential.user);
      setUser(nextUser);
      await loadProfile(nextUser);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: getCustomerAuthErrorMessage(error) };
    }
  };

  const resetPassword = async (email) => {
    if (!isFirebaseConfigured || !auth) {
      return { ok: false, error: "Firebase Auth is not configured." };
    }

    try {
      await sendPasswordResetEmail(auth, email.trim().toLowerCase(), {
        url: customerAuthRedirectUrl,
      });
      return { ok: true };
    } catch (error) {
      return { ok: false, error: getCustomerAuthErrorMessage(error) };
    }
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
