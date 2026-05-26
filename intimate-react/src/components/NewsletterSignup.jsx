import { CheckCircle, Gift } from "lucide-react";
import { useState } from "react";
import { useLang } from "../context/LangContext";
import { subscribeToNewsletter } from "../lib/database";

export default function NewsletterSignup() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitting(true);
    setError("");
    try {
      await subscribeToNewsletter(email);
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Could not subscribe right now.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-5 bg-gradient-to-br from-[#28a745] via-[#1d7a34] to-[#0d3f1a] text-white relative overflow-hidden animate-gradientShift">
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-3xl animate-blob" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#5cd65c]/30 blur-3xl animate-blob-slow" />

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-sm font-semibold">
          <Gift className="w-4 h-4 text-yellow-300" />
          {t.newsletterBadge || "Get 5% Off Your First Order"}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">{t.newsletterTitle || "Join the Hygenc Family"}</h2>
        <p className="text-white/85 mb-8 max-w-xl mx-auto">
          {t.newsletterSub || "Hygiene tips, new product drops, and exclusive subscriber-only discounts — straight to your inbox."}
        </p>

        {submitted ? (
          <div className="glass-dark rounded-2xl px-6 py-5 max-w-md mx-auto animate-zoomIn">
            <CheckCircle className="w-10 h-10 text-green-300 mx-auto mb-2" />
            <p className="font-bold text-lg">{t.newsletterThanks || "You're in! Check your inbox."}</p>
            <p className="text-white/75 text-sm mt-1">{t.newsletterThanksSub || "We'll send your discount code shortly."}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.newsletterPlaceholder || "Your email address"}
              className="flex-1 px-5 py-3.5 rounded-xl text-gray-800 outline-none focus:ring-4 focus:ring-white/40 placeholder-gray-400 bg-white"
            />
            <button
              type="submit"
              disabled={submitting}
              className="btn-shimmer px-6 py-3.5 bg-white text-[#28a745] font-bold rounded-xl hover:bg-gray-100 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap"
            >
              {submitting ? "Saving..." : t.newsletterCta || "Get My Discount →"}
            </button>
          </form>
        )}

        {error && <p className="text-sm text-red-100 mt-3">{error}</p>}
        <p className="text-xs text-white/70 mt-4">{t.newsletterPrivacy || "No spam. Unsubscribe anytime."}</p>
      </div>
    </section>
  );
}
