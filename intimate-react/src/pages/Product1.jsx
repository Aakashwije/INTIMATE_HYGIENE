import ProductDetailLayout from "../components/ProductDetailLayout";

export default function Product1() {
  return (
    <ProductDetailLayout
      title="Single Use Pack"
      subtitle="Eco friendly covers designed for safe and hygienic use in public spaces."
      image="/normal.png"
      imageAlt="Disposable Seat Covers"
      sections={[
        {
          heading: "Features",
          items: [
            "Biodegradable and eco-friendly",
            "Compact and portable packaging",
            "Safe for all skin types",
            "Water-soluble and flushable",
            "Prevents cross-contamination",
          ],
        },
        {
          heading: "Why Choose This?",
          text: "Toilet seat cover paper is a kind of sanitize, safe, and clean product made of imported pure pulp. It separates bacteria, prevents spread of diseases, and is widely used in restrooms globally.",
        },
        {
          heading: "Quick Details",
          items: [
            "Place of Origin: Henan, China (Mainland)",
            "Brand Name: Hygiene +",
            "Model Number: INE-001",
            "Feature: Disposable, Eco-Friendly, and Flushable",
          ],
        },
        {
          heading: "Packaging & Delivery",
          items: [
            "Packaging: 10 pcs/poly bag, carton box (500 × poly bags)",
            "Delivery: On time",
          ],
        },
        {
          heading: "Specifications",
          items: [
            "Fold: 1/24 fold",
            "Material: 100% natural & original wood / Virgin pulp",
            "Thickness: 16–18 gsm",
            "Size: 430×355 mm",
            "Color: White",
          ],
          text: "Reduces risk of skin or other diseases from public toilets. Handy pocket-size packs, easy to carry and dispose.",
        },
        {
          heading: "Benefits",
          items: [
            "Made of 100% virgin pulp, flexible, safe, and clean",
            "Prevents direct contact with toilet seats",
            "Anti-bacterial, great for pregnant women",
            "Water-soluble, dissolves easily after use",
            "Special tongue design protects from water spray",
          ],
        },
        {
          heading: "Application",
          items: [
            "Good protection for skin to avoid bacteria",
            "Used in offices, gyms, pubs, restaurants, schools, clinics, hospitals, and more",
          ],
        },
        {
          heading: "Usage Instructions",
          items: [
            "Tear the center while keeping one point connected",
            "Pull and place the paper seat cover on the toilet seat",
            "The center falls automatically to prevent water spray",
            "Sit on the paper cover",
            "Flush after use; it dissolves in water without blocking drains",
          ],
        },
      ]}
    />
  );
}
