import { supabase } from "./supabase";

export async function subscribeToNewsletter(email) {
  const cleanEmail = email.trim().toLowerCase();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email: cleanEmail });

  if (error && error.code !== "23505") throw error;
  return { email: cleanEmail };
}

export async function createInquiry(inquiry) {
  const { data, error } = await supabase
    .from("inquiries")
    .insert(inquiry)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createOrder({ order, items }) {
  const { data, error } = await supabase
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

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) throw itemsError;
  return data;
}

export async function fetchSubscribers() {
  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function fetchProducts({ activeOnly = false } = {}) {
  let query = supabase.from("products").select("*").order("created_at");
  if (activeOnly) query = query.eq("active", true);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function fetchProductBySlug(slug) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data;
}

export async function updateProduct(id, product) {
  const { data, error } = await supabase
    .from("products")
    .update(product)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export function subscribeToProducts(onChange) {
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
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function fetchOrders() {
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
