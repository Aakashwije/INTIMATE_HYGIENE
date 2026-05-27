const BRAND = {
  name: "Hygenc Covers",
  tagline: "Intimate Hygiene • Made for Sri Lanka",
  logoPath: "/fulllogo.png",
  primary: "#28a745",
  dark: "#1d7a34",
  light: "#5cd65c",
  tintBg: "#e9f8ec",
};

const STATUS_TINT = {
  delivered: { bg: "#dcfce7", border: "#bbf7d0", text: "#15803d" },
  shipped: { bg: "#dbeafe", border: "#bfdbfe", text: "#1d4ed8" },
  processing: { bg: "#fef3c7", border: "#fde68a", text: "#b45309" },
  cancelled: { bg: "#fee2e2", border: "#fecaca", text: "#b91c1c" },
};

function csvEscape(value) {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n\r]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

function buildCsv(headers, rows) {
  const lines = [headers.map(csvEscape).join(",")];
  rows.forEach((row) => lines.push(row.map(csvEscape).join(",")));
  return "﻿" + lines.join("\r\n");
}

function triggerDownload(content, filename, mime = "text/csv;charset=utf-8;") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

function stampDate(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function prettyDate(d = new Date()) {
  return d.toLocaleString("en-LK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function escapeHtml(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatLKR(amount) {
  return `LKR ${Number(amount || 0).toLocaleString("en-LK")}`;
}

function ordersToCsvRows(orders) {
  const headers = [
    "Order ID",
    "Date",
    "Customer",
    "Email",
    "Phone",
    "City",
    "Address",
    "Product(s)",
    "Items Count",
    "Total Quantity",
    "Payment Method",
    "Status",
    "Total (LKR)",
  ];
  const rows = orders.map((o) => [
    o.id,
    o.date,
    o.customer,
    o.email || "",
    o.phone || "",
    o.city || "",
    o.address || "",
    (o.items && o.items.length
      ? o.items.map((it) => `${it.product_name} x ${it.quantity}`).join(" | ")
      : o.product) || "",
    o.items?.length || 1,
    o.qty,
    o.payMethod || "",
    o.status,
    Number(o.amount || 0),
  ]);
  return { headers, rows };
}

export function downloadOrdersCsv(orders) {
  const { headers, rows } = ordersToCsvRows(orders);
  triggerDownload(buildCsv(headers, rows), `hygenc-orders-${stampDate()}.csv`);
}

function computeOrderStats(orders) {
  const stats = {
    total: orders.length,
    revenue: 0,
    avgOrder: 0,
    delivered: 0,
    shipped: 0,
    processing: 0,
    cancelled: 0,
    byCity: {},
    byPayment: {},
    byProduct: {},
  };

  orders.forEach((o) => {
    const amount = Number(o.amount || 0);
    if (o.status !== "cancelled") stats.revenue += amount;
    stats[o.status] = (stats[o.status] || 0) + 1;
    if (o.city) stats.byCity[o.city] = (stats.byCity[o.city] || 0) + 1;
    if (o.payMethod)
      stats.byPayment[o.payMethod] = (stats.byPayment[o.payMethod] || 0) + 1;
    const productName =
      (o.items && o.items[0]?.product_name) || o.product || "Order";
    stats.byProduct[productName] =
      (stats.byProduct[productName] || 0) + (o.qty || 1);
  });

  stats.avgOrder = stats.total ? Math.round(stats.revenue / stats.total) : 0;
  return stats;
}

function statBlock(label, value, accent) {
  return `
    <div class="stat" style="border-color:${accent.border};background:${accent.bg};">
      <div class="stat-label">${escapeHtml(label)}</div>
      <div class="stat-value" style="color:${accent.text};">${value}</div>
    </div>
  `;
}

function statusPill(status) {
  const tint = STATUS_TINT[status] || STATUS_TINT.processing;
  return `<span class="pill" style="background:${tint.bg};border-color:${tint.border};color:${tint.text};">${escapeHtml(
    status.charAt(0).toUpperCase() + status.slice(1),
  )}</span>`;
}

function topNFromMap(obj, n = 6) {
  return Object.entries(obj)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);
}

function barRow(label, value, max) {
  const pct = max ? Math.max(4, Math.round((value / max) * 100)) : 0;
  return `
    <div class="bar-row">
      <div class="bar-row-head">
        <span>${escapeHtml(label)}</span>
        <span class="bar-row-value">${value}</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style="width:${pct}%"></div>
      </div>
    </div>
  `;
}

function buildOrdersReportHtml(orders) {
  const stats = computeOrderStats(orders);
  const generatedAt = prettyDate();
  const cityList = topNFromMap(stats.byCity);
  const productList = topNFromMap(stats.byProduct);
  const paymentList = topNFromMap(stats.byPayment);
  const cityMax = cityList[0]?.[1] || 1;
  const productMax = productList[0]?.[1] || 1;

  const tableRows = orders
    .map((o, idx) => {
      const productsCell =
        o.items && o.items.length
          ? o.items
              .map(
                (it) =>
                  `<div>${escapeHtml(it.product_name)} <span class="muted">× ${it.quantity}</span></div>`,
              )
              .join("")
          : escapeHtml(o.product || "—");
      return `
        <tr class="${idx % 2 ? "row-alt" : ""}">
          <td class="mono accent">${escapeHtml(o.id)}</td>
          <td>${escapeHtml(o.date)}</td>
          <td>
            <div class="cust-name">${escapeHtml(o.customer)}</div>
            <div class="muted small">${escapeHtml(o.phone || "")}</div>
            ${o.email ? `<div class="muted small">${escapeHtml(o.email)}</div>` : ""}
          </td>
          <td>
            <div>${escapeHtml(o.city || "—")}</div>
            <div class="muted small">${escapeHtml(o.address || "")}</div>
          </td>
          <td>${productsCell}</td>
          <td class="num">${o.qty}</td>
          <td>${escapeHtml(o.payMethod || "—")}</td>
          <td>${statusPill(o.status)}</td>
          <td class="num bold">${formatLKR(o.amount)}</td>
        </tr>
      `;
    })
    .join("");

  const emptyState = orders.length
    ? ""
    : `
      <div class="empty">
        <div class="empty-title">No orders to export yet</div>
        <div class="empty-sub">Once orders start coming in, they'll appear here.</div>
      </div>
    `;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${BRAND.name} • Orders Report • ${stampDate()}</title>
<meta name="viewport" content="width=device-width,initial-scale=1" />
<style>
  :root {
    --primary: ${BRAND.primary};
    --dark: ${BRAND.dark};
    --light: ${BRAND.light};
    --tint: ${BRAND.tintBg};
  }
  * { box-sizing: border-box; }
  html, body {
    margin: 0;
    padding: 0;
    background: #f5f7f6;
    color: #1f2937;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .toolbar {
    position: sticky;
    top: 0;
    z-index: 20;
    background: rgba(255,255,255,0.92);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid #e5e7eb;
    padding: 12px 24px;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    align-items: center;
  }
  .toolbar .meta {
    margin-right: auto;
    color: #6b7280;
    font-size: 12px;
  }
  .btn {
    border: 0;
    cursor: pointer;
    padding: 9px 16px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 13px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: transform .1s ease, box-shadow .15s ease;
  }
  .btn:hover { transform: translateY(-1px); }
  .btn-primary {
    background: linear-gradient(135deg, var(--primary), var(--dark));
    color: #fff;
    box-shadow: 0 6px 18px rgba(40,167,69,0.28);
  }
  .btn-secondary {
    background: #fff;
    color: #1f2937;
    border: 1px solid #e5e7eb;
  }
  .page {
    max-width: 1180px;
    margin: 24px auto 64px;
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 12px 40px rgba(17, 24, 39, 0.08);
    overflow: hidden;
  }
  .hero {
    position: relative;
    background:
      radial-gradient(1200px 360px at 20% -60%, rgba(92,214,92,0.45), transparent 60%),
      linear-gradient(135deg, var(--dark) 0%, var(--primary) 60%, var(--light) 130%);
    color: #fff;
    padding: 28px 36px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }
  .hero::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(800px 200px at 100% 120%, rgba(255,255,255,0.15), transparent 70%);
    pointer-events: none;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 16px;
    position: relative;
  }
  .brand img {
    height: 64px;
    width: auto;
    background: #fff;
    padding: 8px 14px;
    border-radius: 14px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.12);
  }
  .brand-text h1 {
    margin: 0;
    font-size: 22px;
    letter-spacing: 0.2px;
  }
  .brand-text p {
    margin: 4px 0 0;
    opacity: 0.85;
    font-size: 12.5px;
  }
  .report-title {
    text-align: right;
    position: relative;
  }
  .report-title .kicker {
    text-transform: uppercase;
    letter-spacing: 1.4px;
    font-size: 11px;
    opacity: 0.85;
  }
  .report-title h2 {
    margin: 4px 0 0;
    font-size: 28px;
    font-weight: 700;
  }
  .report-title .sub {
    margin-top: 6px;
    opacity: 0.9;
    font-size: 12px;
  }

  .body { padding: 28px 36px; }

  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
    margin-bottom: 24px;
  }
  .stat {
    border: 1px solid;
    border-radius: 14px;
    padding: 14px 16px;
  }
  .stat-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: #6b7280;
    margin-bottom: 6px;
  }
  .stat-value {
    font-size: 20px;
    font-weight: 700;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }
  @media (max-width: 720px) { .grid-2 { grid-template-columns: 1fr; } }

  .card {
    border: 1px solid #e5e7eb;
    background: #fff;
    border-radius: 16px;
    padding: 18px 20px;
  }
  .card h3 {
    margin: 0 0 14px;
    font-size: 14px;
    color: #111827;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .card h3::before {
    content: "";
    display: inline-block;
    width: 8px; height: 8px; border-radius: 999px;
    background: linear-gradient(135deg, var(--primary), var(--light));
  }
  .bar-row { margin-bottom: 10px; }
  .bar-row:last-child { margin-bottom: 0; }
  .bar-row-head {
    display: flex;
    justify-content: space-between;
    font-size: 12.5px;
    color: #374151;
    margin-bottom: 4px;
  }
  .bar-row-value { font-weight: 600; color: #111827; }
  .bar-track {
    background: #f1f5f4;
    border-radius: 999px;
    height: 8px;
    overflow: hidden;
  }
  .bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary), var(--light));
    border-radius: 999px;
  }

  .table-wrap {
    border: 1px solid #e5e7eb;
    border-radius: 16px;
    overflow: hidden;
  }
  .table-head {
    padding: 14px 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--tint);
    border-bottom: 1px solid #d1ecd4;
  }
  .table-head h3 { margin: 0; font-size: 14px; color: var(--dark); }
  .table-head .badge {
    background: #fff;
    color: var(--dark);
    border: 1px solid #c5e7cb;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12.5px;
  }
  thead th {
    background: #fafafa;
    color: #6b7280;
    text-align: left;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 12px 14px;
    border-bottom: 1px solid #e5e7eb;
  }
  tbody td {
    padding: 12px 14px;
    border-bottom: 1px solid #f1f5f4;
    vertical-align: top;
  }
  tbody tr:last-child td { border-bottom: 0; }
  tbody tr.row-alt { background: #fbfdfb; }
  .mono { font-family: 'JetBrains Mono', Menlo, Consolas, monospace; font-size: 11.5px; }
  .accent { color: var(--dark); font-weight: 600; }
  .cust-name { font-weight: 600; color: #111827; }
  .muted { color: #6b7280; }
  .small { font-size: 11px; }
  .num { text-align: right; white-space: nowrap; }
  .bold { font-weight: 700; color: #111827; }

  .pill {
    display: inline-block;
    padding: 3px 9px;
    font-size: 11px;
    font-weight: 600;
    border-radius: 999px;
    border: 1px solid;
  }

  .empty {
    text-align: center;
    padding: 48px 24px;
    background: #fafbfa;
  }
  .empty-title { font-weight: 600; color: #111827; }
  .empty-sub { color: #6b7280; font-size: 13px; margin-top: 4px; }

  .footer {
    text-align: center;
    color: #6b7280;
    font-size: 11px;
    padding: 24px;
    border-top: 1px solid #e5e7eb;
    background: #fafbfa;
  }
  .footer strong { color: var(--dark); }

  @media print {
    body { background: #fff; }
    .toolbar { display: none; }
    .page {
      box-shadow: none;
      margin: 0;
      border-radius: 0;
      max-width: 100%;
    }
    tbody tr { page-break-inside: avoid; }
  }
</style>
</head>
<body>
  <div class="toolbar">
    <div class="meta">Generated ${escapeHtml(generatedAt)} • ${orders.length} order${orders.length === 1 ? "" : "s"}</div>
    <button class="btn btn-secondary" onclick="window.print()">🖨️ Print / Save PDF</button>
    <button class="btn btn-primary" id="dl-csv">⬇ Download CSV</button>
  </div>

  <div class="page">
    <div class="hero">
      <div class="brand">
        <img src="${BRAND.logoPath}" alt="${BRAND.name} logo" />
        <div class="brand-text">
          <h1>${BRAND.name}</h1>
          <p>${BRAND.tagline}</p>
        </div>
      </div>
      <div class="report-title">
        <div class="kicker">Admin Export</div>
        <h2>Orders Report</h2>
        <div class="sub">${escapeHtml(generatedAt)}</div>
      </div>
    </div>

    <div class="body">
      <div class="stats">
        ${statBlock("Total Orders", stats.total, { bg: "#e9f8ec", border: "#bbf7d0", text: BRAND.dark })}
        ${statBlock("Total Revenue", formatLKR(stats.revenue), { bg: "#fef9c3", border: "#fde68a", text: "#92400e" })}
        ${statBlock("Avg Order Value", formatLKR(stats.avgOrder), { bg: "#ede9fe", border: "#ddd6fe", text: "#5b21b6" })}
        ${statBlock("Delivered", stats.delivered || 0, { bg: "#dcfce7", border: "#bbf7d0", text: "#15803d" })}
        ${statBlock("Shipped", stats.shipped || 0, { bg: "#dbeafe", border: "#bfdbfe", text: "#1d4ed8" })}
        ${statBlock("Processing", stats.processing || 0, { bg: "#fef3c7", border: "#fde68a", text: "#b45309" })}
        ${statBlock("Cancelled", stats.cancelled || 0, { bg: "#fee2e2", border: "#fecaca", text: "#b91c1c" })}
      </div>

      <div class="grid-2">
        <div class="card">
          <h3>Top Cities</h3>
          ${
            cityList.length
              ? cityList.map(([city, count]) => barRow(city, count, cityMax)).join("")
              : '<div class="muted small">No city data yet.</div>'
          }
        </div>
        <div class="card">
          <h3>Top Products (by units sold)</h3>
          ${
            productList.length
              ? productList.map(([name, count]) => barRow(name, count, productMax)).join("")
              : '<div class="muted small">No product data yet.</div>'
          }
        </div>
      </div>

      ${
        paymentList.length
          ? `<div class="card" style="margin-bottom:24px;">
              <h3>Payment Method Mix</h3>
              <div style="display:flex;flex-wrap:wrap;gap:8px;">
                ${paymentList
                  .map(
                    ([method, count]) =>
                      `<span class="pill" style="background:var(--tint);border-color:#c5e7cb;color:var(--dark);">${escapeHtml(
                        method,
                      )} • ${count}</span>`,
                  )
                  .join("")}
              </div>
            </div>`
          : ""
      }

      <div class="table-wrap">
        <div class="table-head">
          <h3>All Orders</h3>
          <span class="badge">${orders.length} record${orders.length === 1 ? "" : "s"}</span>
        </div>
        ${
          orders.length
            ? `<table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Location</th>
                    <th>Products</th>
                    <th class="num">Qty</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th class="num">Total</th>
                  </tr>
                </thead>
                <tbody>${tableRows}</tbody>
              </table>`
            : emptyState
        }
      </div>
    </div>

    <div class="footer">
      <strong>${BRAND.name}</strong> • Admin export • ${escapeHtml(generatedAt)}
      <br />
      Generated automatically from the live database — for internal use only.
    </div>
  </div>

<script>
  window.__ORDERS_CSV__ = ${JSON.stringify(buildCsv(ordersToCsvRows(orders).headers, ordersToCsvRows(orders).rows))};
  document.getElementById('dl-csv').addEventListener('click', function() {
    var blob = new Blob([window.__ORDERS_CSV__], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'hygenc-orders-${stampDate()}.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function() { URL.revokeObjectURL(url); }, 0);
  });
</script>
</body>
</html>`;
}

export function exportOrders(orders) {
  downloadOrdersCsv(orders);
  const html = buildOrdersReportHtml(orders);
  const win = window.open("", "_blank", "noopener,noreferrer");
  if (!win) return;
  win.document.open();
  win.document.write(html);
  win.document.close();
}

function buildAnalyticsCsv({ monthly, channels, metricLabel }) {
  const lines = [];
  lines.push(`Hygenc Covers • Analytics Report`);
  lines.push(`Generated,${prettyDate()}`);
  lines.push(`Active metric,${metricLabel}`);
  lines.push("");
  lines.push("Monthly Performance");
  lines.push(["Month", "Revenue (LKR)", "Orders", "New Customers", "Returns"].join(","));
  monthly.forEach((row) => {
    lines.push(
      [
        csvEscape(row.month),
        csvEscape(row.revenue),
        csvEscape(row.orders),
        csvEscape(row.customers),
        csvEscape(row.returns),
      ].join(","),
    );
  });
  lines.push("");
  lines.push("Channel Performance");
  lines.push(["Channel", "Orders", "Revenue (LKR)"].join(","));
  channels.forEach((c) => {
    lines.push(
      [csvEscape(c.channel), csvEscape(c.orders), csvEscape(c.revenue)].join(","),
    );
  });
  return "﻿" + lines.join("\r\n");
}

function buildAnalyticsReportHtml({ monthly, channels, metricLabel }) {
  const generatedAt = prettyDate();
  const totals = monthly.reduce(
    (acc, row) => {
      acc.revenue += Number(row.revenue || 0);
      acc.orders += Number(row.orders || 0);
      acc.customers += Number(row.customers || 0);
      acc.returns += Number(row.returns || 0);
      return acc;
    },
    { revenue: 0, orders: 0, customers: 0, returns: 0 },
  );
  const maxRevenue = Math.max(...monthly.map((m) => m.revenue || 0), 1);
  const monthlyRows = monthly
    .map((row, idx) => {
      const pct = Math.max(2, Math.round(((row.revenue || 0) / maxRevenue) * 100));
      return `
        <tr class="${idx % 2 ? "row-alt" : ""}">
          <td class="bold">${escapeHtml(row.month)}</td>
          <td class="num">${formatLKR(row.revenue)}</td>
          <td class="num">${row.orders}</td>
          <td class="num">${row.customers}</td>
          <td class="num">${row.returns}</td>
          <td>
            <div class="bar-track" style="min-width:120px;">
              <div class="bar-fill" style="width:${pct}%"></div>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
  const maxChannelOrders = Math.max(...channels.map((c) => c.orders || 0), 1);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${BRAND.name} • Analytics Report • ${stampDate()}</title>
<meta name="viewport" content="width=device-width,initial-scale=1" />
<style>
  :root { --primary: ${BRAND.primary}; --dark: ${BRAND.dark}; --light: ${BRAND.light}; --tint: ${BRAND.tintBg}; }
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #f5f7f6; color: #1f2937; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .toolbar { position: sticky; top: 0; z-index: 20; background: rgba(255,255,255,0.92); backdrop-filter: blur(8px); border-bottom: 1px solid #e5e7eb; padding: 12px 24px; display: flex; gap: 12px; justify-content: flex-end; align-items: center; }
  .toolbar .meta { margin-right: auto; color: #6b7280; font-size: 12px; }
  .btn { border: 0; cursor: pointer; padding: 9px 16px; border-radius: 10px; font-weight: 600; font-size: 13px; display: inline-flex; align-items: center; gap: 8px; }
  .btn:hover { transform: translateY(-1px); }
  .btn-primary { background: linear-gradient(135deg, var(--primary), var(--dark)); color: #fff; box-shadow: 0 6px 18px rgba(40,167,69,0.28); }
  .btn-secondary { background: #fff; color: #1f2937; border: 1px solid #e5e7eb; }
  .page { max-width: 1180px; margin: 24px auto 64px; background: #fff; border-radius: 20px; box-shadow: 0 12px 40px rgba(17,24,39,0.08); overflow: hidden; }
  .hero { position: relative; background: radial-gradient(1200px 360px at 20% -60%, rgba(92,214,92,0.45), transparent 60%), linear-gradient(135deg, var(--dark) 0%, var(--primary) 60%, var(--light) 130%); color: #fff; padding: 28px 36px 32px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
  .brand { display: flex; align-items: center; gap: 16px; }
  .brand img { height: 64px; width: auto; background: #fff; padding: 8px 14px; border-radius: 14px; box-shadow: 0 6px 18px rgba(0,0,0,0.12); }
  .brand-text h1 { margin: 0; font-size: 22px; }
  .brand-text p { margin: 4px 0 0; opacity: 0.85; font-size: 12.5px; }
  .report-title { text-align: right; }
  .report-title .kicker { text-transform: uppercase; letter-spacing: 1.4px; font-size: 11px; opacity: 0.85; }
  .report-title h2 { margin: 4px 0 0; font-size: 28px; font-weight: 700; }
  .report-title .sub { margin-top: 6px; opacity: 0.9; font-size: 12px; }
  .body { padding: 28px 36px; }
  .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 24px; }
  .stat { border: 1px solid; border-radius: 14px; padding: 14px 16px; }
  .stat-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #6b7280; margin-bottom: 6px; }
  .stat-value { font-size: 20px; font-weight: 700; }
  .card { border: 1px solid #e5e7eb; background: #fff; border-radius: 16px; padding: 18px 20px; margin-bottom: 18px; }
  .card h3 { margin: 0 0 14px; font-size: 14px; color: #111827; display: flex; align-items: center; gap: 8px; }
  .card h3::before { content: ""; display: inline-block; width: 8px; height: 8px; border-radius: 999px; background: linear-gradient(135deg, var(--primary), var(--light)); }
  table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
  thead th { background: var(--tint); color: var(--dark); text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; padding: 12px 14px; border-bottom: 1px solid #d1ecd4; }
  tbody td { padding: 12px 14px; border-bottom: 1px solid #f1f5f4; }
  tbody tr.row-alt { background: #fbfdfb; }
  .num { text-align: right; white-space: nowrap; }
  .bold { font-weight: 700; color: #111827; }
  .bar-track { background: #f1f5f4; border-radius: 999px; height: 8px; overflow: hidden; }
  .bar-fill { height: 100%; background: linear-gradient(90deg, var(--primary), var(--light)); border-radius: 999px; }
  .bar-row { margin-bottom: 10px; }
  .bar-row-head { display: flex; justify-content: space-between; font-size: 12.5px; color: #374151; margin-bottom: 4px; }
  .bar-row-value { font-weight: 600; color: #111827; }
  .footer { text-align: center; color: #6b7280; font-size: 11px; padding: 24px; border-top: 1px solid #e5e7eb; background: #fafbfa; }
  .footer strong { color: var(--dark); }
  @media print { body { background: #fff; } .toolbar { display: none; } .page { box-shadow: none; margin: 0; border-radius: 0; max-width: 100%; } }
</style>
</head>
<body>
  <div class="toolbar">
    <div class="meta">Generated ${escapeHtml(generatedAt)} • Metric: ${escapeHtml(metricLabel)}</div>
    <button class="btn btn-secondary" onclick="window.print()">🖨️ Print / Save PDF</button>
    <button class="btn btn-primary" id="dl-csv">⬇ Download CSV</button>
  </div>

  <div class="page">
    <div class="hero">
      <div class="brand">
        <img src="${BRAND.logoPath}" alt="${BRAND.name} logo" />
        <div class="brand-text">
          <h1>${BRAND.name}</h1>
          <p>${BRAND.tagline}</p>
        </div>
      </div>
      <div class="report-title">
        <div class="kicker">Admin Export</div>
        <h2>Analytics Report</h2>
        <div class="sub">${escapeHtml(generatedAt)}</div>
      </div>
    </div>

    <div class="body">
      <div class="stats">
        ${statBlock("Total Revenue", formatLKR(totals.revenue), { bg: "#e9f8ec", border: "#bbf7d0", text: BRAND.dark })}
        ${statBlock("Total Orders", totals.orders, { bg: "#dbeafe", border: "#bfdbfe", text: "#1d4ed8" })}
        ${statBlock("New Customers", totals.customers, { bg: "#ede9fe", border: "#ddd6fe", text: "#5b21b6" })}
        ${statBlock("Returns / Cancellations", totals.returns, { bg: "#fee2e2", border: "#fecaca", text: "#b91c1c" })}
      </div>

      <div class="card">
        <h3>Monthly Performance</h3>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th class="num">Revenue</th>
              <th class="num">Orders</th>
              <th class="num">New Customers</th>
              <th class="num">Returns</th>
              <th>Revenue Share</th>
            </tr>
          </thead>
          <tbody>${monthlyRows}</tbody>
        </table>
      </div>

      <div class="card">
        <h3>Channel Performance</h3>
        ${
          channels.length
            ? channels
                .map((c) => {
                  const pct = Math.max(
                    2,
                    Math.round(((c.orders || 0) / maxChannelOrders) * 100),
                  );
                  return `
              <div class="bar-row">
                <div class="bar-row-head">
                  <span><span style="display:inline-block;width:8px;height:8px;border-radius:999px;background:${c.color || BRAND.primary};margin-right:6px;"></span>${escapeHtml(c.channel)}</span>
                  <span class="bar-row-value">${c.orders.toLocaleString()} orders • ${formatLKR(c.revenue)}</span>
                </div>
                <div class="bar-track">
                  <div class="bar-fill" style="width:${pct}%;background:linear-gradient(90deg, ${c.color || BRAND.primary}, ${BRAND.light});"></div>
                </div>
              </div>
            `;
                })
                .join("")
            : '<div style="color:#6b7280;font-size:13px;">No channel data yet.</div>'
        }
      </div>
    </div>

    <div class="footer">
      <strong>${BRAND.name}</strong> • Admin export • ${escapeHtml(generatedAt)}
      <br />
      Generated automatically from the live database — for internal use only.
    </div>
  </div>

<script>
  window.__CSV__ = ${JSON.stringify(buildAnalyticsCsv({ monthly, channels, metricLabel }))};
  document.getElementById('dl-csv').addEventListener('click', function() {
    var blob = new Blob([window.__CSV__], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = 'hygenc-analytics-${stampDate()}.csv';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function() { URL.revokeObjectURL(url); }, 0);
  });
</script>
</body>
</html>`;
}

export function exportAnalytics({ monthly, channels, metricLabel }) {
  const csv = buildAnalyticsCsv({ monthly, channels, metricLabel });
  triggerDownload(csv, `hygenc-analytics-${stampDate()}.csv`);
  const html = buildAnalyticsReportHtml({ monthly, channels, metricLabel });
  const win = window.open("", "_blank", "noopener,noreferrer");
  if (!win) return;
  win.document.open();
  win.document.write(html);
  win.document.close();
}
