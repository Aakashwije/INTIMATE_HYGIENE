import { AnimatePresence, motion } from "framer-motion";
import {
    CheckCircle,
    Clock,
    Download,
    Eye,
    MapPin,
    Package,
    Phone,
    RotateCcw,
    Search,
    Truck,
    X
} from "lucide-react";
import { useState } from "react";

const ALL_ORDERS = [
  {
    id: "#ORD-1082",
    customer: "Dilshan Perera",
    phone: "+94771234567",
    city: "Colombo 3",
    product: "Travel Pack",
    qty: 5,
    amount: 6250,
    status: "delivered",
    date: "2025-12-15",
    avatar: "DP",
    payMethod: "WhatsApp",
  },
  {
    id: "#ORD-1081",
    customer: "Priya Mendis",
    phone: "+94712345678",
    city: "Kandy",
    product: "Single Use Pack",
    qty: 20,
    amount: 5000,
    status: "processing",
    date: "2025-12-15",
    avatar: "PM",
    payMethod: "WhatsApp",
  },
  {
    id: "#ORD-1080",
    customer: "Ruwan Hotels",
    phone: "+94117890123",
    city: "Colombo 7",
    product: "Enterprise Pack",
    qty: 10,
    amount: 45000,
    status: "shipped",
    date: "2025-12-14",
    avatar: "RH",
    payMethod: "B2B Invoice",
  },
  {
    id: "#ORD-1079",
    customer: "Nimasha Silva",
    phone: "+94769876543",
    city: "Galle",
    product: "Single Use Pack",
    qty: 10,
    amount: 2500,
    status: "delivered",
    date: "2025-12-14",
    avatar: "NS",
    payMethod: "WhatsApp",
  },
  {
    id: "#ORD-1078",
    customer: "HSBC Lanka",
    phone: "+94112233445",
    city: "Colombo 1",
    product: "Enterprise Pack",
    qty: 50,
    amount: 225000,
    status: "delivered",
    date: "2025-12-13",
    avatar: "HL",
    payMethod: "B2B Invoice",
  },
  {
    id: "#ORD-1077",
    customer: "Kavinda Almeida",
    phone: "+94754321987",
    city: "Negombo",
    product: "Travel Pack",
    qty: 3,
    amount: 3750,
    status: "cancelled",
    date: "2025-12-13",
    avatar: "KA",
    payMethod: "WhatsApp",
  },
  {
    id: "#ORD-1076",
    customer: "Sunethra W.",
    phone: "+94778901234",
    city: "Colombo 5",
    product: "Travel Pack",
    qty: 8,
    amount: 10000,
    status: "shipped",
    date: "2025-12-12",
    avatar: "SW",
    payMethod: "WhatsApp",
  },
  {
    id: "#ORD-1075",
    customer: "Lanka Hospitals",
    phone: "+94112109876",
    city: "Colombo 10",
    product: "Enterprise Pack",
    qty: 100,
    amount: 450000,
    status: "delivered",
    date: "2025-12-12",
    avatar: "LH",
    payMethod: "B2B Invoice",
  },
  {
    id: "#ORD-1074",
    customer: "Chamari Dias",
    phone: "+94761122334",
    city: "Matara",
    product: "Single Use Pack",
    qty: 30,
    amount: 7500,
    status: "delivered",
    date: "2025-12-11",
    avatar: "CD",
    payMethod: "WhatsApp",
  },
  {
    id: "#ORD-1073",
    customer: "FitLife Gym",
    phone: "+94114455667",
    city: "Colombo 4",
    product: "Single Use Pack",
    qty: 50,
    amount: 12500,
    status: "processing",
    date: "2025-12-11",
    avatar: "FG",
    payMethod: "B2B Invoice",
  },
  {
    id: "#ORD-1072",
    customer: "Ruchika F.",
    phone: "+94750011223",
    city: "Jaffna",
    product: "Travel Pack",
    qty: 2,
    amount: 2500,
    status: "delivered",
    date: "2025-12-10",
    avatar: "RF",
    payMethod: "WhatsApp",
  },
  {
    id: "#ORD-1071",
    customer: "JetWing Hotels",
    phone: "+94113344556",
    city: "Colombo 2",
    product: "Enterprise Pack",
    qty: 200,
    amount: 900000,
    status: "delivered",
    date: "2025-12-10",
    avatar: "JH",
    payMethod: "B2B Invoice",
  },
];

const STATUS_META = {
  delivered: {
    icon: CheckCircle,
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  },
  shipped: {
    icon: Truck,
    classes: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  },
  processing: {
    icon: Clock,
    classes: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  },
  cancelled: {
    icon: RotateCcw,
    classes: "bg-red-500/15 text-red-400 border-red-500/20",
  },
};

const STATUSES = ["all", "delivered", "shipped", "processing", "cancelled"];

