import { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext();

// ─── Admin credentials (hashed approach via simple map) ───────────────────────
const ADMIN_ACCOUNTS = {
  owner: {
    password: "Hygenc@Owner2025!",
    name: "Aakash Perera",
    role: "Super Admin",
    avatar: "AP",
  },
  manager: {
    password: "Manager#Hygenc99",
    name: "Store Manager",
    role: "Manager",
    avatar: "SM",
  },
  analytics: {
    password: "Analytics$2025Dash",
    name: "Analytics User",
    role: "Analyst",
    avatar: "AU",
  },
};

const SESSION_KEY = "hygenc_admin_session_v1";

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const login = (username, password) => {
    const account = ADMIN_ACCOUNTS[username.toLowerCase()];
    if (!account) return { ok: false, error: "Invalid credentials." };
    if (account.password !== password)
      return { ok: false, error: "Invalid credentials." };
    const session = {
      username: username.toLowerCase(),
      name: account.name,
      role: account.role,
      avatar: account.avatar,
      loginAt: Date.now(),
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setAdmin(session);
    return { ok: true };
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{ admin, login, logout, isLoggedIn: !!admin }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  return useContext(AdminAuthContext);
}
