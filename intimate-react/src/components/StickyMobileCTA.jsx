import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLang } from "../context/LangContext";

export default function StickyMobileCTA() {
  const { t } = useLang();
  const location = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide on splash and order pages
  if (location.pathname === "/splash" || location.pathname === "/order") return null;
  if (!show) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[80] bg-white border-t border-gray-200 shadow-2xl px-3 py-2.5 flex gap-2 animate-slideUp">
      <Link
        to="/products"
        className="flex-1 py-3 text-center font-bold text-white bg-gradient-to-r from-[#28a745] to-[#1d7a34] rounded-xl shadow-md text-sm"
      >
        🛒 {t.shopNow}
      </Link>
      <a
        href="https://wa.me/94729991950?text=Hello%21%20I%27d%20like%20to%20order%20Intimate%20Hygiene%20products."
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 py-3 text-center font-bold text-white bg-[#25D366] rounded-xl shadow-md text-sm flex items-center justify-center gap-2"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
        </svg>
        WhatsApp
      </a>
    </div>
  );
}