function StatusBadge({ status }) {
  const meta = STATUS_META[status] || {};
  const Icon = meta.icon || CheckCircle;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border font-medium ${meta.classes}`}
    >
      <Icon className="w-3 h-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

export default function AdminOrders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  const filtered = ALL_ORDERS.filter((o) => {
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const stats = {
    total: ALL_ORDERS.length,
    delivered: ALL_ORDERS.filter((o) => o.status === "delivered").length,
    processing: ALL_ORDERS.filter((o) => o.status === "processing").length,
    revenue: ALL_ORDERS.filter((o) => o.status !== "cancelled").reduce(
      (s, o) => s + o.amount,
      0,
    ),
  };

  return (
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Orders</h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage and track all customer orders
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm hover:bg-emerald-500/20 transition-all self-start">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Total Orders",
            value: stats.total,
            icon: Package,
            color: "blue",
          },
          {
            label: "Delivered",
            value: stats.delivered,
            icon: CheckCircle,
            color: "emerald",
          },
          {
            label: "Processing",
            value: stats.processing,
            icon: Clock,
            color: "amber",
          },
          {
            label: "Revenue",
            value: `LKR ${(stats.revenue / 1000).toFixed(0)}k`,
            icon: RotateCcw,
            color: "violet",
          },
        ].map(({ label, value, icon: Icon, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-4 flex items-center gap-3"
          >
            <div
              className={`w-9 h-9 rounded-xl bg-${color}-500/10 flex items-center justify-center text-${color}-400`}
            >
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white font-bold">{value}</div>
              <div className="text-slate-500 text-xs">{label}</div>
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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name or order ID…"
            className="w-full pl-9 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/60 rounded-xl text-sm text-slate-300 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => {
                setStatusFilter(s);
                setPage(1);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all border ${
                statusFilter === s
                  ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                  : "bg-slate-800/60 border-slate-700/50 text-slate-400 hover:text-white"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-slate-900/60 border border-slate-700/50 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50">
                {[
                  "Order ID",
                  "Customer",
                  "Product",
                  "Amount",
                  "Status",
                  "Date",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-slate-400 text-xs font-medium px-5 py-4"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.map((order, i) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.04 }}
                  className="border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors group"
                >
                  <td className="px-5 py-4">
                    <span className="text-emerald-400 font-mono text-xs font-semibold">
                      {order.id}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                        {order.avatar}
                      </div>
                      <div>
                        <div className="text-white text-xs font-medium">
                          {order.customer}
                        </div>
                        <div className="text-slate-500 text-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {order.city}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-slate-300 text-xs">
                      {order.product}
                    </div>
                    <div className="text-slate-600 text-xs">
                      Qty: {order.qty}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-white font-semibold text-xs">
                      LKR {order.amount.toLocaleString()}
                    </span>
                    <div className="text-slate-600 text-xs">
                      {order.payMethod}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-5 py-4 text-slate-500 text-xs">
                    {order.date}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => setSelected(order)}
                      className="flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-400 transition-colors opacity-0 group-hover:opacity-100 hover:bg-emerald-500/10 px-2 py-1 rounded-lg"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                  </td>
                </motion.tr>
              ))}
              {paged.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-slate-600"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-slate-700/50">
            <span className="text-slate-500 text-xs">
              Showing {(page - 1) * PER_PAGE + 1}–
              {Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${page === i + 1 ? "bg-emerald-500 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Order detail drawer */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-slate-900 border-l border-slate-700/50 z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-white font-bold">Order Details</h2>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-800/60 rounded-2xl p-4">
                    <div className="text-emerald-400 font-mono text-sm font-bold mb-1">
                      {selected.id}
                    </div>
                    <div className="text-slate-400 text-xs">
                      {selected.date}
                    </div>
                  </div>

                  <div className="bg-slate-800/60 rounded-2xl p-4 space-y-3">
                    <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wide">
                      Customer
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
                        {selected.avatar}
                      </div>
                      <div>
                        <div className="text-white font-semibold">
                          {selected.customer}
                        </div>
                        <div className="text-slate-400 text-xs flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {selected.phone}
                        </div>
                        <div className="text-slate-400 text-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {selected.city}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800/60 rounded-2xl p-4 space-y-2">
                    <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wide">
                      Order
                    </h3>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">Product</span>
                      <span className="text-white text-sm font-medium">
                        {selected.product}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">Quantity</span>
                      <span className="text-white text-sm font-medium">
                        {selected.qty}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 text-sm">Payment</span>
                      <span className="text-white text-sm font-medium">
                        {selected.payMethod}
                      </span>
                    </div>
                    <div className="border-t border-slate-700/50 pt-2 flex justify-between">
                      <span className="text-slate-300 font-semibold">
                        Total
                      </span>
                      <span className="text-emerald-400 font-bold text-lg">
                        LKR {selected.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-800/60 rounded-2xl p-4">
                    <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-3">
                      Status
                    </h3>
                    <StatusBadge status={selected.status} />
                  </div>

                  <a
                    href={`https://wa.me/${selected.phone?.replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(selected.customer)}%2C%20your%20order%20${selected.id}%20update`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-green-500/15 border border-green-500/20 text-green-400 rounded-xl hover:bg-green-500/25 transition-all font-medium text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Contact via WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
