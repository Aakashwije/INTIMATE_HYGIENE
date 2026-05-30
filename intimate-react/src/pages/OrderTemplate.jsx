import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
import { useCart } from "../context/CartContext";
import { useLang } from "../context/LangContext";
import {
  addOnProductIds,
  addOnProducts,
  bundleProductIds,
  bundleProducts,
  formatLkr,
  shopProducts,
} from "../data/catalog";
import { createOrder } from "../lib/database";

const products = shopProducts.map((product) => ({
  id: product.slug,
  name: product.name,
  price: product.price,
  img: product.image,
}));

const FREE_DELIVERY_THRESHOLD = 3000;

const BUNDLES = [
  {
    ...bundleProducts[0],
    items: "5 x non-waterproof single-use packs",
    originalPrice: 5 * addOnProducts[0].price,
  },
  {
    ...bundleProducts[1],
    items: "5 x waterproof, anti-slip packs",
    originalPrice: 5 * addOnProducts[1].price,
  },
  {
    ...bundleProducts[2],
    items: "10 x enterprise packs + free dispenser + instructions",
    originalPrice: 10 * addOnProducts[2].price,
  },
].map((bundle) => ({
  id: bundle.slug,
  name: bundle.name,
  desc: bundle.addOnNote,
  items: bundle.items,
  originalPrice: bundle.originalPrice,
  salePrice: bundle.price,
  badge: `Save ${formatLkr(bundle.originalPrice - bundle.price)}`,
  whatsapp: bundle.whatsappMsg,
}));

const DISCOUNT_CODES = {
  INTIMATE10: 10,
  WELCOME15: 15,
  BULK20: 20,
};

function makeOrderRef() {
  return `IHE-${new Date().getTime().toString(36).toUpperCase().slice(-6)}`;
}

function buildTemplate({
  orderRef,
  name,
  phone,
  address,
  city,
  product,
  qty,
  payment,
  discountCode,
  note,
}) {
  const p = products.find((p) => p.id === product);
  const subtotal = p ? p.price * qty : 0;
  const discountPct = DISCOUNT_CODES[discountCode?.trim().toUpperCase()] || 0;
  const discountAmt = Math.round((subtotal * discountPct) / 100);
  const discountedSubtotal = subtotal - discountAmt;
  const deliveryFee = discountedSubtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 250;
  const total = discountedSubtotal + deliveryFee;
  const ref = orderRef || makeOrderRef();

  return `Hello Intimate Hygiene Enterprises! 👋

━━━━━━━━━━━━━━━━━━━━━━━
🧾 NEW ORDER — ${ref}
━━━━━━━━━━━━━━━━━━━━━━━

👤 CUSTOMER DETAILS
─────────────────────
   Name    : ${name || "[Your Name]"}
   Phone   : ${phone || "[Your Phone Number]"}
   Address : ${address || "[Your Delivery Address]"}
   City    : ${city || "[City / District]"}

🛒 ORDER DETAILS
─────────────────────
   Product : ${p ? p.name : "[Product Name]"}
   Qty     : ${qty}
   Unit Price: LKR ${p ? p.price.toLocaleString() : "—"}

💵 PRICING BREAKDOWN
─────────────────────
   Subtotal  : LKR ${subtotal.toLocaleString()}${
     discountAmt > 0
       ? `
   Discount  : −LKR ${discountAmt.toLocaleString()} (${discountPct}% · Code: ${discountCode.trim().toUpperCase()})
   After Disc: LKR ${discountedSubtotal.toLocaleString()}`
       : ""
   }
   Delivery  : ${deliveryFee === 0 ? "FREE 🎉" : `LKR ${deliveryFee.toLocaleString()}`}
━━━━━━━━━━━━━━━━━━━━━━━
   TOTAL     : LKR ${total.toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━━

💳 PAYMENT METHOD
─────────────────────
   ${payment || "Cash on Delivery"}
${note ? `\n📝 SPECIAL INSTRUCTIONS\n─────────────────────\n   ${note}\n` : ""}
Please confirm availability and estimated delivery date. Thank you! 🌿`;
}

