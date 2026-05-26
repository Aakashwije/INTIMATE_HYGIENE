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
  const { data, error } = await client
    .from("inquiries")
    .insert(inquiry)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createOrder({ order, items }) {
  const client = requireSupabase();
  const { data, error } = await client
    .from("orders")
    .insert(order)
    .select()
    .single();

  if (error) throw error;

  const orderItems = items.map((item) => ({
    order_id: data.id,
    product_name: item.product_name,
    quantity: item.quantity,
    price: item.price,
  }));

  const { error: itemsError } = await client
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw itemsError;
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
