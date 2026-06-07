import { createContext, useContext, useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

const AdminAuthContext = createContext();
const ADMIN_AUTH_TIMEOUT_MS = 7000;
const ADMIN_LOGIN_TIMEOUT_MS = 12000;

const ADMIN_USERS = {
  owner: "owner@intimatehygiene.lk",
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

function adminFromUser(user) {
  if (!user || user.app_metadata?.role !== "admin") return null;
  return {
    username: user.user_metadata?.username || "owner",
    name: user.user_metadata?.name || "Aakash Wijesekara",
    role: user.user_metadata?.role || "Super Admin",
    avatar: user.user_metadata?.avatar || "AP",
    email: user.email,
  };
}

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      return undefined;
    }

    let mounted = true;

    withTimeout(
      supabase.auth.getSession(),
      ADMIN_AUTH_TIMEOUT_MS,
      "Admin session check timed out.",
    )
      .then(({ data }) => {
        if (!mounted) return;
        const sessionUser = data.session?.user || null;
        setUser(sessionUser);
        setAdmin(adminFromUser(sessionUser));
      })
      .catch(() => {
        if (!mounted) return;
        setUser(null);
        setAdmin(null);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const sessionUser = session?.user || null;
        setUser(sessionUser);
        setAdmin(adminFromUser(sessionUser));
        setLoading(false);
      },
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (username, password) => {
    if (!isSupabaseConfigured) {
      return { ok: false, error: "Supabase Auth is not configured." };
    }

    const email = ADMIN_USERS[username.toLowerCase()];
    if (!email) return { ok: false, error: "Invalid credentials." };

    const { data, error } = await withTimeout(
      supabase.auth.signInWithPassword({
        email,
        password,
      }),
      ADMIN_LOGIN_TIMEOUT_MS,
      "Admin login timed out. Please check the Supabase connection.",
    ).catch((err) => ({ data: null, error: err }));

    if (error) {
      return {
        ok: false,
        error:
          error.message?.includes("timed out")
            ? error.message
            : "Invalid credentials.",
      };
    }

    const nextAdmin = adminFromUser(data.user);
    if (!nextAdmin) {
      await supabase.auth.signOut();
      return { ok: false, error: "Invalid credentials." };
    }

    setUser(data.user);
    setAdmin(nextAdmin);
    return { ok: true };
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
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
