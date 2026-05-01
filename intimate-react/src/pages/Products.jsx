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
    price: "LKR 250.00",
    link: "/products/1",
  },
  {
    img: "/travel.png",
    title: "Travel Pack",
    desc: "Designed for families. Larger packs with extra covers to ensure safety for everyone.",
    badge: "Budget Friendly",
    price: "LKR 250.00",
    link: "/products/2",
  },
  {
    img: "/interprise.png",
    title: "Enterprise Level",
    desc: "Bulk packs for offices, hotels, and businesses. Promote hygiene at scale efficiently.",
    badge: "Best Seller",
    price: "LKR 250.00",
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
          {productList.map(({ img, title, desc, badge, price, link }) => (
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
              <p className="text-gray-500 mb-5 relative z-10">{desc}</p>
              <div className="font-bold text-[#28a745] text-lg mb-4 relative z-10">
                {price}
              </div>
              <Link
                to={link}
                className="relative z-10 inline-block px-6 py-2 border-2 border-[#7CB342] text-[#7CB342] font-semibold rounded-lg hover:bg-[#7CB342] hover:text-white transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
