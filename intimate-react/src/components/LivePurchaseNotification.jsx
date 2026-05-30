import { useEffect, useState } from "react";
import { useLang } from "../context/LangContext";

const recentPurchases = [
  { name: "Nimesha", city: "Colombo 5", product: "Waterproof 5-Pack", time: 2 },
  { name: "Dilshan", city: "Kandy", product: "Non-Waterproof 5-Pack", time: 4 },
  { name: "Ayesha", city: "Galle", product: "Enterprise 10-Pack", time: 5 },
  { name: "Ruwan", city: "Negombo", product: "Waterproof 5-Pack", time: 7 },
  { name: "Priya", city: "Jaffna", product: "Non-Waterproof 5-Pack", time: 9 },
  { name: "Sahan", city: "Matara", product: "Enterprise 10-Pack", time: 11 },
  { name: "Kasun", city: "Nuwara Eliya", product: "Waterproof 5-Pack", time: 13 },
  { name: "Tharushi", city: "Anuradhapura", product: "Non-Waterproof 5-Pack", time: 16 },
  { name: "Hotel Cinnamon", city: "Colombo", product: "Bulk B2B Order", time: 21 },
  { name: "Office HSBC", city: "Colombo 3", product: "B2B 500 packs", time: 28 },
];

export default function LivePurchaseNotification() {
  const { t } = useLang();
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("hideLiveNotif")) return;

    const start = setTimeout(() => setShow(true), 8000);
    const cycle = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % recentPurchases.length);
        setShow(true);
      }, 600);
    }, 9000);

    return () => {
      clearTimeout(start);
      clearInterval(cycle);
    };
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("hideLiveNotif", "1");
  };

  if (!show) return null;
  const p = recentPurchases[index];

  return (
    <div className="fixed bottom-24 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-auto z-[90] sm:max-w-xs animate-toastIn">
      <div className="glass rounded-2xl shadow-xl p-3.5 pr-8 flex items-center gap-3 border-l-4 border-[#28a745] relative">
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute top-1.5 right-2 text-gray-400 hover:text-gray-700 text-sm"
        >
          ×
        </button>
        <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-br from-[#28a745] to-[#5cd65c] flex items-center justify-center text-white font-bold text-sm">
          {p.name.charAt(0)}
        </div>
        <div className="text-xs leading-tight">
          <p className="font-semibold text-gray-800">
            {p.name} <span className="text-gray-400 font-normal">· {p.city}</span>
          </p>
          <p className="text-gray-600">
            {t.justOrdered || "just ordered"} <span className="font-semibold text-[#28a745]">{p.product}</span>
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            {p.time} {t.minutesAgo || "min ago"}
          </p>
        </div>
      </div>
    </div>
  );
}
