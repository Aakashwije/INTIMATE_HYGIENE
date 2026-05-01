import { useState } from "react";
import DeliveryProgressBar from "../components/DeliveryProgressBar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import { useLang } from "../context/LangContext";

const certs = [
  { icon: "🌿", label: "Eco-Friendly" },
  { icon: "🦠", label: "Anti-Bacterial" },
  { icon: "♻️", label: "Biodegradable" },
  { icon: "✅", label: "Quality Assured" },
  { icon: "🏥", label: "Hospital Grade" },
];

/**
 * Reusable product detail page layout.
 * Accepts title, subtitle, image, sections, highlight, price, whatsappMsg, and reviews props.
 */
export default function ProductDetailLayout({
  title,
  subtitle,
  image,
  imageAlt,
  sections,
  highlight,
  price,
  priceNote,
  whatsappMsg,
  reviews = [],
}) {
  const { t } = useLang();
  const [qty, setQty] = useState(1);

  const handleOrder = () => {
    const msg = encodeURIComponent(
      `${whatsappMsg || `Hello! I want to order ${title}.`}\n\nQuantity: ${qty} pack(s)\n\nPlease share availability and delivery details.`,
    );
    window.open(`https://wa.me/94729991950?text=${msg}`, "_blank");
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        className="relative flex items-center justify-center text-center text-white px-5 py-24 rounded-b-[40px] shadow-lg animate-fadeInHero overflow-hidden"
        style={{
          background:
            'linear-gradient(rgba(40,167,69,0.85), rgba(40,167,69,0.85)), url("/hero.jpg") no-repeat center/cover',
        }}
      >
        <div className="absolute inset-0 bg-[rgba(40,167,69,0.25)] rounded-b-[40px]" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-5 drop-shadow-md">
            {title}
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed opacity-95"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />
        </div>
      </section>

      {/* Product Details */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto my-20 px-5 items-start">
        <img
          src={image}
          alt={imageAlt}
          className="w-full rounded-xl shadow-lg object-cover"
        />
        <div className="bg-white p-8 rounded-xl shadow-md">
          {sections
            .slice(0, 2)
            .map(({ heading, items, text, highlightItem }) => (
              <div key={heading} className="mb-6">
                <h2 className="text-[#28a745] font-semibold text-xl mb-3">
                  {heading}
                </h2>
                {items && (
                  <ul className="space-y-2">
                    {items.map((item, i) => (
                      <li
                        key={i}
                        className={`relative pl-7 ${
                          highlightItem === i
                            ? "text-red-600 font-bold"
                            : "text-gray-700"
                        }`}
                      >
                        <span className="absolute left-0 text-[#28a745] font-bold">
                          ✔
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {text && (
                  <p className="text-gray-600 leading-relaxed mt-2">{text}</p>
                )}
              </div>
            ))}
          {highlight && (
            <p className="text-red-600 font-bold mt-2">{highlight}</p>
          )}

          {/* Pricing */}
          {price && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl py-4 px-5">
              <p className="text-3xl font-bold text-[#28a745]">{price}</p>
              {priceNote && (
                <p className="text-xs text-gray-500 mt-0.5">{priceNote}</p>
              )}
            </div>
          )}

          {/* Qty + Order */}
          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-gray-700">
                {t.quantityLabel}
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors font-bold"
                >
                  −
                </button>
                <span className="px-4 py-1 font-semibold text-gray-800 min-w-[3rem] text-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors font-bold"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handleOrder}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1ea952] transition-colors text-sm"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-current"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t.orderOnWhatsApp} ({qty})
            </button>
          </div>

          {/* Certifications */}
          <div className="mt-5 flex flex-wrap gap-2">
            {certs.map(({ icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1 rounded-full"
              >
                {icon} {label}
              </span>
            ))}
          </div>

          {/* Delivery progress */}
          {price && (
            <div className="mt-5">
              <DeliveryProgressBar orderTotal={0} />
            </div>
          )}
        </div>
      </section>

      {/* How To Use */}
      <section className="max-w-6xl mx-auto px-5 mb-14">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          {t.howToUse}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { n: "1", emoji: "📦", title: t.step1Title, desc: t.step1Desc },
            { n: "2", emoji: "🪑", title: t.step2Title, desc: t.step2Desc },
            { n: "3", emoji: "✅", title: t.step3Title, desc: t.step3Desc },
          ].map(({ n, emoji, title, desc }) => (
            <div
              key={n}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-[#28a745] text-white font-bold text-lg flex items-center justify-center">
                {n}
              </div>
              <div className="text-4xl">{emoji}</div>
              <h3 className="font-bold text-gray-800">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Before / After hygiene stats */}
      <section className="max-w-6xl mx-auto px-5 mb-14">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          {t.hygieneDifference}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Without cover */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">😰</span>
              <h3 className="text-lg font-bold text-red-700">
                {t.withoutCover}
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-red-800">
              {(
                t.withoutItems || [
                  "Up to 295 bacteria types on toilet seat surface",
                  "E. coli, Staphylococcus & Streptococcus present",
                  "Pathogens survive up to 48 hours on surfaces",
                  "Direct skin-to-surface contact with contamination",
                  "Risk of UTIs and skin infections",
                ]
              ).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-0.5 flex-shrink-0">
                    ✗
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* With cover */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-7">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">😊</span>
              <h3 className="text-lg font-bold text-[#28a745]">
                {t.withCover}
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-green-900">
              {(
                t.withItems || [
                  "99% bacterial protection with anti-bacterial layer",
                  "Complete physical barrier between you and the seat",
                  "Eco-friendly, biodegradable material — zero guilt",
                  "Fits any standard toilet seat securely",
                  "Compact enough to carry everywhere you go",
                ]
              ).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#28a745] font-bold mt-0.5 flex-shrink-0">
                    ✔
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Remaining sections */}
      <div className="max-w-6xl mx-auto px-5 pb-16 space-y-8">
        {sections.slice(2).map(({ heading, items, text }) => (
          <div key={heading} className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{heading}</h2>
            {items && (
              <ul className="space-y-2">
                {items.map((item, i) => (
                  <li key={i} className="relative pl-7 text-gray-700">
                    <span className="absolute left-0 text-[#28a745] font-bold">
                      ✔
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {text && (
              <p className="text-gray-600 leading-relaxed mt-2">{text}</p>
            )}
          </div>
        ))}
      </div>

      {/* Customer Reviews */}
      {reviews.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 pb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {t.customerReviews}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map(({ author, location, rating, comment, avatar }) => (
              <div
                key={author}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col"
              >
                <div className="flex gap-0.5 text-yellow-400 text-sm mb-3">
                  {[...Array(rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm italic flex-1 mb-4">
                  "{comment}"
                </p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-9 h-9 rounded-full bg-[#28a745] flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    {avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {author}
                    </p>
                    <p className="text-gray-400 text-xs">📍 {location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer />
      <ScrollToTop />
    </>
  );
}
