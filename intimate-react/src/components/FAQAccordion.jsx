import { useState } from "react";
import { useLang } from "../context/LangContext";

const defaultItems = [
  { q: "faqQ1", a: "faqA1" },
  { q: "faqQ2", a: "faqA2" },
  { q: "faqQ3", a: "faqA3" },
  { q: "faqQ4", a: "faqA4" },
  { q: "faqQ5", a: "faqA5" },
];

export default function FAQAccordion({ items = defaultItems }) {
  const { t } = useLang();
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`rounded-xl border transition-all duration-300 overflow-hidden ${
              isOpen ? "border-[#28a745] shadow-lg bg-white" : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex justify-between items-center text-left px-5 py-4 font-semibold text-gray-800 hover:text-[#28a745] transition-colors"
            >
              <span className="pr-3">{t[it.q] || it.q}</span>
              <span
                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  isOpen ? "bg-[#28a745] text-white rotate-45" : "bg-gray-100 text-gray-600"
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-gray-600 leading-relaxed">{t[it.a] || it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
