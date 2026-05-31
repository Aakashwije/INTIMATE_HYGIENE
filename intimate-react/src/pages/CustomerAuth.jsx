import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
import { useCustomerAuth } from "../context/CustomerAuthContext";

export default function CustomerAuth() {
  const navigate = useNavigate();
  const { login, signUp, resetPassword, isLoggedIn } = useCustomerAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (isLoggedIn) return <Navigate to="/account" replace />;

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    if (mode === "signup" && form.password !== form.confirmPassword) {
      setSaving(false);
      setMessage("Passwords do not match. Please re-enter the same password.");
      return;
    }

    const result =
      mode === "signup"
        ? await signUp(form)
        : await login({ email: form.email, password: form.password });

    setSaving(false);
    if (!result.ok) {
      setMessage(result.error);
      return;
    }

    if (result.needsConfirmation) {
      setMessage(
        "Welcome to Intimate Hygiene. Please check your email and confirm your account to start tracking orders.",
      );
      return;
    }

    navigate("/account");
  };

  const handleReset = async () => {
    if (!form.email) {
      setMessage("Enter your email first.");
      return;
    }
    const result = await resetPassword(form.email);
    setMessage(
      result.ok
        ? "Password reset email sent. The link will bring you back to your account."
        : result.error,
    );
  };

  return (
    <>
      <SEO
        title="Customer Login"
        description="Login or create an Intimate Hygiene customer account to view previous orders and reorder faster."
        path="/login"
      />
      <Navbar />
      <main className="max-w-md mx-auto px-4 py-14">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {mode === "signup" ? "Create Account" : "Customer Login"}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Track orders, save delivery details, and reorder faster.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-3">
            {mode === "signup" && (
              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm((current) => ({ ...current, name: e.target.value }))
                }
                placeholder="Full name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#28a745]"
              />
            )}
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((current) => ({ ...current, email: e.target.value }))
              }
              placeholder="Email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#28a745]"
            />
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                minLength={6}
                value={form.password}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    password: e.target.value,
                  }))
                }
                placeholder="Password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-20 text-sm focus:outline-none focus:border-[#28a745]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#28a745] hover:text-[#218838]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {mode === "signup" && (
              <input
                required
                type={showPassword ? "text" : "password"}
                minLength={6}
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    confirmPassword: e.target.value,
                  }))
                }
                placeholder="Re-enter password"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#28a745]"
              />
            )}

            {message && (
              <p className="text-sm text-center text-gray-500">{message}</p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 bg-[#28a745] text-white font-bold rounded-xl hover:bg-[#218838] transition-colors disabled:opacity-70"
            >
              {saving
                ? "Please wait..."
                : mode === "signup"
                  ? "Create Account"
                  : "Login"}
            </button>
          </form>

          <div className="mt-5 space-y-2 text-center text-sm">
            <button
              onClick={() => {
                setMode((current) =>
                  current === "signup" ? "login" : "signup",
                );
                setMessage("");
                setShowPassword(false);
                setForm((current) => ({
                  ...current,
                  password: "",
                  confirmPassword: "",
                }));
              }}
              className="text-[#28a745] font-semibold hover:underline"
            >
              {mode === "signup"
                ? "Already have an account? Login"
                : "New customer? Create an account"}
            </button>
            <br />
            <button
              onClick={handleReset}
              className="text-gray-400 hover:text-gray-700 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-gray-400">
            You can still checkout as a guest. Accounts are only for faster
            reorders and order history.
          </p>
          <Link
            to="/products"
            className="mt-3 block text-center text-sm font-semibold text-gray-600 hover:text-[#28a745]"
          >
            Continue shopping
          </Link>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
