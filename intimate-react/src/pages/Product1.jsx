import ProductDetailLayout from "../components/ProductDetailLayout";
import SEO from "../components/SEO";
import {
  singleUseReviews as reviews,
  singleUseSections as sections,
} from "../data/productContent";

export default function Product1() {
  return (
    <>
      <SEO
        title="Single Use Add-On Pack – LKR 250"
        description="Add extra non-waterproof single-use toilet seat cover packs for LKR 250 each when you need more than a 5-pack bundle."
        path="/products/1"
      />
      <ProductDetailLayout
        slug="single-use-pack"
        title="Single Use Add-On Pack"
        subtitle="Extra non-waterproof single-use packs for customers who need more than the 5-pack bundle."
        image="/normalnew.png"
        imageAlt="Disposable Seat Covers"
        price="LKR 250"
        priceNote="Extra single-use pack"
        whatsappMsg="Hello! I want to add Single Use packs at LKR 250 each. Please share availability and delivery details."
        reviews={reviews}
        sections={sections}
      />
    </>
  );
}
