import ProductDetailLayout from "../components/ProductDetailLayout";

const reviews = [
  { author: "Roshan M.", location: "Hotel Operator, Colombo", rating: 5, comment: "We've installed these in all 45 rooms. Guest satisfaction scores improved noticeably. The free dispenser is a great touch.", avatar: "RM" },
  { author: "Dr. Lakmali W.", location: "Private Clinic, Kandy", rating: 5, comment: "As a healthcare provider, hygiene is everything. These covers are exactly what we needed for our patient bathrooms. Flushable makes cleanup effortless.", avatar: "LW" },
  { author: "Suresh B.", location: "Corporate Office, Colombo 2", rating: 5, comment: "Ordered 500 packs for our office. Pricing was excellent, delivery was on time, and the team loved having them. Reordering soon.", avatar: "SB" },
];

export default function Product3() {
  return (
    <ProductDetailLayout
      title="Enterprise Pack (Flushable)"
      subtitle="Safe, eco friendly, and water soluble covers with a <strong>free plastic dispenser included!</strong>"
      image="/interprise.png"
      imageAlt="Flushable Paper Toilet Seat Covers"
      highlight="★ Comes with a FREE plastic dispenser with instructions"
      price="LKR 120"
      priceNote="per pack · bulk rate · minimum order 100 packs"
      whatsappMsg="Hello! I want to enquire about the Enterprise Pack bulk pricing. Please share details and availability."
      reviews={reviews}
      sections={[
        {
          heading: "Features",
          items: [
            "Biodegradable, water-soluble, and eco-friendly",
            "Pocket-size compact travel packs",
            "Safe for all skin types, including pregnant women",
            "Prevents cross-contamination and germs",
            "Comes with a free plastic dispenser with instructions",
          ],
          highlightItem: 4,
        },
        {
          heading: "Why Choose This?",
          text: "Our flushable toilet seat covers are made of 100% natural virgin wood pulp. They dissolve quickly in water, preventing drain blockages, while providing a hygienic barrier between you and the toilet seat. Each pack comes with a free plastic dispenser that makes usage and storage convenient.",
        },
        {
          heading: "Quick Details",
          items: [
            "Place of Origin: Henan, China (Mainland)",
            "Brand Name: Hygiene +",
            "Model Number: INE-003",
            "Feature: Disposable, Eco-Friendly, Flushable",
          ],
        },
        {
          heading: "Packaging & Delivery",
          items: [
            "Packaging: 200 pcs/pack, carton box (25 × packs)",
            "Delivery: On time",
          ],
        },
        {
          heading: "Specifications",
          items: [
            "Fold: 1/4 fold",
            "Material: 100% natural & original wood / Virgin pulp",
            "Thickness: 14–15 gsm",
            "Size: 430×355 mm",
            "Color: White",
          ],
          text: "Reduces risk of skin or other diseases from public toilets. Pocket-size packs are easy to carry and dispose.",
        },
        {
          heading: "Benefits",
          items: [
            "Made of 100% virgin pulp: flexible, safe, and clean",
            "Prevents direct contact with toilet seats",
            "Anti-bacterial, great for pregnant women",
            "Water-soluble, flushable without clogging drains",
            "Free dispenser included for easy storage and usage",
          ],
        },
        {
          heading: "Application",
          items: [
            "Good protection for skin to avoid bacteria",
            "Used in offices, gyms, pubs, restaurants, schools, clinics, hospitals, and other public areas",
          ],
        },
        {
          heading: "Usage Instructions",
          items: [
            "Tear the center while keeping one point connected",
            "Pull the paper seat cover from the dispenser",
            "Place the paper seat cover on the toilet; the center will drop automatically to prevent water spray",
            "Sit on the paper seat cover",
            "Flush after use; it dissolves in water without blocking drains",
          ],
        },
        {
          heading: "Storage",
          text: "Keep away from moisture to maintain product quality.",
        },
      ]}
    />
  );
}
