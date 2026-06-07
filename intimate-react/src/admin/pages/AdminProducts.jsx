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
import { useEffect, useState } from "react";
import {
    fetchProducts,
    saveProductBySlug,
    subscribeToProducts,
} from "../../lib/database";
import {
    findCatalogProduct,
    shopProducts,
    sortProductsByCatalogOrder,
} from "../../data/catalog";

function productFromCatalog(product) {
  return {
    id: product.slug,
    name: product.name,
    slug: product.slug,
    sku: product.slug.toUpperCase(),
    price: product.price,
    cost: product.cost,
    stock: 0,
    sold: 0,
    rating: 4.9,
    reviews: 0,
    status: "active",
    image: product.image,
    minOrder: 1,
    description: product.description,
    priceNote: product.priceNote,
    category: product.badge === "Add-On" ? "Add-On" : "Bundle",
    active: true,
  };
}

const INITIAL_PRODUCTS = shopProducts.map(productFromCatalog);

function productFromRow(row) {
  const catalogProduct = findCatalogProduct(row.slug);
  return {
    id: row.id,
    name: row.name || catalogProduct?.name,
    slug: row.slug,
    sku: row.sku || "-",
    price: Number(row.price ?? catalogProduct?.price ?? 0),
    cost: Number(row.cost ?? catalogProduct?.cost ?? 0),
    stock: row.stock || 0,
    sold: row.sold || 0,
    rating: Number(row.rating || 4.9),
    reviews: row.reviews || 0,
    status: row.active ? (row.stock < 100 ? "low_stock" : "active") : "inactive",
    image: row.image_url || catalogProduct?.image || "/normalnew.png",
    minOrder: row.min_order || 1,
    description: row.description || catalogProduct?.description || "",
    priceNote: row.price_note || catalogProduct?.priceNote || "",
    category:
      row.category ||
      (catalogProduct?.badge === "Add-On"
        ? "Add-On"
        : catalogProduct
          ? "Bundle"
          : "Retail"),
    active: row.active,
  };
}

