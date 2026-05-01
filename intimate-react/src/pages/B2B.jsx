import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";

const tiers = [
  {
    name: "Starter",
    volume: "100 – 499 packs",
    price: "LKR 200",
    unit: "/pack",
    color: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    features: [
      "Standard packaging",
      "Custom logo printing available",
      "Delivery within 5 business days",
      "Email support",
    ],
  },
  {
    name: "Business",
    volume: "500 – 999 packs",
    price: "LKR 170",
    unit: "/pack",
    color: "border-[#28a745]",
    badge: "bg-green-100 text-green-700",
    highlight: true,
    features: [
      "Custom branded packaging",
      "Free delivery island-wide",
      "1 free wall-mount dispenser",
      "Priority WhatsApp support",
    ],
  },
  {
    name: "Enterprise",
    volume: "1,000 – 4,999 packs",
    price: "LKR 140",
    unit: "/pack",
    color: "border-purple-200",
    badge: "bg-purple-100 text-purple-700",
    features: [
      "Custom branded packaging",
      "Free delivery island-wide",
      "5 free wall-mount dispensers",
      "Dedicated account manager",
    ],
  },
  {
    name: "Premium",
    volume: "5,000+ packs",
    price: "Custom",
    unit: "pricing",
    color: "border-yellow-300",
    badge: "bg-yellow-100 text-yellow-700",
    features: [
      "Fully custom packaging & branding",
      "Priority manufacturing slots",
      "Unlimited dispensers",
      "SLA-backed delivery guarantee",
    ],
  },
];

const sectors = [
  { icon: "🏨", label: "Hotels & Resorts" },
  { icon: "🏥", label: "Hospitals & Clinics" },
  { icon: "✈️", label: "Airlines & Airports" },
  { icon: "🏢", label: "Corporate Offices" },
  { icon: "🎓", label: "Universities & Schools" },
  { icon: "🏛️", label: "Government Buildings" },
];

const steps = [
  {
    num: "01",
    title: "Submit Enquiry",
    desc: "Fill the form below. Your details are sent directly to us via WhatsApp for instant response.",
  },
  {
    num: "02",
    title: "Receive Custom Quote",
    desc: "We'll get back to you within 2 hours with pricing, sample options, and delivery timelines.",
  },
  {
    num: "03",
    title: "Confirm & Deliver",
    desc: "Approve your order and we handle everything — packaging, branding, and timely delivery.",
  },
];

const initForm = {
  company: "",
  name: "",
  email: "",
  phone: "",
  product: "",
  volume: "",
  message: "",
};

