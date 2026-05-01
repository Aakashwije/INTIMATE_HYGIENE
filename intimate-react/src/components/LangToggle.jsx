import { useLang } from "../context/LangContext";

const langs = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "si", label: "සිං", flag: "🇱🇰" },
  { code: "ta", label: "தமிழ்", flag: "🇱🇰" },
];

export default function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center gap-0.5 bg-gray-100 rounded-full px-1 py-0.5 border border-gray-200">
      {langs.map(({ code, label, flag }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          title={
            code === "en" ? "English" : code === "si" ? "Sinhala" : "Tamil"
          }
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
            lang === code
              ? "bg-[#28a745] text-white shadow-sm"
              : "text-gray-600 hover:bg-gray-200"
          }`}
        >
          <span>{flag}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
