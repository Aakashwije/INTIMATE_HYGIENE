import { motion, useInView, useSpring, useTransform } from "framer-motion";
import {
    ArrowDownRight,
    ArrowUpRight,
    CheckCircle,
    Clock,
    DollarSign,
    Eye,
    RotateCcw,
    ShoppingCart,
    Star,
    Target,
    TrendingUp,
    Truck,
    Users,
    Zap
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    RadialBar,
    RadialBarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import { useAdminAuth } from "../../context/AdminAuthContext";

// ─── Mock data ────────────────────────────────────────────────────────────────
const revenueData = [
  { month: "Jan", revenue: 128000, orders: 48, target: 120000 },
  { month: "Feb", revenue: 142000, orders: 54, target: 130000 },
  { month: "Mar", revenue: 168000, orders: 67, target: 150000 },
  { month: "Apr", revenue: 155000, orders: 61, target: 160000 },
  { month: "May", revenue: 195000, orders: 78, target: 175000 },
  { month: "Jun", revenue: 218000, orders: 89, target: 190000 },
  { month: "Jul", revenue: 242000, orders: 97, target: 210000 },
  { month: "Aug", revenue: 228000, orders: 91, target: 225000 },
  { month: "Sep", revenue: 267000, orders: 108, target: 240000 },
  { month: "Oct", revenue: 289000, orders: 116, target: 260000 },
  { month: "Nov", revenue: 312000, orders: 125, target: 285000 },
  { month: "Dec", revenue: 348000, orders: 139, target: 310000 },
];

const productSales = [
  { name: "Single Use Pack", value: 3240, color: "#28a745" },
  { name: "Travel Pack", value: 1870, color: "#0ea5e9" },
  { name: "Enterprise Pack", value: 940, color: "#8b5cf6" },
];

const recentOrders = [
  {
    id: "#ORD-1082",
    customer: "Dilshan Perera",
    product: "Travel Pack × 5",
    amount: "LKR 6,250",
    status: "delivered",
    time: "2 min ago",
    avatar: "DP",
  },
  {
    id: "#ORD-1081",
    customer: "Priya Mendis",
    product: "Single Use × 20",
    amount: "LKR 5,000",
    status: "processing",
    time: "14 min ago",
    avatar: "PM",
  },
  {
    id: "#ORD-1080",
    customer: "Ruwan Hotels",
    product: "Enterprise × 10",
    amount: "LKR 45,000",
    status: "shipped",
    time: "1 hr ago",
    avatar: "RH",
  },
  {
    id: "#ORD-1079",
    customer: "Nimasha Silva",
    product: "Single Use × 10",
    amount: "LKR 2,500",
    status: "delivered",
    time: "2 hr ago",
    avatar: "NS",
  },
  {
    id: "#ORD-1078",
    customer: "HSBC Lanka",
    product: "Enterprise × 50",
    amount: "LKR 225,000",
    status: "delivered",
    time: "3 hr ago",
    avatar: "HL",
  },
  {
    id: "#ORD-1077",
    customer: "Kavinda A.",
    product: "Travel Pack × 3",
    amount: "LKR 3,750",
    status: "cancelled",
    time: "4 hr ago",
    avatar: "KA",
  },
];

const weeklyTraffic = [
  { day: "Mon", visits: 1240, conversions: 48 },
  { day: "Tue", visits: 1680, conversions: 67 },
  { day: "Wed", visits: 1420, conversions: 54 },
  { day: "Thu", visits: 1890, conversions: 72 },
  { day: "Fri", visits: 2240, conversions: 89 },
  { day: "Sat", visits: 2680, conversions: 108 },
  { day: "Sun", visits: 2100, conversions: 84 },
];

const topCities = [
  { city: "Colombo", orders: 842, pct: 38 },
  { city: "Kandy", orders: 421, pct: 19 },
  { city: "Galle", orders: 312, pct: 14 },
  { city: "Negombo", orders: 245, pct: 11 },
  { city: "Jaffna", orders: 178, pct: 8 },
  { city: "Others", orders: 222, pct: 10 },
];

const statusData = [
  { name: "Delivered", value: 78, fill: "#28a745" },
  { name: "Shipped", value: 12, fill: "#0ea5e9" },
  { name: "Processing", value: 7, fill: "#f59e0b" },
  { name: "Cancelled", value: 3, fill: "#ef4444" },
];

// ─── Animated counter ─────────────────────────────────────────────────────────
function AnimatedNumber({ value, prefix = "", suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 60, damping: 20 });
  const display = useTransform(
    spring,
    (v) =>
      `${prefix}${v.toLocaleString("en-LK", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`,
  );

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, value, spring]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {display}
    </motion.span>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────
