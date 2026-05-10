import { AnimatePresence, motion } from "framer-motion";
import {
    AlertTriangle,
    Check,
    Edit3,
    Package,
    Plus,
    Star,
    TrendingUp,
    X,
} from "lucide-react";
import { useState } from "react";

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Single Use Pack",
    sku: "INE-001",
    price: 250,
    cost: 95,
    stock: 1240,
    sold: 3240,
    rating: 4.9,
    reviews: 128,
    status: "active",
    image: "/normal.png",
    minOrder: 10,
    description:
      "Biodegradable single use toilet seat covers. Individually wrapped, eco-friendly.",
    category: "Retail",
  },
  {
    id: 2,
    name: "Travel Pack",
    sku: "INE-002",
    price: 1250,
    cost: 480,
    stock: 340,
    sold: 1870,
    rating: 4.8,
    reviews: 94,
    status: "active",
    image: "/travel.png",
    minOrder: 1,
    description:
      "Waterproof and anti-slip, ideal for families and frequent travelers.",
    category: "Retail",
  },
  {
    id: 3,
    name: "Enterprise Pack",
    sku: "INE-003",
    price: 4500,
    cost: 1800,
    stock: 85,
    sold: 940,
    rating: 4.9,
    reviews: 67,
    status: "low_stock",
    image: "/enterprise.png",
    minOrder: 5,
    description: "Bulk packs for offices, hotels, and businesses.",
    category: "B2B",
  },
];

function StockBar({ stock, max = 1500 }) {
  const pct = Math.min((stock / max) * 100, 100);
  const color = pct < 15 ? "#ef4444" : pct < 35 ? "#f59e0b" : "#10b981";
  return (
    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden w-full">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ background: color }}
      />
    </div>
  );
}

export default function AdminProducts() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const startEdit = (p) => {
    setEditing(p.id);
    setForm({ ...p });
  };
  const saveEdit = () => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === editing
          ? {
              ...p,
              ...form,
              price: +form.price,
              cost: +form.cost,
              stock: +form.stock,
            }
          : p,
      ),
    );
    setEditing(null);
  };

  const totalRevenue = products.reduce((s, p) => s + p.sold * p.price, 0);
  const totalUnits = products.reduce((s, p) => s + p.sold, 0);

  return (
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your product catalog and inventory
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 rounded-xl text-white text-sm font-semibold shadow-lg shadow-emerald-500/25 transition-all self-start">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          {
            label: "Total Products",
            value: products.length,
            icon: Package,
            sub: "Active in catalog",
          },
          {
            label: "Units Sold (All Time)",
            value: totalUnits.toLocaleString(),
            icon: TrendingUp,
            sub: "Across all products",
          },
          {
            label: "Total Revenue",
            value: `LKR ${(totalRevenue / 1000000).toFixed(1)}M`,
            icon: Star,
            sub: "From product sales",
          },
        ].map(({ label, value, icon: Icon, sub }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-4 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">{value}</div>
              <div className="text-slate-400 text-xs">{label}</div>
              <div className="text-slate-600 text-xs">{sub}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {products.map((p, i) => {
          const margin = (((p.price - p.cost) / p.price) * 100).toFixed(0);
          const isLow = p.status === "low_stock";
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -3 }}
              className={`bg-slate-900/60 border rounded-2xl overflow-hidden ${isLow ? "border-amber-500/30" : "border-slate-700/50"}`}
            >
              {/* Product header */}
              <div className="relative bg-slate-800/50 p-6 flex items-center justify-center h-40">
                {isLow && (
                  <div className="absolute top-3 left-3 flex items-center gap-1 text-xs px-2 py-1 bg-amber-500/15 border border-amber-500/20 rounded-lg text-amber-400">
                    <AlertTriangle className="w-3 h-3" />
                    Low Stock
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-lg font-medium ${p.status === "active" || p.status === "low_stock" ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}
                  >
                    {p.category}
                  </span>
                </div>
                <div className="text-6xl select-none">
                  {p.id === 1 ? "🧻" : p.id === 2 ? "🎒" : "🏢"}
                </div>
              </div>

              <div className="p-5 space-y-4">
                {/* Name & SKU */}
                <div>
                  <h3 className="text-white font-semibold text-base">
                    {p.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-slate-500 text-xs font-mono">
                      {p.sku}
                    </span>
                    <span className="text-slate-700">·</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-slate-400 text-xs">
                        {p.rating} ({p.reviews})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price & margin */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-emerald-400 font-bold text-lg">
                      LKR {p.price.toLocaleString()}
                    </div>
                    <div className="text-slate-600 text-xs">
                      Cost: LKR {p.cost.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">{margin}%</div>
                    <div className="text-slate-500 text-xs">Margin</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800/60 rounded-xl p-3 text-center">
                    <div className="text-white font-bold">
                      {p.sold.toLocaleString()}
                    </div>
                    <div className="text-slate-500 text-xs">Units sold</div>
                  </div>
                  <div className="bg-slate-800/60 rounded-xl p-3 text-center">
                    <div
                      className={`font-bold ${p.stock < 100 ? "text-amber-400" : "text-white"}`}
                    >
                      {p.stock.toLocaleString()}
                    </div>
                    <div className="text-slate-500 text-xs">In stock</div>
                  </div>
                </div>

                {/* Stock bar */}
                <div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                    <span>Stock level</span>
                    <span>{p.stock} units</span>
                  </div>
                  <StockBar stock={p.stock} />
                </div>

                {/* Min order */}
                <div className="text-slate-500 text-xs">
                  Min. order: {p.minOrder} pack{p.minOrder > 1 ? "s" : ""}
                </div>

                {/* Edit button */}
                <button
                  onClick={() => startEdit(p)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 rounded-xl text-slate-300 hover:text-white text-sm font-medium transition-all"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Product
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Edit modal */}
      <AnimatePresence>
        {editing && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditing(null)}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-6 w-full max-w-md shadow-2xl">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-white font-bold">Edit Product</h2>
                  <button
                    onClick={() => setEditing(null)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Product Name", key: "name", type: "text" },
                    { label: "Price (LKR)", key: "price", type: "number" },
                    { label: "Cost (LKR)", key: "cost", type: "number" },
                    { label: "Stock (units)", key: "stock", type: "number" },
                    { label: "Min Order Qty", key: "minOrder", type: "number" },
                  ].map(({ label, key, type }) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">
                        {label}
                      </label>
                      <input
                        type={type}
                        value={form[key] ?? ""}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, [key]: e.target.value }))
                        }
                        className="w-full px-3 py-2.5 bg-slate-800/60 border border-slate-700/60 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wide">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={form.description ?? ""}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, description: e.target.value }))
                      }
                      className="w-full px-3 py-2.5 bg-slate-800/60 border border-slate-700/60 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 resize-none"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setEditing(null)}
                      className="flex-1 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 text-sm font-medium hover:bg-slate-700 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveEdit}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-emerald-500 hover:bg-emerald-400 rounded-xl text-white text-sm font-semibold shadow-lg shadow-emerald-500/25 transition-all"
                    >
                      <Check className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
