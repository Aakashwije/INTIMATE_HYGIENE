import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

const REQUEST_TIMEOUT_MS = 4500;
const LOCAL_PENDING_ORDERS_KEY = "hygenc_pending_orders_v1";

function requireFirestore() {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase is not configured for this deployment.");
  }
  return db;
}

function emptySubscription() {
  return { unsubscribe: () => {} };
}

function makeId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  if (globalThis.crypto?.getRandomValues) {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
      (
        Number(c) ^
        (globalThis.crypto.getRandomValues(new Uint8Array(1))[0] &
          (15 >> (Number(c) / 4)))
      ).toString(16),
    );
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function nowIso() {
  return new Date().toISOString();
}

function toIsoDate(value, fallback = nowIso()) {
  if (!value) return fallback;
  if (typeof value === "string") return value;
  if (typeof value?.toDate === "function") return value.toDate().toISOString();
  if (value instanceof Date) return value.toISOString();

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed.toISOString();
}

function friendlySyncError(error) {
  if (error?.message?.toLowerCase().includes("timed out")) {
    return "Firebase request timed out.";
  }
  return error?.message || "Firebase request failed.";
}

function withTimeout(promise, milliseconds, message) {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = globalThis.setTimeout(() => reject(new Error(message)), milliseconds);
  });

  return Promise.race([promise, timeout]).finally(() => {
    globalThis.clearTimeout(timeoutId);
  });
}

function stripUndefined(value) {
  if (Array.isArray(value)) return value.map(stripUndefined);
  if (value && typeof value === "object" && !(value instanceof Date)) {
    return Object.entries(value).reduce((acc, [key, childValue]) => {
      acc[key] = childValue === undefined ? null : stripUndefined(childValue);
      return acc;
    }, {});
  }
  return value;
}

function readLocalPendingOrders() {
  if (!globalThis.localStorage) return [];
  try {
    return JSON.parse(
      globalThis.localStorage.getItem(LOCAL_PENDING_ORDERS_KEY) || "[]",
    );
  } catch {
    return [];
  }
}

function saveLocalPendingOrder(orderRecord) {
  if (!globalThis.localStorage) return orderRecord;
  const current = readLocalPendingOrders();
  const withoutDuplicate = current.filter(
    (order) => order.order_ref !== orderRecord.order_ref,
  );
  const next = [orderRecord, ...withoutDuplicate].slice(0, 50);
  globalThis.localStorage.setItem(
    LOCAL_PENDING_ORDERS_KEY,
    JSON.stringify(next),
  );
  return orderRecord;
}

function removeLocalPendingOrder(orderRef) {
  if (!globalThis.localStorage) return;
  const next = readLocalPendingOrders().filter(
    (order) => order.order_ref !== orderRef,
  );
  globalThis.localStorage.setItem(
    LOCAL_PENDING_ORDERS_KEY,
    JSON.stringify(next),
  );
}

export function fetchLocalPendingOrders(customerId, email) {
  const cleanEmail = email?.trim().toLowerCase();
  return readLocalPendingOrders().filter((order) => {
    if (customerId && order.customer_id === customerId) return true;
    return cleanEmail && order.customer_email === cleanEmail;
  });
}

function buildOrderRecord({ order, items }) {
  const orderId = order.id || makeId();
  const nextOrder = {
    ...order,
    id: orderId,
    customer_email: order.customer_email?.trim().toLowerCase() || null,
    created_at: order.created_at || nowIso(),
  };
  const orderItems = items.map((item) => ({
    id: item.id || makeId(),
    order_id: orderId,
    product_name: item.product_name || item.name || "Product",
    quantity: Number(item.quantity || item.qty || 1),
    price: Number(item.price || 0),
  }));

  return { ...nextOrder, order_items: orderItems };
}

function orderPayloadForCloud(orderRecord) {
  const orderPayload = { ...orderRecord };
  delete orderPayload.sync_status;
  delete orderPayload.sync_error;

  return orderPayload;
}

function normalizeOrderItems(items = []) {
  return items.map((item) => ({
    ...item,
    quantity: Number(item.quantity || 0),
    price: Number(item.price || 0),
  }));
}

function normalizeRecord(record) {
  const normalized = { ...record };
  if (normalized.created_at) {
    normalized.created_at = toIsoDate(normalized.created_at);
  }
  if (normalized.updated_at) {
    normalized.updated_at = toIsoDate(normalized.updated_at);
  }
  if (Array.isArray(normalized.order_items)) {
    normalized.order_items = normalizeOrderItems(normalized.order_items);
  }
  return normalized;
}

function normalizeDoc(snapshot) {
  const data = snapshot.data() || {};
  return normalizeRecord({
    ...data,
    id: data.id || snapshot.id,
  });
}

function realDocs(snapshot) {
  return snapshot.docs.map(normalizeDoc).filter((row) => !row._meta);
}

