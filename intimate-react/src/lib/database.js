import { supabase } from "./supabase";

const REQUEST_TIMEOUT_MS = 4500;
const LOCAL_PENDING_ORDERS_KEY = "hygenc_pending_orders_v1";

function requireSupabase() {
  if (!supabase) {
    throw new Error("Supabase is not configured for this deployment.");
  }
  return supabase;
}

function emptySubscription() {
  return { unsubscribe: () => {} };
}

function makeId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      Number(c) ^
      (globalThis.crypto.getRandomValues(new Uint8Array(1))[0] &
        (15 >> (Number(c) / 4)))
    ).toString(16),
  );
}

function friendlySyncError(error) {
  if (error?.name === "AbortError") {
    return "Supabase request timed out.";
  }
  return error?.message || "Supabase request failed.";
}

function isDuplicateOrderError(error) {
  const message = String(error?.message || "").toLowerCase();
  return (
    error?.code === "23505" ||
    (message.includes("duplicate") &&
      (message.includes("orders_pkey") || message.includes("order_ref")))
  );
}

async function runSupabaseRequest(requestBuilder, timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await requestBuilder.abortSignal(controller.signal);
  } finally {
    globalThis.clearTimeout(timeout);
  }
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
  return readLocalPendingOrders().filter((order) => {
    if (customerId && order.customer_id === customerId) return true;
    return email && order.customer_email === email.trim().toLowerCase();
  });
}

function buildOrderRecord({ order, items }) {
  const orderId = order.id || makeId();
  const nextOrder = {
    ...order,
    id: orderId,
    customer_email: order.customer_email?.trim().toLowerCase() || null,
    created_at: order.created_at || new Date().toISOString(),
  };
  const orderItems = items.map((item) => ({
    id: item.id || makeId(),
    order_id: orderId,
    product_name: item.product_name,
    quantity: item.quantity,
    price: item.price,
  }));

  return { ...nextOrder, order_items: orderItems };
}

function orderPayloadForCloud(orderRecord) {
  const orderPayload = { ...orderRecord };
  delete orderPayload.order_items;
  delete orderPayload.sync_status;
  delete orderPayload.sync_error;

  return orderPayload;
}

export function captureLocalOrder({ order, items }) {
  return saveLocalPendingOrder({
    ...buildOrderRecord({ order, items }),
    sync_status: "local",
    sync_error: "Waiting for cloud sync.",
  });
}

async function pushOrderToCloud(orderRecord) {
  const orderPayload = orderPayloadForCloud(orderRecord);
  const orderItems = orderRecord.order_items || [];

  const rpcResult = await runSupabaseRequest(
    supabase.rpc("create_checkout_order", {
      order_payload: orderPayload,
      item_payloads: orderItems,
    }),
  );

  if (!rpcResult.error) {
    return {
      ...orderRecord,
      ...rpcResult.data,
      sync_status: "cloud",
      sync_error: null,
    };
  }

  if (!String(rpcResult.error.message || "").includes("create_checkout_order")) {
    throw rpcResult.error;
  }

  const { error } = await runSupabaseRequest(
    supabase.from("orders").insert(orderPayload),
  );

  if (error) throw error;

  const { error: itemsError } = await runSupabaseRequest(
    supabase.from("order_items").insert(orderItems),
  );

  if (itemsError) throw itemsError;

  return {
    ...orderRecord,
    sync_status: "cloud",
    sync_error: null,
  };
}

export async function syncOrderToCloud(orderRecord) {
  if (!supabase) {
    return saveLocalPendingOrder({
      ...orderRecord,
      sync_status: "local",
      sync_error: "Supabase is not configured.",
    });
  }

  try {
    const syncedOrder = await pushOrderToCloud(orderRecord);
    removeLocalPendingOrder(orderRecord.order_ref);
    return syncedOrder;
  } catch (error) {
    if (isDuplicateOrderError(error)) {
      removeLocalPendingOrder(orderRecord.order_ref);
      return {
        ...orderRecord,
        sync_status: "cloud",
        sync_error: null,
      };
    }

    return saveLocalPendingOrder({
      ...orderRecord,
      sync_status: "local",
      sync_error: friendlySyncError(error),
    });
  }
}

export async function subscribeToNewsletter(email) {
  const client = requireSupabase();
  const cleanEmail = email.trim().toLowerCase();
  const { error } = await client
    .from("newsletter_subscribers")
    .insert({ email: cleanEmail });

  if (error && error.code !== "23505") throw error;
  return { email: cleanEmail };
}

