import {
    Backpack,
    Building2,
    CheckCircle,
    GraduationCap,
    HeartPulse,
    Hotel,
    Landmark,
    Leaf,
    MapPin,
    MessageCircle,
    Plane,
    Recycle,
    Shield,
    ShoppingCart,
    Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import BeforeAfterSlider from "../components/BeforeAfterSlider";
import CountUp from "../components/CountUp";
import FAQAccordion from "../components/FAQAccordion";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsletterSignup from "../components/NewsletterSignup";
import Reveal from "../components/Reveal";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
import TrustBadges from "../components/TrustBadges";
import { useLang } from "../context/LangContext";

const usedBy = [
  { icon: Hotel, labelKey: "usedByHotels", count: "50+" },
  { icon: HeartPulse, labelKey: "usedByHospitals", count: "30+" },
  { icon: Building2, labelKey: "usedByOffices", count: "80+" },
  { icon: Plane, labelKey: "usedByAirlines", count: "5+" },
  { icon: GraduationCap, labelKey: "usedByUniversities", count: "15+" },
  { icon: Landmark, labelKey: "usedByGovt", count: "20+" },
];

const testimonials = [
  {
    quote:
      "These covers gave our hotel guests real peace of mind. The eco-friendly aspect aligns perfectly with our sustainability goals.",
    author: "Ruwan Jayasinghe",
    role: "Operations Manager",
    company: "Cinnamon Hotels",
    location: "Colombo",
    rating: 5,
    avatar: "RJ",
  },
  {
    quote:
      "Finally a hygienic solution that's also eco-friendly. Our HSBC team now has access to seat covers in every office restroom.",
    author: "Dilshan Perera",
    role: "Facilities Manager",
    company: "HSBC Sri Lanka",
    location: "Colombo 3",
    rating: 5,
    avatar: "DP",
  },
  {
    quote:
      "Affordable, convenient, and safe. I carry them everywhere now. As a travel blogger this is a non-negotiable essential!",
    author: "Priya De Costa",
    role: "Travel Blogger",
    company: "Personal",
    location: "Galle",
    rating: 5,
    avatar: "PC",
  },
];

const certKeys = [
  "certEco",
  "certBacterial",
  "certBio",
  "certQuality",
  "certHospital",
];
const certIcons = [Leaf, Shield, Recycle, CheckCircle, HeartPulse];

const pressLogos = [
  "Cinnamon",
  "HSBC",
  "SriLankan Airlines",
  "Hilton",
  "MAS Holdings",
  "Dialog",
];

export default function Home() {
  const { t } = useLang();

  const stats = [
    { value: 295, suffix: "", label: t.statsLabel1 },
    { value: 48, suffix: "hrs", label: t.statsLabel2 },
    { value: 99, suffix: "%", label: t.statsLabel3 },
    { value: 124, suffix: "+", label: t.statsLabel4 },
  ];

  const features = [
    { icon: Shield, title: t.maxHygiene, desc: t.maxHygieneDesc },
    { icon: Leaf, title: t.ecoFriendly, desc: t.ecoFriendlyDesc },
    {
      icon: Backpack,
      title: t.convenientPortable,
      desc: t.convenientPortableDesc,
    },
  ];

  const products = [
    {
      img: "/normalnew.png",
      title: t.standardPack,
      desc: t.standardPackDesc,
      link: "/products/1",
      price: "LKR 250",
    },
    {
      img: "/travelnew.png",
      title: t.travelKit,
      desc: t.travelKitDesc,
      link: "/products/2",
      price: "LKR 350",
    },
    {
      img: "/interprisenew.png",
      title: t.enterprisePack,
      desc: t.enterprisePackDesc,
      link: "/products/3",
      price: "LKR 750",
    },
  ];

  return (
    <>
      <SEO
        title="Eco-Friendly Disposable Toilet Seat Covers Sri Lanka"
        description="Buy premium disposable toilet seat covers online in Sri Lanka. Eco-friendly, hygienic, biodegradable. Single Use, Travel & Enterprise packs available."
        path="/home"
      />
      <Navbar />

      {/* PREMIUM HERO */}
      <section className="relative overflow-hidden text-white animate-fadeInHero">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(13,63,26,0.92) 0%, rgba(40,167,69,0.85) 50%, rgba(29,122,52,0.92) 100%), url("/hero.jpg") center/cover',
          }}
        />
        <div className="absolute -top-32 -left-24 w-96 h-96 rounded-full bg-[#5cd65c]/30 blur-3xl animate-blob" />
        <div className="absolute -bottom-40 -right-20 w-[28rem] h-[28rem] rounded-full bg-emerald-300/20 blur-3xl animate-blob-slow" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-yellow-200/15 blur-3xl animate-blob" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-5 py-16 sm:py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 mb-5 sm:mb-6 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-[11px] sm:text-sm font-semibold animate-slideInUp">
            <span className="flex gap-0.5 text-yellow-300">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current"
                />
              ))}
            </span>
            <span>{t.heroBadge || "Sri Lanka's #1 Hygiene Brand"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-5 drop-shadow-lg leading-tight animate-slideInUp">
            {t.heroTitle}
          </h1>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed opacity-95 max-w-2xl mx-auto animate-slideInUp">
            {t.heroSubtitle}
          </p>

          <div className="mt-6 sm:mt-8 flex gap-2.5 sm:gap-3 justify-center flex-wrap animate-slideInUp">
            <Link
              to="/products"
              className="btn-shimmer flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-[#28a745] font-bold rounded-full hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 shadow-lg text-sm sm:text-base"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" /> {t.shopNow}
            </Link>
            <Link
              to="/about"
              className="px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[#28a745] transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
            >
              {t.learnMore}
            </Link>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto">
            {[
              { v: t.heroStat1, l: t.heroStat1Label },
              { v: t.heroStat2, l: t.heroStat2Label },
              { v: t.heroStat3, l: t.heroStat3Label },
            ].map(({ v, l }, i) => (
              <div
                key={i}
                className="glass-dark rounded-xl sm:rounded-2xl py-3 sm:py-4 px-1.5 sm:px-2 hover:-translate-y-1 transition-transform duration-300"
              >
                <p className="text-lg sm:text-xl md:text-3xl font-bold text-yellow-200">
                  {v}
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm text-white/80 mt-1 leading-tight">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>

        <svg
          className="block w-full -mb-px"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ height: 60 }}
        >
          <path
            d="M0,32 C360,80 1080,0 1440,48 L1440,80 L0,80 Z"
            fill="white"
          />
        </svg>
      </section>

      <TrustBadges />

      {/* HYGIENE STATS */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(40,167,69,0.15),_transparent_60%)]" />
        <div className="relative max-w-6xl mx-auto">
          <Reveal>
            <p className="text-center text-xs font-semibold text-[#5cd65c] uppercase tracking-widest mb-2">
              The Reality
            </p>
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-12">
              Why hygiene matters more than ever
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map(({ value, suffix, label }, i) => (
              <Reveal key={label} delay={i * 100}>
                <div className="group">
                  <p className="text-4xl md:text-5xl font-bold text-[#5cd65c] mb-2 group-hover:scale-110 transition-transform duration-300">
                    <CountUp end={value} suffix={suffix} />
                  </p>
                  <p className="text-gray-400 text-sm">{label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-20 px-5 max-w-6xl mx-auto text-center">
        <Reveal>
          <span className="inline-block text-xs font-bold text-[#28a745] uppercase tracking-widest mb-3 px-3 py-1 bg-green-50 rounded-full">
            {t.whyUsBadge || "Why customers choose us"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            {t.whyChoose}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-12">
            Built for the way you actually live — at home, on the road, and
            everywhere in between.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 120}>
              <div className="relative bg-white p-8 rounded-2xl shadow-md hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group overflow-hidden border border-gray-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-[#28a745]" />
                  </div>
                  <h3 className="text-[#28a745] font-bold text-xl mb-3">
                    {title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="py-20 px-5 bg-gradient-to-br from-gray-50 to-white">
        <Reveal>
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-bold text-[#28a745] uppercase tracking-widest mb-3 px-3 py-1 bg-green-50 rounded-full">
              {t.seeItInAction || "See It In Action"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              {t.hygieneDifference}
            </h2>
            <p className="text-gray-500 text-sm">
              {t.dragSliderTip || "Drag the slider to see the difference"} ↔
            </p>
          </div>
        </Reveal>
        <Reveal variant="zoom">
          <BeforeAfterSlider />
        </Reveal>
      </section>

      {/* TRUSTED BY MARQUEE */}
      <section className="py-12 px-5 bg-white border-y border-gray-100 overflow-hidden">
        <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
          {t.asFeaturedIn || "As featured in"}
        </p>
        <div className="relative">
          <div className="flex animate-marquee whitespace-nowrap gap-12">
            {[...pressLogos, ...pressLogos].map((name, i) => (
              <span
                key={i}
                className="text-2xl md:text-3xl font-bold text-gray-300 hover:text-[#28a745] transition-colors shrink-0"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TRUSTED-BY GRID */}
      <section className="py-14 px-5 bg-gradient-to-br from-green-50/40 to-white text-center">
        <Reveal>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            {t.trustedBy}
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
            200+ organizations trust Hygenc
          </h3>
        </Reveal>
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {usedBy.map(({ icon: Icon, labelKey, count }, i) => (
            <Reveal key={labelKey} delay={i * 60}>
              <div className="flex flex-col items-center gap-2 bg-white rounded-2xl px-3 sm:px-5 py-4 min-w-[105px] sm:min-w-[130px] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#28a745]" />
                </div>
                <span className="font-semibold text-gray-700 text-xs text-center">
                  {t[labelKey] || labelKey}
                </span>
                <span className="text-[#28a745] font-bold text-xs">
                  {count} {t.clients}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="py-20 px-5 bg-white text-center">
        <Reveal>
          <span className="inline-block text-xs font-bold text-[#28a745] uppercase tracking-widest mb-3 px-3 py-1 bg-green-50 rounded-full">
            Bestsellers
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            {t.ourBestsellers}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-12">
            Three packs, one mission — protect what matters wherever you go.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map(({ img, title, desc, link, price }, i) => (
            <Reveal key={title} delay={i * 120}>
              <div className="flex flex-col bg-white rounded-2xl shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group">
                <div className="relative overflow-hidden">
                  <img
                    src={img}
                    alt={title}
                    loading="lazy"
                    className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[#28a745] text-xs font-bold rounded-full shadow">
                    {price}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1 text-left">
                  <h3 className="text-gray-800 font-bold text-lg mb-2">
                    {title}
                  </h3>
                  <p className="text-gray-600 text-sm flex-1 mb-4">{desc}</p>
                  <Link
                    to={link}
                    className="btn-shimmer inline-block text-center px-7 py-3 font-semibold text-white rounded-xl bg-gradient-to-br from-[#28a745] to-[#1d7a34] hover:from-[#1d7a34] hover:to-[#28a745] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
                  >
                    {t.viewDetails} →
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <Link
            to="/products"
            className="inline-block mt-10 text-[#28a745] font-bold hover:underline"
          >
            {t.viewAllProducts || "View All Products →"}
          </Link>
        </Reveal>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-5 bg-gradient-to-br from-gray-50 to-white text-center">
        <Reveal>
          <span className="inline-block text-xs font-bold text-[#28a745] uppercase tracking-widest mb-3 px-3 py-1 bg-green-50 rounded-full">
            Loved by 10,000+ Sri Lankans
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            {t.whatCustomersSay}
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map(
            ({ quote, author, role, company, location, rating, avatar }, i) => (
              <Reveal key={author} delay={i * 120}>
                <div className="bg-white p-7 rounded-2xl shadow-lg text-left flex flex-col h-full hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 border border-gray-100 relative">
                  <div className="absolute -top-3 left-7 text-5xl text-[#28a745] opacity-20 leading-none">
                    "
                  </div>
                  <div className="flex gap-0.5 text-yellow-400 mb-3">
                    {[...Array(rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic flex-1 mb-5 leading-relaxed">
                    "{quote}"
                  </p>
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#28a745] to-[#5cd65c] flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {author}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {role} · {company}
                      </p>
                      <p className="text-gray-400 text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {location}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ),
          )}
        </div>
      </section>

      {/* FAQ TEASER */}
      <section className="py-20 px-5 bg-white">
        <Reveal>
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-bold text-[#28a745] uppercase tracking-widest mb-3 px-3 py-1 bg-green-50 rounded-full">
              {t.faqTeaserTitle || "Quick Answers"}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              {t.faqHeroTitle}
            </h2>
            <p className="text-gray-500">
              {t.faqTeaserSub || "The questions our customers ask most"}
            </p>
          </div>
        </Reveal>
        <FAQAccordion />
        <Reveal>
          <div className="text-center mt-8">
            <Link
              to="/faq"
              className="text-[#28a745] font-bold hover:underline"
            >
              See all FAQs →
            </Link>
          </div>
        </Reveal>
      </section>

      {/* SOCIAL CTA */}
      <section className="py-16 px-5 bg-gradient-to-br from-gray-50 to-white text-center">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {t.followJourney}
          </h2>
          <p className="text-gray-500 mb-8">{t.followJourneySub}</p>
        </Reveal>
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mb-8">
          {[
            "/normalnew.png",
            "/travelnew.png",
            "/interprisenew.png",
            "/normalnew.png",
            "/travelnew.png",
            "/interprisenew.png",
          ].map((img, i) => (
            <Reveal key={i} delay={i * 50} variant="zoom">
              <div className="aspect-square overflow-hidden rounded-lg group cursor-pointer">
                <img
                  src={img}
                  loading="lazy"
                  alt="Product"
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                />
              </div>
            </Reveal>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://www.facebook.com/share/17B27TNYy5/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#1877F2] text-white font-semibold rounded-xl hover:opacity-90 hover:-translate-y-0.5 transition-all"
          >
            {t.followFacebook}
          </a>
          <Link
            to="/referral"
            className="btn-shimmer flex items-center gap-2 px-6 py-3 bg-[#28a745] text-white font-semibold rounded-xl hover:bg-[#218838] hover:-translate-y-0.5 transition-all"
          >
            {t.referEarn}
          </Link>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="py-12 px-5 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3">
          {certKeys.map((key, i) => {
            const Icon = certIcons[i];
            return (
              <Reveal key={key} delay={i * 80} variant="zoom">
                <span className="flex items-center gap-2 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 text-green-700 text-sm font-semibold px-4 py-2 rounded-full hover:scale-105 transition-transform">
                  <Icon className="w-4 h-4" /> {t[key]}
                </span>
              </Reveal>
            );
          })}
        </div>
      </section>

      <NewsletterSignup />

      {/* FINAL CTA */}
      <section className="bg-gradient-to-br from-[#28a745] via-[#1d7a34] to-[#0d3f1a] text-white text-center py-20 px-5 relative overflow-hidden animate-gradientShift">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-yellow-200/15 blur-3xl animate-blob" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#5cd65c]/30 blur-3xl animate-blob-slow" />
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-5 relative z-10">
            {t.readyProtect}
          </h2>
          <p className="text-lg mb-8 opacity-90 relative z-10 max-w-xl mx-auto">
            {t.readyProtectSub}
          </p>
          <div className="relative z-10 flex flex-wrap gap-3 justify-center">
            <Link
              to="/products"
              className="btn-shimmer inline-block px-8 py-3.5 font-bold bg-white text-[#28a745] rounded-full hover:bg-gray-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
            >
              {t.getStarted} →
            </Link>
            <a
              href="https://wa.me/94707018171?text=Hello%21%20I%27d%20like%20to%20learn%20more%20about%20Intimate%20Hygiene%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 font-bold border-2 border-white text-white rounded-full hover:bg-white hover:text-[#28a745] transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" /> Chat with Us
            </a>
          </div>
        </Reveal>
      </section>

      <Footer />
      <ScrollToTop />
    </>
  );
}
