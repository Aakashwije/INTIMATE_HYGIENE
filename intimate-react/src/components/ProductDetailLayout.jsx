import { useEffect, useState } from "react";
import {
  CircleCheck,
  PackageOpen,
  Recycle,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import DeliveryProgressBar from "../components/DeliveryProgressBar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import { useCart } from "../context/CartContext";
import { useLang } from "../context/LangContext";
import {
  addOnProductIds,
  bundleProductIds,
  findCatalogProduct,
  formatLkr,
} from "../data/catalog";
import {
  fetchProductBySlug,
  subscribeToProducts,
  trackSiteEvent,
} from "../lib/database";

const certs = [
  { icon: "🌿", label: "Eco-Friendly" },
  { icon: "🦠", label: "Anti-Bacterial" },
  { icon: "♻️", label: "Biodegradable" },
  { icon: "✅", label: "Quality Assured" },
  { icon: "🏥", label: "Hospital Grade" },
];

const useSteps = [
  {
    icon: PackageOpen,
    title: "Open Pack",
    desc: "Tear open one hygienically sealed pack before use.",
  },
  {
    icon: ShieldCheck,
    title: "Cover Seat",
    desc: "Place the cover flat on the toilet seat with the marked side facing up.",
  },
  {
    icon: CircleCheck,
    title: "Use Once",
    desc: "Use as a clean single-use barrier in public or shared washrooms.",
  },
  {
    icon: Recycle,
    title: "Dispose",
    desc: "Dispose responsibly after use. Flush only where the pack says flushable.",
  },
];

/**
 * Reusable product detail page layout.
 * Accepts title, subtitle, image, sections, highlight, price, and reviews props.
 */
export default function ProductDetailLayout({
  slug,
  title,
  subtitle,
  image,
  imageAlt,
  sections,
  highlight,
  price,
  priceNote,
  reviews = [],
  galleryImages = [],
}) {
  const { t } = useLang();
  const { items, add, setOpen } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(null);
  const [catalogProduct, setCatalogProduct] = useState(null);
  const fixedProduct = findCatalogProduct(slug);
  const hasBundleInCart = items.some((item) => bundleProductIds.has(item.id));
  const isLockedAddOn = addOnProductIds.has(slug) && !hasBundleInCart;

  useEffect(() => {
    const loadProduct = () => {
      if (!slug) return;
      fetchProductBySlug(slug)
        .then((row) => setCatalogProduct(row))
        .catch(() => setCatalogProduct(null));
    };

    loadProduct();
    if (!slug) return undefined;
    const channel = subscribeToProducts((payload) => {
      if (payload.new?.slug === slug || payload.old?.slug === slug) {
        loadProduct();
      }
    });
    return () => {
      channel.unsubscribe();
    };
  }, [slug]);

  const displayTitle = catalogProduct?.name || fixedProduct?.name || title;
  const displaySubtitle =
    catalogProduct?.description || fixedProduct?.description || subtitle;
  const displayImage = catalogProduct?.image_url || fixedProduct?.image || image;
  const displayPrice = catalogProduct?.price != null
    ? formatLkr(catalogProduct.price)
    : fixedProduct
      ? formatLkr(fixedProduct.price)
      : price;
  const displayPriceNote =
    catalogProduct?.price_note || fixedProduct?.priceNote || priceNote;
  const unitPrice = Number(
    catalogProduct?.price ?? fixedProduct?.price ?? 0,
  );
  const minQty = catalogProduct?.min_order || 1;
  const effectiveQty = Math.max(minQty, qty);
  const productImages = [
    { src: displayImage, label: "Pack", alt: imageAlt || displayTitle },
    ...(fixedProduct?.galleryImages || galleryImages),
  ].filter(
    (imageItem, index, images) =>
      imageItem?.src &&
      images.findIndex((item) => item?.src === imageItem.src) === index,
  );
  const selectedImage =
    productImages.find((imageItem) => imageItem.src === activeImage) ||
    productImages[0];

  const handleOrder = () => {
    if (isLockedAddOn) return;
    const added = add({
      id: fixedProduct?.slug || slug,
      name: displayTitle,
      price: unitPrice,
      img: displayImage,
      qty: effectiveQty,
    });
    if (!added) return;
    setOpen(true);
    trackSiteEvent({
      event_type: "cart_add",
      label: displayTitle,
      metadata: { source: "product_detail", quantity: effectiveQty },
    });
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
            {displayTitle}
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed opacity-95"
            dangerouslySetInnerHTML={{ __html: displaySubtitle }}
          />
        </div>
      </section>

      {/* Product Details */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 max-w-6xl mx-auto my-12 sm:my-20 px-4 sm:px-5 items-start">
        <div className="space-y-3">
          <div className="overflow-hidden rounded-xl bg-white shadow-lg">
            <img
              src={selectedImage?.src || displayImage}
              alt={selectedImage?.alt || imageAlt || displayTitle}
              className="w-full aspect-[4/5] max-h-[640px] object-contain bg-gray-50 p-3 sm:p-5"
            />
          </div>
          {productImages.length > 1 && (
            <div className="grid grid-cols-2 gap-3">
              {productImages.map(({ src, label, alt }) => {
                const isActive = (selectedImage?.src || displayImage) === src;
                return (
                  <button
                    key={src}
                    type="button"
                    aria-label={`Show ${label}`}
                    aria-pressed={isActive}
                    onClick={() => setActiveImage(src)}
                    className={`group overflow-hidden rounded-xl border bg-white text-left shadow-sm transition-all ${
                      isActive
                        ? "border-[#28a745] ring-2 ring-green-100"
                        : "border-gray-100 hover:border-green-200 hover:shadow-md"
                    }`}
                  >
                    <img
                      src={src}
                      alt={alt || label}
                      loading="lazy"
                      className="h-24 w-full object-cover bg-gray-50 transition-transform duration-300 group-hover:scale-105 sm:h-28"
                    />
                    <span className="block px-3 py-2 text-xs font-semibold text-gray-600">
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div className="bg-white p-5 sm:p-8 rounded-xl shadow-md">
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
          {isLockedAddOn && (
            <p className="mt-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-700">
              Add a bundle package to your cart first to unlock this add-on.
            </p>
          )}

          {/* Pricing */}
          {displayPrice && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-xl py-4 px-5">
              <p className="text-3xl font-bold text-[#28a745]">
                {displayPrice}
              </p>
              {displayPriceNote && (
                <p className="text-xs text-gray-500 mt-0.5">
                  {displayPriceNote}
                </p>
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
                  onClick={() => setQty((q) => Math.max(minQty, q - 1))}
                  className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors font-bold"
                >
                  −
                </button>
                <span className="px-4 py-1 font-semibold text-gray-800 min-w-[3rem] text-center">
                  {effectiveQty}
                </span>
                <button
                  onClick={() => setQty((q) => Math.max(minQty, q) + 1)}
                  className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors font-bold"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handleOrder}
              disabled={isLockedAddOn}
              className={`w-full flex items-center justify-center gap-2 py-3 font-bold rounded-xl transition-colors text-sm ${
                isLockedAddOn
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-[#25D366] text-white hover:bg-[#1ea952]"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {isLockedAddOn
                ? "Add bundle first"
                : `${t.addToCart || "Add to Cart"} (${effectiveQty})`}
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

          {/* Delivery policy */}
          {displayPrice && (
            <div className="mt-5">
              <DeliveryProgressBar orderTotal={unitPrice * effectiveQty} />
            </div>
          )}
        </div>
      </section>

      {/* How To Use */}
      <section className="max-w-6xl mx-auto px-5 mb-14">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          {t.howToUse}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          {useSteps.map(({ icon: Icon, title, desc }, index) => (
            <div
              key={title}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full border-2 border-[#28a745] bg-green-50 text-[#28a745] flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-[11px] font-bold tracking-[0.18em] text-[#28a745]">
                STEP {index + 1}
              </div>
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
