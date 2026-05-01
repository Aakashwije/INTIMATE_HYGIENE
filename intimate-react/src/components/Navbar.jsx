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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "../context/LangContext";
import LangToggle from "./LangToggle";

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
  const location = useLocation();
  const { t } = useLang();
  const navItems = navItemDefs.map((item) => ({ ...item, label: t[item.key] }));

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="flex justify-between items-center max-w-6xl mx-auto px-8 py-5">
        {/* Logo */}
        <Link to="/home" className="flex items-center">
          <img
            src="/fulllogo.png"
            alt="Hygenc Covers Logo"
            className="h-14 w-auto"
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-1 list-none">
          {navItems.map(({ to, label, icon }) => {
            const isActive = location.pathname === to;
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-[#28a745] text-white scale-105"
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

        {/* Lang toggle — desktop */}
        <div className="hidden md:block">
          <LangToggle />
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col cursor-pointer z-50 gap-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="h-[3px] w-6 bg-gray-800 rounded" />
          <span className="h-[3px] w-6 bg-gray-800 rounded" />
          <span className="h-[3px] w-6 bg-gray-800 rounded" />
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute right-4 top-20 bg-white shadow-lg rounded-xl w-52 p-4 z-50 animate-slideDown">
          <ul className="flex flex-col gap-2 list-none">
            {navItems.map(({ to, label, icon }) => {
              const isActive = location.pathname === to;
              return (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-2 px-4 py-2 font-medium rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-[#28a745] text-white"
                        : "text-gray-800 hover:bg-[#28a745] hover:text-white"
                    }`}
                  >
                    <FontAwesomeIcon icon={icon} />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
