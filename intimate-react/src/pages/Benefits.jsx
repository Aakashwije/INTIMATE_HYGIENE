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

const benefits = [
  {
    icon: faBacteria,
    title: "Maximum Hygiene",
    desc: "Protects against germs, bacteria, and viruses found on public toilet seats. Even cleaned toilets may harbor microscopic bacteria. Using our seat covers provides a barrier, significantly reducing the risk of infections or illnesses.",
  },
  {
    icon: faLeaf,
    title: "Eco-Friendly",
    desc: "Made from biodegradable and compostable materials, our covers naturally decompose without harming the environment. Safe for septic systems and wastewater treatment, they reduce plastic pollution while promoting sustainable sanitation.",
  },
  {
    icon: faDroplet,
    title: "Water Saving",
    desc: "Flushable covers dissolve easily, helping to minimize water usage. Compared to traditional cleaning methods that use multiple liters of water per toilet, our covers provide an eco-conscious solution that saves water while maintaining hygiene.",
  },
  {
    icon: faPersonBreastfeeding,
    title: "Labor Saving",
    desc: "Reduces the cleaning workload for staff by preventing direct contamination of toilet surfaces. Less frequent scrubbing and disinfection are needed, which saves time and reduces the use of harsh chemicals in public restrooms.",
  },
  {
    icon: faBoxOpen,
    title: "Portable & Convenient",
    desc: "Compact, lightweight, and easy to carry in bags, purses, or pockets. Whether traveling, working in offices, or visiting gyms, these seat covers offer on-the-go hygiene without bulk or hassle.",
  },
  {
    icon: faUsers,
    title: "Family-Friendly",
    desc: "Safe for children, seniors, pregnant women, and anyone using public restrooms. The covers provide peace of mind for parents and caregivers, ensuring that every family member stays protected from germs and contamination.",
  },
  {
    icon: faHospital,
    title: "Expert Recommended",
    desc: "Healthcare professionals endorse the use of disposable seat covers as a simple, effective hygiene measure. They are recommended in hospitals, clinics, and high-traffic public facilities to prevent the spread of germs.",
  },
  {
    icon: faShower,
    title: "Anti-Splash Design",
    desc: "The central fold of the seat cover prevents water from touching the user's skin. This ensures comfort, cleanliness, and an additional layer of protection against contamination from splashes in toilets.",
  },
  {
    icon: faShieldHalved,
    title: "Prevents Cross-Contamination",
    desc: "Minimizes exposure to bacteria and viruses that can spread in shared restroom environments. Ideal for offices, gyms, restaurants, schools, and hospitals where multiple people use the same facilities.",
  },
  {
    icon: faHandSparkles,
    title: "Safe for Skin",
    desc: "Made from gentle, skin-safe materials that prevent irritation, allergies, or rashes. Suitable for sensitive skin, making them ideal for children, seniors, and individuals with skin conditions.",
  },
  {
    icon: faRecycle,
    title: "Eco-Conscious Packaging",
    desc: "Our packaging is designed to be recyclable and environmentally friendly, minimizing waste and reducing carbon footprint while maintaining hygiene standards.",
  },
  {
    icon: faPlane,
    title: "Travel-Friendly",
    desc: "Perfect for travelers, commuters, and professionals. Lightweight packs fit easily in luggage, handbags, or backpacks, providing hygienic protection wherever you go.",
  },
  {
    icon: faBolt,
    title: "Quick Setup",
    desc: "No complicated installation required. Simply tear the center fold, place the cover on the toilet seat, and it's ready to use. Ideal for quick, stress-free hygiene anywhere.",
  },
  {
    icon: faPumpSoap,
    title: "Reduces Waste",
    desc: "Prevents excessive use of paper towels, wipes, and chemical cleaners. Single-use and flushable, our covers promote responsible disposal while keeping spaces clean and sanitary.",
  },
  {
    icon: faBroom,
    title: "Extra Cleanliness",
    desc: "Provides an additional hygiene layer even on sanitized toilets. Users gain confidence and comfort knowing they are sitting on a clean, germ-free surface every time.",
  },
];

export default function Benefits() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-5 drop-shadow-md">
            Benefits of Hygenc Covers
          </h1>
          <p className="text-lg md:text-xl leading-relaxed opacity-95">
            Explore how our disposable toilet seat covers protect health, save
            water, reduce labor, and help the environment.
          </p>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 px-5 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Why Choose Our Seat Covers?
          </h2>
          <p className="text-gray-600">
            Our toilet seat covers provide multiple advantages for hygiene,
            convenience, safety, and eco-conscious living.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white p-7 rounded-xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-[#28a745] font-semibold text-lg mb-3 flex items-center gap-2">
                <FontAwesomeIcon icon={icon} />
                {title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </>
  );
}
