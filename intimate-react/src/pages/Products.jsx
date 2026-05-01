import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";

const productList = [
  {
    img: "/normal.png",
    title: "Single Use Pack",
    desc: "Perfect for individuals on the go. Hygienic, eco-friendly, and convenient for daily travel.",
    badge: "Single Use",
    price: "LKR 150",
    priceNote: "per pack · min 10 packs",
    whatsappMsg:
      "Hello! I want to order the Single Use Pack. Please share pricing and availability.",
    link: "/products/1",
  },
  {
    img: "/travel.png",
    title: "Travel Pack",
    desc: "Waterproof and anti-slip, ideal for families and frequent travelers.",
    badge: "Budget Friendly",
    price: "LKR 300",
    priceNote: "per 10-pack · min 5 packs",
    whatsappMsg:
      "Hello! I want to order the Travel Pack (Waterproof). Please share pricing and availability.",
    link: "/products/2",
  },
  {
    img: "/interprise.png",
    title: "Enterprise Level",
    desc: "Bulk packs for offices, hotels, and businesses. Promote hygiene at scale efficiently.",
    badge: "Best Seller",
    price: "LKR 120",
    priceNote: "per pack · bulk rate · min 100 packs",
    whatsappMsg:
      "Hello! I want to enquire about the Enterprise Pack bulk pricing. Please share details.",
    link: "/products/3",
  },
];

export default function Products() {
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
            Our Products
          </h1>
          <p className="text-lg md:text-xl leading-relaxed opacity-95">
            Explore our range of eco-friendly, disposable toilet seat covers
            designed for safety, comfort, and convenience.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <main className="max-w-6xl mx-auto py-16 px-5 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Our Products</h1>
        <p className="text-gray-500 text-lg mb-10">
          Explore our range of eco-friendly, disposable toilet seat covers
          designed for maximum safety.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {productList.map(
            ({
              img,
              title,
              desc,
              badge,
              price,
              priceNote,
              whatsappMsg,
              link,
            }) => (
              <div
                key={title}
                className="relative bg-white rounded-2xl shadow-lg p-7 text-center overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group"
              >
                {/* Hover radial bg */}
                <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(124,179,66,0.2),transparent_60%)] rotate-[25deg] group-hover:rotate-0 group-hover:scale-110 transition-all duration-500 -z-0" />

                {/* Badge */}
                <span className="absolute top-4 right-4 bg-[#7CB342] text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md animate-floatBadge z-10">
                  {badge}
                </span>

                {/* Image */}
                <img
                  src={img}
                  alt={title}
                  className="w-full max-h-56 object-cover rounded-2xl mb-4 group-hover:scale-105 transition-transform duration-300 relative z-10"
                />

                <h2 className="text-2xl font-semibold text-[#33691E] mb-3 group-hover:text-[#7CB342] transition-colors relative z-10">
                  {title}
                </h2>
                <p className="text-gray-500 mb-4 relative z-10">{desc}</p>

                {/* Pricing */}
                <div className="relative z-10 mb-5 bg-green-50 border border-green-200 rounded-xl py-3 px-4">
                  <p className="text-3xl font-bold text-[#28a745]">{price}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{priceNote}</p>
                </div>

                {/* Buttons */}
                <div className="relative z-10 flex flex-col gap-2">
                  <a
                    href={`https://wa.me/94729991950?text=${encodeURIComponent(whatsappMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#1ea952] transition-colors text-sm"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 fill-current"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Order on WhatsApp
                  </a>
                  <Link
                    to={link}
                    className="w-full py-2.5 border-2 border-[#7CB342] text-[#7CB342] font-semibold rounded-xl hover:bg-[#7CB342] hover:text-white transition-all duration-300 text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ),
          )}
        </div>

        {/* B2B Banner */}
        <div className="mt-12 bg-gray-900 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-1">
              Ordering for a Business? 🏢
            </h3>
            <p className="text-gray-400 text-sm">
              Volume discounts available — from LKR 120/pack for 100+ orders.
              Free dispensers included.
            </p>
          </div>
          <Link
            to="/b2b"
            className="flex-shrink-0 px-6 py-3 bg-[#28a745] text-white font-bold rounded-xl hover:bg-[#218838] transition-colors whitespace-nowrap"
          >
            View B2B Pricing →
          </Link>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
