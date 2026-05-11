import { AnimatePresence, motion } from "framer-motion";
import {
    BarChart3,
    Bell,
    ChevronRight,
    Globe,
    HelpCircle,
    LayoutDashboard,
    LogOut,
    Mail,
    Menu,
    MessageSquare,
    Package,
    Search,
    Settings,
    ShoppingCart,
    Users,
} from "lucide-react";
import { useState } from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const navItems = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/admin/orders", icon: ShoppingCart, label: "Orders" },
  { to: "/admin/products", icon: Package, label: "Products" },
  { to: "/admin/customers", icon: Users, label: "Customers" },
  { to: "/admin/inquiries", icon: MessageSquare, label: "B2B Inquiries" },
  { to: "/admin/newsletter", icon: Mail, label: "Newsletter" },
  { to: "/admin/quiz", icon: HelpCircle, label: "Quiz Responses" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

export default function AdminLayout() {
  const { admin, logout, isLoggedIn } = useAdminAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications] = useState(3);

  if (!isLoggedIn) return <Navigate to="/admin" replace />;

  const handleLogout = () => {
    logout();
    navigate("/admin", { replace: true });
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div
        className={`flex items-center gap-3 p-5 border-b border-gray-100 ${!sidebarOpen && "justify-center"}`}
      >
        {sidebarOpen ? (
          <img
            src="/fulllogo.png"
            alt="Hygenc Covers"
            className="h-10 w-auto"
          />
        ) : (
          <img
            src="/shortlogo.png"
            alt="Hygenc"
            className="h-9 w-9 object-contain"
          />
        )}
      </div>

      {/* Owner Portal label */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-5 pt-3 pb-1"
          >
            <div className="text-[10px] font-bold uppercase tracking-widest text-green-primary">
              Owner Portal
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                isActive
                  ? "text-green-dark"
                  : "text-gray-600 hover:text-green-primary hover:bg-green-50"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-xl bg-green-50 border border-green-200"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className="shrink-0 relative z-10 w-5 h-5" />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="text-sm font-medium relative z-10 whitespace-nowrap"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && sidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="ml-auto relative z-10"
                  >
                    <ChevronRight className="w-4 h-4 text-green-primary" />
                  </motion.div>
                )}
                {/* Tooltip for collapsed sidebar */}
                {!sidebarOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                    {label}
                  </div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User card */}
      <div className={`p-3 border-t border-gray-100`}>
        <div
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gray-50 ${!sidebarOpen && "justify-center"}`}
        >
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-green-primary to-green-dark flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm shadow-green-500/30">
            {admin?.avatar}
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1 overflow-hidden min-w-0"
              >
                <div className="text-gray-900 text-xs font-semibold truncate">
                  {admin?.name}
                </div>
                <div className="text-gray-500 text-xs">{admin?.role}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        {!sidebarOpen && (
          <button
            onClick={handleLogout}
            className="w-full mt-2 flex items-center justify-center p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 64 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden md:flex flex-col bg-white border-r border-gray-200 shrink-0 overflow-hidden"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-gray-900/40 z-40 md:hidden backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 z-50 flex flex-col md:hidden shadow-xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white/90 backdrop-blur-sm border-b border-gray-200 flex items-center px-4 gap-4 shrink-0">
          {/* Toggle buttons */}
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-xl text-gray-500 hover:text-green-primary hover:bg-green-50 transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl text-gray-500 hover:text-green-primary hover:bg-green-50 transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md hidden sm:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders, customers…"
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-primary/30 focus:border-green-primary/40 transition-all"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Live indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-green-primary animate-pulse" />
              <span className="text-green-dark text-xs font-semibold">Live</span>
            </div>

            {/* Notification */}
            <button className="relative flex items-center justify-center w-9 h-9 rounded-xl text-gray-500 hover:text-green-primary hover:bg-green-50 transition-all">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            {/* Globe */}
            <button className="flex items-center justify-center w-9 h-9 rounded-xl text-gray-500 hover:text-green-primary hover:bg-green-50 transition-all">
              <Globe className="w-5 h-5" />
            </button>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-green-primary to-green-dark flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-green-500/20">
              {admin?.avatar}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
