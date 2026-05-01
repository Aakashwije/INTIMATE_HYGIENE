import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";

const articles = [
  {
    id: 1,
    category: "Health & Hygiene",
    readTime: "4 min read",
    date: "April 20, 2025",
    title: "Why You Should Never Sit on a Public Toilet Seat",
    excerpt:
      "Studies reveal that a single public toilet seat can harbor up to 50 different types of bacteria. Here's what you need to know to protect yourself.",
    content: [
      "Public restrooms are used by hundreds — sometimes thousands — of people every day. Each visitor leaves behind a cocktail of bacteria, viruses, and fungi. Research has found that surfaces like toilet seats carry E. coli, Staphylococcus aureus, and even antibiotic-resistant bacteria.",
      "When you sit on an uncovered toilet seat, your skin comes into direct contact with these pathogens. While healthy skin provides some protection, cuts, rashes, or open pores can allow bacteria to enter your body.",
      "The solution is simple: a disposable toilet seat cover creates a hygienic barrier between you and the seat. Eco-friendly covers like ours dissolve in water after use, leaving no waste behind.",
      "Key statistics: A study by the University of Arizona found toilet seats harbor over 295 different types of bacteria per square inch. Pathogens can survive on surfaces for up to 48 hours.",
      "Protect yourself every time with Intimate Hygiene disposable seat covers — compact, eco-friendly, and designed for modern life.",
    ],
  },
  {
    id: 2,
    category: "Travel Tips",
    readTime: "3 min read",
    date: "March 15, 2025",
    title: "5 Travel Hygiene Habits That Could Save Your Life",
    excerpt:
      "Seasoned travelers know hygiene on the road requires extra vigilance. These 5 habits make all the difference between staying healthy and falling ill.",
    content: [
      "1. Always carry disposable toilet seat covers. Airports, train stations, and roadside restrooms are high-traffic zones for bacterial contamination. Pocket-sized covers take up almost no space in your bag.",
      "2. Wash hands for at least 20 seconds. Many traveler illnesses start with improper handwashing after using restrooms. Use soap and warm water thoroughly.",
      "3. Sanitize your phone and wallet regularly. We place these on restroom surfaces unconsciously. Wipe them down with alcohol wipes daily when traveling.",
      "4. Avoid touching your face after handling surfaces in public spaces. Pathogens enter through mucous membranes — eyes, nose, and mouth.",
      "5. Stay hydrated and maintain your immune system. A strong immune system is your last line of defense. Drink clean water and avoid raw foods from unknown sources while traveling.",
      "Our Travel Pack is specifically designed for frequent travelers — waterproof, anti-slip, and compact enough to fit in any bag.",
    ],
  },
  {
    id: 3,
    category: "Industry",
    readTime: "5 min read",
    date: "February 8, 2025",
    title: "How Hotels Are Embracing Eco-Friendly Hygiene Solutions",
    excerpt:
      "The global hospitality industry is pivoting toward sustainable hygiene. Here's how top hotels in Sri Lanka and worldwide are making the switch.",
    content: [
      "Guest expectations have changed dramatically post-pandemic. Today's hotel guests actively look for visible hygiene measures — and toilet seat covers are one of the most requested amenities in luxury properties worldwide.",
      "Hotels that provide disposable seat covers see a measurable improvement in guest satisfaction scores. In a survey of 500 hotel guests in South Asia, 72% said they felt more comfortable where hygiene accessories were provided.",
      "The eco-friendly angle matters too. Hotels increasingly need to demonstrate ESG commitments to attract corporate clients and sustainability-conscious travelers. Our biodegradable, water-soluble covers check all those boxes.",
      "Several 5-star properties in Colombo have already made the switch. The operational overhead is minimal — a single dispenser in each bathroom, refilled monthly based on occupancy.",
      "Our Enterprise Pack includes a free dispenser and bulk pricing that makes financial sense for any property with 20+ rooms. Contact us for a custom quote.",
    ],
  },
  {
    id: 4,
    category: "Science",
    readTime: "4 min read",
    date: "January 25, 2025",
    title: "The Truth About Bacteria on Public Toilet Seats",
    excerpt:
      "The science is more alarming than you think. We break down exactly what lives on public toilet surfaces and why disposable covers are a medical necessity.",
    content: [
      "A toilet seat is exposed to fecal matter, urine aerosol, and respiratory droplets thousands of times per day in a busy public facility. Under a microscope, the findings are unsettling.",
      "Common bacteria found: Escherichia coli (E. coli), Staphylococcus aureus (including MRSA strains), Streptococcus, Salmonella, Shigella, and various enteroviruses.",
      'The myth that a toilet seat is "too smooth for bacteria to survive" has been debunked. Bacteria form biofilms on smooth surfaces that are resistant to basic cleaning agents.',
      "Standard restroom cleaning protocols reduce bacterial load by approximately 60% — meaning 40% of pathogens survive between cleanings.",
      "A disposable seat cover reduces pathogen contact by over 99%. For LKR 15 per use, the investment in your health is insignificant compared to a single doctor visit.",
    ],
  },
  {
    id: 5,
    category: "Healthcare",
    readTime: "3 min read",
    date: "December 12, 2024",
    title: "Why Hospitals Are Switching to Disposable Seat Covers",
    excerpt:
      "Infection control is a matter of life and death in healthcare settings. Disposable toilet seat covers have become standard protocol in top hospitals worldwide.",
    content: [
      "Hospital-acquired infections (HAIs) cost healthcare systems billions annually and are responsible for thousands of preventable deaths. Bathrooms are a significant vector for pathogen transmission.",
      "Post-operative and immunocompromised patients are particularly vulnerable. A simple UTI contracted from a restroom surface can escalate into life-threatening sepsis in high-risk patients.",
      "Progressive hospitals now include disposable toilet seat covers as part of standard patient bathroom supplies — alongside hand sanitizer, gloves, and sterile wipes.",
      "For hospital procurement teams: our Enterprise Pack is available with hospital-grade packaging, custom branding, and volume discounts starting at 100 packs. Compatible wall-mounted dispensers available.",
      "Healthcare hygiene isn't just about the operating theatre. Every touchpoint matters — including the bathroom. Make disposable seat covers part of your infection control protocol.",
    ],
  },
];