function KpiCard({
  title,
  value,
  prefix,
  suffix,
  decimals,
  change,
  changeLabel,
  icon: Icon,
  color,
  delay,
}) {
  const positive = change >= 0;
  const colorMap = {
    emerald:
      "from-green-50 to-white border-green-200 shadow-green-primary/10",
    blue: "from-blue-50 to-white border-blue-200 shadow-blue-500/10",
    violet: "from-violet-50 to-white border-violet-200 shadow-violet-500/10",
    amber: "from-amber-50 to-white border-amber-200 shadow-amber-500/10",
  };
  const iconBg = {
    emerald: "bg-green-100 text-green-primary",
    blue: "bg-blue-100 text-blue-600",
    violet: "bg-violet-100 text-violet-600",
    amber: "bg-amber-100 text-amber-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className={`relative bg-linear-to-br ${colorMap[color]} border rounded-2xl p-5 shadow-lg overflow-hidden`}
    >
      {/* Background glow */}
      <div
        className={`absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-30 bg-${color}-500`}
      />

      <div className="flex items-start justify-between mb-4 relative">
        <div
          className={`w-10 h-10 rounded-xl ${iconBg[color]} flex items-center justify-center`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg ${positive ? "bg-green-100 text-green-primary" : "bg-red-50 text-red-600"}`}
        >
          {positive ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          {Math.abs(change)}%
        </div>
      </div>

      <div className="text-2xl font-bold text-gray-900 mb-1">
        <AnimatedNumber
          value={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
        />
      </div>
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-gray-400 text-xs mt-1">{changeLabel}</div>
    </motion.div>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    delivered: "bg-green-100 text-green-primary border-green-200",
    shipped: "bg-blue-50 text-blue-600 border-blue-200",
    processing: "bg-amber-50 text-amber-600 border-amber-200",
    cancelled: "bg-red-50 text-red-600 border-red-200",
  };
  const icons = {
    delivered: CheckCircle,
    shipped: Truck,
    processing: Clock,
    cancelled: RotateCcw,
  };
  const Icon = icons[status];
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg border font-medium ${map[status]}`}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-100 border border-gray-200 rounded-xl p-3 shadow-xl text-sm">
      <p className="text-gray-700 font-medium mb-2">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-semibold">
          {p.name}:{" "}
          {typeof p.value === "number" &&
          p.name?.toLowerCase().includes("revenue")
            ? `LKR ${p.value.toLocaleString()}`
            : p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { admin } = useAdminAuth();
  const [timeRange, setTimeRange] = useState("12m");

  const now = new Date();
  const timeStr = now.toLocaleString("en-LK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Good{" "}
            {now.getHours() < 12
              ? "morning"
              : now.getHours() < 17
                ? "afternoon"
                : "evening"}
            , {admin?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">{timeStr}</p>
        </div>
        <div className="flex items-center gap-2">
          {["7d", "30d", "12m"].map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                timeRange === r
                  ? "bg-green-primary text-white shadow-lg shadow-green-primary/30"
                  : "bg-white text-gray-600 border border-gray-200 hover:text-green-primary hover:border-green-primary/40"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </motion.div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard
          title="Total Revenue"
          value={2692000}
          prefix="LKR "
          change={18.4}
          changeLabel="vs last year"
          icon={DollarSign}
          color="emerald"
          delay={0}
        />
        <KpiCard
          title="Total Orders"
          value={6050}
          suffix=""
          change={12.7}
          changeLabel="vs last year"
          icon={ShoppingCart}
          color="blue"
          delay={0.1}
        />
        <KpiCard
          title="Customers"
          value={3842}
          change={24.1}
          changeLabel="vs last year"
          icon={Users}
          color="violet"
          delay={0.2}
        />
        <KpiCard
          title="Avg. Order Value"
          value={445}
          prefix="LKR "
          change={5.3}
          changeLabel="vs last year"
          icon={TrendingUp}
          color="amber"
          delay={0.3}
        />
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Conversion Rate",
            value: "4.8%",
            icon: Target,
            delta: "+0.6%",
            pos: true,
          },
          {
            label: "Return Rate",
            value: "1.2%",
            icon: RotateCcw,
            delta: "-0.3%",
            pos: true,
          },
          {
            label: "Avg. Rating",
            value: "4.9 ★",
            icon: Star,
            delta: "+0.1",
            pos: true,
          },
          {
            label: "Page Views / Day",
            value: "2,340",
            icon: Eye,
            delta: "+18%",
            pos: true,
          },
        ].map(({ label, value, icon: Icon, delta, pos }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.05 }}
            className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-gray-900 font-bold text-base">{value}</div>
              <div className="text-gray-500 text-xs">{label}</div>
              <div
                className={`text-xs font-medium ${pos ? "text-green-primary" : "text-red-500"}`}
              >
                {delta}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Revenue area chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="xl:col-span-2 bg-white border border-gray-200 rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-gray-900 font-semibold">Revenue vs Target</h2>
              <p className="text-gray-500 text-xs mt-0.5">
                Monthly performance (LKR)
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-green-primary rounded inline-block" />
                Revenue
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-0.5 bg-gray-300 rounded inline-block border-dashed" />
                Target
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart
              data={revenueData}
              margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#28a745" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#28a745" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#9ca3af" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#6b7280", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#6b7280", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="target"
                name="Target"
                stroke="#9ca3af"
                strokeDasharray="4 4"
                fill="url(#targetGrad)"
                strokeWidth={1.5}
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="#28a745"
                fill="url(#revenueGrad)"
                strokeWidth={2.5}
                dot={{ fill: "#28a745", r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "#28a745" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Product breakdown donut */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white border border-gray-200 rounded-2xl p-5"
        >
          <h2 className="text-gray-900 font-semibold mb-1">Product Sales Mix</h2>
          <p className="text-gray-500 text-xs mb-4">Units sold by product</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={productSales}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {productSales.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v) => [`${v.toLocaleString()} units`, ""]}
                contentStyle={{
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  color: "#111827",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2.5 mt-2">
            {productSales.map((p) => (
              <div key={p.name} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: p.color }}
                />
                <span className="text-gray-500 text-xs flex-1 truncate">
                  {p.name}
                </span>
                <span className="text-gray-900 text-xs font-semibold">
                  {p.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Second row charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Weekly traffic bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="xl:col-span-2 bg-white border border-gray-200 rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-gray-900 font-semibold">
                Weekly Traffic & Conversions
              </h2>
              <p className="text-gray-500 text-xs mt-0.5">
                Site visits and WhatsApp order conversions
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={weeklyTraffic}
              barGap={4}
              margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="day"
                tick={{ fill: "#6b7280", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#6b7280", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="visits"
                name="Visits"
                fill="#0ea5e9"
                radius={[6, 6, 0, 0]}
                opacity={0.8}
              />
              <Bar
                dataKey="conversions"
                name="Conversions"
                fill="#28a745"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Order status radial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white border border-gray-200 rounded-2xl p-5"
        >
          <h2 className="text-gray-900 font-semibold mb-1">Order Status</h2>
          <p className="text-gray-500 text-xs mb-3">
            All-time distribution (%)
          </p>
          <ResponsiveContainer width="100%" height={180}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="20%"
              outerRadius="90%"
              data={statusData}
              startAngle={180}
              endAngle={-180}
            >
              <RadialBar dataKey="value" cornerRadius={6} />
              <Tooltip
                formatter={(v) => [`${v}%`, ""]}
                contentStyle={{
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  color: "#111827",
                }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {statusData.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: s.fill }}
                />
                <span className="text-gray-500 text-xs">{s.name}</span>
                <span className="text-gray-900 text-xs font-bold ml-auto">
                  {s.value}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Recent orders table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="xl:col-span-2 bg-white border border-gray-200 rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900 font-semibold">Recent Orders</h2>
            <a
              href="/admin/orders"
              className="text-green-primary text-xs hover:text-green-dark transition-colors font-medium"
            >
              View all →
            </a>
          </div>
          <div className="space-y-2">
            {recentOrders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.05 }}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-gray-300 to-gray-400 flex items-center justify-center text-xs font-bold text-gray-700 shrink-0">
                  {order.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 text-xs font-semibold truncate">
                      {order.customer}
                    </span>
                    <span className="text-gray-400 text-xs hidden sm:block">
                      {order.id}
                    </span>
                  </div>
                  <div className="text-gray-500 text-xs truncate">
                    {order.product}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-gray-900 text-xs font-semibold">
                    {order.amount}
                  </div>
                  <div className="text-gray-400 text-xs">{order.time}</div>
                </div>
                <StatusBadge status={order.status} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Top cities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white border border-gray-200 rounded-2xl p-5"
        >
          <h2 className="text-gray-900 font-semibold mb-1">Sales by City</h2>
          <p className="text-gray-500 text-xs mb-4">Top delivery locations</p>
          <div className="space-y-3">
            {topCities.map((c, i) => (
              <motion.div
                key={c.city}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.85 + i * 0.05 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-700 text-xs font-medium">
                    {c.city}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {c.orders} orders
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${c.pct}%` }}
                    transition={{
                      delay: 1 + i * 0.08,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full bg-linear-to-r from-green-primary to-green-light"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-gray-500 text-xs mb-3 font-medium uppercase tracking-wide">
              Quick Actions
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Add Product", href: "/admin/products" },
                { label: "View Orders", href: "/admin/orders" },
                { label: "Export CSV", href: "#" },
                { label: "Send Newsletter", href: "/admin/newsletter" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center justify-center gap-1 px-2 py-2 bg-gray-50 hover:bg-gray-200/80 border border-gray-200 rounded-xl text-gray-700 hover:text-gray-900 text-xs font-medium transition-all"
                >
                  <Zap className="w-3 h-3 text-green-primary" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
