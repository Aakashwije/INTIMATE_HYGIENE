import { supabase } from "./supabase";

const EMAIL_TIMEOUT_MS = 8000;

function buildEmailApiUrl() {
  const base = import.meta.env.VITE_ORDER_EMAIL_API_URL?.replace(/\/$/, "") || "";
  return `${base}/api/send-order-email`;
}

export async function sendOrderConfirmationEmail({ order, items }) {
  if (!order?.customer_email) {
    throw new Error("Customer email is required for the order confirmation.");
  }

  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), EMAIL_TIMEOUT_MS);
  const headers = { "Content-Type": "application/json" };

  const session = await supabase?.auth
    .getSession()
    .then(({ data }) => data.session)
    .catch(() => null);

  if (session?.access_token) {
    headers["X-Customer-Access-Token"] = session.access_token;
  }

  try {
    const response = await fetch(buildEmailApiUrl(), {
      method: "POST",
      headers,
      body: JSON.stringify({ order, items }),
      keepalive: true,
      signal: controller.signal,
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || "Order confirmation email could not be sent.");
    }

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error("Order confirmation email timed out.", {
        cause: error,
      });
    }
    throw error;
  } finally {
    globalThis.clearTimeout(timeout);
  }
}