const categoryColors = {
  "Health & Hygiene": "bg-green-100 text-green-700",
  "Travel Tips": "bg-blue-100 text-blue-700",
  Industry: "bg-purple-100 text-purple-700",
  Science: "bg-orange-100 text-orange-700",
  Healthcare: "bg-red-100 text-red-700",
};

export default function Blog() {
  const { t } = useLang();
  const [expanded, setExpanded] = useState(null);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section
        className="relative flex items-center justify-center text-center text-white px-5 py-16 rounded-b-[40px] shadow-lg animate-fadeInHero overflow-hidden"
        style={{ background: 'linear-gradient(rgba(40,167,69,0.85), rgba(40,167,69,0.85)), url("/hero.jpg") no-repeat center/cover' }}
      >
        <div className="absolute inset-0 bg-[rgba(40,167,69,0.25)] rounded-b-[40px]" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-5 drop-shadow-md">{t.blogHeroTitle}</h1>
          <p className="text-lg md:text-xl leading-relaxed opacity-95">{t.blogHeroSub}</p>
        </div>
      </section>

      {/* Articles */}
      <main className="max-w-3xl mx-auto py-16 px-5 space-y-6">
        {articles.map(({ id, category, readTime, date, title, excerpt, content }) => (
          <article key={id} className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-7">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[category]}`}>{category}</span>
                <span className="text-gray-400 text-xs">{date}</span>
                <span className="text-gray-400 text-xs">· {readTime}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-3">{title}</h2>
              <p className="text-gray-500 leading-relaxed mb-4">{excerpt}</p>

              {expanded === id && (
                <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
                  {content.map((para, i) => (
                    <p key={i} className="text-gray-600 leading-relaxed text-sm">{para}</p>
                  ))}
                </div>
              )}

              <button onClick={() => setExpanded(expanded === id ? null : id)} className="mt-4 text-[#28a745] font-semibold hover:underline text-sm">
                {expanded === id ? `← ${t.showLess}` : `${t.readMore} →`}
              </button>
            </div>
          </article>
        ))}
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
