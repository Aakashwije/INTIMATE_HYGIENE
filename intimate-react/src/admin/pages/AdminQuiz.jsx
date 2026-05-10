import { motion } from "framer-motion";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const QUIZ_RESULTS = [
  {
    id: 1,
    date: "2025-12-15",
    name: "Priya M.",
    result: "Travel Pack",
    answers: { q1: "travel", q2: "eco", q3: "solo" },
    score: 8,
  },
  {
    id: 2,
    date: "2025-12-15",
    name: "Dilshan P.",
    result: "Enterprise Pack",
    answers: { q1: "business", q2: "bulk", q3: "company" },
    score: 10,
  },
  {
    id: 3,
    date: "2025-12-14",
    name: "Sunethra W.",
    result: "Single Use Pack",
    answers: { q1: "daily", q2: "eco", q3: "solo" },
    score: 6,
  },
  {
    id: 4,
    date: "2025-12-14",
    name: "Kavinda A.",
    result: "Travel Pack",
    answers: { q1: "travel", q2: "quality", q3: "family" },
    score: 9,
  },
  {
    id: 5,
    date: "2025-12-13",
    name: "Chamari D.",
    result: "Single Use Pack",
    answers: { q1: "daily", q2: "price", q3: "solo" },
    score: 7,
  },
  {
    id: 6,
    date: "2025-12-13",
    name: "Ruchika F.",
    result: "Travel Pack",
    answers: { q1: "travel", q2: "eco", q3: "family" },
    score: 8,
  },
  {
    id: 7,
    date: "2025-12-12",
    name: "Lanka Hosp.",
    result: "Enterprise Pack",
    answers: { q1: "business", q2: "bulk", q3: "company" },
    score: 10,
  },
  {
    id: 8,
    date: "2025-12-12",
    name: "Nimasha S.",
    result: "Single Use Pack",
    answers: { q1: "daily", q2: "eco", q3: "solo" },
    score: 6,
  },
];

const resultDist = [
  {
    name: "Single Use Pack",
    value: QUIZ_RESULTS.filter((r) => r.result === "Single Use Pack").length,
    color: "#10b981",
  },
  {
    name: "Travel Pack",
    value: QUIZ_RESULTS.filter((r) => r.result === "Travel Pack").length,
    color: "#0ea5e9",
  },
  {
    name: "Enterprise Pack",
    value: QUIZ_RESULTS.filter((r) => r.result === "Enterprise Pack").length,
    color: "#8b5cf6",
  },
];

const scoreData = [
  { score: "6", count: 2 },
  { score: "7", count: 1 },
  { score: "8", count: 2 },
  { score: "9", count: 1 },
  { score: "10", count: 2 },
];

export default function AdminQuiz() {
  return (
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-white">Quiz Responses</h1>
        <p className="text-slate-400 text-sm mt-1">
          Analyze which products customers are being recommended
        </p>
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5"
        >
          <h2 className="text-white font-semibold mb-4">Result Distribution</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={resultDist}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {resultDist.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: 12,
                  color: "#f8fafc",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2">
            {resultDist.map((r) => (
              <div key={r.name} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: r.color }}
                />
                <span className="text-slate-400 text-xs flex-1">{r.name}</span>
                <span className="text-white text-xs font-bold">
                  {r.value} users
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5"
        >
          <h2 className="text-white font-semibold mb-4">Score Distribution</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={scoreData}
              margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="score"
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: 12,
                  color: "#f8fafc",
                }}
              />
              <Bar
                dataKey="count"
                name="Responses"
                fill="#10b981"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Responses table */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-900/60 border border-slate-700/50 rounded-2xl overflow-hidden"
      >
        <div className="px-5 py-4 border-b border-slate-700/50">
          <h2 className="text-white font-semibold">All Responses</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/50">
                {["#", "Name", "Recommended", "Score", "Date"].map((h) => (
                  <th
                    key={h}
                    className="text-left text-slate-400 text-xs font-medium px-5 py-3"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {QUIZ_RESULTS.map((r, i) => (
                <motion.tr
                  key={r.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.04 }}
                  className="border-b border-slate-800/60 hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-5 py-3 text-slate-600 text-xs">{r.id}</td>
                  <td className="px-5 py-3 text-white text-xs font-medium">
                    {r.name}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-lg border font-medium ${
                        r.result === "Enterprise Pack"
                          ? "bg-violet-500/15 text-violet-400 border-violet-500/20"
                          : r.result === "Travel Pack"
                            ? "bg-blue-500/15 text-blue-400 border-blue-500/20"
                            : "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
                      }`}
                    >
                      {r.result}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 bg-slate-800 rounded-full w-16 overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${r.score * 10}%` }}
                        />
                      </div>
                      <span className="text-white text-xs font-semibold">
                        {r.score}/10
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-500 text-xs">{r.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
