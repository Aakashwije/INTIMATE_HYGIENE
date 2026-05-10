import { useLang } from "../context/LangContext";

const badges = [
  { icon: "🔒", titleKey: "trustSecure", descKey: "trustSecureDesc" },
  { icon: "🚚", titleKey: "trustDelivery", descKey: "trustDeliveryDesc" },
  { icon: "💰", titleKey: "trustGuarantee", descKey: "trustGuaranteeDesc" },
  { icon: "⭐", titleKey: "trustReviews", descKey: "trustReviewsDesc" },
];

export default function TrustBadges() {
  const { t } = useLang();
  return (
    <section className="py-12 px-5 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map(({ icon, titleKey, descKey }) => (
          <div
            key={titleKey}
            className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-[#28a745]/40 hover:shadow-md transition-all duration-300"
          >
            <div className="text-3xl">{icon}</div>
            <div>
              <p className="text-sm font-bold text-gray-800 leading-tight">{t[titleKey] || titleKey}</p>
              <p className="text-xs text-gray-500 leading-tight mt-0.5">{t[descKey] || descKey}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