function sortByCreatedDesc(rows) {
  return [...rows].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}

function safeDocId(value) {
  return encodeURIComponent(String(value).trim().toLowerCase());
}

export function captureLocalOrder({ order, items }) {
  return saveLocalPendingOrder({
    ...buildOrderRecord({ order, items }),
    sync_status: "local",
    sync_error: "Waiting for cloud sync.",
  });
}

async function pushOrderToCloud(orderRecord) {
  const client = requireFirestore();
  const orderId = orderRecord.id || makeId();
  const orderItems = normalizeOrderItems(orderRecord.order_items || []);
  const payload = stripUndefined({
    ...orderPayloadForCloud(orderRecord),
    id: orderId,
    customer_email: orderRecord.customer_email?.trim().toLowerCase() || null,
    status: orderRecord.status || "pending",
    order_items: orderItems,
    created_at: toIsoDate(orderRecord.created_at),
    updated_at: nowIso(),
  });

  await setDoc(doc(client, "orders", orderId), payload, { merge: true });

  return {
    ...normalizeRecord(payload),
    sync_status: "cloud",
    sync_error: null,
  };
}

export async function syncOrderToCloud(orderRecord) {
  if (!isFirebaseConfigured || !db) {
    return saveLocalPendingOrder({
      ...orderRecord,
      sync_status: "local",
      sync_error: "Firebase is not configured.",
    });
  }

  try {
    const syncedOrder = await withTimeout(
      pushOrderToCloud(orderRecord),
      REQUEST_TIMEOUT_MS,
      "Firestore request timed out.",
    );
    removeLocalPendingOrder(orderRecord.order_ref);
    return syncedOrder;
  } catch (error) {
    return saveLocalPendingOrder({
      ...orderRecord,
      sync_status: "local",
      sync_error: friendlySyncError(error),
    });
  }
}

export async function subscribeToNewsletter(email) {
  const client = requireFirestore();
  const cleanEmail = email.trim().toLowerCase();
  const subscriberRef = doc(
    client,
    "newsletter_subscribers",
    safeDocId(cleanEmail),
  );
  const payload = stripUndefined({
    id: subscriberRef.id,
    email: cleanEmail,
    created_at: nowIso(),
    updated_at: nowIso(),
  });

  await setDoc(subscriberRef, payload, { merge: true });
  return normalizeRecord(payload);
}

export async function createInquiry(inquiry) {
  const client = requireFirestore();
  const payload = stripUndefined({
    ...inquiry,
    created_at: inquiry.created_at || nowIso(),
  });
  const inquiryRef = await addDoc(collection(client, "inquiries"), payload);
  return normalizeRecord({ ...payload, id: inquiryRef.id });
}

export async function createOrder({ order, items }) {
  const localOrder = captureLocalOrder({ order, items });
  return syncOrderToCloud(localOrder);
}

export async function fetchCustomerProfile(userId) {
  if (!isFirebaseConfigured || !db || !userId) return null;
  const profileRef = doc(db, "customer_profiles", userId);
  const snapshot = await getDoc(profileRef);
  return snapshot.exists() ? normalizeDoc(snapshot) : null;
}

function buildCustomerProfilePayload(profile, existingProfile = {}) {
  return stripUndefined({
    id: profile.id,
    email: profile.email?.trim().toLowerCase() || null,
    name: profile.name || "",
    phone: profile.phone || "",
    address: profile.address || "",
    city: profile.city || "",
    preferred_payment_method:
      profile.preferred_payment_method ||
      profile.preferredPaymentMethod ||
      "Cash on Delivery",
    created_at: existingProfile.created_at || profile.created_at || nowIso(),
    updated_at: nowIso(),
  });
}

export async function upsertCustomerProfile(profile) {
  const client = requireFirestore();
  const profileRef = doc(client, "customer_profiles", profile.id);
  const existing = await getDoc(profileRef);
  const payload = buildCustomerProfilePayload(
    profile,
    existing.exists() ? existing.data() : {},
  );

  await setDoc(profileRef, payload, { merge: true });
  const saved = await getDoc(profileRef);
  return normalizeDoc(saved);
}

export async function fetchCustomerOrders(customerId) {
  if (!isFirebaseConfigured || !db || !customerId) return [];
  const snapshot = await getDocs(
    query(collection(db, "orders"), where("customer_id", "==", customerId)),
  );
  return sortByCreatedDesc(realDocs(snapshot));
}

export async function fetchSubscribers() {
  if (!isFirebaseConfigured || !db) return [];
  const snapshot = await getDocs(
    query(collection(db, "newsletter_subscribers"), orderBy("created_at", "desc")),
  );
  return realDocs(snapshot);
}

