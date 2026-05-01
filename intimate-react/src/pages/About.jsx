import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";

const coreValues = [
  {
    title: "Innovation",
    desc: "We continuously improve our products to meet modern hygiene demands.",
  },
  {
    title: "Sustainability",
    desc: "Our eco‑conscious approach ensures minimal environmental impact.",
  },
  {
    title: "Accessibility",
    desc: "We design hygiene solutions that are affordable and available to all.",
  },
  {
    title: "Trust",
    desc: "Customer confidence is at the heart of everything we create.",
  },
  {
    title: "Health & Safety",
    desc: "Every product is developed to safeguard wellbeing in shared environments.",
  },
  {
    title: "Customer Care",
    desc: "We listen, adapt, and provide exceptional support to our community.",
  },
];

const testimonials = [
  {
    quote:
      '"Hygenc Covers gave me peace of mind while traveling. Easy to carry, and very hygienic!"',
    author: "Samantha L.",
  },
  {
    quote:
      '"As a parent, I love that my kids have an extra layer of safety in public restrooms."',
    author: "David M.",
  },
  {
    quote:
      '"Eco-friendly, practical, and affordable—everything I wanted in a hygiene product."',
    author: "Ayesha K.",
  },
];

export default function About() {
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
            About Us
          </h1>
          <p className="text-lg md:text-xl leading-relaxed opacity-95">
            At Intimate Hygiene, we believe hygiene is not a privilege – it's a
            necessity. Our mission is to make public spaces safer, cleaner, and
            healthier for everyone.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-5 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
        <p className="text-gray-600 mb-4 max-w-3xl mx-auto">
          Founded with a vision to tackle everyday hygiene challenges, Intimate
          Hygiene was born out of the need for{" "}
          <strong>practical solutions</strong> in shared environments like
          offices, schools, hospitals, gyms, and travel spaces.
        </p>
        <p className="text-gray-600 max-w-3xl mx-auto">
          What started as a small initiative has now grown into a trusted brand
          focused on innovation, safety, and sustainability.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-5 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Our Mission &amp; Vision
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <h3 className="text-[#28a745] font-semibold text-lg mb-4">
              Mission
            </h3>
            <p className="text-gray-600">
              To provide{" "}
              <strong>
                affordable, eco-friendly, and disposable hygiene solutions
              </strong>{" "}
              that empower individuals to protect themselves in public spaces
              without worry.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
            <h3 className="text-[#28a745] font-semibold text-lg mb-4">
              Vision
            </h3>
            <p className="text-gray-600">
              To be a global leader in{" "}
              <strong>personal hygiene innovation</strong>, ensuring that
              everyone has access to clean and safe facilities wherever they go.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-5 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreValues.map(({ title, desc }) => (
            <div
              key={title}
              className="bg-white p-8 rounded-xl shadow-md hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-[#28a745] font-semibold text-lg mb-3">
                {title}
              </h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-20 px-5 bg-gray-50 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Our Commitment to Sustainability
          </h2>
          <p className="text-gray-600">
            Hygiene should not come at the cost of our planet. Hygenc Covers
            uses <strong>biodegradable materials</strong> and eco-friendly
            packaging to reduce waste and support a greener future.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-5 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">
          What People Say
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
        <h2 className="text-3xl font-bold mb-5">Join Our Hygiene Revolution</h2>
        <p className="text-lg mb-8">
          Protect yourself and your loved ones with Hygenc Covers. Together, we
          can create a cleaner, safer tomorrow.
        </p>
        <Link
          to="/products"
          className="inline-block px-8 py-3 font-bold bg-white text-[#28a745] rounded-lg hover:bg-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
        >
          Explore Products
        </Link>
      </section>

      <Footer />
      <ScrollToTop />
    </>
  );
}
