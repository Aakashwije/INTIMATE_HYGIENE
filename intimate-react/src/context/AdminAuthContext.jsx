import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AdminAuthContext = createContext();

const ADMIN_USERS = {
  owner: "owner@intimatehygiene.lk",
};

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      const sessionUser = data.session?.user || null;
      setUser(sessionUser);
      setAdmin(adminFromUser(sessionUser));
      setLoading(false);
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
    const email = ADMIN_USERS[username.toLowerCase()];
    if (!email) return { ok: false, error: "Invalid credentials." };

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { ok: false, error: "Invalid credentials." };
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
    await supabase.auth.signOut();
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
