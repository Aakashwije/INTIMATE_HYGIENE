import {
    faBacteria,
    faBolt,
    faBoxOpen,
    faBroom,
    faDroplet,
    faHandSparkles,
    faHospital,
    faLeaf,
    faPersonBreastfeeding,
    faPlane,
    faPumpSoap,
    faRecycle,
    faShieldHalved,
    faShower,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import { useLang } from "../context/LangContext";

const benefitDefs = [
  { icon: faBacteria, titleKey: "maxHygieneBenefit", descKey: "maxHygieneBenefitDesc" },
  { icon: faLeaf, titleKey: "ecoFriendlyBenefit", descKey: "ecoFriendlyBenefitDesc" },
  { icon: faDroplet, titleKey: "waterSaving", descKey: "waterSavingDesc" },
  { icon: faPersonBreastfeeding, titleKey: "laborSaving", descKey: "laborSavingDesc" },
  { icon: faBoxOpen, titleKey: "portable", descKey: "portableDesc" },
  { icon: faUsers, titleKey: "familyFriendly", descKey: "familyFriendlyDesc" },
  { icon: faHospital, titleKey: "expertRecommended", descKey: "expertRecommendedDesc" },
  {
    icon: faShower,
    titleKey: "antiSplash",
    descKey: "antiSplashDesc",
  },
  {
    icon: faShieldHalved,
    titleKey: "preventsContam",
    descKey: "preventscontamDesc",
  },
  { icon: faHandSparkles, titleKey: "skinSafe", descKey: "skinSafeDesc" },
  { icon: faRecycle, titleKey: "ecoPackaging", descKey: "ecoPackagingDesc" },
  { icon: faPlane, titleKey: "travelFriendly", descKey: "travelFriendlyDesc" },
  { icon: faBolt, titleKey: "quickSetup", descKey: "quickSetupDesc" },
  { icon: faPumpSoap, titleKey: "reducesWaste", descKey: "reducesWasteDesc" },
  { icon: faBroom, titleKey: "extraClean", descKey: "extraCleanDesc" },
];

/* Static English fallbacks for untranslated benefit entries */
const benefitFallbacks = {
  antiSplash: "Anti-Splash Design",
  antiSplashDesc: "The central fold of the seat cover prevents water from touching the user's skin.",
  preventsContam: "Prevents Cross-Contamination",
  preventscontamDesc: "Minimizes exposure to bacteria and viruses that can spread in shared restroom environments.",
  skinSafe: "Safe for Skin",
  skinSafeDesc: "Made from gentle, skin-safe materials that prevent irritation, allergies, or rashes.",
  ecoPackaging: "Eco-Conscious Packaging",
  ecoPackagingDesc: "Our packaging is designed to be recyclable and environmentally friendly.",
  travelFriendly: "Travel-Friendly",
  travelFriendlyDesc: "Lightweight packs fit easily in luggage, handbags, or backpacks.",
  quickSetup: "Quick Setup",
  quickSetupDesc: "No complicated installation required. Simply place and use.",
  reducesWaste: "Reduces Waste",
  reducesWasteDesc: "Prevents excessive use of paper towels, wipes, and chemical cleaners.",
  extraClean: "Extra Cleanliness",
  extraCleanDesc: "Provides an additional hygiene layer even on sanitized toilets.",
};

export default function Benefits() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-5 drop-shadow-md">{t.benefitsHeroTitle}</h1>
          <p className="text-lg md:text-xl leading-relaxed opacity-95">{t.benefitsHeroSub}</p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 px-5 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">{t.benefitsTitle}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitDefs.map(({ icon, titleKey, descKey }) => (
            <div key={titleKey} className="bg-white p-7 rounded-xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <h3 className="text-[#28a745] font-semibold text-lg mb-3 flex items-center gap-2">
                <FontAwesomeIcon icon={icon} />
                {t[titleKey] || benefitFallbacks[titleKey]}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t[descKey] || benefitFallbacks[descKey]}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </>
  );
}