export default function OrderTemplate() {
  const { t } = useLang();
  const { items } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    product: bundleProducts[0].slug,
    qty: 1,
    payment: "Cash on Delivery",
    discountCode: "",
    note: "",
  });
  const [copied, setCopied] = useState(false);
  const [discountMsg, setDiscountMsg] = useState("");
  const [saving, setSaving] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const hasBundleInCart = items.some((item) => bundleProductIds.has(item.id));
  const productOptions = hasBundleInCart
    ? products
    : products.filter((product) => !addOnProductIds.has(product.id));
  const selectedProduct =
    !hasBundleInCart && addOnProductIds.has(form.product)
      ? bundleProducts[0].slug
      : form.product;
  const safeForm = { ...form, product: selectedProduct };

  const template = buildTemplate(safeForm);

  const handleCopy = () => {
    navigator.clipboard.writeText(template).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleWhatsApp = async () => {
    if (!form.name || !form.phone || !form.address || !form.city) {
      setOrderStatus("Please fill name, phone, address, and city first.");
      return;
    }
    setSaving(true);
    setOrderStatus("");
    const orderRef = makeOrderRef();
    const message = buildTemplate({ ...safeForm, orderRef });
    try {
      await createOrder({
        order: {
          order_ref: orderRef,
          customer_name: form.name,
          customer_phone: form.phone,
          address: form.address,
          city: form.city,
          total,
          status: "pending",
          payment_method: form.payment,
          discount_code: form.discountCode.trim().toUpperCase() || null,
          note: form.note || null,
        },
        items: [
          {
            product_name: p.name,
            quantity: form.qty,
            price: p.price,
          },
        ],
      });
      setOrderStatus("Order saved. Opening WhatsApp now...");
    } catch (err) {
      setOrderStatus(err.message || "Could not save order. Opening WhatsApp.");
    }
    window.open(
      `https://wa.me/94707018171?text=${encodeURIComponent(message)}`,
      "_blank",
    );
    setSaving(false);
  };

  const handleDiscountCheck = () => {
    const code = form.discountCode.trim().toUpperCase();
    if (!code) return;
    const pct = DISCOUNT_CODES[code];
    if (pct) {
      setDiscountMsg(`✅ Code applied! ${pct}% off`);
    } else {
      setDiscountMsg("❌ Invalid discount code");
    }
  };

  const p = products.find((p) => p.id === selectedProduct);
  const subtotal = p ? p.price * form.qty : 0;
  const discountPct =
    DISCOUNT_CODES[form.discountCode?.trim().toUpperCase()] || 0;
  const discountAmt = Math.round((subtotal * discountPct) / 100);
  const discountedSubtotal = subtotal - discountAmt;
  const deliveryFee = discountedSubtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 250;
  const total = discountedSubtotal + deliveryFee;

  return (
    <>
      <SEO
        title="Place an Order"
        description="Order disposable toilet seat covers online in Sri Lanka. Fill in your details and send directly via WhatsApp. Fast, easy and secure."
        path="/order"
      />
      <Navbar />

      {/* Hero */}
      <section
        className="relative flex items-center justify-center text-center text-white px-5 py-20 rounded-b-[40px] shadow-lg animate-fadeInHero overflow-hidden"
        style={{
          background:
            'linear-gradient(rgba(40,167,69,0.85), rgba(40,167,69,0.85)), url("/hero.jpg") no-repeat center/cover',
        }}
      >
        <div className="absolute inset-0 bg-[rgba(40,167,69,0.25)] rounded-b-[40px]" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">
            {t.orderHeroTitle}
          </h1>
          <p className="text-lg opacity-90">{t.orderHeroSub}</p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-10 sm:py-14">
        {/* Bundle Deals */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            🎁 Bundle Offers
          </h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            Start with a bundle, then add extra packs if you need more
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {BUNDLES.map((b) => (
              <div
                key={b.id}
                className="relative bg-white rounded-2xl shadow-md border border-green-100 p-5 flex flex-col gap-3 hover:shadow-lg transition-shadow"
              >
                <span className="absolute top-3 right-3 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {b.badge}
                </span>
                <h3 className="font-bold text-gray-800 text-base pr-16">
                  {b.name}
                </h3>
                <p className="text-xs text-gray-500">{b.desc}</p>
                <p className="text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                  {b.items}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-[#28a745]">
                    {formatLkr(b.salePrice)}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    {formatLkr(b.originalPrice)}
                  </span>
                </div>
                <a
                  href={`https://wa.me/94707018171?text=${encodeURIComponent(b.whatsapp)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1ea952] transition-colors text-sm"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-current shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Order Bundle
                </a>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-md p-5 sm:p-8 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t.name} *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Dilshan Perera"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#28a745]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="e.g. 0712 345 678"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#28a745]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t.address} *
              </label>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="e.g. 45/2 Galle Road, Colombo 3"
                rows={2}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#28a745] resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                City / District *
              </label>
              <select
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#28a745] bg-white"
              >
                <option value="">Select city / district…</option>
                {[
                  "Colombo",
                  "Gampaha",
                  "Kalutara",
                  "Kandy",
                  "Matale",
                  "Nuwara Eliya",
                  "Galle",
                  "Matara",
                  "Hambantota",
                  "Jaffna",
                  "Kilinochchi",
                  "Mannar",
                  "Vavuniya",
                  "Mullaitivu",
                  "Batticaloa",
                  "Ampara",
                  "Trincomalee",
                  "Kurunegala",
                  "Puttalam",
                  "Anuradhapura",
                  "Polonnaruwa",
                  "Badulla",
                  "Moneragala",
                  "Ratnapura",
                  "Kegalle",
                ].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t.product} *
              </label>
              <select
                value={selectedProduct}
                onChange={(e) =>
                  setForm({ ...form, product: e.target.value, qty: 1 })
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#28a745] bg-white"
              >
                {productOptions.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {formatLkr(p.price)}
                  </option>
                ))}
              </select>
              {!hasBundleInCart && (
                <p className="text-xs text-amber-600 mt-1">
                  Add-ons unlock after a bundle package is in your cart.
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t.quantity}
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      qty: Math.max(1, f.qty - 1),
                    }))
                  }
                  className="w-9 h-9 border border-gray-300 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  −
                </button>
                <span className="font-bold text-gray-800 min-w-[2.5rem] text-center">
                  {form.qty}
                </span>
                <button
                  onClick={() => setForm((f) => ({ ...f, qty: f.qty + 1 }))}
                  className="w-9 h-9 border border-gray-300 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t.payment} *
              </label>
              <select
                value={form.payment}
                onChange={(e) => setForm({ ...form, payment: e.target.value })}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#28a745] bg-white"
              >
                <option>Cash on Delivery</option>
                <option>Bank Transfer</option>
                <option>eZ Cash / mCash</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Discount Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.discountCode}
                  onChange={(e) => {
                    setForm({ ...form, discountCode: e.target.value });
                    setDiscountMsg("");
                  }}
                  placeholder="e.g. INTIMATE10"
                  className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#28a745] uppercase"
                />
                <button
                  type="button"
                  onClick={handleDiscountCheck}
                  className="px-4 py-2.5 bg-[#28a745] text-white text-sm font-semibold rounded-xl hover:bg-[#1e8c38] transition-colors"
                >
                  Apply
                </button>
              </div>
              {discountMsg && (
                <p
                  className={`text-xs mt-1 ${discountMsg.startsWith("✅") ? "text-green-600" : "text-red-500"}`}
                >
                  {discountMsg}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {t.note}
              </label>
              <input
                type="text"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                placeholder="e.g. Please deliver after 5 PM"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#28a745]"
              />
            </div>

            {/* Order summary */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm space-y-1">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>LKR {subtotal.toLocaleString()}</span>
              </div>
              {discountAmt > 0 && (
                <div className="flex justify-between text-green-700 font-medium">
                  <span>Discount ({discountPct}%)</span>
                  <span>−LKR {discountAmt.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span
                  className={
                    deliveryFee === 0 ? "text-[#28a745] font-semibold" : ""
                  }
                >
                  {deliveryFee === 0
                    ? "FREE 🎉"
                    : `LKR ${deliveryFee.toLocaleString()}`}
                </span>
              </div>
              {discountedSubtotal > 0 &&
                discountedSubtotal < FREE_DELIVERY_THRESHOLD && (
                  <p className="text-xs text-orange-500">
                    Add LKR{" "}
                    {(
                      FREE_DELIVERY_THRESHOLD - discountedSubtotal
                    ).toLocaleString()}{" "}
                    more for free delivery
                  </p>
                )}
              <div className="flex justify-between font-bold text-gray-800 pt-1 border-t border-green-200">
                <span>Total</span>
                <span>LKR {total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Preview + actions */}
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-gray-800">{t.livePreview}</h2>
            <pre className="bg-gray-900 text-green-300 rounded-2xl p-4 sm:p-5 text-[10px] sm:text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap break-words font-mono max-w-full">
              {template}
            </pre>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleWhatsApp}
                disabled={saving}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1ea952] transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {saving ? "Saving..." : t.sendOnWhatsApp}
              </button>
              {orderStatus && (
                <p className="text-sm text-center text-gray-500">
                  {orderStatus}
                </p>
              )}
              <button
                onClick={handleCopy}
                className={`w-full py-3.5 rounded-xl font-bold transition-colors border-2 ${copied ? "bg-[#28a745] text-white border-[#28a745]" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}
              >
                {copied ? `✔ ${t.copied}` : t.copyMessage}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
