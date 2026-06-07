const BRAND = {
  name: "Intimate Hygiene",
  company: "Intimate Hygiene Enterprises",
  phone: "+94 70 701 8171",
  email: "intimatehygiene@gmail.com",
  green: "#28a745",
  olive: "#7CB342",
};
const RESEND_FALLBACK_FROM = "Intimate Hygiene <onboarding@resend.dev>";

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function money(value) {
  return `LKR ${Number(value || 0).toLocaleString("en-LK")}`;
}

function getBaseUrl(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers.host;
  return host ? `${proto}://${host}` : "";
}

function buildEmailHtml({ order, items, logoUrl }) {
  const itemRows = items
    .map(
      (item) => `
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid #edf2ef;">
            <div style="font-weight:700;color:#1f2937;">${escapeHtml(item.product_name || item.name)}</div>
            <div style="font-size:13px;color:#6b7280;">Qty ${escapeHtml(item.quantity)} x ${money(item.price)}</div>
          </td>
          <td align="right" style="padding:14px 0;border-bottom:1px solid #edf2ef;font-weight:700;color:#1f2937;">
            ${money(Number(item.price || 0) * Number(item.quantity || 0))}
          </td>
        </tr>
      `,
    )
    .join("");

  return `<!doctype html>
  <html>
    <body style="margin:0;background:#f4f8f5;font-family:Arial,Helvetica,sans-serif;color:#1f2937;">
      <div style="display:none;max-height:0;overflow:hidden;">We received your Hygenc Covers order ${escapeHtml(order.order_ref)}.</div>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f8f5;padding:28px 12px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e5eee7;">
              <tr>
                <td style="padding:28px 28px 20px;background:linear-gradient(135deg,#ffffff 0%,#eef9f0 100%);">
                  <img src="${escapeHtml(logoUrl)}" width="180" alt="Hygenc Covers" style="display:block;max-width:180px;height:auto;margin-bottom:24px;">
                  <div style="display:inline-block;background:#e8f7ec;color:${BRAND.green};font-weight:700;font-size:13px;border-radius:999px;padding:8px 12px;">Order received</div>
                  <h1 style="margin:16px 0 8px;font-size:28px;line-height:1.2;color:#17231a;">Thank you, ${escapeHtml(order.customer_name)}.</h1>
                  <p style="margin:0;color:#4b5563;font-size:15px;line-height:1.7;">Your order has been received. Our team will confirm availability and delivery details shortly on WhatsApp or phone.</p>
                </td>
              </tr>
              <tr>
                <td style="padding:0 28px 28px;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:22px 0;background:#f8fbf8;border:1px solid #e6f1e8;border-radius:14px;">
                    <tr>
                      <td style="padding:16px;">
                        <div style="font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#6b7280;font-weight:700;">Order reference</div>
                        <div style="font-size:20px;font-weight:800;color:${BRAND.green};margin-top:4px;">${escapeHtml(order.order_ref)}</div>
                      </td>
                      <td style="padding:16px;" align="right">
                        <div style="font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#6b7280;font-weight:700;">Total</div>
                        <div style="font-size:20px;font-weight:800;color:#111827;margin-top:4px;">${money(order.total)}</div>
                      </td>
                    </tr>
                  </table>

                  <h2 style="font-size:18px;margin:0 0 8px;color:#17231a;">Order summary</h2>
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    ${itemRows}
                    <tr>
                      <td style="padding:16px 0;font-size:16px;font-weight:800;">Subtotal</td>
                      <td align="right" style="padding:16px 0;font-size:18px;font-weight:800;color:${BRAND.green};">${money(order.total)}</td>
                    </tr>
                  </table>

                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:10px;background:#fff;border:1px solid #edf2ef;border-radius:14px;">
                    <tr>
                      <td style="padding:16px;">
                        <div style="font-weight:800;margin-bottom:8px;">Delivery details</div>
                        <div style="color:#4b5563;line-height:1.7;font-size:14px;">
                          ${escapeHtml(order.customer_name)}<br>
                          ${escapeHtml(order.customer_phone)}<br>
                          ${escapeHtml(order.address)}<br>
                          ${escapeHtml(order.city || "")}
                        </div>
                      </td>
                    </tr>
                  </table>

                  <p style="margin:22px 0 0;color:#6b7280;font-size:14px;line-height:1.7;">
                    Payment method: <strong>${escapeHtml(order.payment_method || "Cash on Delivery")}</strong>
                    ${order.note ? `<br>Note: ${escapeHtml(order.note)}` : ""}
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding:22px 28px;background:#17231a;color:#ffffff;">
                  <div style="font-weight:800;margin-bottom:6px;">${BRAND.company}</div>
                  <div style="color:#cfe8d3;font-size:13px;line-height:1.7;">${BRAND.phone} · ${BRAND.email}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

function parseBody(req) {
  if (!req.body || typeof req.body === "object") return req.body || {};

  try {
    return JSON.parse(req.body);
  } catch {
    return {};
  }
}

async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: "Email service is not configured." });
  }

  const { order, items = [] } = parseBody(req);
  if (!order?.customer_email || !order?.order_ref || !items.length) {
    return res.status(400).json({ error: "Order email, reference, and items are required." });
  }

  const baseUrl = getBaseUrl(req);
  const logoUrl = `${baseUrl}/fulllogo.png`;
  const from = process.env.ORDER_EMAIL_FROM || RESEND_FALLBACK_FROM;
  const replyTo = process.env.ORDER_EMAIL_REPLY_TO || BRAND.email;
  const bcc = process.env.ORDER_EMAIL_BCC || BRAND.email;

  const payload = {
    from,
    to: [order.customer_email],
    bcc: bcc ? [bcc] : undefined,
    reply_to: replyTo,
    subject: `We received your order ${order.order_ref}`,
    html: buildEmailHtml({ order, items, logoUrl }),
  };

  let response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let data = await response.json().catch(() => ({}));
  const errorMessage = data.message || data.error || "";

  if (
    !response.ok &&
    from !== RESEND_FALLBACK_FROM &&
    /domain|verify|verified|sender/i.test(errorMessage)
  ) {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        from: RESEND_FALLBACK_FROM,
      }),
    });
    data = await response.json().catch(() => ({}));
  }

  if (!response.ok) {
    return res.status(response.status).json({
      error: data.message || data.error || "Could not send order email.",
    });
  }

  return res.status(200).json({
    ok: true,
    id: data.id,
  });
}

module.exports = handler;
