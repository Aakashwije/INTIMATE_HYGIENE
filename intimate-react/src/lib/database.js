import { supabase } from "./supabase";

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
  const client = requireSupabase();
  const orderId = order.id || makeId();
  const nextOrder = { ...order, id: orderId };
  const { error } = await client
    .from("orders")
    .insert(nextOrder);

  if (error) throw error;

  const orderItems = items.map((item) => ({
    order_id: orderId,
    product_name: item.product_name,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: itemsError } = await client
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw itemsError;
  return nextOrder;
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
  const { error } = await supabase
    .from("site_events")
    .insert({
      event_type: event.event_type,
      path: event.path || window.location.pathname,
      label: event.label || null,
      metadata: event.metadata || {},
    });

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
