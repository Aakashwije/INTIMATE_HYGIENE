import { useEffect, useState } from "react";
import { useLang } from "../context/LangContext";

const CODE = "HYGIENE5";

export default function DiscountPopup() {
  const { t } = useLang();
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem("discountShown")) return;
    const timer = setTimeout(() => {
      setShow(true);
      sessionStorage.setItem("discountShown", "1");
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(CODE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleRedeem = () => {
    const msg = `Hello! I'd like to redeem my 5% first-order discount. Code: ${CODE}. Please share available products.`;
    window.open(
      `https://wa.me/94729991950?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setShow(false)}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center animate-slideUp">
        {/* Close */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold leading-none"
          aria-label="Close"
        >
          ×
        </button>

        {/* Emoji */}
        <div className="text-5xl mb-3">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {t.popupTitle}
        </h2>
        <p className="text-gray-500 text-sm mb-5">{t.popupSub}</p>

        {/* Code */}
        <div className="bg-green-50 border-2 border-dashed border-[#28a745] rounded-xl py-3 px-4 mb-5">
          <p className="text-xs text-gray-500 mb-1">Your discount code</p>
          <p className="text-2xl font-bold tracking-widest text-[#28a745]">
            {CODE}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={handleRedeem}
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1ea952] transition-colors text-sm"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-current"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t.redeemWhatsApp}
          </button>
          <button
            onClick={handleCopy}
            className={`w-full py-2.5 rounded-xl font-semibold text-sm border-2 transition-colors ${
              copied
                ? "bg-[#28a745] text-white border-[#28a745]"
                : "border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {copied ? `✔ ${t.popupCopied}` : t.copyCode}
          </button>
        </div>

        <p className="text-xs text-gray-400 mt-4">{t.popupExpiry}</p>
      </div>
    </div>
  );
}
