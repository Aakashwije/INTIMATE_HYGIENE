import {
  Baby,
  Briefcase,
  Bug,
  Building2,
  HeartPulse,
  Leaf,
  Microscope,
  Newspaper,
  Plane,
  Recycle,
  ShoppingBag,
  Sparkles,
  Star,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Reveal from "../components/Reveal";
import ScrollToTop from "../components/ScrollToTop";
import SEO from "../components/SEO";
import { useLang } from "../context/LangContext";

const articles = [
  {
    id: 1,
    category: "Health & Hygiene",
    readTime: "4 min read",
    date: "April 20, 2025",
    icon: Bug,
    featured: true,
    title: "Why You Should Never Sit on a Public Toilet Seat",
    excerpt:
      "Studies reveal that a single public toilet seat can harbor up to 295 different types of bacteria per square inch. Here's what you need to know — and what to do about it.",
    content: [
      "Public restrooms are used by hundreds — sometimes thousands — of people every day. Each visitor leaves behind a cocktail of bacteria, viruses, and fungi.",
      "When you sit on an uncovered toilet seat, your skin comes into direct contact with these pathogens. While healthy skin provides some protection, cuts, rashes, or open pores can allow bacteria to enter.",
      "The solution is simple: a disposable toilet seat cover creates a hygienic barrier between you and the seat. Eco-friendly covers dissolve in water after use, leaving no waste behind.",
      "Key statistics: A study by the University of Arizona found toilet seats harbor over 295 different types of bacteria per square inch. Pathogens can survive on surfaces for up to 48 hours.",
      "Protect yourself every time with Hygenc disposable seat covers — compact, eco-friendly, and designed for modern life.",
    ],
  },
  {
    id: 2,
    category: "Travel Tips",
    readTime: "3 min read",
    date: "March 15, 2025",
    icon: Plane,
    featured: false,
    title: "5 Travel Hygiene Habits That Could Save Your Life",
    excerpt:
      "Seasoned travelers know hygiene on the road requires extra vigilance. These 5 habits make the difference between staying healthy and falling ill.",
    content: [
      "1. Always carry disposable toilet seat covers. Airports, train stations, and roadside restrooms are high-traffic zones for bacterial contamination.",
      "2. Wash hands for at least 20 seconds. Many traveler illnesses start with improper handwashing after using restrooms.",
      "3. Sanitize your phone and wallet regularly. We place these on restroom surfaces unconsciously.",
      "4. Avoid touching your face after handling surfaces in public spaces. Pathogens enter through mucous membranes.",
      "5. Stay hydrated and maintain your immune system. Our Waterproof 5-Pack is specifically designed for frequent travelers — waterproof, anti-slip, and compact.",
    ],
  },
  {
    id: 3,
    category: "Industry",
    readTime: "5 min read",
    date: "February 8, 2025",
    icon: Building2,
    featured: false,
    title: "How Hotels Are Embracing Eco-Friendly Hygiene Solutions",
    excerpt:
      "The hospitality industry is pivoting toward sustainable hygiene. Here's how top hotels in Sri Lanka and worldwide are making the switch.",
    content: [
      "Guest expectations have changed dramatically post-pandemic. Today's hotel guests actively look for visible hygiene measures.",
      "Hotels that provide disposable seat covers see a measurable improvement in guest satisfaction scores. 72% said they felt more comfortable where hygiene accessories were provided.",
      "The eco-friendly angle matters too. Our biodegradable, water-soluble covers check all ESG boxes.",
      "Several 5-star properties in Colombo have already made the switch. Operational overhead is minimal — one dispenser per bathroom.",
      "Our Enterprise 10-Pack offer includes a free dispenser and instructions, making it practical for properties with 20+ rooms.",
    ],
  },
  {
    id: 4,
    category: "Science",
    readTime: "4 min read",
    date: "January 25, 2025",
    icon: Microscope,
    featured: false,
    title: "The Truth About Bacteria on Public Toilet Seats",
    excerpt:
      "The science is more alarming than most people know. We break down exactly what lives on public toilet surfaces.",
    content: [
      "A toilet seat is exposed to fecal matter, urine aerosol, and respiratory droplets thousands of times per day in a busy public facility.",
      "Common bacteria found: E. coli, Staphylococcus aureus (including MRSA), Streptococcus, Salmonella, Shigella, and various enteroviruses.",
      "The myth that a toilet seat is 'too smooth for bacteria to survive' has been debunked. Bacteria form biofilms on smooth surfaces.",
      "Standard restroom cleaning reduces bacterial load by ~60% — meaning 40% of pathogens survive between cleanings.",
      "A disposable seat cover reduces pathogen contact by over 99%. For LKR 15 per use, the investment is insignificant.",
    ],
  },
  {
    id: 5,
    category: "Healthcare",
    readTime: "3 min read",
    date: "December 12, 2024",
    icon: HeartPulse,
    featured: false,
    title: "Why Hospitals Are Switching to Disposable Seat Covers",
    excerpt:
      "Infection control is a matter of life and death in healthcare. Disposable toilet seat covers have become standard protocol in top hospitals worldwide.",
    content: [
      "Hospital-acquired infections (HAIs) are responsible for thousands of preventable deaths. Bathrooms are a significant vector for pathogen transmission.",
      "Post-operative and immunocompromised patients are particularly vulnerable. A simple UTI can escalate into life-threatening sepsis.",
      "Progressive hospitals now include disposable toilet seat covers as part of standard patient bathroom supplies.",
      "Our Enterprise 10-Pack offer is available for immediate setup, with custom branding and volume options available for larger orders.",
      "Healthcare hygiene isn't just about the operating theatre. Every touchpoint matters — including the bathroom.",
    ],
  },
  {
    id: 6,
    category: "Lifestyle",
    readTime: "3 min read",
    date: "November 5, 2024",
    icon: Baby,
    featured: false,
    title: "Protecting Your Children in Public Restrooms",
    excerpt:
      "Children's immune systems are still developing, making them far more vulnerable. Here's how to keep them safe.",
    content: [
      "Children touch everything — and then touch their faces. In a public restroom, this behavior dramatically increases the risk of pathogen transfer.",
      "Children under 5 are especially vulnerable because their immune systems are not yet fully developed.",
      "Common illnesses linked to unsanitary restroom contact include gastroenteritis, E. coli infections, and skin infections.",
      "A disposable toilet seat cover provides a clean barrier for small children. It takes less than 10 seconds to place.",
      "Our Non-Waterproof 5-Pack is perfect for families — compact, individually wrapped, and biodegradable.",
    ],
  },
  {
    id: 7,
    category: "Eco Living",
    readTime: "4 min read",
    date: "October 18, 2024",
    icon: Recycle,
    featured: false,
    title: "Are Disposable Hygiene Products Bad for the Environment?",
    excerpt:
      "A common concern — but the answer might surprise you. Here's the science behind eco-friendly, water-soluble toilet seat covers.",
    content: [
      "Traditional plastic-based disposable hygiene products are rightly criticised. But not all disposables are equal.",
      "Hygenc seat covers are made from water-soluble paper that breaks down completely within seconds of contact with water — no microplastics, no landfill waste.",
      "Reusable cloth covers require hot-water laundering after every use, consuming significant water and energy.",
      "Life-cycle analysis shows our covers have a lower environmental impact per use than the laundry alternative.",
      "Protecting your health and protecting the planet are not in conflict.",
    ],
  },
  {
    id: 8,
    category: "Health & Hygiene",
    readTime: "5 min read",
    date: "September 3, 2024",
    icon: Briefcase,
    featured: false,
    title: "Office Hygiene: The Hidden Risk in Your Workplace Bathroom",
    excerpt:
      "Your office bathroom is shared by dozens of colleagues daily. The hygiene risks are real — and most companies aren't doing enough.",
    content: [
      "Office bathrooms are used by the same group of people repeatedly. The bacterial ecosystem that builds up can be just as concerning as a public restroom.",
      "Employee absenteeism due to gastrointestinal illness costs Sri Lankan businesses millions per year in lost productivity.",
      "Progressive companies have begun providing disposable toilet seat covers in employee bathrooms as part of wellness programs.",
      "Providing hygiene accessories communicates that the company values its people — a low-cost investment in employee satisfaction.",
      "Our Enterprise 10-Pack offer is ideal for offices: easy to stock, includes a free dispenser, and can be extended with add-on packs.",
    ],
  },
];

const categoryColors = {
  "Health & Hygiene": {
    bg: "bg-green-100",
    text: "text-green-700",
    border: "border-green-200",
    accent: "bg-green-500",
  },
  "Travel Tips": {
    bg: "bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-200",
    accent: "bg-blue-500",
  },
  Industry: {
    bg: "bg-purple-100",
    text: "text-purple-700",
    border: "border-purple-200",
    accent: "bg-purple-500",
  },
  Science: {
    bg: "bg-orange-100",
    text: "text-orange-700",
    border: "border-orange-200",
    accent: "bg-orange-500",
  },
  Healthcare: {
    bg: "bg-red-100",
    text: "text-red-700",
    border: "border-red-200",
    accent: "bg-red-500",
  },
  Lifestyle: {
    bg: "bg-pink-100",
    text: "text-pink-700",
    border: "border-pink-200",
    accent: "bg-pink-500",
  },
  "Eco Living": {
    bg: "bg-teal-100",
    text: "text-teal-700",
    border: "border-teal-200",
    accent: "bg-teal-500",
  },
};

const allCategories = ["All", ...Object.keys(categoryColors)];

const quickFacts = [
  {
    icon: Bug,
    stat: "295+",
    label: "Bacteria types per sq inch on toilet seats",
  },
  {
    icon: Sparkles,
    stat: "99%",
    label: "Pathogen contact reduction with a cover",
  },
  { icon: Leaf, stat: "100%", label: "Biodegradable & water-soluble" },
  {
    icon: Building2,
    stat: "200+",
    label: "Businesses trust Hygenc island-wide",
  },
];

export default function Blog() {
  const { t } = useLang();
  const [expanded, setExpanded] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = articles.find((a) => a.featured);
  const filtered = articles
    .filter((a) => !a.featured)
    .filter((a) => activeCategory === "All" || a.category === activeCategory);

  return (
    <>
      <SEO
        title="Blog – Hygiene Tips & News"
        description="Read hygiene tips, product guides and news from Intimate Hygiene Enterprises. Stay informed and stay safe in public restrooms."
        path="/blog"
      />
      <Navbar />

      {/* Hero */}
      <section
        className="relative flex items-center justify-center text-center text-white px-5 py-20 rounded-b-[40px] shadow-lg overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(13,63,26,0.92), rgba(40,167,69,0.88))",
        }}
      >
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-white/10 blur-3xl animate-blob" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl animate-blob-slow" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-xs font-semibold">
            <Newspaper className="w-4 h-4" /> Hygiene Education Hub
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">
            {t.blogHeroTitle}
          </h1>
          <p className="text-lg md:text-xl leading-relaxed opacity-90 mb-8">
            {t.blogHeroSub}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              ["8", "Expert Articles"],
              ["10K+", "Monthly Readers"],
              ["7", "Categories"],
              ["2025", "Latest Issue"],
            ].map(([v, l]) => (
              <div key={l} className="text-center">
                <p className="text-2xl font-bold">{v}</p>
                <p className="text-xs opacity-75">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto py-14 px-5">
        {/* Featured Article */}
        {featured &&
          (() => {
            const FeaturedIcon = featured.icon;
            const colors = categoryColors[featured.category];
            return (
              <Reveal>
                <div className="mb-14 bg-gradient-to-br from-green-900 to-green-700 rounded-3xl overflow-hidden shadow-2xl relative">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.05),transparent_60%)]" />
                  <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
                    <div className="shrink-0 w-32 h-32 md:w-44 md:h-44 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                      <FeaturedIcon className="w-16 h-16 md:w-24 md:h-24 text-white/80" />
                    </div>
                    <div className="text-white text-left flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="flex items-center gap-1.5 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
                          <Star className="w-3 h-3 fill-current" /> Featured
                        </span>
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${colors.bg} ${colors.text}`}
                        >
                          {featured.category}
                        </span>
                        <span className="text-white/60 text-xs">
                          {featured.date} · {featured.readTime}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-snug">
                        {featured.title}
                      </h2>
                      <p className="text-white/80 leading-relaxed mb-5 text-sm md:text-base">
                        {featured.excerpt}
                      </p>
                      {expanded === featured.id && (
                        <div className="space-y-3 border-t border-white/20 pt-4 mb-5">
                          {featured.content.map((para, i) => (
                            <p
                              key={i}
                              className="text-white/75 leading-relaxed text-sm"
                            >
                              {para}
                            </p>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() =>
                            setExpanded(
                              expanded === featured.id ? null : featured.id,
                            )
                          }
                          className="px-5 py-2.5 bg-white text-green-800 font-bold rounded-xl text-sm hover:bg-green-50 transition-colors"
                        >
                          {expanded === featured.id
                            ? `← ${t.showLess}`
                            : `${t.readMore} →`}
                        </button>
                        <Link
                          to="/products"
                          className="flex items-center gap-2 px-5 py-2.5 border-2 border-white/40 text-white font-semibold rounded-xl text-sm hover:bg-white/10 transition-colors"
                        >
                          <ShoppingBag className="w-4 h-4" /> Shop Protection
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })()}

        {/* Category Filter */}
        <Reveal>
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#28a745] text-white shadow-md scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((article, i) => {
            const colors = categoryColors[article.category];
            const isOpen = expanded === article.id;
            const ArticleIcon = article.icon;
            return (
              <Reveal key={article.id} delay={i * 80}>
                <article
                  className={`bg-white rounded-2xl shadow-md overflow-hidden border ${colors.border} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full`}
                >
                  <div className={`h-1 w-full ${colors.accent}`} />
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center shrink-0`}
                      >
                        <ArticleIcon className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <div>
                        <span
                          className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${colors.bg} ${colors.text}`}
                        >
                          {article.category}
                        </span>
                        <p className="text-gray-400 text-xs mt-1">
                          {article.date} · {article.readTime}
                        </p>
                      </div>
                    </div>
                    <h2 className="text-base font-bold text-gray-800 mb-2 leading-snug">
                      {article.title}
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">
                      {article.excerpt}
                    </p>
                    <div
                      className={`overflow-hidden transition-all duration-500 ${isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <div className="space-y-3 border-t border-gray-100 pt-4 pb-2">
                        {article.content.map((para, j) => (
                          <p
                            key={j}
                            className="text-gray-600 leading-relaxed text-xs"
                          >
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => setExpanded(isOpen ? null : article.id)}
                      className={`mt-2 text-sm font-semibold transition-colors ${colors.text} hover:underline text-left`}
                    >
                      {isOpen ? `← ${t.showLess}` : `${t.readMore} →`}
                    </button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* CTA */}
        <Reveal variant="zoom">
          <div className="mt-14 bg-gradient-to-br from-[#28a745] to-[#1d7a34] rounded-2xl p-8 text-white text-center shadow-xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7 text-yellow-300" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">
                Ready to protect yourself?
              </h3>
              <p className="text-white/80 mb-6 text-sm max-w-md mx-auto">
                Join 10,000+ Sri Lankans who choose Hygenc. Starting from LKR
                150.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/products"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-[#28a745] font-bold rounded-xl text-sm hover:bg-green-50 transition-colors shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" /> Shop Products
                </Link>
                <a
                  href="https://wa.me/94707018171?text=Hello!%20I%20read%20your%20blog%20and%20want%20to%20order."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white/15 border border-white/40 text-white font-semibold rounded-xl text-sm hover:bg-white/25 transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-current shrink-0"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Quick facts */}
        <Reveal>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickFacts.map(({ icon: Icon, stat, label }) => (
              <div
                key={stat}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-5 h-5 text-[#28a745]" />
                </div>
                <p className="text-2xl font-bold text-[#28a745]">{stat}</p>
                <p className="text-xs text-gray-500 mt-1 leading-snug">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* B2B nudge */}
        <Reveal>
          <div className="mt-8 flex flex-col md:flex-row items-center gap-5 bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center shrink-0">
              <Building2 className="w-7 h-7 text-gray-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h4 className="font-bold text-gray-800 mb-1">
                Running a hotel, clinic, or office?
              </h4>
              <p className="text-gray-500 text-sm">
                Get bulk pricing, free dispensers, and custom branding with our
                Enterprise 10-Pack offer.
              </p>
            </div>
            <Link
              to="/b2b"
              className="shrink-0 px-5 py-2.5 bg-gray-900 text-white font-semibold rounded-xl text-sm hover:bg-gray-700 transition-colors whitespace-nowrap"
            >
              Enquire B2B →
            </Link>
          </div>
        </Reveal>
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