export async function fetchProducts({ activeOnly = false } = {}) {
  if (!isFirebaseConfigured || !db) return [];
  const snapshot = await getDocs(
    query(collection(db, "products"), orderBy("created_at", "asc")),
  );
  const products = realDocs(snapshot);
  return activeOnly
    ? products.filter((product) => product.active !== false)
    : products;
}

export async function fetchProductBySlug(slug) {
  const client = requireFirestore();
  const directSnapshot = await getDoc(doc(client, "products", slug));
  if (directSnapshot.exists()) return normalizeDoc(directSnapshot);

  const snapshot = await getDocs(
    query(collection(client, "products"), where("slug", "==", slug), limit(1)),
  );
  if (snapshot.empty) return null;
  return normalizeDoc(snapshot.docs[0]);
}

export async function updateProduct(id, product) {
  const client = requireFirestore();
  const productRef = doc(client, "products", id);
  const existing = await getDoc(productRef);
  const payload = stripUndefined({
    ...product,
    id,
    created_at: existing.data()?.created_at || product.created_at || nowIso(),
    updated_at: nowIso(),
  });

  await setDoc(productRef, payload, { merge: true });
  const saved = await getDoc(productRef);
  return normalizeDoc(saved);
}

export async function saveProductBySlug(slug, product) {
  const client = requireFirestore();
  const productRef = doc(client, "products", slug);
  const existing = await getDoc(productRef);
  const payload = stripUndefined({
    ...product,
    id: product.id || slug,
    slug,
    created_at: existing.data()?.created_at || product.created_at || nowIso(),
    updated_at: nowIso(),
  });

  await setDoc(productRef, payload, { merge: true });
  const saved = await getDoc(productRef);
  return normalizeDoc(saved);
}

export function subscribeToProducts(onChange) {
  if (!isFirebaseConfigured || !db) return emptySubscription();
  const unsubscribe = onSnapshot(
    collection(db, "products"),
    onChange,
    () => {},
  );
  return { unsubscribe };
}

export function subscribeToAdminData(onChange) {
  if (!isFirebaseConfigured || !db) return emptySubscription();

  const collections = [
    "products",
    "orders",
    "customer_profiles",
    "inquiries",
    "newsletter_subscribers",
    "quiz_responses",
    "site_events",
  ];
  let pending = false;
  const notify = () => {
    if (pending) return;
    pending = true;
    globalThis.setTimeout(() => {
      pending = false;
      onChange();
    }, 150);
  };
  const unsubscribers = collections.map((name) =>
    onSnapshot(collection(db, name), notify, () => {}),
  );

  return {
    unsubscribe() {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    },
  };
}

export async function fetchInquiries() {
  if (!isFirebaseConfigured || !db) return [];
  const snapshot = await getDocs(
    query(collection(db, "inquiries"), orderBy("created_at", "desc")),
  );
  return realDocs(snapshot);
}

export async function fetchOrders() {
  if (!isFirebaseConfigured || !db) return [];
  const snapshot = await getDocs(
    query(collection(db, "orders"), orderBy("created_at", "desc")),
  );
  return realDocs(snapshot);
}

export async function deleteOrder(orderId) {
  const client = requireFirestore();
  await deleteDoc(doc(client, "orders", orderId));
  return orderId;
}

export async function updateOrder(orderId, updates) {
  const client = requireFirestore();
  const orderRef = doc(client, "orders", orderId);
  const payload = stripUndefined({
    ...updates,
    updated_at: nowIso(),
  });

  await setDoc(orderRef, payload, { merge: true });
  const saved = await getDoc(orderRef);
  return normalizeDoc(saved);
}

export async function createQuizResponse(response) {
  const client = requireFirestore();
  const payload = stripUndefined({
    ...response,
    created_at: response.created_at || nowIso(),
  });
  const responseRef = await addDoc(collection(client, "quiz_responses"), payload);
  return normalizeRecord({ ...payload, id: responseRef.id });
}

export async function fetchQuizResponses() {
  if (!isFirebaseConfigured || !db) return [];
  const snapshot = await getDocs(
    query(collection(db, "quiz_responses"), orderBy("created_at", "desc")),
  );
  return realDocs(snapshot);
}

export async function trackSiteEvent(event) {
  if (!isFirebaseConfigured || !db) return null;
  try {
    const payload = stripUndefined({
      event_type: event.event_type,
      path: event.path || globalThis.location?.pathname || "/",
      label: event.label || null,
      metadata: event.metadata || {},
      created_at: event.created_at || nowIso(),
    });
    const eventRef = await addDoc(collection(db, "site_events"), payload);
    return normalizeRecord({ ...payload, id: eventRef.id });
  } catch {
    return null;
  }
}

export async function fetchSiteEvents() {
  if (!isFirebaseConfigured || !db) return [];
  const snapshot = await getDocs(
    query(collection(db, "site_events"), orderBy("created_at", "desc"), limit(500)),
  );
  return realDocs(snapshot);
}
