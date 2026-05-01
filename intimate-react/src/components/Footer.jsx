import {
    faFacebookF,
    faInstagram,
    faLinkedinIn,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext";

export default function Footer() {
  const { t } = useLang();

  const quickLinks = [
    [t.navHome, "/home"],
    [t.navAbout, "/about"],
    [t.navProducts, "/products"],
    [t.navBenefits, "/benefits"],
    [t.navBlog, "/blog"],
    ["B2B", "/b2b"],
    [t.navCompare, "/compare"],
    [t.navDelivery, "/delivery"],
    [t.navFaq, "/faq"],
    [t.navContact, "/contact"],
  ];

  return (
    <footer className="bg-[#222] text-white pt-16 pb-5 px-5 mt-12">
      <div className="flex flex-wrap justify-between max-w-6xl mx-auto gap-8">
        {/* Brand */}
        <div className="flex-1 min-w-[200px]">
          <Link to="/home">
            <img
              src="/fulllogo.png"
              alt="Hygenc Covers Logo"
              className="h-12 mb-4"
            />
          </Link>
          <p className="text-sm text-gray-300 leading-relaxed">{t.footerDesc}</p>
        </div>

        {/* Quick Links */}
        <div className="flex-1 min-w-[150px]">
          <h3 className="text-[#28a745] font-semibold text-lg mb-4">{t.quickLinks}</h3>
          <ul className="list-none space-y-2 text-sm">
            {quickLinks.map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="text-white hover:text-[#81a42f] transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-[#28a745] font-semibold text-lg mb-4">{t.contactUs}</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>
              Email:{" "}
              <a href="mailto:intimatehygiene@gmail.com" className="text-white hover:text-[#81a42f]">
                intimatehygiene@gmail.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:+94729991950" className="text-white hover:text-[#81a42f]">
                +94 72 999 1950
              </a>
            </p>
            <p>Address: 193/12, Prasanna Uyana, Mattegoda</p>
          </div>
        </div>

        {/* Social */}
        <div className="flex-1 min-w-[150px]">
          <h3 className="text-[#28a745] font-semibold text-lg mb-4">Follow Us</h3>
          <div className="flex flex-col gap-3 text-sm">
            <a href="https://www.facebook.com/share/17B27TNYy5/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#81a42f] flex items-center gap-2">
              <FontAwesomeIcon icon={faFacebookF} /> Facebook
            </a>
            <a href="#" className="text-white hover:text-[#81a42f] flex items-center gap-2">
              <FontAwesomeIcon icon={faInstagram} /> Instagram
            </a>
            <a href="#" className="text-white hover:text-[#81a42f] flex items-center gap-2">
              <FontAwesomeIcon icon={faTwitter} /> Twitter
            </a>
            <a href="#" className="text-white hover:text-[#81a42f] flex items-center gap-2">
              <FontAwesomeIcon icon={faLinkedinIn} /> LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-600 mt-8 pt-4 flex flex-col items-center text-center text-sm text-gray-400 gap-1">
        <p>&copy; 2025 Intimate Hygiene. {t.footerRights}</p>
        <div>
          <a href="#" className="text-gray-400 hover:text-[#28a745] mx-2">Privacy Policy</a>
          |
          <a href="#" className="text-gray-400 hover:text-[#28a745] mx-2">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
