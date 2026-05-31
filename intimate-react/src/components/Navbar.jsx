import {
  faFacebookMessenger,
  faProductHunt,
} from "@fortawesome/free-brands-svg-icons";
import {
  faAddressCard,
  faBalanceScale,
  faBuilding,
  faHouseChimney,
  faLightbulb,
  faNewspaper,
  faQuestion,
  faTruck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "../context/LangContext";
import CartButton from "./CartButton";
import LangToggle from "./LangToggle";
import { useCustomerAuth } from "../context/CustomerAuthContext";

const navItemDefs = [
  { to: "/home", key: "navHome", icon: faHouseChimney },
  { to: "/about", key: "navAbout", icon: faAddressCard },
  { to: "/products", key: "navProducts", icon: faProductHunt },
  { to: "/benefits", key: "navBenefits", icon: faLightbulb },
  { to: "/blog", key: "navBlog", icon: faNewspaper },
  { to: "/b2b", key: "navB2B", icon: faBuilding },
  { to: "/faq", key: "navFaq", icon: faQuestion },
  { to: "/compare", key: "navCompare", icon: faBalanceScale },
  { to: "/delivery", key: "navDelivery", icon: faTruck },
  { to: "/contact", key: "navContact", icon: faFacebookMessenger },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useLang();
  const { isLoggedIn } = useCustomerAuth();
  const navItems = navItemDefs.map((item) => ({ ...item, label: t[item.key] }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-md border-b border-gray-100"
          : "bg-white border-b border-gray-200"
      }`}
    >
      <nav
        className={`flex justify-between items-center gap-4 lg:gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          scrolled ? "py-2 sm:py-2.5" : "py-3 sm:py-4"
        }`}
      >
        {/* Logo */}
        <Link
          to="/home"
          className="flex items-center group shrink-0 mr-auto md:mr-0"
        >
          <img
            src="/fulllogo.png"
            alt="Hygenc Covers Logo"
            className={`w-auto transition-all duration-300 group-hover:scale-105 ${
              scrolled ? "h-8 sm:h-10" : "h-10 sm:h-14"
            }`}
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-1 lg:gap-1.5 list-none flex-1 justify-center">
          {navItems.map(({ to, label, icon }) => {
            const isActive = location.pathname === to;
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`flex items-center gap-1.5 px-3 lg:px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "bg-[#28a745] text-white scale-105 shadow-md"
                      : "text-gray-800 hover:bg-[#28a745] hover:text-white hover:scale-105"
                  }`}
                >
                  <FontAwesomeIcon icon={icon} />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <Link
            to={isLoggedIn ? "/account" : "/login"}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-full transition-colors ${
              location.pathname === "/account" || location.pathname === "/login"
                ? "bg-[#28a745] text-white"
                : "text-gray-700 hover:bg-green-50 hover:text-[#28a745]"
            }`}
          >
            <FontAwesomeIcon icon={faUser} />
            {isLoggedIn ? "Account" : "Login"}
          </Link>
          <CartButton />
          <div className="hidden md:block">
            <LangToggle />
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col cursor-pointer z-50 gap-1 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`h-[3px] w-6 bg-gray-800 rounded transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`h-[3px] w-6 bg-gray-800 rounded transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-[3px] w-6 bg-gray-800 rounded transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute right-3 left-3 sm:left-auto top-full mt-1 bg-white shadow-2xl rounded-2xl sm:w-64 max-h-[calc(100vh-5rem)] overflow-y-auto p-3 z-50 animate-slideDown border border-gray-100">
          <ul className="flex flex-col gap-1 list-none">
            {navItems.map(({ to, label, icon }) => {
              const isActive = location.pathname === to;
              return (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-2 px-4 py-2.5 font-medium rounded-xl transition-all duration-300 text-sm ${
                      isActive
                        ? "bg-[#28a745] text-white"
                        : "text-gray-800 hover:bg-green-50 hover:text-[#28a745]"
                    }`}
                  >
                    <FontAwesomeIcon icon={icon} className="w-4" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <Link
              to={isLoggedIn ? "/account" : "/login"}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 font-medium rounded-xl transition-all duration-300 text-sm text-gray-800 hover:bg-green-50 hover:text-[#28a745]"
            >
              <FontAwesomeIcon icon={faUser} className="w-4" />
              {isLoggedIn ? "Account" : "Login"}
            </Link>
            <LangToggle />
          </div>
        </div>
      )}
    </header>
  );
}
