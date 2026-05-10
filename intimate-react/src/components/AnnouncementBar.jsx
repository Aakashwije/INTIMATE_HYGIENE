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
    <div className="bg-gradient-to-r from-[#0d3f1a] via-[#1d7a34] to-[#28a745] text-white text-xs sm:text-sm py-2 px-4 flex items-center justify-center gap-3 relative animate-gradientShift">
      <span className="hidden sm:inline">🎁</span>
      <span className="font-semibold">
        {t.announcement || "Limited time: 5% off + free island-wide delivery on orders over LKR 3,000"}
      </span>
      <span className="hidden md:inline-flex items-center gap-1 font-mono bg-black/25 px-2 py-0.5 rounded-md">
        ⏱ {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
      </span>
      <button
        onClick={() => {
          setHide(true);
          sessionStorage.setItem("hideAnnouncement", "1");
        }}
        aria-label="Dismiss"
        className="absolute right-2 text-white/70 hover:text-white text-base leading-none"
      >
        ×
      </button>
    </div>
  );
}
