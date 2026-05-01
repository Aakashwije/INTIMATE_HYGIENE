import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import { useLang } from "../context/LangContext";

/** Single accordion FAQ item */
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-3">
      <button onClick={() => setOpen(!open)} className="w-full text-left px-5 py-4 font-semibold text-gray-800 bg-white hover:bg-gray-50 flex justify-between items-center transition-colors">
        {question}
        <span className={`text-[#28a745] text-xl transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && (
        <div className="px-5 py-4 text-gray-600 bg-gray-50 border-t border-gray-200 text-sm leading-relaxed">{answer}</div>
      )}
    </div>
  );
}

export default function FAQ() {
  const { t } = useLang();

  const faqData = [
    {
      category: t.faqCat1,
      items: [
        { q: "What are disposable toilet seat covers?", a: "Disposable toilet seat covers are single-use, hygienic covers designed to protect you from direct contact with public toilet seats." },
        { q: "What material are the covers made of?", a: "Our covers are made from biodegradable, flushable paper that is safe for plumbing and septic systems." },
        { q: "Are the covers flushable?", a: "Yes, they are designed to break down quickly in water and can be flushed without harming your pipes or the environment." },
        { q: "Do the covers fit all toilets?", a: "Our covers are designed to fit standard toilet seats commonly found in public and private restrooms." },
      ],
    },
    {
      category: t.faqCat2,
      items: [
        { q: "Do toilet covers actually protect me from germs?", a: "While toilet seats aren't the dirtiest surface in a restroom, using a cover reduces direct skin contact and provides peace of mind." },
        { q: "Are your covers safe for children?", a: "Absolutely. They're perfect for kids who may be more sensitive to public restrooms." },
      ],
    },
    {
      category: t.faqCat3,
      items: [
        { q: "How do I use a disposable toilet seat cover?", a: "Simply remove a cover, place it over the seat with the flag hanging inside the bowl, and flush after use." },
        { q: "Do you offer travel packs?", a: "Yes, we provide convenient packs that easily fit in your bag, car, or pocket." },
      ],
    },
    {
      category: t.faqCat4,
      items: [
        { q: "Are disposable toilet seat covers eco-friendly?", a: "Our covers are made from biodegradable paper that breaks down quickly after flushing." },
        { q: "What if I don't want to flush the cover?", a: "You can also dispose of the cover in a trash bin. Both methods are safe." },
      ],
    },
    {
      category: t.faqCat5,
      items: [
        { q: "How do Hygenc Covers save water?", a: "The covers dissolve easily in water, reducing the need for extra toilet cleaning or heavy flushing." },
        { q: "Do the covers reduce cleaning labor?", a: "Yes! Using disposable covers prevents contamination of toilet seats, minimizing cleaning time and effort." },
        { q: "Can they help facilities save on cleaning costs?", a: "Absolutely. With less direct contact contamination, facilities spend less on chemicals, labor, and frequent deep cleaning." },
        { q: "Are there long-term environmental benefits?", a: "By saving water, reducing chemical cleaners, and using biodegradable materials, Hygenc Covers contribute to a lower environmental footprint." },
      ],
    },
  ];

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
          <h1 className="text-4xl md:text-5xl font-bold mb-5 drop-shadow-md">{t.faqHeroTitle}</h1>
          <p className="text-lg md:text-xl leading-relaxed opacity-95">{t.faqHeroSub}</p>
        </div>
      </section>

      {/* FAQ Content */}
      <main className="max-w-3xl mx-auto py-16 px-5">
        {faqData.map(({ category, items }) => (
          <div key={category} className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">{category}</h2>
            {items.map(({ q, a }) => <FaqItem key={q} question={q} answer={a} />)}
          </div>
        ))}
      </main>

      <Footer />
      <ScrollToTop />
    </>
  );
}