export default function B2B() {
  const [form, setForm] = useState(initForm);
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hello! I'm interested in bulk ordering from Intimate Hygiene Enterprises.\n\n` +
        `🏢 Company: ${form.company}\n` +
        `👤 Contact: ${form.name}\n` +
        `📧 Email: ${form.email}\n` +
        `📞 Phone: ${form.phone}\n` +
        `📦 Product: ${form.product}\n` +
        `📊 Monthly Volume: ${form.volume}\n` +
        `📝 Requirements: ${form.message || "None"}`,
    );
    window.open(`https://wa.me/94729991950?text=${msg}`, "_blank");
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        className="relative flex items-center justify-center text-center text-white px-5 py-16 rounded-b-[40px] shadow-lg animate-fadeInHero overflow-hidden"
        style={{
          background:
            'linear-gradient(rgba(40,167,69,0.85), rgba(40,167,69,0.85)), url("/hero.jpg") no-repeat center/cover',
        }}
      >
        <div className="absolute inset-0 bg-[rgba(40,167,69,0.25)] rounded-b-[40px]" />
        <div className="relative z-10 max-w-3xl">
          <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Bulk & Business Orders
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 drop-shadow-md">
            B2B Solutions
          </h1>
          <p className="text-lg md:text-xl leading-relaxed opacity-95">
            Volume pricing, custom branding, and dedicated support for hotels,
            hospitals, offices & more.
          </p>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16 px-5 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Who We Serve</h2>
        <p className="text-gray-500 mb-10">
          Trusted by businesses across Sri Lanka
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {sectors.map(({ icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 bg-white rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-4xl">{icon}</span>
              <span className="text-sm font-medium text-gray-700 text-center">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 px-5 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Volume Pricing
          </h2>
          <p className="text-gray-500 mb-10">
            The more you order, the more you save. All prices are per pack.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map(
              ({
                name,
                volume,
                price,
                unit,
                color,
                badge,
                highlight,
                features,
              }) => (
                <div
                  key={name}
                  className={`bg-white rounded-2xl border-2 ${color} p-6 flex flex-col ${highlight ? "shadow-xl scale-105" : "shadow-md"}`}
                >
                  {highlight && (
                    <span className="text-xs font-bold bg-[#28a745] text-white px-3 py-1 rounded-full self-center mb-4">
                      ★ Most Popular
                    </span>
                  )}
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full self-start mb-3 ${badge}`}
                  >
                    {name}
                  </span>
                  <p className="text-gray-500 text-sm mb-3">{volume}</p>
                  <p className="text-3xl font-bold text-gray-800 mb-1">
                    {price}
                    <span className="text-sm font-normal text-gray-500">
                      {unit}
                    </span>
                  </p>
                  <ul className="mt-4 space-y-2 flex-1">
                    {features.map((f) => (
                      <li
                        key={f}
                        className="text-sm text-gray-600 flex items-start gap-2"
                      >
                        <span className="text-[#28a745] font-bold mt-0.5">
                          ✔
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() =>
                      document
                        .getElementById("b2b-form")
                        .scrollIntoView({ behavior: "smooth" })
                    }
                    className={`mt-6 w-full py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                      highlight
                        ? "bg-[#28a745] text-white hover:bg-[#218838]"
                        : "border-2 border-gray-200 text-gray-700 hover:border-[#28a745] hover:text-[#28a745]"
                    }`}
                  >
                    Get a Quote
                  </button>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-5 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(({ num, title, desc }) => (
            <div key={num} className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-[#28a745] text-white font-bold text-xl flex items-center justify-center mb-4 shadow-md">
                {num}
              </div>
              <h3 className="font-semibold text-gray-800 text-lg mb-2">
                {title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QR Code Reorder */}
      <section className="py-10 px-5 bg-gray-50">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            📱 Quick Reorder Anytime
          </h3>
          <p className="text-gray-500 text-sm mb-5">
            Print this QR code on your invoices or packaging inserts so clients
            can reorder instantly.
          </p>
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://aakashwije.github.io/INTIMATE_HYGIENE/&color=28a745&bgcolor=ffffff"
            alt="Reorder QR Code"
            className="mx-auto rounded-xl shadow-md border border-gray-200"
          />
          <p className="text-xs text-gray-400 mt-3">
            Links to our website for fast reordering
          </p>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="b2b-form" className="py-16 px-5 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Request a Quote
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Fill in your details and we'll respond via WhatsApp within 2 hours.
        </p>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md p-8 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="company"
              placeholder="Company / Organisation Name"
              value={form.company}
              onChange={onChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-[#28a745] transition-colors"
            />
            <input
              name="name"
              placeholder="Your Full Name"
              value={form.name}
              onChange={onChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-[#28a745] transition-colors"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={onChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-[#28a745] transition-colors"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone / WhatsApp Number"
              value={form.phone}
              onChange={onChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-[#28a745] transition-colors"
            />
          </div>
          <select
            name="product"
            value={form.product}
            onChange={onChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-[#28a745] transition-colors"
          >
            <option value="">Select Product of Interest</option>
            <option>Single Use Pack</option>
            <option>Travel Pack (Waterproof)</option>
            <option>Enterprise Pack (Flushable)</option>
            <option>Mixed / All Products</option>
          </select>
          <select
            name="volume"
            value={form.volume}
            onChange={onChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:border-[#28a745] transition-colors"
          >
            <option value="">Estimated Monthly Volume</option>
            <option>100 – 499 packs</option>
            <option>500 – 999 packs</option>
            <option>1,000 – 4,999 packs</option>
            <option>5,000+ packs</option>
          </select>
          <textarea
            name="message"
            rows={4}
            placeholder="Additional requirements (branding, delivery schedule, etc.)"
            value={form.message}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-[#28a745] transition-colors resize-none"
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 rounded-xl hover:bg-[#1ea952] transition-colors text-lg"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-current"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Send Enquiry via WhatsApp
          </button>
        </form>
      </section>

      <Footer />
      <ScrollToTop />
    </>
  );
}
