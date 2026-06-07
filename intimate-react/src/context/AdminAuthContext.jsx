import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "../lib/firebase";

const AdminAuthContext = createContext();
const ADMIN_AUTH_TIMEOUT_MS = 7000;
const ADMIN_LOGIN_TIMEOUT_MS = 12000;
const ADMIN_UID =
  import.meta.env.VITE_FIREBASE_ADMIN_UID || "q4VIHjWchpdb3FzB0ZKoV5zSsi83";
const ADMIN_EMAIL = (
  import.meta.env.VITE_FIREBASE_ADMIN_EMAIL || "aakashwije92@gmail.com"
).toLowerCase();

const ADMIN_USERS = {
  owner: ADMIN_EMAIL,
};

function withTimeout(promise, milliseconds, message) {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = globalThis.setTimeout(() => reject(new Error(message)), milliseconds);
  });

  return Promise.race([promise, timeout]).finally(() => {
    globalThis.clearTimeout(timeoutId);
  });
}

function isKnownAdmin(user) {
  return (
    user?.uid === ADMIN_UID ||
    user?.email?.trim().toLowerCase() === ADMIN_EMAIL
  );
}

function initials(name = "") {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

async function fetchAdminProfile(user) {
  if (!user || !db) return null;

  try {
    const snapshot = await getDoc(doc(db, "admins", user.uid));
    if (snapshot.exists()) return snapshot.data();
  } catch {
    // The hard-coded owner fallback below allows first login before rules/docs are deployed.
  }

  return isKnownAdmin(user) ? {} : null;
}

async function adminFromUser(firebaseUser) {
  if (!firebaseUser) return null;
  const profile = await fetchAdminProfile(firebaseUser);
  if (!profile) return null;

  const name = profile.name || firebaseUser.displayName || "Aakash Wijesekara";
  return {
    username: profile.username || "owner",
    name,
    role: profile.role || "Super Admin",
    avatar: profile.avatar || initials(name) || "AW",
    email: firebaseUser.email,
  };
}

function userFromFirebaseUser(firebaseUser, adminProfile) {
  if (!firebaseUser || !adminProfile) return null;
  return {
    id: firebaseUser.uid,
    uid: firebaseUser.uid,
    username: adminProfile.username,
    email: firebaseUser.email,
    name: adminProfile.name,
    role: adminProfile.role,
  };
}

function loginEmailForUsername(username) {
  const cleanUsername = username.trim().toLowerCase();
  if (cleanUsername.includes("@")) return cleanUsername;
  return ADMIN_USERS[cleanUsername] || null;
}

function getLoginErrorMessage(error) {
  const message = error?.message || "";
  if (message.toLowerCase().includes("timed out")) return message;
  return "Invalid credentials.";
}

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      return undefined;
    }

    let mounted = true;
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      withTimeout(
        adminFromUser(firebaseUser),
        ADMIN_AUTH_TIMEOUT_MS,
        "Admin session check timed out.",
      )
        .then((nextAdmin) => {
          if (!mounted) return;
          setAdmin(nextAdmin);
          setUser(userFromFirebaseUser(firebaseUser, nextAdmin));
        })
        .catch(() => {
          if (!mounted) return;
          setUser(null);
          setAdmin(null);
        })
        .finally(() => {
          if (mounted) setLoading(false);
        });
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const login = async (username, password) => {
    if (!isFirebaseConfigured || !auth) {
      return { ok: false, error: "Firebase Auth is not configured." };
    }

    const email = loginEmailForUsername(username);
    if (!email) return { ok: false, error: "Invalid credentials." };

    const { credential, error } = await withTimeout(
      signInWithEmailAndPassword(auth, email, password),
      ADMIN_LOGIN_TIMEOUT_MS,
      "Admin login timed out. Please check the Firebase connection.",
    )
      .then((nextCredential) => ({ credential: nextCredential, error: null }))
      .catch((err) => ({ credential: null, error: err }));

    if (error) {
      return { ok: false, error: getLoginErrorMessage(error) };
    }

    const nextAdmin = await adminFromUser(credential.user);
    if (!nextAdmin) {
      await signOut(auth);
      return { ok: false, error: "Invalid credentials." };
    }

    setUser(userFromFirebaseUser(credential.user, nextAdmin));
    setAdmin(nextAdmin);
    return { ok: true };
  };

  const logout = async () => {
    try {
      if (auth) await signOut(auth);
    } catch {
      // Clear local admin UI state even if the network sign-out fails.
    }
    setUser(null);
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{ admin, user, login, logout, loading, isLoggedIn: !!admin }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
