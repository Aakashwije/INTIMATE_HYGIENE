import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import { useLang } from "../context/LangContext";

const testimonials = [
  { quote: '"Hygenc Covers gave me peace of mind while traveling. Easy to carry, and very hygienic!"', author: "Samantha L." },
  { quote: '"As a parent, I love that my kids have an extra layer of safety in public restrooms."', author: "David M." },
  { quote: '"Eco-friendly, practical, and affordable—everything I wanted in a hygiene product."', author: "Ayesha K." },
];

const valueDefs = [
  { titleKey: "valueInnovation", descKey: "valueInnovationDesc" },
  { titleKey: "valueSustainability", descKey: "valueSustainabilityDesc" },
  { titleKey: "valueAccessibility", descKey: "valueAccessibilityDesc" },
  { titleKey: "valueTrust", descKey: "valueTrustDesc" },
  { titleKey: "valueHealth", descKey: "valueHealthDesc" },
  { titleKey: "valueCare", descKey: "valueCareDesc" },
];

export default function About() {
  const { t } = useLang();
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
          <h1 className="text-4xl md:text-5xl font-bold mb-5 drop-shadow-md">{t.aboutHeroTitle}</h1>
          <p className="text-lg md:text-xl leading-relaxed opacity-95">{t.aboutHeroSub}</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-5 max-w-6xl mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <h3 className="text-[#28a745] font-semibold text-lg mb-4">{t.ourMission}</h3>
            <p className="text-gray-600">{t.ourMissionText}</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <h3 className="text-[#28a745] font-semibold text-lg mb-4">{t.ourVision}</h3>
            <p className="text-gray-600">{t.ourVisionText}</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-5 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">{t.ourValues}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {valueDefs.map(({ titleKey, descKey }) => (
            <div key={titleKey} className="bg-white p-8 rounded-xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <h3 className="text-[#28a745] font-semibold text-lg mb-3">{t[titleKey]}</h3>
              <p className="text-gray-600">{t[descKey]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-5 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">{t.whatCustomersSay}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map(({ quote, author }) => (
            <div key={author} className="bg-gray-50 p-6 rounded-xl italic shadow-sm">
              <p className="text-gray-700">{quote}</p>
              <span className="block mt-4 font-bold text-[#28a745]">- {author}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#28a745] text-white text-center py-20 px-5">
        <h2 className="text-3xl font-bold mb-5">{t.partnerWithUs}</h2>
        <p className="text-lg mb-8">{t.partnerWithUsSub}</p>
        <Link to="/contact" className="inline-block px-8 py-3 font-bold bg-white text-[#28a745] rounded-lg hover:bg-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
          {t.getInTouch}
        </Link>
      </section>

      <Footer />
      <ScrollToTop />
    </>
  );
}
