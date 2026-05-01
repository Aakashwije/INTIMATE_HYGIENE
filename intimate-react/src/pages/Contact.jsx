import {
    faClock,
    faEnvelope,
    faMapMarkerAlt,
    faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";

const infoCards = [
  {
    icon: faEnvelope,
    title: "Email",
    content: "intimatehygiene@gmail.com",
    href: "mailto:intimatehygiene@gmail.com",
  },
  {
    icon: faPhoneAlt,
    title: "Phone",
    content: "+94729991950",
    href: "tel:+94729991950",
  },
  {
    icon: faMapMarkerAlt,
    title: "Address",
    content: "193/12, Prasanna Uyana, Mattegoda",
    href: null,
  },
  {
    icon: faClock,
    title: "Business Hours",
    content: "Mon – Fri: 9AM – 6PM",
    href: null,
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic can be wired here (e.g., EmailJS / API call)
    alert("Thank you! Your message has been sent.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const handleReset = () =>
    setForm({ name: "", email: "", subject: "", message: "" });

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
            Contact Us
          </h1>
          <p className="text-lg md:text-xl leading-relaxed opacity-95">
            We'd love to hear from you! Reach out with any questions, feedback,
            or partnership opportunities.
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16 px-5 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {infoCards.map(({ icon, title, content, href }) => (
          <div
            key={title}
            className="bg-white rounded-xl shadow-md p-7 text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
          >
            <FontAwesomeIcon
              icon={icon}
              className="text-[#28a745] text-3xl mb-4"
            />
            <h3 className="font-semibold text-gray-800 text-lg mb-2">
              {title}
            </h3>
            {href ? (
              <a
                href={href}
                className="text-gray-600 hover:text-[#28a745] text-sm transition-colors"
              >
                {content}
              </a>
            ) : (
              <p className="text-gray-600 text-sm">{content}</p>
            )}
          </div>
        ))}
      </section>

      {/* Contact Form */}
      <section className="py-8 px-5 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Send Us a Message
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-8 space-y-5"
          noValidate
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-[#28a745] transition-colors"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-[#28a745] transition-colors"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-[#28a745] transition-colors"
          />
          <textarea
            name="message"
            rows={6}
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:border-[#28a745] transition-colors resize-none"
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-[#28a745] text-white font-bold py-3 rounded-lg hover:bg-[#218838] transition-colors"
            >
              Send Message
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 border-2 border-gray-300 text-gray-600 font-bold py-3 rounded-lg hover:border-[#28a745] hover:text-[#28a745] transition-colors"
            >
              Reset
            </button>
          </div>
        </form>
      </section>

      {/* Google Map */}
      <section className="py-12 px-5 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Find Us Here
        </h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63315.2224!2d79.8380!3d6.9271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2590d7b2e47a9%3A0x8b5d67f5e69a90f6!2sColombo!5e0!3m2!1sen!2slk!4v1234567890"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Our Location"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-xl shadow-md"
        />
      </section>

      <Footer />
      <ScrollToTop />
    </>
  );
}
