import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";

/* ---- Data ---- */
const features = [
  {
    title: "Maximum Hygiene",
    desc: "Our disposable covers provide a protective barrier against bacteria, keeping you safe in public restrooms.",
  },
  {
    title: "Eco-Friendly",
    desc: "Made from biodegradable materials, our covers protect not only you but also the environment.",
  },
  {
    title: "Convenient & Portable",
    desc: "Compact packaging ensures you can carry them anywhere – perfect for travel, work, or daily use.",
  },
];

const products = [
  {
    img: "/normal.png",
    title: "Standard Pack",
    desc: "Perfect for individuals on the go. Stay protected anywhere.",
    link: "/products/1",
  },
  {
    img: "/travel.png",
    title: "Travel Kit",
    desc: "Compact and lightweight, tailored for frequent travelers.",
    link: "/products/2",
  },
  {
    img: "/interprise.png",
    title: "Enterprise Pack",
    desc: "Specially designed for businesses, banks, and large organizations – bulk packs to ensure hygiene for all.",
    link: "/products/3",
  },
];

const testimonials = [
  {
    quote:
      '"These covers gave me peace of mind during my travels. Super easy to use!"',
    author: "Inoka Gunn",
  },
  {
    quote:
      '"Finally, a hygienic solution that\'s also eco friendly. Highly recommended for an organization!"',
    author: "HSBC",
  },
  {
    quote: '"Affordable, convenient, and safe. I carry them everywhere now."',
    author: "Priya De Costa",
  },
];

export default function Home() {
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
        {/* overlay */}
        <div className="absolute inset-0 bg-[rgba(40,167,69,0.25)] rounded-b-[40px]" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-5 drop-shadow-md italic">
            Your Protection is Our Priority!
          </h1>
          <p className="text-lg md:text-xl leading-relaxed opacity-95">
            Premium hygienic toilet seat covers designed for your comfort,
            health, and safety.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-5 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Why Choose Hygenc Covers?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(({ title, desc }) => (
            <div
              key={title}
              className="bg-white p-8 rounded-xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-[#28a745] font-semibold text-lg mb-4">
                {title}
              </h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products Highlight */}
      <section className="py-20 px-5 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Our Bestsellers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map(({ img, title, desc, link }) => (
            <div
              key={title}
              className="flex flex-col bg-white rounded-xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <img
                src={img}
                alt={title}
                className="w-full h-60 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-[#28a745] font-semibold text-lg mb-3">
                  {title}
                </h3>
                <p className="text-gray-600 flex-1 mb-4">{desc}</p>
                <Link
                  to={link}
                  className="inline-block text-center px-7 py-3 font-semibold text-white rounded-xl bg-gradient-to-br from-[#28a745] to-[#1d7a34] hover:from-[#1d7a34] hover:to-[#28a745] hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-5 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map(({ quote, author }) => (
            <div
              key={author}
              className="bg-gray-50 p-6 rounded-xl italic shadow-sm"
            >
              <p className="text-gray-700">{quote}</p>
              <span className="block mt-4 font-bold text-[#28a745]">
                - {author}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#28a745] text-white text-center py-20 px-5">
        <h2 className="text-3xl font-bold mb-5">
          Ready to Protect Your Health?
        </h2>
        <p className="text-lg mb-8">
          Order today and experience the difference Hygenc Covers can make.
        </p>
        <Link
          to="/products"
          className="inline-block px-8 py-3 font-bold bg-white text-[#28a745] rounded-lg hover:bg-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
        >
          Get Started
        </Link>
      </section>

      <Footer />
      <ScrollToTop />
    </>
  );
}
