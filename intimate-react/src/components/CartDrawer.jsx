import {
  AlertCircle,
  CheckCircle,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Truck,
  X,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useCustomerAuth } from "../context/CustomerAuthContext";
import { useLang } from "../context/LangContext";
import { captureLocalOrder, syncOrderToCloud, trackSiteEvent } from "../lib/database";
import { getDeliveryQuoteByArea } from "../lib/delivery";
import { sendOrderConfirmationEmail } from "../lib/orderEmail";

const PHONE = "94707018171";
const EMPTY_CHECKOUT = {
  name: "",
  email: "",
  phone: "",
  city: "",
  address: "",
  deliveryArea: "",
  note: "",
  paymentMethod: "",
};
const DELIVERY_OPTIONS = [
  {
    value: "colombo",
    title: "Colombo area",
    detail: "Free delivery",
  },
  {
    value: "outside",
    title: "Outside Colombo",
    detail: "LKR 350 delivery",
  },
];

function buildOrderRef() {
  return `IHE-${new Date().getTime().toString(36).toUpperCase().slice(-6)}`;
}

function buildWhatsAppMessage(items, subtotal, t, customer, orderRef, deliveryQuote) {
  const total = subtotal + deliveryQuote.fee;
  const lines = items
    .map((i, idx) => `${idx + 1}. ${i.name} x ${i.qty} - LKR ${(i.price * i.qty).toLocaleString()}`)
    .map(encodeURIComponent)
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
    `${t.cartSubtotal || "Subtotal"}%3A LKR ${subtotal.toLocaleString()}%0A` +
    `Delivery%3A ${encodeURIComponent(deliveryQuote.label)}%0A` +
    `Total%3A LKR ${total.toLocaleString()}%0A%0A` +
    `Please confirm availability and delivery%2C thank you%21`;
  return `https://wa.me/${PHONE}?text=${txt}`;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateCheckout(customer, deliveryArea, items) {
  const errors = {};
  if (!items.length) errors.form = "Your cart is empty.";
  if (!customer.name.trim()) errors.name = "Please enter your full name.";
  if (!customer.phone.trim()) errors.phone = "Please enter your WhatsApp or phone number.";
  if (!customer.email.trim()) {
    errors.email = "Please enter your email for the order confirmation.";
  } else if (!isValidEmail(customer.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!deliveryArea) errors.deliveryArea = "Please choose your delivery area.";
  if (!customer.city.trim()) errors.city = "Please enter your city or district.";
  if (!customer.address.trim()) errors.address = "Please enter your delivery address.";
  return errors;
}

function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}

function fieldClass(errors, key, extra = "") {
  return `${extra} rounded-lg border text-sm focus:outline-none focus:ring-2 ${
    errors[key]
      ? "border-red-300 bg-red-50 focus:ring-red-100"
      : "border-gray-200 focus:border-[#28a745] focus:ring-green-100"
  }`;
}

function FieldError({ children }) {
  if (!children) return null;
  return (
    <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-red-500">
      <AlertCircle className="h-3 w-3" />
      {children}
    </p>
  );
}

export default function CartDrawer() {
  const { items, updateQty, remove, subtotal, open, setOpen, clear } = useCart();
  const { user, profile, isLoggedIn, saveProfile } = useCustomerAuth();
  const { t } = useLang();
  const [checkout, setCheckout] = useState(EMPTY_CHECKOUT);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [successOrder, setSuccessOrder] = useState(null);
  const [editedFields, setEditedFields] = useState({});

  const selectedDeliveryQuote = checkout.deliveryArea
    ? getDeliveryQuoteByArea(checkout.deliveryArea)
    : null;
  const deliveryFee = selectedDeliveryQuote?.fee || 0;
  const checkoutTotal = subtotal + deliveryFee;

  const closeDrawer = () => {
    setSuccessOrder(null);
    setOpen(false);
  };

  const getCheckoutValue = (key, fallback = "") =>
    editedFields[key] ? checkout[key] : checkout[key] || fallback || "";

  const updateCheckoutField = (key, value) => {
    setCheckout((current) => ({ ...current, [key]: value }));
    setEditedFields((current) => ({ ...current, [key]: true }));
    setFieldErrors((current) => {
      if (!current[key] && !current.form) return current;
      const next = { ...current };
      delete next[key];
      delete next.form;
      return next;
    });
    if (error) setError("");
  };

  if (!open) return null;

  const handleCheckout = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setFieldErrors({});
    const orderRef = buildOrderRef();
    const customer = {
      name: getCheckoutValue("name", profile?.name).trim(),
      email: getCheckoutValue("email", profile?.email || user?.email).trim(),
      phone: getCheckoutValue("phone", profile?.phone).trim(),
      city: getCheckoutValue("city", profile?.city).trim(),
      address: getCheckoutValue("address", profile?.address).trim(),
      note: checkout.note.trim(),
      paymentMethod:
        getCheckoutValue(
          "paymentMethod",
          profile?.preferred_payment_method || "Cash on Delivery",
        ) || "Cash on Delivery",
    };
    const validationErrors = validateCheckout(customer, checkout.deliveryArea, items);
    if (hasErrors(validationErrors)) {
      setFieldErrors(validationErrors);
      setError("Please fix the highlighted details before checkout.");
      setSaving(false);
      return;
    }

    const orderItems = items.map((item) => ({
      product_name: item.name,
      quantity: item.qty,
      price: item.price,
    }));
    const deliveryQuote = getDeliveryQuoteByArea(checkout.deliveryArea);
    const total = subtotal + deliveryQuote.fee;
    const order = {
      order_ref: orderRef,
      customer_id: user?.id || null,
      customer_name: customer.name,
      customer_email: customer.email.trim().toLowerCase(),
      customer_phone: customer.phone,
      address: customer.address,
      city: customer.city,
      subtotal,
      delivery_fee: deliveryQuote.fee,
      delivery_area: deliveryQuote.area,
      total,
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
      deliveryQuote,
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
      const capturedOrder = captureLocalOrder({
        order,
        items: orderItems,
      });
      const syncedOrder = await syncOrderToCloud(capturedOrder);
      const orderForNotification = syncedOrder.order_items
        ? syncedOrder
        : capturedOrder;

      trackSiteEvent({
        event_type: "checkout_submit",
        label: "Cart checkout",
        metadata: {
          order_ref: orderRef,
          total,
          delivery_fee: deliveryQuote.fee,
          item_count: items.length,
          sync_status: syncedOrder.sync_status,
        },
      }).catch(() => {});
      sendOrderConfirmationEmail({
        order: orderForNotification,
        items: orderForNotification.order_items,
      }).catch((mailErr) => {
        console.warn(mailErr.message || "Order confirmation email could not be sent.");
      });
      if (syncedOrder.sync_status !== "cloud") {
        console.warn(`Order ${orderRef} saved locally: ${syncedOrder.sync_error}`);
        window.setTimeout(() => {
          syncOrderToCloud(capturedOrder).catch(() => {});
        }, 15000);
      }
      const whatsappOpened = Boolean(whatsappWindow);
      if (whatsappWindow) {
        whatsappWindow.location.href = whatsappUrl;
      }
      clear();
      setSuccessOrder({
        orderRef,
        total,
        deliveryLabel: deliveryQuote.label,
        syncStatus: syncedOrder.sync_status,
        whatsappOpened,
        whatsappUrl,
      });
      setCheckout(EMPTY_CHECKOUT);
      setEditedFields({});
      setSaving(false);
    } catch (err) {
      if (whatsappWindow) whatsappWindow.close();
      setError(err.message || "Could not save order. Please try again.");
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex justify-end">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeInScreen"
        onClick={closeDrawer}
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
            onClick={closeDrawer}
            className="text-gray-400 hover:text-gray-700 p-1"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {successOrder ? (
          <div className="flex-1 px-5 py-8 flex flex-col justify-center text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-[#28a745] ring-1 ring-green-200">
              <CheckCircle className="h-9 w-9" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Order saved</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              {successOrder.whatsappOpened
                ? "WhatsApp has opened with your order details. Please send the message there so our team can confirm availability and delivery."
                : "Your order was saved. Open WhatsApp and send the prepared message so our team can confirm availability and delivery."}
            </p>
            <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-4 text-left">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-gray-500">Order ID</span>
                <span className="font-bold text-gray-900">{successOrder.orderRef}</span>
              </div>
              <div className="mt-2 flex justify-between gap-4 text-sm">
                <span className="text-gray-500">Delivery</span>
                <span className="font-semibold text-gray-900">
                  {successOrder.deliveryLabel}
                </span>
              </div>
              <div className="mt-2 flex justify-between gap-4 border-t border-green-200 pt-3">
                <span className="text-sm font-semibold text-gray-600">Total</span>
                <span className="text-lg font-bold text-[#28a745]">
                  LKR {successOrder.total.toLocaleString()}
                </span>
              </div>
            </div>
            {successOrder.syncStatus !== "cloud" && (
              <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
                Saved on this browser. It will retry cloud sync automatically.
              </p>
            )}
            {!successOrder.whatsappOpened && (
              <a
                href={successOrder.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#25D366] py-3 text-sm font-bold text-white transition-colors hover:bg-[#1ea952]"
              >
                Open WhatsApp
              </a>
            )}
            <button
              onClick={closeDrawer}
              className="mt-3 w-full rounded-xl bg-[#28a745] py-3 text-sm font-bold text-white transition-colors hover:bg-[#218838]"
            >
              Done
            </button>
          </div>
        ) : (
          <>
        {/* Delivery policy */}
        {items.length > 0 && (
          <div className="px-5 py-3 bg-green-50 border-b border-green-100">
            <p className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#28a745]" />
              Colombo area delivery is free. Outside Colombo is LKR 350.
            </p>
            <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-semibold">
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[#28a745] ring-1 ring-green-200">
                <MapPin className="h-3 w-3" />
                Colombo: FREE
              </span>
              <span className="rounded-full bg-white px-2.5 py-1 text-gray-700 ring-1 ring-green-200">
                Outside Colombo: LKR 350
              </span>
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
            <div className="rounded-2xl border border-green-100 bg-green-50 p-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>{t.cartSubtotal || "Subtotal"}</span>
                <span className="font-semibold">LKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="mt-2 flex justify-between text-gray-600">
                <span>Delivery</span>
                <span
                  className={
                    selectedDeliveryQuote?.fee === 0 && checkout.deliveryArea
                      ? "font-semibold text-[#28a745]"
                      : "font-semibold"
                  }
                >
                  {selectedDeliveryQuote?.label || "Select delivery area"}
                </span>
              </div>
              <div className="mt-3 flex justify-between border-t border-green-200 pt-3">
                <span className="font-bold text-gray-800">Total</span>
                <span className="text-xl font-bold text-gray-900">
                  LKR {checkoutTotal.toLocaleString()}
                </span>
              </div>
            </div>
            <form onSubmit={handleCheckout} noValidate className="space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <input
                    value={getCheckoutValue("name", profile?.name)}
                    onChange={(e) => updateCheckoutField("name", e.target.value)}
                    placeholder="Name"
                    className={fieldClass(fieldErrors, "name", "w-full px-3 py-2.5")}
                    aria-invalid={Boolean(fieldErrors.name)}
                  />
                  <FieldError>{fieldErrors.name}</FieldError>
                </div>
                <div>
                  <input
                    value={getCheckoutValue("phone", profile?.phone)}
                    onChange={(e) => updateCheckoutField("phone", e.target.value)}
                    placeholder="Phone / WhatsApp"
                    className={fieldClass(fieldErrors, "phone", "w-full px-3 py-2.5")}
                    aria-invalid={Boolean(fieldErrors.phone)}
                  />
                  <FieldError>{fieldErrors.phone}</FieldError>
                </div>
              </div>
              <div>
                <input
                  type="email"
                  value={getCheckoutValue("email", profile?.email || user?.email)}
                  onChange={(e) => updateCheckoutField("email", e.target.value)}
                  placeholder="Email for order confirmation"
                  className={fieldClass(fieldErrors, "email", "w-full px-3 py-2.5")}
                  aria-invalid={Boolean(fieldErrors.email)}
                />
                <FieldError>{fieldErrors.email}</FieldError>
              </div>
              <div>
                <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-gray-500">
                  Delivery area
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {DELIVERY_OPTIONS.map((option) => {
                    const selected = checkout.deliveryArea === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          updateCheckoutField("deliveryArea", option.value)
                        }
                        className={`rounded-xl border px-3 py-2.5 text-left transition-all ${
                          selected
                            ? "border-[#28a745] bg-green-50 ring-2 ring-green-100"
                            : fieldErrors.deliveryArea
                              ? "border-red-300 bg-red-50"
                              : "border-gray-200 bg-white hover:border-green-200"
                        }`}
                      >
                        <span className="block text-xs font-bold text-gray-900">
                          {option.title}
                        </span>
                        <span className="block text-[11px] font-semibold text-[#28a745]">
                          {option.detail}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <FieldError>{fieldErrors.deliveryArea}</FieldError>
              </div>
              <div>
                <input
                  value={getCheckoutValue("city", profile?.city)}
                  onChange={(e) => updateCheckoutField("city", e.target.value)}
                  placeholder="City / district"
                  className={fieldClass(fieldErrors, "city", "w-full px-3 py-2.5")}
                  aria-invalid={Boolean(fieldErrors.city)}
                />
                <FieldError>{fieldErrors.city}</FieldError>
              </div>
              <div>
                <textarea
                  rows={2}
                  value={getCheckoutValue("address", profile?.address)}
                  onChange={(e) => updateCheckoutField("address", e.target.value)}
                  placeholder="Delivery address"
                  className={fieldClass(fieldErrors, "address", "w-full px-3 py-2.5 resize-none")}
                  aria-invalid={Boolean(fieldErrors.address)}
                />
                <FieldError>{fieldErrors.address}</FieldError>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <select
                  value={getCheckoutValue(
                    "paymentMethod",
                    profile?.preferred_payment_method || "Cash on Delivery",
                  )}
                  onChange={(e) => updateCheckoutField("paymentMethod", e.target.value)}
                  className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm bg-white"
                >
                  <option>Cash on Delivery</option>
                  <option>Bank Transfer</option>
                  <option>eZ Cash / mCash</option>
                </select>
                <input
                  value={checkout.note}
                  onChange={(e) => updateCheckoutField("note", e.target.value)}
                  placeholder="Optional note"
                  className="px-3 py-2.5 rounded-lg border border-gray-200 text-sm"
                />
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
          </>
        )}
      </aside>
    </div>
  );
}
