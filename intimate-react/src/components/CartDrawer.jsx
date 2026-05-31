import { Minus, PartyPopper, Plus, ShoppingBag, ShoppingCart, Truck, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useCustomerAuth } from "../context/CustomerAuthContext";
import { useLang } from "../context/LangContext";
import { createOrder, trackSiteEvent } from "../lib/database";
import { sendOrderConfirmationEmail } from "../lib/orderEmail";

const PHONE = "94707018171";

function buildOrderRef() {
  return `IHE-${new Date().getTime().toString(36).toUpperCase().slice(-6)}`;
}

function buildWhatsAppMessage(items, subtotal, t, customer, orderRef) {
  const lines = items
    .map((i, idx) => `${idx + 1}. ${i.name} × ${i.qty} — LKR ${(i.price * i.qty).toLocaleString()}`)
    .join("%0A");
  const txt =
    `Hello%21 I%27d like to place this order via Hygenc Covers%3A%0A` +
    `Order Ref%3A ${encodeURIComponent(orderRef)}%0A%0A` +
    `Customer%3A ${encodeURIComponent(customer.name)}%0A` +
    `Email%3A ${encodeURIComponent(customer.email)}%0A` +
    `Phone%3A ${encodeURIComponent(customer.phone)}%0A` +
    `City%3A ${encodeURIComponent(customer.city)}%0A` +
    `Address%3A ${encodeURIComponent(customer.address)}%0A` +
    `Payment%3A ${encodeURIComponent(customer.paymentMethod)}%0A` +
    `${customer.note ? `Note%3A ${encodeURIComponent(customer.note)}%0A` : ""}%0A` +
    `${lines}%0A%0A` +
    `${t.cartSubtotal || "Subtotal"}%3A LKR ${subtotal.toLocaleString()}%0A%0A` +
    `Please confirm availability and delivery%2C thank you%21`;
  return `https://wa.me/${PHONE}?text=${txt}`;
}

