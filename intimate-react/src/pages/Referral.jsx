import { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ScrollToTop from '../components/ScrollToTop';

const steps = [
  {
    icon: '📤',
    title: 'Share Your Link',
    desc: 'Enter your name below to generate a personalised WhatsApp share message. Send it to friends, family, or on social media.',
  },
  {
    icon: '🛍️',
    title: 'Friend Orders',
    desc: 'When your friend orders and mentions your name, they receive 10% off their first purchase automatically.',
  },
  {
    icon: '🎁',
    title: 'You Get Rewarded',
    desc: "As soon as their order is confirmed, we'll apply 10% off to your next order too. Win-win!",
  },
];

const perks = [
  { icon: '💸', title: 'No Limit', desc: 'Refer as many friends as you like. Every successful referral earns you a discount.' },
  { icon: '⚡', title: 'Instant Reward', desc: 'Your discount is applied the moment your referral\'s order is confirmed.' },
  { icon: '🌿', title: 'Spread Hygiene', desc: 'Help your community stay safe. Every referral means one more person protected.' },
  { icon: '📱', title: 'Works on WhatsApp', desc: 'No app, no signup needed. Just share a message and we handle the rest.' },
];

export default function Referral() {
  const [name, setName] = useState('');
  const [shared, setShared] = useState(false);

  const handleShare = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    const msg = encodeURIComponent(
      `Hey! 👋 I've been using Intimate Hygiene disposable toilet seat covers and they're amazing! 🌿\n\n` +
      `✅ Eco-friendly & biodegradable\n` +
      `✅ Anti-bacterial protection\n` +
      `✅ Perfect for travel, hotels & daily use\n\n` +
      `Use my name *${trimmed}* when you order and we BOTH get 10% off! 🎉\n\n` +
      `📲 Order on WhatsApp: +94 72 999 1950\n` +
      `🌐 Website: https://aakashwije.github.io/INTIMATE_HYGIENE/`
    );
    window.open(`https://wa.me/?text=${msg}`, '_blank');
    setShared(true);
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        className="relative flex items-center justify-center text-center text-white px-5 py-16 rounded-b-[40px] shadow-lg animate-fadeInHero overflow-hidden"
        style={{
          background:
            'linear-gradient(rgba(40,167,69,0.85), rgba(40,167,69,0.85)), url("/hero.jpg") no-repeat center/cover',
        }}
      >
        <div className="absolute inset-0 bg-[rgba(40,167,69,0.25)] rounded-b-[40px]" />
        <div className="relative z-10 max-w-3xl">
          <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            Referral Programme
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 drop-shadow-md">
            Give 10%, Get 10% 🎁
          </h1>
          <p className="text-lg md:text-xl leading-relaxed opacity-95">
            Share Intimate Hygiene with a friend. When they order, you both save 10%.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-5 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(({ icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center bg-white rounded-2xl shadow-md p-8 hover:-translate-y-1 transition-transform duration-300">
              <span className="text-5xl mb-4">{icon}</span>
              <h3 className="font-semibold text-gray-800 text-lg mb-3">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Share Form */}
      <section className="py-10 px-5 bg-[#28a745]">
        <div className="max-w-lg mx-auto text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Share Now & Earn 10% Off</h2>
          <p className="opacity-90 mb-6 text-sm">Enter your name so your friends can mention it when ordering.</p>
          {shared ? (
            <div className="bg-white text-[#28a745] rounded-2xl p-6 font-semibold text-lg shadow-lg">
              🎉 Message sent! You'll get 10% off when your friend orders.
            </div>
          ) : (
            <form onSubmit={handleShare} className="flex gap-3">
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="flex-1 rounded-xl px-4 py-3 text-gray-800 focus:outline-none text-sm"
              />
              <button
                type="submit"
                className="bg-gray-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors text-sm whitespace-nowrap"
              >
                Share on WhatsApp
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Perks */}
      <section className="py-16 px-5 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Why Refer?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {perks.map(({ icon, title, desc }) => (
            <div key={title} className="bg-white rounded-xl shadow-md p-6 text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              <span className="text-4xl mb-3 block">{icon}</span>
              <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Terms */}
      <section className="max-w-2xl mx-auto px-5 pb-16 text-center">
        <p className="text-gray-400 text-xs leading-relaxed">
          Terms & Conditions: Discount applies to the referred person's first order only. Referrer's discount is applied to their next confirmed order after the referral order is placed. Cannot be combined with other offers. Intimate Hygiene Enterprises reserves the right to modify or terminate this programme at any time.
        </p>
      </section>

      <Footer />
      <ScrollToTop />
    </>
  );
}
