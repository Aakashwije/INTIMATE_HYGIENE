export const formatLkr = (value) =>
  `LKR ${Number(value).toLocaleString("en-LK")}`;

export const bundleProducts = [
  {
    id: "non-waterproof-5-pack",
    slug: "non-waterproof-5-pack",
    name: "Non-Waterproof 5-Pack",
    shortName: "Non-Waterproof",
    description:
      "Value bundle of 5 biodegradable single-use packs. Eco-friendly, individually wrapped, and flushable.",
    price: 1099,
    cost: 750,
    image: "/normalnew.png",
    link: "/products/4",
    badge: "Bundle Deal",
    urgency: "Selling Fast",
    priceNote: "5-pack bundle",
    addOnNote: "Need more? Add single-use packs for LKR 250 each.",
    whatsappMsg:
      "Hello! I want to order the Non-Waterproof 5-Pack bundle (LKR 1,099). Please share availability and delivery details.",
  },
  {
    id: "waterproof-5-pack",
    slug: "waterproof-5-pack",
    name: "Waterproof 5-Pack",
    shortName: "Waterproof",
    description:
      "Value bundle of 5 waterproof, anti-slip packs. Perfect for families and frequent travellers.",
    price: 1499,
    cost: 1100,
    image: "/travelnew.png",
    link: "/products/5",
    badge: "Waterproof",
    urgency: "Popular",
    priceNote: "5-pack waterproof bundle",
    addOnNote: "Need more? Add waterproof packs for LKR 350 each.",
    whatsappMsg:
      "Hello! I want to order the Waterproof 5-Pack bundle (LKR 1,499). Please share availability and delivery details.",
  },
  {
    id: "enterprise-10-pack",
    slug: "enterprise-10-pack",
    name: "Enterprise 10-Pack + Free Dispenser",
    shortName: "Enterprise",
    description:
      "Bundle of 10 flushable packs with a free plastic dispenser and printed usage instructions.",
    price: 8700,
    cost: 6000,
    image: "/interprisenew.png",
    link: "/products/6",
    badge: "Free Dispenser",
    urgency: null,
    priceNote: "10 packs + free dispenser & instructions",
    addOnNote: "Need more? Add enterprise packs for LKR 950 each.",
    whatsappMsg:
      "Hello! I want to order the Enterprise 10-Pack bundle with the free dispenser (LKR 8,700). Please share availability and delivery details.",
  },
];

export const addOnProducts = [
  {
    id: "single-use-pack",
    slug: "single-use-pack",
    name: "Single Use Add-On Pack",
    shortName: "Single Use Add-On",
    description:
      "Extra non-waterproof single-use pack for customers who need more than the 5-pack bundle.",
    price: 250,
    cost: 150,
    image: "/normalnew.png",
    link: "/products/1",
    badge: "Add-On",
    urgency: null,
    priceNote: "Extra single-use pack",
    whatsappMsg:
      "Hello! I want to add Single Use packs at LKR 250 each. Please share availability and delivery details.",
  },
  {
    id: "travel-pack",
    slug: "travel-pack",
    name: "Waterproof Add-On Pack",
    shortName: "Waterproof Add-On",
    description:
      "Extra waterproof, anti-slip pack for customers who need more than the 5-pack bundle.",
    price: 350,
    cost: 250,
    image: "/travelnew.png",
    link: "/products/2",
    badge: "Add-On",
    urgency: null,
    priceNote: "Extra waterproof pack",
    whatsappMsg:
      "Hello! I want to add Waterproof packs at LKR 350 each. Please share availability and delivery details.",
  },
  {
    id: "enterprise-pack",
    slug: "enterprise-pack",
    name: "Enterprise Add-On Pack",
    shortName: "Enterprise Add-On",
    description:
      "Extra flushable enterprise pack for offices, hotels, and businesses that need more than the 10-pack offer.",
    price: 950,
    cost: 550,
    image: "/interprisenew.png",
    link: "/products/3",
    badge: "Add-On",
    urgency: null,
    priceNote: "Extra enterprise pack",
    whatsappMsg:
      "Hello! I want to add Enterprise packs at LKR 950 each. Please share availability and delivery details.",
  },
];

export const shopProducts = [...bundleProducts, ...addOnProducts];

export const bundleProductIds = new Set(
  bundleProducts.map((product) => product.slug),
);

export const addOnProductIds = new Set(
  addOnProducts.map((product) => product.slug),
);

export const productLinks = Object.fromEntries(
  shopProducts.map((product) => [product.slug, product.link]),
);

export const productOrder = Object.fromEntries(
  shopProducts.map((product, index) => [product.slug, index]),
);

export function findCatalogProduct(slug) {
  return shopProducts.find((product) => product.slug === slug);
}

export function sortProductsByCatalogOrder(products) {
  return [...products].sort(
    (a, b) =>
      (productOrder[a.slug] ?? Number.MAX_SAFE_INTEGER) -
      (productOrder[b.slug] ?? Number.MAX_SAFE_INTEGER),
  );
}
