import { motion } from "framer-motion";
import {
    DollarSign,
    Download,
    ShoppingCart,
    TrendingUp,
    Users,
} from "lucide-react";
import { useState } from "react";
import {
    Area,
    Bar,
    CartesianGrid,
    ComposedChart,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

const monthlyData = [
  { month: "Jan", revenue: 128000, orders: 48, customers: 38, returns: 2 },
  { month: "Feb", revenue: 142000, orders: 54, customers: 44, returns: 1 },
  { month: "Mar", revenue: 168000, orders: 67, customers: 58, returns: 3 },
  { month: "Apr", revenue: 155000, orders: 61, customers: 50, returns: 4 },
  { month: "May", revenue: 195000, orders: 78, customers: 67, returns: 2 },
  { month: "Jun", revenue: 218000, orders: 89, customers: 76, returns: 1 },
  { month: "Jul", revenue: 242000, orders: 97, customers: 82, returns: 3 },
  { month: "Aug", revenue: 228000, orders: 91, customers: 79, returns: 2 },
  { month: "Sep", revenue: 267000, orders: 108, customers: 95, returns: 2 },
  { month: "Oct", revenue: 289000, orders: 116, customers: 103, returns: 3 },
  { month: "Nov", revenue: 312000, orders: 125, customers: 114, returns: 1 },
  { month: "Dec", revenue: 348000, orders: 139, customers: 128, returns: 2 },
];

const channelData = [
  { channel: "WhatsApp", orders: 2840, revenue: 1420000, color: "#25d366" },
  { channel: "Direct", orders: 1620, revenue: 810000, color: "#10b981" },
  { channel: "Referral", orders: 890, revenue: 445000, color: "#0ea5e9" },
  { channel: "B2B", orders: 480, revenue: 960000, color: "#8b5cf6" },
  { channel: "Social", orders: 220, revenue: 110000, color: "#f59e0b" },
];

const cohortData = [
  { name: "Jan cohort", m1: 100, m2: 68, m3: 52, m4: 44, m5: 40, m6: 38 },
  { name: "Feb cohort", m1: 100, m2: 72, m3: 58, m4: 48, m5: 42 },
  { name: "Mar cohort", m1: 100, m2: 74, m3: 60, m4: 52 },
  { name: "Apr cohort", m1: 100, m2: 70, m3: 55 },
  { name: "May cohort", m1: 100, m2: 75 },
  { name: "Jun cohort", m1: 100 },
];

const heatmapHours = Array.from({ length: 7 }, (_, day) =>
  Array.from({ length: 24 }, (_, h) => ({
    day,
    hour: h,
    value: Math.floor(Math.random() * 50 + (h >= 9 && h <= 21 ? 30 : 0)),
  })),
).flat();

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 shadow-xl text-sm">
      <p className="text-slate-300 font-medium mb-2">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-semibold">
          {p.name}:{" "}
          {p.name?.toLowerCase().includes("revenue")
            ? `LKR ${Number(p.value).toLocaleString()}`
            : Number(p.value).toLocaleString()}
        </p>
      ))}
    </div>
  );
};

const HEAT_COLORS = [
  "#0f172a",
  "#064e3b",
  "#065f46",
  "#047857",
  "#059669",
  "#10b981",
  "#34d399",
];

function getHeatColor(value) {
  const idx = Math.min(
    Math.floor((value / 80) * (HEAT_COLORS.length - 1)),
    HEAT_COLORS.length - 1,
  );
  return HEAT_COLORS[idx];
}

