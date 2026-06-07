import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { addOnProducts, bundleProducts, shopProducts } from "../src/data/catalog.js";

const DEFAULT_PROJECT_ID = "intimate-hygiene";
const DEFAULT_ACCOUNT = "intimatehygiene@gmail.com";
const ADMIN_UID = "q4VIHjWchpdb3FzB0ZKoV5zSsi83";
const ADMIN_EMAIL = "aakashwije92@gmail.com";
const META_COLLECTIONS = [
  "orders",
  "customer_profiles",
  "newsletter_subscribers",
  "inquiries",
  "quiz_responses",
  "site_events",
];

function argValue(name, fallback) {
  const prefix = `--${name}=`;
  const inline = process.argv.find((arg) => arg.startsWith(prefix));
  if (inline) return inline.slice(prefix.length);
  const index = process.argv.indexOf(`--${name}`);
  if (index !== -1) return process.argv[index + 1] || fallback;
  return fallback;
}

function firebaseConfigPath() {
  return path.join(os.homedir(), ".config", "configstore", "firebase-tools.json");
}

function candidateAccounts(config) {
  const candidates = [];
  if (config.user && config.tokens) {
    candidates.push({ user: config.user, tokens: config.tokens });
  }
  for (const account of Object.values(config.additionalAccounts || {})) {
    if (account?.user && account?.tokens) candidates.push(account);
  }
  return candidates;
}

function readFirebaseCliToken(accountEmail) {
  const configPath = firebaseConfigPath();
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  const activeEmail =
    accountEmail ||
    Object.values(config.activeAccounts || {}).at(-1) ||
    config.user?.email ||
    DEFAULT_ACCOUNT;
  const account = candidateAccounts(config).find(
    (candidate) => candidate.user?.email === activeEmail,
  );

  if (!account?.tokens?.access_token) {
    throw new Error(
      `Firebase CLI token for ${activeEmail} was not found. Run: npx firebase-tools login:add ${activeEmail}`,
    );
  }

  if (account.tokens.expires_at && account.tokens.expires_at < Date.now() + 60000) {
    throw new Error(
      `Firebase CLI token for ${activeEmail} is expired. Run: npx firebase-tools projects:list, then retry this seed script.`,
    );
  }

  return account.tokens.access_token;
}

function firestoreValue(value) {
  if (value === undefined) return null;
  if (value === null) return { nullValue: null };
  if (typeof value === "string") return { stringValue: value };
  if (typeof value === "boolean") return { booleanValue: value };
  if (typeof value === "number") {
    return Number.isInteger(value)
      ? { integerValue: String(value) }
      : { doubleValue: value };
  }
  if (Array.isArray(value)) {
    return {
      arrayValue: {
        values: value.map(firestoreValue).filter(Boolean),
      },
    };
  }
  if (value instanceof Date) return { timestampValue: value.toISOString() };
  if (typeof value === "object") {
    return {
      mapValue: {
        fields: Object.fromEntries(
          Object.entries(value)
            .filter(([, nestedValue]) => nestedValue !== undefined)
            .map(([key, nestedValue]) => [key, firestoreValue(nestedValue)]),
        ),
      },
    };
  }
  return { stringValue: String(value) };
}

function firestoreFields(data) {
  return Object.fromEntries(
    Object.entries(data)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => [key, firestoreValue(value)]),
  );
}

function productDoc(product, index) {
  const isAddOn = addOnProducts.some((item) => item.slug === product.slug);
  const createdAt = new Date(Date.UTC(2026, 5, 7, 8, index)).toISOString();

  return {
    id: product.slug,
    slug: product.slug,
    sku: product.slug.toUpperCase(),
    name: product.name,
    short_name: product.shortName || product.name,
    description: product.description,
    price: product.price,
    cost: product.cost || 0,
    stock: isAddOn ? 500 : 200,
    sold: 0,
    rating: 4.9,
    reviews: 0,
    image_url: product.image,
    gallery_images: product.galleryImages || [],
    link: product.link,
    badge: product.badge || null,
    urgency: product.urgency || null,
    min_order: 1,
    price_note: product.priceNote || "",
    category: isAddOn ? "Add-On" : "Bundle",
    active: true,
    created_at: createdAt,
    updated_at: new Date().toISOString(),
  };
}

async function patchDocument({ projectId, accessToken, collectionName, docId, data }) {
  const url = new URL(
    `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionName}/${encodeURIComponent(docId)}`,
  );
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields: firestoreFields(data) }),
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      `${collectionName}/${docId} failed: ${result.error?.message || response.statusText}`,
    );
  }

  return result;
}

async function main() {
  const projectId = argValue("project", process.env.FIREBASE_PROJECT_ID || DEFAULT_PROJECT_ID);
  const accountEmail = argValue("account", process.env.FIREBASE_ACCOUNT || DEFAULT_ACCOUNT);
  const accessToken = readFirebaseCliToken(accountEmail);
  const now = new Date().toISOString();
  const writes = [];

  writes.push(
    patchDocument({
      projectId,
      accessToken,
      collectionName: "admins",
      docId: ADMIN_UID,
      data: {
        id: ADMIN_UID,
        uid: ADMIN_UID,
        email: ADMIN_EMAIL,
        username: "owner",
        name: "Aakash Wijesekara",
        role: "Super Admin",
        avatar: "AW",
        active: true,
        created_at: now,
        updated_at: now,
      },
    }),
  );

  shopProducts.forEach((product, index) => {
    writes.push(
      patchDocument({
        projectId,
        accessToken,
        collectionName: "products",
        docId: product.slug,
        data: productDoc(product, index),
      }),
    );
  });

  META_COLLECTIONS.forEach((collectionName) => {
    writes.push(
      patchDocument({
        projectId,
        accessToken,
        collectionName,
        docId: "_initialized",
        data: {
          _meta: true,
          collection: collectionName,
          initialized_at: now,
          note: "Collection initialized by the Intimate Hygiene Firestore seed script.",
        },
      }),
    );
  });

  await Promise.all(writes);

  console.log(`Seeded Firestore project ${projectId}`);
  console.log(`Admin profile: admins/${ADMIN_UID}`);
  console.log(`Products: ${bundleProducts.length} bundles + ${addOnProducts.length} add-ons`);
  console.log(`Initialized collections: ${META_COLLECTIONS.join(", ")}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
