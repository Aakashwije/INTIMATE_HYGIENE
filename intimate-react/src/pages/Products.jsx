import { Building2, Check, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DeliveryProgressBar from "../components/DeliveryProgressBar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Reveal from "../components/Reveal";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
import TrustBadges from "../components/TrustBadges";
import { useCart } from "../context/CartContext";
import { useLang } from "../context/LangContext";

const productDefs = [
  {
    id: "single",
    img: "/normalnew.png",
    titleKey: "singleUse",
    descKey: "singleUseDesc",
    badge: "singleUseLabel",
    urgencyKey: "lowStock",
    price: 150,
    priceLabel: "LKR 150",
    priceNote: "per pack · min 10 packs",
    whatsappMsg:
      "Hello! I want to order the Single Use Pack. Please share pricing and availability.",
    link: "/products/1",
  },
  {
    id: "travel",
    img: "/travelnew.png",
    titleKey: "travelPack",
    descKey: "travelPackDesc",
    badge: "budgetFriendly",
    urgencyKey: "sellingFast",
    price: 300,
    priceLabel: "LKR 300",
    priceNote: "per 10-pack · min 5 packs",
    whatsappMsg:
      "Hello! I want to order the Travel Pack (Waterproof). Please share pricing and availability.",
    link: "/products/2",
  },
  {
    id: "enterprise",
    img: "/interprisenew.png",
    titleKey: "enterprise",
    descKey: "enterpriseDesc",
    badge: "bestSeller",
    urgencyKey: null,
    price: 120,
    priceLabel: "LKR 120",
    priceNote: "per pack · bulk rate · min 100 packs",
    whatsappMsg:
      "Hello! I want to enquire about the Enterprise Pack bulk pricing. Please share details.",
    link: "/products/3",
  },
];

export default function Products() {
  const { t } = useLang();
  const { add, items } = useCart();
  const [justAdded, setJustAdded] = useState(null);

  const handleAdd = (p) => {
    add({ id: p.id, name: t[p.titleKey], price: p.price, img: p.img });
    setJustAdded(p.id);
    setTimeout(() => setJustAdded(null), 1800);
  };

  const cartTotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <>
      <SEO
        title="Shop All Products"
        description="Browse our full range of eco-friendly disposable toilet seat covers. Single Use (LKR 250), Travel Pack (LKR 350), Enterprise Pack (LKR 750). Free delivery available."
        path="/products"
      />
      <Navbar />

      {/* Hero */}
      <section
        className="relative flex items-center justify-center text-center text-white px-5 py-16 rounded-b-[40px] shadow-lg animate-fadeInHero overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, rgba(13,63,26,0.9), rgba(40,167,69,0.85)), url("/hero.jpg") no-repeat center/cover',
        }}
      >
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#5cd65c]/30 blur-3xl animate-blob" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-yellow-200/15 blur-3xl animate-blob-slow" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-xs font-semibold">
            <span className="flex gap-0.5 text-yellow-300">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </span>
            4.9/5 · 124+ reviews
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 drop-shadow-md">
            {t.ourProducts}
          </h1>
          <p className="text-lg md:text-xl leading-relaxed opacity-95">
            {t.ourProductsSub}
          </p>
        </div>
      </section>

      <TrustBadges />

      {/* Quiz CTA Banner */}
      <div className="max-w-6xl mx-auto px-5 pt-10">
        <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-gray-800 text-base">
              🤔 Not sure which pack to choose?
            </p>
            <p className="text-sm text-gray-500 mt-0.5">
              Take our 4-question quiz and get a personalised recommendation.
            </p>
          </div>
          <Link
            to="/quiz"
            className="shrink-0 px-6 py-2.5 bg-[#28a745] text-white font-bold rounded-xl hover:bg-[#1e8c38] transition-colors text-sm"
          >
            Find My Product →
          </Link>
        </div>
      </div>

      {/* Product Grid */}
      <main className="max-w-6xl mx-auto py-16 px-5 text-center">
        <Reveal>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Pick your perfect pack
          </h2>
          <p className="text-gray-500 text-lg mb-6">
            Loved by 10,000+ Sri Lankans · Free delivery over LKR 3,000
          </p>
        </Reveal>

        <div className="max-w-lg mx-auto mb-10">
          <DeliveryProgressBar orderTotal={cartTotal} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {productDefs.map((p, i) => (
            <Reveal key={p.titleKey} delay={i * 120}>
              <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group h-full flex flex-col border border-gray-100">
                <div className="relative overflow-hidden">
                  <img
                    src={p.img}
                    alt={t[p.titleKey]}
                    loading="lazy"
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,179,66,0.15),transparent_70%)] group-hover:opacity-80 opacity-0 transition-opacity duration-500" />
                  <span className="absolute top-3 right-3 bg-gradient-to-br from-[#7CB342] to-[#28a745] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md animate-floatBadge">
                    {t[p.badge]}
                  </span>
                  {p.urgencyKey && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md animate-pulse">
                      {t[p.urgencyKey]}
                    </div>
                  )}
                </div>

                <div className="flex flex-col flex-1 p-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-[#28a745] transition-colors">
                    {t[p.titleKey]}
                  </h2>
                  <p className="text-gray-500 mb-4 flex-1 text-sm leading-relaxed">
                    {t[p.descKey]}
                  </p>

                  <div className="flex justify-center gap-0.5 text-yellow-400 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current" />
                    ))}
                    <span className="text-gray-400 text-xs ml-1 self-center">
                      (4.9)
                    </span>
                  </div>

                  <div className="mb-5 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl py-3 px-4">
                    <p className="text-3xl font-bold text-[#28a745]">
                      {p.priceLabel}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {p.priceNote}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleAdd(p)}
                      className={`btn-shimmer flex items-center justify-center gap-2 w-full py-3 font-bold rounded-xl transition-all duration-300 text-sm shadow-md ${
                        justAdded === p.id
                          ? "bg-gray-800 text-white"
                          : "bg-gradient-to-br from-[#28a745] to-[#1d7a34] text-white hover:-translate-y-0.5 hover:shadow-lg"
                      }`}
                    >
                      {justAdded === p.id ? (
                        <>
                          <Check className="w-4 h-4" />{" "}
                          {t.addedToCart || "Added"}
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />{" "}
                          {t.addToCart || "Add to Cart"}
                        </>
                      )}
                    </button>
                    <a
                      href={`https://wa.me/94707018171?text=${encodeURIComponent(p.whatsappMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#1ea952] transition-colors text-sm"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 fill-current shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      {t.orderOnWhatsApp}
                    </a>
                    <Link
                      to={p.link}
                      className="w-full py-2.5 border-2 border-[#7CB342] text-[#7CB342] font-semibold rounded-xl hover:bg-[#7CB342] hover:text-white transition-all duration-300 text-sm"
                    >
                      {t.viewDetails}
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-gray-500">
            <Link
              to="/compare"
              className="text-[#28a745] font-bold hover:underline"
            >
              {t.compareProducts}
            </Link>
          </div>
        </Reveal>

        {/* B2B Banner */}
        <Reveal variant="zoom">
          <div className="mt-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#28a745]/20 blur-3xl" />
            <div className="relative z-10 flex items-center gap-4">
              <Building2 className="w-10 h-10 text-[#5cd65c] shrink-0" />
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">
                  {t.b2bBanner}
                </h3>
                <p className="text-gray-400 text-sm">{t.b2bBannerSub}</p>
              </div>
            </div>
            <Link
              to="/b2b"
              className="btn-shimmer relative z-10 shrink-0 px-6 py-3 bg-[#28a745] text-white font-bold rounded-xl hover:bg-[#218838] hover:-translate-y-0.5 transition-all whitespace-nowrap shadow-lg"
            >
              {t.enquireB2B} →
            </Link>
          </div>
        </Reveal>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
