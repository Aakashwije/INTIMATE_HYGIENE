import { motion } from "framer-motion";
import {
    MapPin,
    Phone,
    Search,
    ShoppingBag,
    Star,
    TrendingUp,
    Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { fetchOrders } from "../../lib/database";

const CUSTOMERS = [];

const SEGMENT_COLORS = {
  VIP: "bg-amber-50 text-amber-600 border-amber-200",
  B2B: "bg-violet-50 text-violet-600 border-violet-200",
  Regular: "bg-blue-50 text-blue-600 border-blue-200",
  New: "bg-green-100 text-green-primary border-green-200",
};

const SEGMENTS = ["all", "VIP", "B2B", "Regular", "New"];

function initials(name = "") {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function segmentFor(customer) {
  if (customer.totalSpent >= 100000 || customer.name.toLowerCase().includes("hotel") || customer.orders >= 10) {
    return "B2B";
  }
  if (customer.totalSpent >= 20000 || customer.orders >= 5) return "VIP";
  if (customer.orders === 1) return "New";
  return "Regular";
}

function customersFromOrders(orders) {
  const map = new Map();
  orders.forEach((order) => {
    const key = order.customer_id || order.customer_email || order.customer_phone;
    if (!key) return;
    const existing =
      map.get(key) ||
      {
        id: key,
        name: order.customer_name,
        phone: order.customer_phone,
        email: order.customer_email,
        registered: Boolean(order.customer_id),
        city: order.city || "-",
        orders: 0,
        totalSpent: 0,
        lastOrder: order.created_at,
        rating: 5,
      };

    existing.orders += 1;
    existing.totalSpent += Number(order.total || 0);
    if (new Date(order.created_at) > new Date(existing.lastOrder)) {
      existing.lastOrder = order.created_at;
      existing.name = order.customer_name;
      existing.phone = order.customer_phone;
      existing.city = order.city || existing.city;
      existing.registered = existing.registered || Boolean(order.customer_id);
    }
    map.set(key, existing);
  });

  return Array.from(map.values())
    .map((customer) => ({
      ...customer,
      segment: segmentFor(customer),
      avatar: initials(customer.name),
      lastOrder: new Date(customer.lastOrder).toISOString().slice(0, 10),
    }))
    .sort((a, b) => b.totalSpent - a.totalSpent);
}

export default function AdminCustomers() {
  const [search, setSearch] = useState("");
  const [segment, setSegment] = useState("all");
  const [customers, setCustomers] = useState(CUSTOMERS);

  useEffect(() => {
    fetchOrders()
      .then((orders) => {
        const liveCustomers = customersFromOrders(orders);
        if (liveCustomers.length > 0) setCustomers(liveCustomers);
      })
      .catch(() => setCustomers(CUSTOMERS));
  }, []);

  const filtered = customers.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase());
    const matchSegment = segment === "all" || c.segment === segment;
    return matchSearch && matchSegment;
  });

  const totalLTV = customers.reduce((s, c) => s + c.totalSpent, 0);
  const avgLTV = customers.length ? Math.round(totalLTV / customers.length) : 0;
  const vip = customers.filter(
    (c) => c.segment === "VIP" || c.segment === "B2B",
  ).length;

  return (
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-500 text-sm mt-1">
            Customer profiles and lifetime value
          </p>
        </div>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Customers", value: customers.length, icon: Users },
          { label: "VIP / B2B", value: vip, icon: Star },
          {
            label: "Avg. LTV",
            value: `LKR ${avgLTV.toLocaleString()}`,
            icon: TrendingUp,
          },
          {
            label: "Total LTV",
            value: `LKR ${(totalLTV / 1000000).toFixed(2)}M`,
            icon: ShoppingBag,
          },
        ].map(({ label, value, icon: Icon }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center text-green-primary shrink-0">
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-gray-900 font-bold">{value}</div>
              <div className="text-gray-500 text-xs">{label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or city…"
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-primary/30 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {SEGMENTS.map((s) => (
            <button
              key={s}
              onClick={() => setSegment(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border ${
                segment === s
                  ? "bg-green-100 border-green-primary/30 text-green-primary"
                  : "bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-900"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Customer grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.06 }}
            whileHover={{ y: -2 }}
            className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-green-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-linear-to-br from-green-primary to-green-dark flex items-center justify-center text-gray-900 font-bold text-sm shadow-lg shadow-green-primary/20">
                  {c.avatar}
                </div>
                <div>
                  <div className="text-gray-900 font-semibold text-sm">
                    {c.name}
                  </div>
                  {c.registered && (
                    <div className="text-green-primary text-[10px] font-bold">
                      Registered account
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-gray-500 text-xs">
                    <MapPin className="w-3 h-3" />
                    {c.city}
                  </div>
                </div>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-lg border font-medium ${SEGMENT_COLORS[c.segment]}`}
              >
                {c.segment}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                <div className="text-gray-900 font-bold text-sm">{c.orders}</div>
                <div className="text-gray-400 text-xs">Orders</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                <div className="text-green-primary font-bold text-xs">{`LKR ${(c.totalSpent / 1000).toFixed(0)}k`}</div>
                <div className="text-gray-400 text-xs">Spent</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-2.5 text-center">
                <div className="flex items-center justify-center gap-0.5">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-gray-900 font-bold text-sm">
                    {c.rating}
                  </span>
                </div>
                <div className="text-gray-400 text-xs">Rating</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-gray-500 text-xs">
                <Phone className="w-3 h-3" />
                {c.phone}
              </div>
              <a
                href={`https://wa.me/${c.phone.replace(/\D/g, "")}?text=Hello%20${encodeURIComponent(c.name)}!`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300 bg-green-500/10 hover:bg-green-500/20 px-2.5 py-1 rounded-lg border border-green-500/20 transition-all"
              >
                <Phone className="w-3 h-3" />
                WhatsApp
              </a>
            </div>
            <div className="text-gray-400 text-xs mt-2">
              Last order: {c.lastOrder}
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-3 py-12 text-center text-gray-400">
            No customers found
          </div>
        )}
      </div>
    </div>
  );
}
