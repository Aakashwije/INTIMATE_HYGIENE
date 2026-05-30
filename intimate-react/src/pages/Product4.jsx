import ProductDetailLayout from "../components/ProductDetailLayout";
import SEO from "../components/SEO";
import {
  singleUseReviews as reviews,
  singleUseSections,
} from "../data/productContent";

const bundleSection = {
  heading: "What's in the Bundle",
  items: [
    "5 × Single-Use packs (non-waterproof)",
    "Individually wrapped, biodegradable covers",
    "Water-soluble and flushable",
    "Add extra single-use packs anytime for LKR 250 each",
  ],
};

export default function Product4() {
  return (
    <>
      <SEO
        title="Non-Waterproof 5-Pack – LKR 1,099"
        description="Value bundle of 5 biodegradable single-use toilet seat cover packs for LKR 1,099. Eco-friendly, flushable, and ready to ship across Sri Lanka."
        path="/products/4"
      />
      <ProductDetailLayout
        slug="non-waterproof-5-pack"
        title="Non-Waterproof 5-Pack"
        subtitle="A 5-pack value bundle of our eco-friendly single-use covers — hygienic protection for everyday use."
        image="/normalnew.png"
        imageAlt="Non-Waterproof 5-Pack Bundle"
        highlight="★ Bundle of 5 packs — add more single-use packs for LKR 250 each"
        price="LKR 1,099"
        priceNote="5-pack bundle"
        whatsappMsg="Hello! I want to order the Non-Waterproof 5-Pack bundle (LKR 1,099). Please share availability and delivery details."
        reviews={reviews}
        sections={[bundleSection, ...singleUseSections]}
      />
    </>
  );
}
