import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SEO from "../components/SEO";
import ScrollToTop from "../components/ScrollToTop";
import { createQuizResponse, trackSiteEvent } from "../lib/database";

const QUESTIONS = [
  {
    id: "usage",
    question: "Where will you mainly use these?",
    options: [
      { label: "🏠 At home / daily use", value: "home" },
      { label: "✈️ Travelling / on the go", value: "travel" },
      { label: "🏨 Hotel, office or restaurant", value: "business" },
      { label: "🏥 Hospital or healthcare facility", value: "healthcare" },
    ],
  },
  {
    id: "people",
    question: "How many people will use these?",
    options: [
      { label: "👤 Just me", value: "solo" },
      { label: "👨‍👩‍👧 My family (2–6 people)", value: "family" },
      { label: "🏢 A small team (up to 30)", value: "small_biz" },
      { label: "🏗️ Large operation (30+ people)", value: "large_biz" },
    ],
  },
  {
    id: "priority",
    question: "What matters most to you?",
    options: [
      { label: "💰 Best price", value: "price" },
      { label: "🌿 Eco-friendly / biodegradable", value: "eco" },
      { label: "💧 Waterproof & anti-slip", value: "waterproof" },
      { label: "🚽 Flushable (no bin needed)", value: "flushable" },
    ],
  },
  {
    id: "frequency",
    question: "How often do you need them?",
    options: [
      { label: "🗓️ Once in a while", value: "occasional" },
      { label: "📅 Every week", value: "weekly" },
      { label: "📦 Monthly bulk order", value: "monthly" },
      { label: "🔄 Ongoing / subscription", value: "ongoing" },
    ],
  },
];

function getRecommendation(answers) {
  const { usage, people, priority, frequency } = answers;

  // Enterprise signals
  if (
    usage === "business" ||
    usage === "healthcare" ||
    people === "large_biz" ||
    priority === "flushable" ||
    frequency === "ongoing"
  ) {
    return {
      id: 3,
      name: "Enterprise Pack (Flushable)",
      desc: "With a free plastic dispenser included, this flushable pack is designed for high-traffic environments. Perfect for hotels, hospitals, offices and any large operation.",
      price: "LKR 750 / pack",
      badge: "🏆 Best for Business",
      img: "/interprisenew.png",
      link: "/products/3",
      whatsapp:
        "Hello! I completed the product quiz and was recommended the Enterprise Pack. Please share bulk pricing and availability.",
      perks: [
        "Flushable — no bin required",
        "Free plastic dispenser",
        "Custom branding available",
        "Bulk discounts",
      ],
    };
  }

  // Travel signals
  if (
    usage === "travel" ||
    priority === "waterproof" ||
    people === "solo" ||
    frequency === "occasional"
  ) {
    return {
      id: 2,
      name: "Travel Pack (Waterproof)",
      desc: "Compact, waterproof and anti-slip — the ideal companion for commuters, travellers and anyone who is always on the move.",
      price: "LKR 350 / 10-pack",
      badge: "✈️ Best for Travellers",
      img: "/travelnew.png",
      link: "/products/2",
      whatsapp:
        "Hello! I completed the product quiz and was recommended the Travel Pack. Please share availability and delivery details.",
      perks: [
        "Waterproof & anti-slip",
        "Compact pocket size",
        "Great for travel",
        "Minimum order 5 packs",
      ],
    };
  }

  // Default — Single Use
  return {
    id: 1,
    name: "Single Use Pack",
    desc: "Biodegradable, individually wrapped and affordable — our most popular pack for everyday home and family use.",
    price: "LKR 250 / pack",
    badge: "🌿 Most Popular",
    img: "/normalnew.png",
    link: "/products/1",
    whatsapp:
      "Hello! I completed the product quiz and was recommended the Single Use Pack. Please share availability and delivery details.",
    perks: [
      "100% biodegradable",
      "Individually wrapped",
      "Safe for all skin types",
      "Minimum order 10 packs",
    ],
  };
}

function scoreRecommendation(result) {
  if (result.id === 3) return 10;
  if (result.id === 2) return 8;
  return 6;
}

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const question = QUESTIONS[step];
  const progress = Math.round((step / QUESTIONS.length) * 100);

  const handleAnswer = async (value) => {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const recommendation = getRecommendation(newAnswers);
      setResult(recommendation);
      createQuizResponse({
        answers: newAnswers,
        result: recommendation.name,
        score: scoreRecommendation(recommendation),
      }).catch(() => {});
      trackSiteEvent({
        event_type: "quiz_complete",
        label: recommendation.name,
        metadata: { answers: newAnswers },
      });
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <>
      <SEO
        title="Which Product Is Right for Me?"
        description="Take our quick 4-question quiz to find the perfect Intimate Hygiene toilet seat cover for your home, travel or business needs."
        path="/quiz"
      />
      <Navbar />

      {/* Hero */}
      <section
        className="relative flex items-center justify-center text-center text-white px-5 py-20 rounded-b-[40px] shadow-lg animate-fadeInHero overflow-hidden"
        style={{
          background:
            'linear-gradient(rgba(40,167,69,0.85), rgba(40,167,69,0.85)), url("/hero.jpg") no-repeat center/cover',
        }}
      >
        <div className="absolute inset-0 bg-[rgba(40,167,69,0.25)] rounded-b-[40px]" />
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">
            Which product is right for me?
          </h1>
          <p className="text-lg opacity-90">
            Answer 4 quick questions — we'll find your perfect match.
          </p>
        </div>
      </section>

      <main className="max-w-2xl mx-auto px-4 py-14">
        {!result ? (
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10">
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>
                  Question {step + 1} of {QUESTIONS.length}
                </span>
                <span>{progress}% complete</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-[#28a745] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
              {question.question}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className="text-left px-5 py-4 rounded-xl border-2 border-gray-200 hover:border-[#28a745] hover:bg-green-50 transition-all font-medium text-gray-700 hover:text-[#28a745] text-sm"
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="mt-6 text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2"
              >
                ← Go back
              </button>
            )}
          </div>
        ) : (
          /* Result card */
          <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-fadeIn">
            <div className="bg-green-50 px-6 py-4 text-center border-b border-green-100">
              <span className="inline-block bg-[#28a745] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                {result.badge}
              </span>
              <h2 className="text-2xl font-bold text-gray-800">
                We recommend:
              </h2>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-6 items-center mb-6">
                <img
                  src={result.img}
                  alt={result.name}
                  className="w-32 h-32 object-contain rounded-xl bg-gray-50 p-2 shrink-0"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {result.name}
                  </h3>
                  <p className="text-[#28a745] font-semibold text-lg mb-2">
                    {result.price}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {result.desc}
                  </p>
                </div>
              </div>

              <ul className="grid grid-cols-2 gap-2 mb-6">
                {result.perks.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-center gap-2 text-sm text-gray-700 bg-green-50 rounded-lg px-3 py-2"
                  >
                    <span className="text-[#28a745] font-bold">✓</span> {perk}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/94707018171?text=${encodeURIComponent(result.whatsapp)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1ea952] transition-colors text-sm"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 fill-current shrink-0"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Order on WhatsApp
                </a>
                <Link
                  to={result.link}
                  className="flex-1 flex items-center justify-center py-3.5 border-2 border-[#28a745] text-[#28a745] font-bold rounded-xl hover:bg-green-50 transition-colors text-sm"
                >
                  View Product Details
                </Link>
              </div>

              <button
                onClick={reset}
                className="w-full mt-4 text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2"
              >
                ↺ Retake the quiz
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
