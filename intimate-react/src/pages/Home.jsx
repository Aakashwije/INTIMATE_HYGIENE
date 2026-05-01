import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import { useLang } from "../context/LangContext";

const statsValues = ["295", "48hrs", "99%", "124+"];

const usedBy = [
  { icon: "🏨", labelKey: "usedByHotels", count: "50+" },
  { icon: "🏥", labelKey: "usedByHospitals", count: "30+" },
  { icon: "🏢", labelKey: "usedByOffices", count: "80+" },
  { icon: "✈️", labelKey: "usedByAirlines", count: "5+" },
  { icon: "🎓", labelKey: "usedByUniversities", count: "15+" },
  { icon: "🏛️", labelKey: "usedByGovt", count: "20+" },
];

const testimonials = [
  {
    quote: "These covers gave our hotel guests real peace of mind. The eco-friendly aspect aligns perfectly with our sustainability goals.",
    author: "Ruwan Jayasinghe",
    role: "Operations Manager",
    company: "Cinnamon Hotels",
    location: "Colombo",
    rating: 5,
    avatar: "RJ",
  },
  {
    quote: "Finally a hygienic solution that's also eco-friendly. Our HSBC team now has access to seat covers in every office restroom.",
    author: "Dilshan Perera",
    role: "Facilities Manager",
    company: "HSBC Sri Lanka",
    location: "Colombo 3",
    rating: 5,
    avatar: "DP",
  },
  {
    quote: "Affordable, convenient, and safe. I carry them everywhere now. As a travel blogger this is a non-negotiable essential!",
    author: "Priya De Costa",
    role: "Travel Blogger",
    company: "Personal",
    location: "Galle",
    rating: 5,
    avatar: "PC",
  },
];

const certKeys = ["certEco", "certBacterial", "certBio", "certQuality", "certHospital"];
const certIcons = ["🌿", "🦠", "♻️", "✅", "🏥"];

export default function Home() {
  const { t } = useLang();

  const stats = [
    { value: "295", label: t.statsLabel1 },
    { value: "48hrs", label: t.statsLabel2 },
    { value: "99%", label: t.statsLabel3 },
    { value: "124+", label: t.statsLabel4 },
  ];

  const features = [
    { title: t.maxHygiene, desc: t.maxHygieneDesc },
    { title: t.ecoFriendly, desc: t.ecoFriendlyDesc },
    { title: t.convenientPortable, desc: t.convenientPortableDesc },
  ];

  const products = [
    { img: "/normal.png", title: t.standardPack, desc: t.standardPackDesc, link: "/products/1" },
    { img: "/travel.png", title: t.travelKit, desc: t.travelKitDesc, link: "/products/2" },
    { img: "/interprise.png", title: t.enterprisePack, desc: t.enterprisePackDesc, link: "/products/3" },
  ];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        className="relative flex items-center justify-center text-center text-white px-5 py-16 rounded-b-[40px] shadow-lg animate-fadeInHero overflow-hidden"
        style={{ background: 'linear-gradient(rgba(40,167,69,0.85), rgba(40,167,69,0.85)), url("/hero.jpg") no-repeat center/cover' }}
      >
        <div className="absolute inset-0 bg-[rgba(40,167,69,0.25)] rounded-b-[40px]" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-5 drop-shadow-md italic">{t.heroTitle}</h1>
          <p className="text-lg md:text-xl leading-relaxed opacity-95">{t.heroSubtitle}</p>
          <div className="mt-6 flex gap-3 justify-center flex-wrap">
            <Link to="/products" className="px-7 py-3 bg-white text-[#28a745] font-bold rounded-full hover:bg-green-50 transition-colors shadow-md">{t.shopNow}</Link>
            <Link to="/about" className="px-7 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[#28a745] transition-colors">{t.learnMore}</Link>
          </div>
        </div>
      </section>

      {/* Hygiene Stats Strip */}
      <section className="bg-gray-900 text-white py-12 px-5">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(({ value, label }) => (
            <div key={value}>
              <p className="text-4xl font-bold text-[#5cd65c] mb-2">{value}</p>
              <p className="text-gray-400 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-20 px-5 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">{t.whyChoose}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(({ title, desc }) => (
            <div key={title} className="bg-white p-8 rounded-xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <h3 className="text-[#28a745] font-semibold text-lg mb-4">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-14 px-5 bg-white border-y border-gray-100 text-center">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">{t.trustedBy}</p>
        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {usedBy.map(({ icon, labelKey, count }) => (
            <div key={labelKey} className="flex flex-col items-center gap-1 bg-gray-50 rounded-xl px-5 py-4 min-w-[120px] hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <span className="text-3xl">{icon}</span>
              <span className="font-semibold text-gray-700 text-xs text-center">{t[labelKey] || labelKey}</span>
              <span className="text-[#28a745] font-bold text-xs">{count} {t.clients}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Products Highlight */}
      <section className="py-20 px-5 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">{t.ourBestsellers}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map(({ img, title, desc, link }) => (
            <div key={title} className="flex flex-col bg-white rounded-xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <img src={img} alt={title} className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300" />
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-[#28a745] font-semibold text-lg mb-3">{title}</h3>
                <p className="text-gray-600 flex-1 mb-4">{desc}</p>
                <Link to={link} className="inline-block text-center px-7 py-3 font-semibold text-white rounded-xl bg-gradient-to-br from-[#28a745] to-[#1d7a34] hover:from-[#1d7a34] hover:to-[#28a745] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                  {t.viewDetails}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-5 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">{t.whatCustomersSay}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map(({ quote, author, role, company, location, rating, avatar }) => (
            <div key={author} className="bg-gray-50 p-6 rounded-xl shadow-sm text-left flex flex-col">
              <div className="flex gap-0.5 text-yellow-400 text-sm mb-3">{[...Array(rating)].map((_, i) => <span key={i}>★</span>)}</div>
              <p className="text-gray-700 italic flex-1 mb-4">"{quote}"</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-[#28a745] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{avatar}</div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{author}</p>
                  <p className="text-gray-400 text-xs">{role} · {company}</p>
                  <p className="text-gray-400 text-xs">📍 {location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Media CTA */}
      <section className="py-16 px-5 bg-gray-50 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.followJourney}</h2>
        <p className="text-gray-500 mb-8">{t.followJourneySub}</p>
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mb-8">
          {["/normal.png", "/travel.png", "/interprise.png", "/normal.png", "/travel.png", "/interprise.png"].map((img, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-lg">
              <img src={img} alt="Product" className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="https://www.facebook.com/share/17B27TNYy5/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-[#1877F2] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
            {t.followFacebook}
          </a>
          <Link to="/referral" className="flex items-center gap-2 px-6 py-3 bg-[#28a745] text-white font-semibold rounded-xl hover:bg-[#218838] transition-colors">
            {t.referEarn}
          </Link>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-10 px-5 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3">
          {certKeys.map((key, i) => (
            <span key={key} className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold px-4 py-2 rounded-full">
              {certIcons[i]} {t[key]}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#28a745] text-white text-center py-20 px-5">
        <h2 className="text-3xl font-bold mb-5">{t.readyProtect}</h2>
        <p className="text-lg mb-8">{t.readyProtectSub}</p>
        <Link to="/products" className="inline-block px-8 py-3 font-bold bg-white text-[#28a745] rounded-lg hover:bg-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          {t.getStarted}
        </Link>
      </section>

      <Footer />
      <ScrollToTop />
    </>
  );
}
