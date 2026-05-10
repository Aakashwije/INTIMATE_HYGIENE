import { Gift, Leaf, Share2, ShoppingBag, Smartphone, Zap } from "lucide-react";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import { useLang } from "../context/LangContext";

const steps = [
  {
    icon: Share2,
    title: "Share Your Link",
    desc: "Enter your name below to generate a personalised WhatsApp share message. Send it to friends, family, or on social media.",
  },
  {
    icon: ShoppingBag,
    title: "Friend Orders",
    desc: "When your friend orders and mentions your name, they receive 10% off their first purchase automatically.",
  },
  {
    icon: Gift,
    title: "You Get Rewarded",
    desc: "As soon as their order is confirmed, we'll apply 10% off to your next order too. Win-win!",
  },
];

const perks = [
  { icon: Zap,        title: "No Limit",           desc: "Refer as many friends as you like. Every successful referral earns you a discount." },
  { icon: Gift,       title: "Instant Reward",      desc: "Your discount is applied the moment your referral's order is confirmed." },
  { icon: Leaf,       title: "Spread Hygiene",      desc: "Help your community stay safe. Every referral means one more person protected." },
  { icon: Smartphone, title: "Works on WhatsApp",   desc: "No app, no signup needed. Just share a message and we handle the rest." },
];

export default function Referral() {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [shared, setShared] = useState(false);

  const handleShare = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    const msg = encodeURIComponent(
      `Hey! I've been using Intimate Hygiene disposable toilet seat covers and they're amazing!\n\n` +
        `Eco-friendly & biodegradable\n` +
        `Anti-bacterial protection\n` +
        `Perfect for travel, hotels & daily use\n\n` +
        `Use my name *${trimmed}* when you order and we BOTH get 10% off!\n\n` +
        `Order on WhatsApp: +94 72 999 1950\n` +
        `Website: https://aakashwije.github.io/INTIMATE_HYGIENE/`,
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
    setShared(true);
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        className="relative flex items-center justify-center text-center text-white px-5 py-20 rounded-b-[40px] shadow-lg animate-fadeInHero overflow-hidden"
        style={{ background: "linear-gradient(135deg, rgba(13,63,26,0.92), rgba(40,167,69,0.88))" }}
      >
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl animate-blob" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#5cd65c]/20 blur-3xl animate-blob-slow" />
        <div className="relative z-10 max-w-2xl">
          <div className="w-20 h-20 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-5 border border-white/30">
            <Gift className="w-10 h-10 text-yellow-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">Refer & Earn</h1>
          <p className="text-lg opacity-90">Share with friends and you both get 10% off your next order.</p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-5 py-14 space-y-14">
        {/* How it works */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center mb-1">
                  <Icon className="w-8 h-8 text-[#28a745]" />
                </div>
                <div className="w-7 h-7 rounded-full bg-[#28a745] text-white text-sm font-bold flex items-center justify-center -mt-1">
                  {i + 1}
                </div>
                <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Perks */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Why Refer?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {perks.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-4 bg-white rounded-2xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-[#28a745]" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 mb-1">{title}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Share form */}
        <section className="bg-gradient-to-br from-[#28a745] to-[#1d7a34] rounded-2xl p-8 text-white text-center shadow-xl">
          <Gift className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Generate Your Referral Message</h2>
          <p className="text-white/80 mb-6 text-sm">Enter your name and we'll craft the perfect WhatsApp message for you.</p>

          {shared ? (
            <div className="bg-white/15 rounded-xl p-5 max-w-sm mx-auto">
              <Gift className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
              <p className="font-bold text-lg">Message sent!</p>
              <p className="text-white/75 text-sm mt-1">Tell your friends to mention your name when ordering.</p>
              <button
                onClick={() => setShared(false)}
                className="mt-4 text-xs text-white/60 hover:text-white underline"
              >
                Share again
              </button>
            </div>
          ) : (
            <form onSubmit={handleShare} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (e.g. Nimesha)"
                required
                className="flex-1 px-5 py-3.5 rounded-xl text-gray-800 outline-none focus:ring-4 focus:ring-white/40 placeholder-gray-400 bg-white"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#28a745] font-bold rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap shadow-md"
              >
                <Share2 className="w-4 h-4" /> Share on WhatsApp
              </button>
            </form>
          )}
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