function StockBar({ stock, max = 1500 }) {
  const pct = Math.min((stock / max) * 100, 100);
  const color = pct < 15 ? "#ef4444" : pct < 35 ? "#f59e0b" : "#10b981";
  return (
    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden w-full">
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadProducts = () => {
    fetchProducts()
      .then((rows) => {
        if (rows.length > 0) {
          const productsFromDb = rows.map(productFromRow);
          const existingSlugs = new Set(productsFromDb.map((p) => p.slug));
          const missingCatalogProducts = INITIAL_PRODUCTS.filter(
            (p) => !existingSlugs.has(p.slug),
          );
          setProducts(
            sortProductsByCatalogOrder([
              ...productsFromDb,
              ...missingCatalogProducts,
            ]),
          );
        } else {
          setProducts(INITIAL_PRODUCTS);
        }
      })
      .catch((err) => {
        setProducts(INITIAL_PRODUCTS);
        setError(err.message || "Could not load products.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
    const channel = subscribeToProducts(() => loadProducts());
    return () => {
      channel.unsubscribe();
    };
  }, []);

  const startEdit = (p) => {
    setEditing(p.id);
    setForm({ ...p });
  };
  const saveEdit = async () => {
    setSaving(true);
    setError("");
    try {
      const updated = await saveProductBySlug(form.slug, {
        name: form.name,
        sku: form.sku,
        description: form.description,
        price: Number(form.price),
        cost: Number(form.cost),
        image_url: form.image,
        category: form.category,
        stock: Number(form.stock),
        min_order: Number(form.minOrder),
        price_note: form.priceNote,
        active: form.status !== "inactive",
      });
      setProducts((prev) =>
        prev.map((p) => (p.id === editing ? productFromRow(updated) : p)),
      );
      setEditing(null);
    } catch (err) {
      setError(err.message || "Could not save product.");
    } finally {
      setSaving(false);
    }
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
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your product catalog and inventory
            {loading ? "..." : ""}
          </p>
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-primary hover:bg-green-dark rounded-xl text-white text-sm font-semibold shadow-lg shadow-green-primary/25 transition-all self-start">
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
            className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-primary shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{value}</div>
              <div className="text-gray-500 text-xs">{label}</div>
              <div className="text-gray-400 text-xs">{sub}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {products.length === 0 && (
          <div className="xl:col-span-3 bg-white border border-gray-200 rounded-2xl p-10 text-center text-gray-400 text-sm">
            No products yet
          </div>
        )}
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
              className={`bg-white border rounded-2xl overflow-hidden ${isLow ? "border-amber-500/30" : "border-gray-200"}`}
            >
              {/* Product header */}
              <div className="relative bg-gray-100/50 p-6 flex items-center justify-center h-40">
                {isLow && (
                  <div className="absolute top-3 left-3 flex items-center gap-1 text-xs px-2 py-1 bg-amber-50 border border-amber-200 rounded-lg text-amber-600">
                    <AlertTriangle className="w-3 h-3" />
                    Low Stock
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-lg font-medium ${p.status === "active" || p.status === "low_stock" ? "bg-green-100 text-green-primary" : "bg-red-50 text-red-600"}`}
                  >
                    {p.category}
                  </span>
                </div>
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-28 w-auto object-contain drop-shadow-md"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              </div>

              <div className="p-5 space-y-4">
                {/* Name & SKU */}
                <div>
                  <h3 className="text-gray-900 font-semibold text-base">
                    {p.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-500 text-xs font-mono">
                      {p.sku}
                    </span>
                    <span className="text-gray-400">·</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-gray-500 text-xs">
                        {p.rating} ({p.reviews})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price & margin */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-green-primary font-bold text-lg">
                      LKR {p.price.toLocaleString()}
                    </div>
                    <div className="text-gray-400 text-xs">
                      Cost: LKR {p.cost.toLocaleString()}
                    </div>
                    {p.priceNote && (
                      <div className="text-gray-500 text-xs mt-0.5">
                        {p.priceNote}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-gray-900 font-semibold">{margin}%</div>
                    <div className="text-gray-500 text-xs">Margin</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <div className="text-gray-900 font-bold">
                      {p.sold.toLocaleString()}
                    </div>
                    <div className="text-gray-500 text-xs">Units sold</div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <div
                      className={`font-bold ${p.stock < 100 ? "text-amber-600" : "text-gray-900"}`}
                    >
                      {p.stock.toLocaleString()}
                    </div>
                    <div className="text-gray-500 text-xs">In stock</div>
                  </div>
                </div>

                {/* Stock bar */}
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                    <span>Stock level</span>
                    <span>{p.stock} units</span>
                  </div>
                  <StockBar stock={p.stock} />
                </div>

                {/* Min order */}
                <div className="text-gray-500 text-xs">
                  Min. order: {p.minOrder} pack{p.minOrder > 1 ? "s" : ""}
                </div>

                {/* Edit button */}
                <button
                  onClick={() => startEdit(p)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-50 hover:bg-gray-200/80 border border-gray-200 rounded-xl text-gray-700 hover:text-gray-900 text-sm font-medium transition-all"
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
              <div className="bg-white border border-gray-200 rounded-2xl p-6 w-full max-w-md shadow-2xl">
                {/* Modal product image */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                      src={form.image}
                      alt={form.name}
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <h2 className="text-gray-900 font-bold">Edit Product</h2>
                  <button
                    onClick={() => setEditing(null)}
                    className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Product Name", key: "name", type: "text" },
                    { label: "Price (LKR)", key: "price", type: "number" },
                    { label: "Cost (LKR)", key: "cost", type: "number" },
                    { label: "Stock (units)", key: "stock", type: "number" },
                    { label: "Min Order Qty", key: "minOrder", type: "number" },
                    { label: "Price Note", key: "priceNote", type: "text" },
                  ].map(({ label, key, type }) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
                        {label}
                      </label>
                      <input
                        type={type}
                        value={form[key] ?? ""}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, [key]: e.target.value }))
                        }
                        className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-primary/30"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={form.description ?? ""}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, description: e.target.value }))
                      }
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-primary/30 resize-none"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setEditing(null)}
                      className="flex-1 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-gray-700 text-sm font-medium hover:bg-gray-200 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={saveEdit}
                      disabled={saving}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-primary hover:bg-green-dark rounded-xl text-white text-sm font-semibold shadow-lg shadow-green-primary/25 transition-all"
                    >
                      <Check className="w-4 h-4" />
                      {saving ? "Saving..." : "Save Changes"}
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
