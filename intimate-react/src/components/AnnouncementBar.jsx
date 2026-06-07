import { Gift, Timer, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLang } from "../context/LangContext";

export default function AnnouncementBar() {
  const { t } = useLang();
  const [hide, setHide] = useState(false);
  const [time, setTime] = useState({ h: 23, m: 59, s: 59 });

  useEffect(() => {
    if (sessionStorage.getItem("hideAnnouncement")) {
      setHide(true);
      return;
    }
    const tick = setInterval(() => {
      setTime(({ h, m, s }) => {
        if (s > 0) return { h, m, s: s - 1 };
        if (m > 0) return { h, m: m - 1, s: 59 };
        if (h > 0) return { h: h - 1, m: 59, s: 59 };
        return { h: 23, m: 59, s: 59 };
      });
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  if (hide) return null;

  const pad = (n) => n.toString().padStart(2, "0");

  return (
    <div className="bg-gradient-to-r from-[#0d3f1a] via-[#1d7a34] to-[#28a745] text-white text-[11px] sm:text-sm py-2 pl-3 pr-9 sm:px-4 flex items-center justify-center gap-2 sm:gap-3 relative animate-gradientShift">
      <Gift className="hidden sm:block w-4 h-4 shrink-0" />
      <span className="font-semibold text-center leading-snug">
        {t.announcement || "Limited time: 5% off + Colombo delivery free · Outside Colombo LKR 350"}
      </span>
      <span className="hidden md:inline-flex items-center gap-1.5 font-mono bg-black/25 px-2 py-0.5 rounded-md">
        <Timer className="w-3.5 h-3.5" />
        {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
      </span>
      <button
        onClick={() => {
          setHide(true);
          sessionStorage.setItem("hideAnnouncement", "1");
        }}
        aria-label="Dismiss"
        className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-1"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
