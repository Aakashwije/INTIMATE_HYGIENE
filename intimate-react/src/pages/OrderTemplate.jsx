import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";

const products = [
  {
    id: 1,
    name: "Single Use Pack",
    price: 150,
    img: "/normal.png",
    minOrder: 10,
    unit: "pack",
  },
  {
    id: 2,
    name: "Travel Pack (Waterproof)",
    price: 300,
    img: "/travel.png",
    minOrder: 5,
    unit: "10-pack",
  },
  {
    id: 3,
    name: "Enterprise Pack (Flushable)",
    price: 120,
    img: "/interprise.png",
    minOrder: 100,
    unit: "pack",
  },
];

const FREE_DELIVERY_THRESHOLD = 3000;

function buildTemplate({ name, address, product, qty, payment, note }) {
  const p = products.find((p) => p.id === Number(product));
  const subtotal = p ? p.price * qty : 0;
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 250;
  const total = subtotal + deliveryFee;

  return `Hello Intimate Hygiene Enterprises! 👋

━━━━━━━━━━━━━━━━━━━━━
🧾 ORDER CONFIRMATION
━━━━━━━━━━━━━━━━━━━━━

👤 Name: ${name || "[Your Name]"}
📍 Address: ${address || "[Your Delivery Address]"}

🛒 Product: ${p ? p.name : "[Product Name]"}
📦 Quantity: ${qty} ${p ? p.unit : "pack"}(s)
💰 Unit Price: LKR ${p ? p.price.toLocaleString() : "—"} / ${p ? p.unit : "pack"}

─────────────────────
Subtotal:   LKR ${subtotal.toLocaleString()}
Delivery:   ${deliveryFee === 0 ? "FREE 🎉" : `LKR ${deliveryFee.toLocaleString()}`}
━━━━━━━━━━━━━━━━━━━━━
TOTAL:      LKR ${total.toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━

💳 Payment: ${payment || "[Cash on Delivery / Bank Transfer]"}
${note ? `\n📝 Note: ${note}` : ""}

Please confirm availability and estimated delivery date. Thank you!`;
}

export default function OrderTemplate() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    product: "1",
    qty: 1,
    payment: "Cash on Delivery",
    note: "",
  });
  const [copied, setCopied] = useState(false);

  const template = buildTemplate(form);

  const handleCopy = () => {
    navigator.clipboard.writeText(template).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/94729991950?text=${encodeURIComponent(template)}`,
      "_blank",
    );
  };

  const p = products.find((p) => p.id === Number(form.product));
  const subtotal = p ? p.price * form.qty : 0;
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 250;
  const total = subtotal + deliveryFee;

  return (
    <>
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
            Order Template
          </h1>
          <p className="text-lg opacity-90">
            Fill in your details, then send us the pre-filled WhatsApp message
            in one tap.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <div className="bg-white rounded-2xl shadow-md p-8 space-y-5">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Your Details
            </h2>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Your Name *
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
                Delivery Address *
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
                Product *
              </label>
              <select
                value={form.product}
                onChange={(e) =>
                  setForm({ ...form, product: e.target.value, qty: 1 })
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#28a745] bg-white"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — LKR {p.price} / {p.unit}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Quantity ({p?.unit}s)
                <span className="text-gray-400 font-normal ml-1">
                  (min {p?.minOrder})
                </span>
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      qty: Math.max(p?.minOrder || 1, f.qty - 1),
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
                Payment Method *
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
                Additional Note{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
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
              {subtotal > 0 && subtotal < FREE_DELIVERY_THRESHOLD && (
                <p className="text-xs text-orange-500">
                  Add LKR{" "}
                  {(FREE_DELIVERY_THRESHOLD - subtotal).toLocaleString()} more
                  for free delivery
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
            <h2 className="text-xl font-bold text-gray-800">Message Preview</h2>
            <pre className="bg-gray-900 text-green-300 rounded-2xl p-5 text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap font-mono">
              {template}
            </pre>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1ea952] transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Send on WhatsApp
              </button>
              <button
                onClick={handleCopy}
                className={`w-full py-3.5 rounded-xl font-bold transition-colors border-2 ${
                  copied
                    ? "bg-[#28a745] text-white border-[#28a745]"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {copied ? "✔ Copied!" : "Copy Message"}
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
