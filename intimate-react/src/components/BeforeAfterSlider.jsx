import { ArrowLeftRight, Bug, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { useLang } from "../context/LangContext";

export default function BeforeAfterSlider() {
  const { t } = useLang();
  const [pos, setPos] = useState(50);
  const ref = useRef(null);
  const dragging = useRef(false);

  const handleMove = (clientX) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, next)));
  };

  return (
    <div
      ref={ref}
      onMouseDown={(e) => { dragging.current = true; handleMove(e.clientX); }}
      onMouseMove={(e) => dragging.current && handleMove(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => { dragging.current = true; handleMove(e.touches[0].clientX); }}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={() => (dragging.current = false)}
      className="relative w-full max-w-3xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden shadow-xl select-none cursor-ew-resize touch-none"
    >
      {/* Before */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-200 via-amber-100 to-yellow-50 flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-20 h-20 rounded-full bg-amber-200 flex items-center justify-center mx-auto mb-3">
            <Bug className="w-10 h-10 text-amber-700" />
          </div>
          <p className="text-xl md:text-2xl font-bold text-amber-900">{t.withoutCover || "Without a Cover"}</p>
          <p className="text-sm md:text-base text-amber-800/80 mt-1">{t.beforeNote || "295 bacteria types · 48hr survival"}</p>
        </div>
      </div>

      {/* After — clipped */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-green-100 via-green-50 to-emerald-50 flex items-center justify-center"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <div className="text-center px-6">
          <div className="w-20 h-20 rounded-full bg-green-200 flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-10 h-10 text-green-700" />
          </div>
          <p className="text-xl md:text-2xl font-bold text-green-900">{t.withCover || "With Our Cover"}</p>
          <p className="text-sm md:text-base text-green-800/80 mt-1">{t.afterNote || "99% protection · biodegradable"}</p>
        </div>
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.4)]"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-2xl flex items-center justify-center">
          <ArrowLeftRight className="w-5 h-5 text-[#28a745]" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 bg-amber-900/80 text-white text-xs font-bold px-2.5 py-1 rounded-full">
        {t.before || "BEFORE"}
      </div>
      <div className="absolute top-3 right-3 bg-green-900/80 text-white text-xs font-bold px-2.5 py-1 rounded-full">
        {t.after || "AFTER"}
      </div>
    </div>
  );
}
