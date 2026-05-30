import ProductDetailLayout from "../components/ProductDetailLayout";
import SEO from "../components/SEO";
import {
  travelReviews as reviews,
  travelSections as sections,
} from "../data/productContent";

export default function Product2() {
  return (
    <>
      <SEO
        title="Waterproof Add-On Pack – LKR 350"
        description="Add extra waterproof anti-slip toilet seat cover packs for LKR 350 each when you need more than a 5-pack bundle."
        path="/products/2"
      />
      <ProductDetailLayout
        slug="travel-pack"
        title="Waterproof Add-On Pack"
        subtitle="Extra waterproof, anti-slip packs for customers who need more than the 5-pack bundle."
        image="/travelnew.png"
        imageAlt="Disposable Waterproof Toilet Seat Covers"
        price="LKR 350"
        priceNote="Extra waterproof pack"
        whatsappMsg="Hello! I want to add Waterproof packs at LKR 350 each. Please share availability and delivery details."
        reviews={reviews}
        sections={sections}
      />
    </>
  );
}