export default function AdminAnalytics() {
  const [metric, setMetric] = useState("revenue");

  const metricConfig = {
    revenue: { label: "Revenue (LKR)", color: "#10b981", key: "revenue" },
    orders: { label: "Orders", color: "#0ea5e9", key: "orders" },
    customers: { label: "New Customers", color: "#8b5cf6", key: "customers" },
    returns: { label: "Returns", color: "#ef4444", key: "returns" },
  };
  const m = metricConfig[metric];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-slate-400 text-sm mt-1">
            Deep-dive performance metrics for Hygenc Covers
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm hover:bg-emerald-500/20 transition-all">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </motion.div>

      {/* Metric selector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2"
      >
        {Object.entries(metricConfig).map(([key, cfg]) => {
          const icons = {
            revenue: DollarSign,
            orders: ShoppingCart,
            customers: Users,
            returns: TrendingUp,
          };
          const Icon = icons[key];
          return (
            <button
              key={key}
              onClick={() => setMetric(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                metric === key
                  ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                  : "bg-slate-800/60 border-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <Icon className="w-4 h-4" />
              {cfg.label}
            </button>
          );
        })}
      </motion.div>

      {/* Main trend chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5"
      >
        <h2 className="text-white font-semibold mb-1">12-Month Trend</h2>
        <p className="text-slate-500 text-xs mb-5">
          {m.label} over the past year
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart
            data={monthlyData}
            margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="metricGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={m.color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={m.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#64748b", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) =>
                m.key === "revenue" ? `${(v / 1000).toFixed(0)}k` : v
              }
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={m.key}
              name={m.label}
              stroke={m.color}
              fill="url(#metricGrad)"
              strokeWidth={2.5}
              dot={{ fill: m.color, r: 3, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: m.color }}
            />
            <Bar
              dataKey={m.key}
              name={m.label}
              fill={m.color}
              opacity={0.1}
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Channel performance & Growth rate */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Channel breakdown */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5"
        >
          <h2 className="text-white font-semibold mb-1">Sales Channels</h2>
          <p className="text-slate-500 text-xs mb-5">
            Orders & revenue by acquisition channel
          </p>
          <div className="space-y-4">
            {channelData.map((ch, i) => (
              <motion.div
                key={ch.channel}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.07 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: ch.color }}
                    />
                    <span className="text-slate-300 text-sm font-medium">
                      {ch.channel}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-white text-sm font-semibold">
                      {ch.orders.toLocaleString()} orders
                    </span>
                    <span className="text-slate-500 text-xs ml-2">
                      LKR {(ch.revenue / 1000).toFixed(0)}k
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(ch.orders / 2840) * 100}%` }}
                    transition={{
                      delay: 0.4 + i * 0.07,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full"
                    style={{ background: ch.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* MoM Growth rate */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5"
        >
          <h2 className="text-white font-semibold mb-1">
            Month-over-Month Growth
          </h2>
          <p className="text-slate-500 text-xs mb-5">Revenue growth rate (%)</p>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart
              data={monthlyData.map((d, i) => ({
                month: d.month,
                growth:
                  i === 0
                    ? 0
                    : +(
                        ((d.revenue - monthlyData[i - 1].revenue) /
                          monthlyData[i - 1].revenue) *
                        100
                      ).toFixed(1),
              }))}
              margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                formatter={(v) => [`${v}%`, "Growth"]}
                contentStyle={{
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: 12,
                  color: "#f8fafc",
                }}
              />
              <Line
                type="monotone"
                dataKey="growth"
                stroke="#f59e0b"
                strokeWidth={2.5}
                dot={{ fill: "#f59e0b", r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Order activity heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5"
      >
        <h2 className="text-white font-semibold mb-1">
          Order Activity Heatmap
        </h2>
        <p className="text-slate-500 text-xs mb-5">
          Hour-of-day × day-of-week order intensity
        </p>
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="flex gap-1 mb-1 ml-10">
              {Array.from({ length: 24 }, (_, h) => (
                <div
                  key={h}
                  className="flex-1 text-center text-slate-600 text-[9px]"
                >
                  {h % 4 === 0 ? `${h}:00` : ""}
                </div>
              ))}
            </div>
            {days.map((day, di) => (
              <div key={day} className="flex items-center gap-1 mb-1">
                <div className="w-8 text-slate-500 text-xs text-right pr-2 shrink-0">
                  {day}
                </div>
                {Array.from({ length: 24 }, (_, h) => {
                  const cell = heatmapHours.find(
                    (c) => c.day === di && c.hour === h,
                  );
                  return (
                    <motion.div
                      key={h}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + di * 0.04 + h * 0.004 }}
                      title={`${day} ${h}:00 – ${cell?.value} orders`}
                      className="flex-1 h-6 rounded-sm cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ background: getHeatColor(cell?.value || 0) }}
                    />
                  );
                })}
              </div>
            ))}
            {/* Legend */}
            <div className="flex items-center gap-2 mt-3 ml-10">
              <span className="text-slate-500 text-xs">Low</span>
              {HEAT_COLORS.map((c) => (
                <div
                  key={c}
                  className="w-4 h-3 rounded-sm"
                  style={{ background: c }}
                />
              ))}
              <span className="text-slate-500 text-xs">High</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Customer retention */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5"
      >
        <h2 className="text-white font-semibold mb-1">
          Customer Retention Cohorts
        </h2>
        <p className="text-slate-500 text-xs mb-5">
          % of customers still active after N months
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="text-left text-slate-400 text-xs font-medium pb-3 pr-4">
                  Cohort
                </th>
                {["M+1", "M+2", "M+3", "M+4", "M+5", "M+6"].map((m) => (
                  <th
                    key={m}
                    className="text-center text-slate-400 text-xs font-medium pb-3 px-2"
                  >
                    {m}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cohortData.map((row, ri) => {
                const vals = [row.m1, row.m2, row.m3, row.m4, row.m5, row.m6];
                return (
                  <tr key={row.name}>
                    <td className="text-slate-300 text-xs pr-4 py-1.5 font-medium">
                      {row.name}
                    </td>
                    {vals.map((v, ci) => (
                      <td key={ci} className="text-center py-1.5 px-2">
                        {v !== undefined ? (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 + ri * 0.07 + ci * 0.03 }}
                            className="inline-flex items-center justify-center w-12 h-7 rounded-lg text-xs font-semibold text-white"
                            style={{
                              background: `rgba(16,185,129,${(v / 100) * 0.8})`,
                              border: "1px solid rgba(16,185,129,0.15)",
                            }}
                          >
                            {v}%
                          </motion.div>
                        ) : (
                          <span className="text-slate-700 text-xs">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
