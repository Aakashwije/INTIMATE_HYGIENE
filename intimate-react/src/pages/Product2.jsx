import ProductDetailLayout from "../components/ProductDetailLayout";

export default function Product2() {
  return (
    <ProductDetailLayout
      title="Travel Pack (Waterproof)"
      subtitle="Waterproof, anti‑slip, and hygienic covers for safe use in public spaces."
      image="/travel.png"
      imageAlt="Disposable Waterproof Toilet Seat Covers"
      sections={[
        {
          heading: "Features",
          items: [
            "Waterproof and anti-slip layer",
            "Pocket-size compact packaging",
            "Safe for adults and children",
            "Hygienic and convenient",
            "Non-flushable",
          ],
        },
        {
          heading: "Why Choose This?",
          text: "These disposable waterproof toilet seat covers are ideal for adults (including pregnant women), elderly, and kids on the go. The waterproof layer and adhesive tapes prevent germs and wetness while ensuring comfort and hygiene.",
        },
        {
          heading: "Quick Details",
          items: [
            "Place of Origin: Henan, China (Mainland)",
            "Brand Name: Hygiene +",
            "Model Number: INE-002",
            "Feature: Disposable, Eco-Friendly, Non-Flushable",
          ],
        },
        {
          heading: "Packaging & Delivery",
          items: [
            "Packaging: 6 pcs/poly bag, carton box (160 × poly bags)",
            "Delivery: On time",
          ],
        },
        {
          heading: "Specifications",
          items: [
            "Fold: 1/24 fold",
            "Material: 100% wood pulp with PE layer",
            "Thickness: 16–18 gsm",
            "Dimensions: 38 cm × 47 cm",
            "Color: White",
          ],
          text: "Protects user from germs and provides hygienic comfort. Pocket-size packs are easy to carry and dispose.",
        },
        {
          heading: "Benefits",
          items: [
            "High-quality wood pulp with PE layer, flexible and safe",
            "Prevents direct contact with toilet seats",
            "Anti-bacterial, great for pregnant women",
            "Two adhesive tapes for secure fitting",
            "Easy to use, hygienic and clean",
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
            "Tear the adhesive sticker on the back",
            "Snap the three points between the tongue part and seat part",
            "Place the paper seat cover over the toilet",
            "Sit on the paper seat cover",
            "Do not flush; dispose in a trash can",
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
