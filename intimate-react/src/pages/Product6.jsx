import ProductDetailLayout from "../components/ProductDetailLayout";
import SEO from "../components/SEO";
import {
  enterpriseReviews as reviews,
  enterpriseSections,
} from "../data/productContent";

const bundleSection = {
  heading: "What's in the Bundle",
  items: [
    "10 × Flushable enterprise packs",
    "1 × FREE plastic dispenser",
    "Printed usage instructions included",
    "Add extra enterprise packs anytime for LKR 950 each",
  ],
  highlightItem: 1,
};

export default function Product6() {
  return (
    <>
      <SEO
        title="Enterprise 10-Pack + Free Dispenser – LKR 8,700"
        description="Bundle of 10 flushable toilet seat cover packs with a FREE plastic dispenser and instructions for LKR 8,700. Perfect for offices, hotels, and businesses in Sri Lanka."
        path="/products/6"
      />
      <ProductDetailLayout
        slug="enterprise-10-pack"
        title="Enterprise 10-Pack + Free Dispenser"
        subtitle="A 10-pack flushable bundle that ships with a <strong>free plastic dispenser and instructions</strong> — built for high-traffic restrooms."
        image="/interprisenew.png"
        imageAlt="Enterprise 10-Pack Bundle with Free Dispenser"
        highlight="★ Includes a FREE plastic dispenser with instructions — add more enterprise packs for LKR 950 each"
        price="LKR 8,700"
        priceNote="10 packs + free dispenser & instructions"
        reviews={reviews}
        sections={[bundleSection, ...enterpriseSections]}
      />
    </>
  );
}