export default function CartDrawer() {
  const { items, updateQty, remove, subtotal, open, setOpen, clear } = useCart();
  const { user, profile, isLoggedIn, saveProfile } = useCustomerAuth();
  const { t } = useLang();
  const [checkout, setCheckout] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    note: "",
    paymentMethod: "Cash on Delivery",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const freeDeliveryThreshold = 3000;
  const remaining = Math.max(0, freeDeliveryThreshold - subtotal);
  const progress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const orderRef = buildOrderRef();
    const customer = {
      name: checkout.name || profile?.name || "",
      email: checkout.email || profile?.email || user?.email || "",
      phone: checkout.phone || profile?.phone || "",
      city: checkout.city || profile?.city || "",
      address: checkout.address || profile?.address || "",
      note: checkout.note,
      paymentMethod:
        checkout.paymentMethod ||
        profile?.preferred_payment_method ||
        "Cash on Delivery",
    };
    const orderItems = items.map((item) => ({
      product_name: item.name,
      quantity: item.qty,
      price: item.price,
    }));
    const order = {
      order_ref: orderRef,
      customer_id: user?.id || null,
      customer_name: customer.name,
      customer_email: customer.email.trim().toLowerCase(),
      customer_phone: customer.phone,
      address: customer.address,
      city: customer.city,
      total: subtotal,
      status: "pending",
      payment_method: customer.paymentMethod,
      note: customer.note || null,
    };
    const whatsappUrl = buildWhatsAppMessage(
      items,
      subtotal,
      t,
      customer,
      orderRef,
    );
    const whatsappWindow = window.open("", "_blank");

    try {
      if (isLoggedIn) {
        saveProfile({
          name: customer.name,
          phone: customer.phone,
          address: customer.address,
          city: customer.city,
          preferred_payment_method: customer.paymentMethod,
        }).catch(() => {});
      }
      const savedOrder = await createOrder({
        order,
        items: orderItems,
      });

      if (savedOrder.sync_status === "local") {
        console.warn(
          `Order ${orderRef} saved locally: ${savedOrder.sync_error}`,
        );
      }

      trackSiteEvent({
        event_type: "checkout_submit",
        label: "Cart checkout",
        metadata: {
          order_ref: orderRef,
          total: subtotal,
          item_count: items.length,
          sync_status: savedOrder.sync_status,
        },
      }).catch(() => {});
      sendOrderConfirmationEmail({ order, items: orderItems }).catch((mailErr) => {
        console.warn(mailErr.message || "Order confirmation email could not be sent.");
      });
      if (whatsappWindow) {
        whatsappWindow.location.href = whatsappUrl;
      } else {
        window.location.assign(whatsappUrl);
      }
      clear();
      setOpen(false);
      setCheckout({
        name: "",
        email: "",
        phone: "",
        city: "",
        address: "",
        note: "",
        paymentMethod: "Cash on Delivery",
      });
    } catch (err) {
      if (whatsappWindow) whatsappWindow.close();
      setError(err.message || "Could not save order. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex justify-end">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeInScreen"
        onClick={() => setOpen(false)}
      />

      <aside className="relative w-full sm:w-[420px] h-full bg-white shadow-2xl flex flex-col animate-slideInRight">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#28a745]" />
            {t.yourCart || "Your Cart"}
            {items.length > 0 && (
              <span className="text-xs font-semibold bg-[#28a745] text-white px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.qty, 0)}
              </span>
            )}
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-gray-700 p-1"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free delivery progress */}
        {items.length > 0 && (
          <div className="px-5 py-3 bg-green-50 border-b border-green-100">
            <p className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
              {remaining > 0 ? (
                <>
                  <Truck className="w-3.5 h-3.5 text-[#28a745]" />
                  {t.cartAddMore || "Add"} LKR {remaining.toLocaleString()} {t.cartForFreeDelivery || "more for free delivery"}
                </>
              ) : (
                <>
                  <PartyPopper className="w-3.5 h-3.5 text-[#28a745]" />
                  {t.cartFreeUnlocked || "You unlocked free delivery!"}
                </>
              )}
            </p>
            <div className="h-2 rounded-full bg-green-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#28a745] to-[#5cd65c] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-14 h-14 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">{t.cartEmpty || "Your cart is empty"}</p>
              <p className="text-gray-400 text-xs mt-1">{t.cartEmptySub || "Add a product to get started"}</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((i) => (
                <li
                  key={i.id}
                  className="flex gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <img src={i.img} alt={i.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-800 truncate">{i.name}</p>
                    <p className="text-xs text-gray-500 mb-1.5">LKR {i.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(i.id, i.qty - 1)}
                        className="w-7 h-7 rounded-md bg-white border border-gray-200 text-gray-600 flex items-center justify-center hover:border-[#28a745] hover:text-[#28a745]"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">{i.qty}</span>
                      <button
                        onClick={() => updateQty(i.id, i.qty + 1)}
                        className="w-7 h-7 rounded-md bg-white border border-gray-200 text-gray-600 flex items-center justify-center hover:border-[#28a745] hover:text-[#28a745]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => remove(i.id)}
                        className="ml-auto text-xs text-gray-400 hover:text-red-500"
                      >
                        {t.cartRemove || "Remove"}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-[#28a745] whitespace-nowrap">
                    LKR {(i.price * i.qty).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{t.cartSubtotal || "Subtotal"}</span>
              <span className="text-xl font-bold text-gray-800">LKR {subtotal.toLocaleString()}</span>
            </div>
            <form onSubmit={handleCheckout} className="space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input required value={checkout.name || profile?.name || ""} onChange={(e) => setCheckout((f) => ({ ...f, name: e.target.value }))} placeholder="Name" className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm" />
                <input required value={checkout.phone || profile?.phone || ""} onChange={(e) => setCheckout((f) => ({ ...f, phone: e.target.value }))} placeholder="Phone / WhatsApp" className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm" />
              </div>
              <input required type="email" value={checkout.email || profile?.email || user?.email || ""} onChange={(e) => setCheckout((f) => ({ ...f, email: e.target.value }))} placeholder="Email for order confirmation" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm" />
              <input required value={checkout.city || profile?.city || ""} onChange={(e) => setCheckout((f) => ({ ...f, city: e.target.value }))} placeholder="City / district" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm" />
              <textarea required rows={2} value={checkout.address || profile?.address || ""} onChange={(e) => setCheckout((f) => ({ ...f, address: e.target.value }))} placeholder="Delivery address" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm resize-none" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <select value={checkout.paymentMethod || profile?.preferred_payment_method || "Cash on Delivery"} onChange={(e) => setCheckout((f) => ({ ...f, paymentMethod: e.target.value }))} className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white">
                  <option>Cash on Delivery</option>
                  <option>Bank Transfer</option>
                  <option>eZ Cash / mCash</option>
                </select>
                <input value={checkout.note} onChange={(e) => setCheckout((f) => ({ ...f, note: e.target.value }))} placeholder="Optional note" className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm" />
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={saving}
                className="btn-shimmer flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1ea952] transition-colors shadow-lg disabled:opacity-70"
              >
                {saving ? "Saving order..." : t.cartCheckout || "Checkout via WhatsApp"}
              </button>
            </form>
            <button
              onClick={clear}
              className="w-full text-xs text-gray-400 hover:text-gray-700 underline"
            >
              {t.cartClear || "Clear cart"}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
