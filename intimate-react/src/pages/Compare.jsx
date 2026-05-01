import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import { useLang } from "../context/LangContext";

const productDefs = [
  { nameKey: "singleUse", img: "/normal.png", price: "LKR 150", priceNote: "per pack", link: "/products/1", whatsapp: "Hello! I want to order the Single Use Pack. Please share availability." },
  { nameKey: "travelPack", img: "/travel.png", price: "LKR 300", priceNote: "per 10-pack", link: "/products/2", whatsapp: "Hello! I want to order the Travel Pack. Please share availability." },
  { nameKey: "enterprise", img: "/interprise.png", price: "LKR 120", priceNote: "per pack (bulk)", link: "/products/3", whatsapp: "Hello! I want to enquire about Enterprise Pack bulk pricing." },
];

const rows = [
  { label: "Price", values: ["LKR 150 / pack", "LKR 300 / 10-pack", "LKR 120 / pack"], best: 2 },
  { label: "Minimum Order", values: ["10 packs", "5 packs", "100 packs"], best: null },
  { label: "Waterproof Layer", values: ["✗", "✔", "✗"], best: 1 },
  { label: "Anti-Slip Grip", values: ["✗", "✔", "✔"], best: null },
  { label: "Flushable / Dissolvable", values: ["✗", "✗", "✔"], best: 2 },
  { label: "Free Dispenser", values: ["✗", "✗", "✔"], best: 2 },
  { label: "Eco-Friendly Material", values: ["✔", "✔", "✔"], best: null },
  { label: "Anti-Bacterial Coating", values: ["✔", "✔", "✔"], best: null },
  { label: "Compact / Pocket Size", values: ["✔", "✔", "✗"], best: null },
  { label: "Best For", values: ["Daily commuters", "Travelers", "Hotels & offices"], best: null },
  { label: "Bulk Discount Available", values: ["✗", "✗", "✔"], best: 2 },
];

export default function Compare() {
  const { t } = useLang();
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        className="relative flex items-center justify-center text-center text-white px-5 py-20 rounded-b-[40px] shadow-lg animate-fadeInHero overflow-hidden"
        style={{ background: 'linear-gradient(rgba(40,167,69,0.85), rgba(40,167,69,0.85)), url("/hero.jpg") no-repeat center/cover' }}
      >
        <div className="absolute inset-0 bg-[rgba(40,167,69,0.25)] rounded-b-[40px]" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">{t.compareHeroTitle}</h1>
          <p className="text-lg opacity-90">{t.compareHeroSub}</p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 py-14">
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr>
                <th className="w-40 md:w-52" />
                {productDefs.map((p) => (
                  <th key={p.nameKey} className="pb-6 px-3 align-top">
                    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center gap-2">
                      <img src={p.img} alt={t[p.nameKey]} className="w-24 h-24 object-cover rounded-xl" />
                      <p className="font-bold text-gray-800 text-base leading-tight">{t[p.nameKey]}</p>
                      <p className="text-2xl font-bold text-[#28a745]">{p.price}</p>
                      <p className="text-xs text-gray-400">{p.priceNote}</p>
                      <a href={`https://wa.me/94729991950?text=${encodeURIComponent(p.whatsapp)}`} target="_blank" rel="noopener noreferrer" className="mt-1 w-full text-center py-2 bg-[#25D366] text-white font-semibold rounded-xl text-xs hover:bg-[#1ea952] transition-colors">
                        {t.orderOnWhatsApp}
                      </a>
                      <Link to={p.link} className="w-full text-center py-1.5 border border-[#7CB342] text-[#7CB342] font-semibold rounded-xl text-xs hover:bg-[#7CB342] hover:text-white transition-all">
                        {t.viewDetails}
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ label, values, best }, ri) => (
                <tr key={label} className={ri % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="py-3 px-4 font-semibold text-gray-700 rounded-l-xl">{label}</td>
                  {values.map((val, ci) => {
                    const isGood = val === "✔";
                    const isBad = val === "✗";
                    const isBest = best === ci;
                    return (
                      <td key={ci} className={`py-3 px-4 text-center font-medium rounded-xl ${isGood ? "text-[#28a745]" : ""} ${isBad ? "text-gray-300" : ""} ${isBest ? "bg-green-50 text-[#28a745] font-bold" : ""}`}>
                        {isGood ? <span className="text-lg">✔</span> : isBad ? <span className="text-lg">—</span> : <span className={isBest ? "text-[#28a745] font-bold" : "text-gray-700"}>{val}</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gray-900 text-white rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold mb-2">{t.needHelp} 🤔</h3>
          <p className="text-gray-400 text-sm mb-5">{t.needHelpSub}</p>
          <a href="https://wa.me/94729991950?text=Hello!%20I%20need%20help%20choosing%20the%20right%20toilet%20seat%20cover%20product." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1ea952] transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t.askOnWhatsApp}
          </a>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
