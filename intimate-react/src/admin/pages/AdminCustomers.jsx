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
import { useState } from "react";

const CUSTOMERS = [
  {
    id: 1,
    name: "Dilshan Perera",
    phone: "+94771234567",
    city: "Colombo 3",
    orders: 8,
    totalSpent: 24500,
    lastOrder: "2025-12-15",
    rating: 5,
    segment: "VIP",
    avatar: "DP",
  },
  {
    id: 2,
    name: "Priya Mendis",
    phone: "+94712345678",
    city: "Kandy",
    orders: 5,
    totalSpent: 11250,
    lastOrder: "2025-12-15",
    rating: 5,
    segment: "Regular",
    avatar: "PM",
  },
  {
    id: 3,
    name: "Lanka Hospitals",
    phone: "+94112109876",
    city: "Colombo 10",
    orders: 12,
    totalSpent: 945000,
    lastOrder: "2025-12-12",
    rating: 5,
    segment: "B2B",
    avatar: "LH",
  },
  {
    id: 4,
    name: "HSBC Lanka",
    phone: "+94112233445",
    city: "Colombo 1",
    orders: 6,
    totalSpent: 1350000,
    lastOrder: "2025-12-13",
    rating: 5,
    segment: "B2B",
    avatar: "HL",
  },
  {
    id: 5,
    name: "Nimasha Silva",
    phone: "+94769876543",
    city: "Galle",
    orders: 3,
    totalSpent: 7500,
    lastOrder: "2025-12-14",
    rating: 4,
    segment: "Regular",
    avatar: "NS",
  },
  {
    id: 6,
    name: "Ruwan Hotels",
    phone: "+94117890123",
    city: "Colombo 7",
    orders: 18,
    totalSpent: 810000,
    lastOrder: "2025-12-14",
    rating: 5,
    segment: "B2B",
    avatar: "RH",
  },
  {
    id: 7,
    name: "Chamari Dias",
    phone: "+94761122334",
    city: "Matara",
    orders: 4,
    totalSpent: 18750,
    lastOrder: "2025-12-11",
    rating: 5,
    segment: "Regular",
    avatar: "CD",
  },
  {
    id: 8,
    name: "JetWing Hotels",
    phone: "+94113344556",
    city: "Colombo 2",
    orders: 24,
    totalSpent: 2160000,
    lastOrder: "2025-12-10",
    rating: 5,
    segment: "B2B",
    avatar: "JH",
  },
  {
    id: 9,
    name: "Ruchika Fernando",
    phone: "+94750011223",
    city: "Jaffna",
    orders: 2,
    totalSpent: 5000,
    lastOrder: "2025-12-10",
    rating: 4,
    segment: "New",
    avatar: "RF",
  },
  {
    id: 10,
    name: "FitLife Gym",
    phone: "+94114455667",
    city: "Colombo 4",
    orders: 7,
    totalSpent: 87500,
    lastOrder: "2025-12-11",
    rating: 5,
    segment: "B2B",
    avatar: "FG",
  },
  {
    id: 11,
    name: "Sunethra W.",
    phone: "+94778901234",
    city: "Colombo 5",
    orders: 9,
    totalSpent: 67500,
    lastOrder: "2025-12-12",
    rating: 5,
    segment: "VIP",
    avatar: "SW",
  },
  {
    id: 12,
    name: "Kavinda Almeida",
    phone: "+94754321987",
    city: "Negombo",
    orders: 1,
    totalSpent: 3750,
    lastOrder: "2025-12-13",
    rating: 3,
    segment: "New",
    avatar: "KA",
  },
];

const SEGMENT_COLORS = {
  VIP: "bg-amber-50 text-amber-600 border-amber-200",
  B2B: "bg-violet-50 text-violet-600 border-violet-200",
  Regular: "bg-blue-50 text-blue-600 border-blue-200",
  New: "bg-green-100 text-green-primary border-green-200",
};

const SEGMENTS = ["all", "VIP", "B2B", "Regular", "New"];

export default function AdminCustomers() {
  const [search, setSearch] = useState("");
  const [segment, setSegment] = useState("all");

  const filtered = CUSTOMERS.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase());
    const matchSegment = segment === "all" || c.segment === segment;
    return matchSearch && matchSegment;
  });

  const totalLTV = CUSTOMERS.reduce((s, c) => s + c.totalSpent, 0);
  const avgLTV = Math.round(totalLTV / CUSTOMERS.length);
  const vip = CUSTOMERS.filter(
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
          { label: "Total Customers", value: CUSTOMERS.length, icon: Users },
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
