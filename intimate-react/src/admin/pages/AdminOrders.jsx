import { AnimatePresence, motion } from "framer-motion";
import {
    AlertTriangle,
    CheckCircle,
    Clock,
    Download,
    Eye,
    MapPin,
    Package,
    Phone,
    RotateCcw,
    Search,
    Trash2,
    Truck,
    X
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { deleteOrder, fetchOrders } from "../../lib/database";

const ALL_ORDERS = [];

const STATUS_META = {
  delivered: {
    icon: CheckCircle,
    classes: "bg-green-100 text-green-primary border-green-200",
  },
  shipped: {
    icon: Truck,
    classes: "bg-blue-50 text-blue-600 border-blue-200",
  },
  processing: {
    icon: Clock,
    classes: "bg-amber-50 text-amber-600 border-amber-200",
  },
  cancelled: {
    icon: RotateCcw,
    classes: "bg-red-50 text-red-600 border-red-200",
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
  const [orders, setOrders] = useState(ALL_ORDERS);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  const loadOrders = useCallback((mounted = true) => {
    return fetchOrders()
      .then((rows) => {
        if (!mounted) return;
        setOrders(
          rows.map((row, idx) => {
            const firstItem = row.order_items?.[0];
            return {
              dbId: row.id,
              id: row.order_ref || `#ORD-${String(rows.length - idx).padStart(4, "0")}`,
              customer: row.customer_name,
              email: row.customer_email,
              phone: row.customer_phone,
              city: row.city || "-",
              address: row.address || "-",
              product: firstItem?.product_name || "Order",
              items: row.order_items || [],
              qty:
                row.order_items?.reduce((sum, item) => sum + item.quantity, 0) ||
                1,
              amount: Number(row.total),
              status: STATUS_META[row.status] ? row.status : "processing",
              date: new Date(row.created_at).toISOString().slice(0, 10),
              avatar: row.customer_name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase(),
              payMethod: row.payment_method || "WhatsApp",
            };
          }),
        );
      })
      .catch(() => {
        if (mounted) setOrders(ALL_ORDERS);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
  }, []);

  useEffect(() => {
    let mounted = true;
    loadOrders(mounted);
    return () => {
      mounted = false;
    };
  }, [loadOrders]);

  const requestDeleteOrder = (order) => {
    setDeleteError("");
    setDeleteTarget(order);
  };

  const confirmDeleteOrder = async () => {
    if (!deleteTarget) return;

    setDeletingId(deleteTarget.dbId);
    setDeleteError("");
    try {
      await deleteOrder(deleteTarget.dbId);
      setOrders((current) =>
        current.filter((order) => order.dbId !== deleteTarget.dbId),
      );
      setSelected((current) =>
        current?.dbId === deleteTarget.dbId ? null : current,
      );
      setDeleteTarget(null);
      await loadOrders(true);
    } catch (err) {
      setDeleteError(err.message || "Could not delete order. Please try again.");
    } finally {
      setDeletingId("");
    }
  };

  const closeDeleteDialog = () => {
    if (deletingId) return;
    setDeleteTarget(null);
  };

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const currentPage = totalPages ? Math.min(page, totalPages) : 1;
  const paged = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const stats = {
    total: orders.length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    processing: orders.filter((o) => o.status === "processing").length,
    revenue: orders.filter((o) => o.status !== "cancelled").reduce(
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
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage and track all customer orders
            {loading ? "..." : ""}
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-xl text-green-primary text-sm hover:bg-green-100 transition-all self-start">
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
            className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3"
          >
            <div
              className={`w-9 h-9 rounded-xl bg-${color}-500/10 flex items-center justify-center text-${color}-400`}
            >
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
      {deleteError && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{deleteError}</span>
        </div>
      )}

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
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name or order ID…"
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-primary/30 transition-all"
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
                  ? "bg-green-100 border-green-primary/30 text-green-primary"
                  : "bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-900"
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
        className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
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
                    className="text-left text-gray-500 text-xs font-medium px-5 py-4"
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
                  className="border-b border-gray-100 hover:bg-gray-100/30 transition-colors group"
                >
                  <td className="px-5 py-4">
                    <span className="text-green-primary font-mono text-xs font-semibold">
                      {order.id}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-700 shrink-0">
                        {order.avatar}
                      </div>
                      <div>
                        <div className="text-gray-900 text-xs font-medium">
                          {order.customer}
                        </div>
                        <div className="text-gray-500 text-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {order.city}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-gray-700 text-xs">
                      {order.product}
                    </div>
                    <div className="text-gray-400 text-xs">
                      Qty: {order.qty}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-gray-900 font-semibold text-xs">
                      LKR {order.amount.toLocaleString()}
                    </span>
                    <div className="text-gray-400 text-xs">
                      {order.payMethod}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-xs">
                    {order.date}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setSelected(order)}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-green-primary transition-colors hover:bg-green-50 px-2 py-1 rounded-lg"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                      <button
                        onClick={() => requestDeleteOrder(order)}
                        disabled={deletingId === order.dbId}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-600 transition-colors hover:bg-red-50 px-2 py-1 rounded-lg disabled:opacity-60"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        {deletingId === order.dbId ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {paged.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-gray-400"
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
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-200">
            <span className="text-gray-500 text-xs">
              Showing {(currentPage - 1) * PER_PAGE + 1}–
              {Math.min(currentPage * PER_PAGE, filtered.length)} of {filtered.length}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${currentPage === i + 1 ? "bg-green-primary text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
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
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white border-l border-gray-200 z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-gray-900 font-bold">Order Details</h2>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="text-green-primary font-mono text-sm font-bold mb-1">
                      {selected.id}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {selected.date}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                    <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                      Customer
                    </h3>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-linear-to-br from-green-primary to-green-dark flex items-center justify-center text-gray-900 font-bold">
                        {selected.avatar}
                      </div>
                      <div>
                        <div className="text-gray-900 font-semibold">
                          {selected.customer}
                        </div>
                        <div className="text-gray-500 text-xs flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {selected.phone}
                        </div>
                        {selected.email && (
                          <div className="text-gray-500 text-xs">
                            {selected.email}
                          </div>
                        )}
                        <div className="text-gray-500 text-xs flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {selected.city}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
                    <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                      Order
                    </h3>
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm">Product</span>
                      <span className="text-gray-900 text-sm font-medium text-right">
                        {selected.product}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm">Quantity</span>
                      <span className="text-gray-900 text-sm font-medium">
                        {selected.qty}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-sm">Payment</span>
                      <span className="text-gray-900 text-sm font-medium">
                        {selected.payMethod}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 flex justify-between">
                      <span className="text-gray-700 font-semibold">
                        Total
                      </span>
                      <span className="text-green-primary font-bold text-lg">
                        LKR {selected.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4">
                    <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-3">
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
                  <button
                    onClick={() => requestDeleteOrder(selected)}
                    disabled={deletingId === selected.dbId}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-red-50 border border-red-200 text-red-600 rounded-xl hover:bg-red-100 transition-all font-medium text-sm disabled:opacity-60"
                  >
                    <Trash2 className="w-4 h-4" />
                    {deletingId === selected.dbId ? "Deleting order..." : "Delete Order"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteTarget && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDeleteDialog}
              className="fixed inset-0 bg-black/50 z-[70] backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.18 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-order-title"
              className="fixed left-1/2 top-1/2 z-[80] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <Trash2 className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h2
                    id="delete-order-title"
                    className="text-lg font-bold text-gray-900"
                  >
                    Delete order?
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    This will permanently remove order{" "}
                    <span className="font-semibold text-gray-900">
                      {deleteTarget.id}
                    </span>{" "}
                    and all items in it from the database.
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-gray-50 p-4 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Customer</span>
                  <span className="font-semibold text-gray-900 text-right">
                    {deleteTarget.customer}
                  </span>
                </div>
                <div className="mt-2 flex justify-between gap-4">
                  <span className="text-gray-500">Total</span>
                  <span className="font-semibold text-gray-900">
                    LKR {deleteTarget.amount.toLocaleString()}
                  </span>
                </div>
              </div>

              {deleteError && (
                <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{deleteError}</span>
                </div>
              )}

              <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeDeleteDialog}
                  disabled={!!deletingId}
                  className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteOrder}
                  disabled={deletingId === deleteTarget.dbId}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                >
                  <Trash2 className="h-4 w-4" />
                  {deletingId === deleteTarget.dbId ? "Deleting..." : "Delete order"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
