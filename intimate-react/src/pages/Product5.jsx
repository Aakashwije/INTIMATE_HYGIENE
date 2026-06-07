import ProductDetailLayout from "../components/ProductDetailLayout";
import SEO from "../components/SEO";
import {
  travelReviews as reviews,
  travelSections,
} from "../data/productContent";

const bundleSection = {
  heading: "What's in the Bundle",
  items: [
    "5 × Waterproof, anti-slip packs",
    "Pocket-size and travel-ready",
    "Secure adhesive fitting for any seat",
    "Add extra waterproof packs anytime for LKR 350 each",
  ],
};

export default function Product5() {
  return (
    <>
      <SEO
        title="Waterproof 5-Pack – LKR 1,499"
        description="Value bundle of 5 waterproof, anti-slip toilet seat cover packs for LKR 1,499. Ideal for families and travellers. Ships islandwide in Sri Lanka."
        path="/products/5"
      />
      <ProductDetailLayout
        slug="waterproof-5-pack"
        title="Waterproof 5-Pack"
        subtitle="A 5-pack value bundle of our waterproof, anti-slip covers — extra protection for families and travellers."
        image="/travelnew.png"
        imageAlt="Waterproof 5-Pack Bundle"
        highlight="★ Bundle of 5 waterproof packs — add more waterproof packs for LKR 350 each"
        price="LKR 1,499"
        priceNote="5-pack waterproof bundle"
        reviews={reviews}
        sections={[bundleSection, ...travelSections]}
      />
    </>
  );
}