export async function createInquiry(inquiry) {
  const client = requireSupabase();
  const { error } = await client
    .from("inquiries")
    .insert(inquiry);

  if (error) throw error;
  return inquiry;
}

export async function createOrder({ order, items }) {
  const localOrder = captureLocalOrder({ order, items });
  return syncOrderToCloud(localOrder);
}

export async function fetchCustomerProfile(userId) {
  const client = requireSupabase();
  const { data, error } = await runSupabaseRequest(
    client
      .from("customer_profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle(),
  );

  if (error) throw error;
  return data;
}

function buildCustomerProfilePayload(profile) {
  return {
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
  };
}

export async function upsertCustomerProfile(profile) {
  const client = requireSupabase();
  const payload = buildCustomerProfilePayload(profile);

  const rpcResult = await runSupabaseRequest(
    client.rpc("save_customer_profile", {
      profile_payload: payload,
    }),
  ).catch((error) => ({ error }));

  if (!rpcResult.error) return rpcResult.data;

  if (
    !String(rpcResult.error.message || "").includes("save_customer_profile")
  ) {
    throw rpcResult.error;
  }

  const updateRequest = client
    .from("customer_profiles")
    .update(payload)
    .eq("id", profile.id)
    .select()
    .maybeSingle();

  const { data, error } = await runSupabaseRequest(updateRequest);

  if (error) throw error;
  if (data) return data;

  const insertRequest = client
    .from("customer_profiles")
    .insert(payload)
    .select()
    .single();

  const { data: inserted, error: insertError } =
    await runSupabaseRequest(insertRequest);

  if (insertError) throw insertError;
  return inserted;
}

export async function fetchCustomerOrders(customerId) {
  const client = requireSupabase();
  const { data, error } = await runSupabaseRequest(
    client
      .from("orders")
      .select("*, order_items(*)")
      .eq("customer_id", customerId)
      .order("created_at", { ascending: false }),
  );

  if (error) throw error;
  return data;
}

export async function fetchSubscribers() {
  const client = requireSupabase();
  const { data, error } = await client
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function fetchProducts({ activeOnly = false } = {}) {
  const client = requireSupabase();
  let query = client.from("products").select("*").order("created_at");
  if (activeOnly) query = query.eq("active", true);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function fetchProductBySlug(slug) {
  const client = requireSupabase();
  const { data, error } = await client
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data;
}

export async function updateProduct(id, product) {
  const client = requireSupabase();
  const { data, error } = await client
    .from("products")
    .update(product)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export function subscribeToProducts(onChange) {
  if (!supabase) return emptySubscription();
  return supabase
    .channel("products-feed")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "products" },
      onChange,
    )
    .subscribe();
}

export function subscribeToAdminData(onChange) {
  if (!supabase) return emptySubscription();
  const tables = [
    "products",
    "orders",
    "order_items",
    "inquiries",
    "newsletter_subscribers",
    "quiz_responses",
    "site_events",
  ];

  let channel = supabase.channel("admin-dashboard-feed");
  tables.forEach((table) => {
    channel = channel.on(
      "postgres_changes",
      { event: "*", schema: "public", table },
      onChange,
    );
  });

  return channel.subscribe();
}

export async function fetchInquiries() {
  const client = requireSupabase();
  const { data, error } = await client
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function fetchOrders() {
  const client = requireSupabase();
  const { data, error } = await client
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function deleteOrder(orderId) {
  const client = requireSupabase();
  const { data, error } = await client.rpc("delete_order_admin", {
    target_order_id: orderId,
  });

  if (error) throw error;
  if (data !== true) {
    throw new Error("Order was not deleted. Please check admin permissions.");
  }
  return orderId;
}

export async function createQuizResponse(response) {
  const client = requireSupabase();
  const { error } = await client
    .from("quiz_responses")
    .insert(response);

  if (error) throw error;
  return response;
}

export async function fetchQuizResponses() {
  const client = requireSupabase();
  const { data, error } = await client
    .from("quiz_responses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function trackSiteEvent(event) {
  if (!supabase) return null;
  const { error } = await runSupabaseRequest(
    supabase
      .from("site_events")
      .insert({
        event_type: event.event_type,
        path: event.path || window.location.pathname,
        label: event.label || null,
        metadata: event.metadata || {},
      }),
    4000,
  ).catch(() => ({ error: true }));

  if (error) return null;
  return event;
}

export async function fetchSiteEvents() {
  const client = requireSupabase();
  const { data, error } = await client
    .from("site_events")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
