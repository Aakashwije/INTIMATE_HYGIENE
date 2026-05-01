import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";

const zones = [
  {
    zone: "Zone 1 — Colombo District",
    areas:
      "Colombo city, Dehiwala, Moratuwa, Kotte, Maharagama, Nugegoda, Battaramulla",
    time: "Same day / Next day",
    fee: "LKR 150",
    free: "LKR 2,000+",
  },
  {
    zone: "Zone 2 — Western Province",
    areas:
      "Gampaha, Kalutara, Horana, Panadura, Negombo, Ja-Ela, Kelaniya, Ragama",
    time: "1–2 business days",
    fee: "LKR 250",
    free: "LKR 3,000+",
  },
  {
    zone: "Zone 3 — Central & Southern",
    areas: "Kandy, Galle, Matara, Kurunegala, Ratnapura, Badulla, Nuwara Eliya",
    time: "2–3 business days",
    fee: "LKR 350",
    free: "LKR 4,000+",
  },
  {
    zone: "Zone 4 — North & East",
    areas:
      "Jaffna, Vavuniya, Trincomalee, Batticaloa, Anuradhapura, Polonnaruwa",
    time: "3–5 business days",
    fee: "LKR 450",
    free: "LKR 5,000+",
  },
];

const paymentMethods = [
  {
    icon: "💵",
    title: "Cash on Delivery (COD)",
    desc: "Pay when your order arrives. Available island-wide. No extra charge.",
  },
  {
    icon: "🏦",
    title: "Bank Transfer",
    desc: "Commercial Bank · Account: 1234567890 · Branch: Colombo 7\nAfter transfer, send receipt on WhatsApp to confirm order.",
  },
  {
    icon: "📱",
    title: "Online Transfer (eZ Cash / mCash)",
    desc: "Transfer to 0729991950 via eZ Cash or mCash, then send screenshot on WhatsApp.",
  },
];

const faqs = [
  {
    q: "Can I track my order?",
    a: "Yes — we send a WhatsApp update when your order is dispatched with the courier tracking number.",
  },
  {
    q: "What if my order arrives damaged?",
    a: "Take a photo immediately and send it on WhatsApp within 24 hours. We'll replace or refund the damaged items.",
  },
  {
    q: "Do you deliver on weekends?",
    a: "We process orders Monday–Saturday. Sunday orders are dispatched Monday morning.",
  },
  {
    q: "What is the minimum order for delivery?",
    a: "There is no strict minimum, but delivery fee applies per order. Larger orders get free delivery.",
  },
];

export default function Delivery() {
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
            Delivery & Payment
          </h1>
          <p className="text-lg opacity-90">
            Fast island-wide delivery. Cash on delivery available everywhere.
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 py-14 space-y-14">
        {/* Delivery zones */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            🚚 Sri Lanka Delivery Zones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {zones.map(({ zone, areas, time, fee, free }) => (
              <div
                key={zone}
                className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-[#28a745]"
              >
                <h3 className="font-bold text-gray-800 mb-1">{zone}</h3>
                <p className="text-xs text-gray-500 mb-3">{areas}</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-semibold">
                    ⏱ {time}
                  </span>
                  <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full font-semibold">
                    📦 Fee: {fee}
                  </span>
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full font-semibold">
                    🎁 Free over {free}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500 text-center">
            * Delivery times are estimates and may vary during peak seasons or
            public holidays.
          </p>
        </section>

        {/* Payment methods */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            💳 Payment Methods
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {paymentMethods.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl shadow-md p-6">
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 whitespace-pre-line leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How to order */}
        <section className="bg-green-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            📋 How to Place an Order
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 text-center">
            {[
              {
                n: "1",
                icon: "🛒",
                step: "Choose Product",
                note: "Browse products and pick your pack",
              },
              {
                n: "2",
                icon: "💬",
                step: "Message Us",
                note: "Click 'Order on WhatsApp' button",
              },
              {
                n: "3",
                icon: "✅",
                step: "Confirm Order",
                note: "Agree on quantity, address & payment",
              },
              {
                n: "4",
                icon: "🚚",
                step: "Receive Delivery",
                note: "We dispatch within 24 hours",
              },
            ].map(({ n, icon, step, note }) => (
              <div key={n} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-[#28a745] text-white font-bold text-lg flex items-center justify-center">
                  {n}
                </div>
                <div className="text-2xl">{icon}</div>
                <p className="font-semibold text-gray-800">{step}</p>
                <p className="text-xs text-gray-500">{note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            ❓ Delivery FAQs
          </h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }) => (
              <div
                key={q}
                className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-green-300"
              >
                <p className="font-semibold text-gray-800 mb-1">{q}</p>
                <p className="text-sm text-gray-500">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <a
            href="https://wa.me/94729991950?text=Hello!%20I%20want%20to%20place%20an%20order.%20Please%20guide%20me."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold rounded-2xl text-lg hover:bg-[#1ea952] transition-colors shadow-lg"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 fill-current"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Order Now on WhatsApp
          </a>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
