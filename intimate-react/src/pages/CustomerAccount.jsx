import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
import { useCart } from "../context/CartContext";
import { useCustomerAuth } from "../context/CustomerAuthContext";
import {
  fetchCustomerOrders,
  fetchLocalPendingOrders,
  syncOrderToCloud,
} from "../lib/database";
import { bundleProductIds, shopProducts } from "../data/catalog";

function productForOrderItem(item) {
  return shopProducts.find(
    (product) =>
      product.name === item.product_name ||
      item.product_name?.includes(product.name) ||
      product.name.includes(item.product_name),
  );
}

export default function CustomerAccount() {
  const navigate = useNavigate();
  const { user, profile, loading, logout, saveProfile } = useCustomerAuth();
  const { add, setOpen } = useCart();
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({});
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const needsDatabaseSetup = status
    .toLowerCase()
    .includes("database setup");
  const savedLocally = status
    .toLowerCase()
    .includes("cloud sync");

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [loading, navigate, user]);

  useEffect(() => {
    if (!user) return;
    fetchCustomerOrders(user.id)
      .then((cloudOrders) => {
        const localOrders = fetchLocalPendingOrders(user.id, user.email);
        const cloudRefs = new Set(cloudOrders.map((order) => order.order_ref));
        setOrders([
          ...localOrders.filter((order) => !cloudRefs.has(order.order_ref)),
          ...cloudOrders,
        ]);
        localOrders.forEach((order) => {
          syncOrderToCloud(order).catch(() => {});
        });
      })
      .catch(() => {
        const localOrders = fetchLocalPendingOrders(user.id, user.email);
        setOrders(localOrders);
        localOrders.forEach((order) => {
          syncOrderToCloud(order).catch(() => {});
        });
      });
  }, [user]);

  const updateForm = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submitProfile = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus("");
    try {
      const result = await saveProfile({ ...profile, ...form });
      setStatus(result.warning || (result.ok ? "Saved details." : result.error));
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const reorder = (order) => {
    const sortedItems = [...(order.order_items || [])].sort((a, b) => {
      const productA = productForOrderItem(a);
      const productB = productForOrderItem(b);
      return Number(!bundleProductIds.has(productA?.slug)) -
        Number(!bundleProductIds.has(productB?.slug));
    });

    sortedItems.forEach((item) => {
      const product = productForOrderItem(item);
      if (!product) return;
      add({
        id: product.slug,
        name: product.name,
        price: Number(item.price || product.price),
        img: product.image,
        qty: item.quantity,
      });
    });
    setOpen(true);
  };

  if (loading || !user) {
    return (
      <>
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-16 text-center text-gray-500">
          Loading account...
        </main>
      </>
    );
  }

  return (
    <>
      <SEO
        title="My Account"
        description="View previous orders, saved details, and reorder Intimate Hygiene products faster."
        path="/account"
      />
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
            <p className="text-gray-500 text-sm mt-1">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="self-start px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 text-sm font-semibold"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-1 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Saved Details
            </h2>
            <form onSubmit={submitProfile} className="space-y-3">
              <input
                value={form.name ?? profile?.name ?? ""}
                onChange={(e) => updateForm("name", e.target.value)}
                placeholder="Full name"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm"
              />
              <input
                value={form.phone ?? profile?.phone ?? ""}
                onChange={(e) => updateForm("phone", e.target.value)}
                placeholder="Phone / WhatsApp"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm"
              />
              <input
                value={form.city ?? profile?.city ?? ""}
                onChange={(e) => updateForm("city", e.target.value)}
                placeholder="City / district"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm"
              />
              <textarea
                rows={3}
                value={form.address ?? profile?.address ?? ""}
                onChange={(e) => updateForm("address", e.target.value)}
                placeholder="Delivery address"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm resize-none"
              />
              <select
                value={
                  form.preferred_payment_method ??
                  profile?.preferred_payment_method ??
                  "Cash on Delivery"
                }
                onChange={(e) =>
                  updateForm("preferred_payment_method", e.target.value)
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-white"
              >
                <option>Cash on Delivery</option>
                <option>Bank Transfer</option>
                <option>eZ Cash / mCash</option>
              </select>
              {status && (
                <div
                  className={`rounded-xl border px-3 py-2 text-xs leading-relaxed ${
                    needsDatabaseSetup || savedLocally
                      ? "border-amber-200 bg-amber-50 text-amber-700"
                      : "border-emerald-100 bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {status}
                </div>
              )}
              <button
                disabled={saving}
                className="w-full py-3 rounded-xl bg-[#28a745] text-white font-bold hover:bg-[#218838] disabled:opacity-70"
              >
                {saving ? "Saving..." : "Save Details"}
              </button>
            </form>
          </section>

          <section className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h2 className="text-xl font-bold text-gray-900">Previous Orders</h2>
              <Link
                to="/products"
                className="text-sm font-semibold text-[#28a745] hover:underline"
              >
                Shop bundles
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="py-12 text-center text-gray-400">
                <p>No orders linked to this account yet.</p>
                <p className="text-xs mt-1">
                  Future checkouts while logged in will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <article
                    key={order.id}
                    className="border border-gray-100 rounded-xl p-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <p className="font-bold text-gray-900">
                          {order.order_ref || order.id}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(order.created_at).toLocaleDateString(
                            "en-LK",
                          )}{" "}
                          · {order.status || "pending"}
                        </p>
                        {order.sync_status === "local" && (
                          <p className="mt-1 text-xs font-semibold text-amber-600">
                            Saved on this browser
                          </p>
                        )}
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="font-bold text-[#28a745]">
                          LKR {Number(order.total || 0).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400">
                          {order.payment_method || "Cash on Delivery"}
                        </p>
                      </div>
                    </div>
                    <ul className="mt-3 space-y-1 text-sm text-gray-600">
                      {order.order_items?.map((item) => (
                        <li key={item.id}>
                          {item.product_name} x {item.quantity} - LKR{" "}
                          {Number(item.price || 0).toLocaleString()}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-xs text-gray-400">
                      {order.address}, {order.city}
                    </p>
                    <button
                      onClick={() => reorder(order)}
                      className="mt-4 px-4 py-2 rounded-xl bg-[#28a745] text-white text-sm font-bold hover:bg-[#218838]"
                    >
                      Order Again
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
