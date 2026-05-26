import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { trackSiteEvent } from "../lib/database";

export default function WhatsAppButton() {
  const phone = "94707018171";
  const message = encodeURIComponent(
    "Hello! I am interested in ordering Intimate Hygiene products. Please share pricing and availability.",
  );
  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackSiteEvent({
          event_type: "whatsapp_click",
          label: "Floating WhatsApp",
        })
      }
      className="fixed bottom-24 sm:bottom-20 md:bottom-6 right-4 sm:right-6 z-[100] bg-[#25D366] text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="text-3xl" />
      <span className="absolute right-full mr-3 bg-gray-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
        Order on WhatsApp
      </span>
    </a>
  );
}
