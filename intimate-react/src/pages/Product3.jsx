import ProductDetailLayout from "../components/ProductDetailLayout";
import SEO from "../components/SEO";
import {
  enterpriseReviews as reviews,
  enterpriseSections as sections,
} from "../data/productContent";

const addOnReferenceSections = sections.slice(2).map((section) => ({
  ...section,
  items: section.items?.filter(
    (item) => !item.toLowerCase().includes("free dispenser"),
  ),
  text: section.text?.replace(
    " Each pack comes with a free plastic dispenser that makes usage and storage convenient.",
    "",
  ),
}));

const addOnSections = [
  {
    heading: "Add-On Details",
    items: [
      "Extra flushable enterprise pack",
      "Designed to top up the Enterprise 10-Pack dispenser offer",
      "Water-soluble and easy to dispose",
      "Ideal for offices, hotels, clinics, and high-traffic restrooms",
    ],
  },
  {
    heading: "Why Add More?",
    text: "Use these add-on packs when your restroom needs more stock beyond the Enterprise 10-Pack offer. The free dispenser and printed instructions are included with the 10-pack bundle.",
  },
  ...addOnReferenceSections,
];

export default function Product3() {
  return (
    <>
      <SEO
        title="Enterprise Add-On Pack – LKR 950"
        description="Add extra flushable enterprise toilet seat cover packs for LKR 950 each when you need more than the 10-pack offer."
        path="/products/3"
      />
      <ProductDetailLayout
        slug="enterprise-pack"
        title="Enterprise Add-On Pack"
        subtitle="Extra flushable enterprise packs for offices, hotels, and businesses that need more than the 10-pack offer."
        image="/interprisenew.png"
        imageAlt="Flushable Paper Toilet Seat Covers"
        highlight="★ Add-on packs pair with the Enterprise 10-Pack dispenser offer"
        price="LKR 950"
        priceNote="Extra enterprise pack"
        whatsappMsg="Hello! I want to add Enterprise packs at LKR 950 each. Please share availability and delivery details."
        reviews={reviews}
        sections={addOnSections}
      />
    </>
  );
}
