import { motion } from "framer-motion";
import { Check, Send, TrendingUp, Users } from "lucide-react";
import { useState } from "react";

const SUBSCRIBERS = [
  {
    id: 1,
    email: "dilshan.perera@gmail.com",
    name: "Dilshan Perera",
    city: "Colombo",
    date: "2025-11-02",
    active: true,
  },
  {
    id: 2,
    email: "priya.mendis@yahoo.com",
    name: "Priya Mendis",
    city: "Kandy",
    date: "2025-11-05",
    active: true,
  },
  {
    id: 3,
    email: "travel.nimasha@gmail.com",
    name: "Nimasha Silva",
    city: "Galle",
    date: "2025-11-08",
    active: true,
  },
  {
    id: 4,
    email: "chamari.d@outlook.com",
    name: "Chamari Dias",
    city: "Matara",
    date: "2025-11-10",
    active: true,
  },
  {
    id: 5,
    email: "ruchika.f@gmail.com",
    name: "Ruchika Fernando",
    city: "Jaffna",
    date: "2025-11-12",
    active: false,
  },
  {
    id: 6,
    email: "office.kavinda@gmail.com",
    name: "Kavinda Almeida",
    city: "Negombo",
    date: "2025-11-18",
    active: true,
  },
  {
    id: 7,
    email: "hotel.ruwan@cinnamon.com",
    name: "Ruwan Hotels",
    city: "Colombo",
    date: "2025-11-20",
    active: true,
  },
  {
    id: 8,
    email: "sunethra.w@gmail.com",
    name: "Sunethra W.",
    city: "Colombo 5",
    date: "2025-11-25",
    active: true,
  },
];

const CAMPAIGNS = [
  {
    id: 1,
    subject: "✨ December Sale – 20% off all packs!",
    sent: 340,
    opened: 218,
    clicked: 89,
    date: "2025-12-01",
    status: "sent",
  },
  {
    id: 2,
    subject: "🎁 Refer a friend & earn 10% off",
    sent: 312,
    opened: 184,
    clicked: 72,
    date: "2025-11-15",
    status: "sent",
  },
  {
    id: 3,
    subject: "🌿 Why eco-friendly matters for you",
    sent: 289,
    opened: 201,
    clicked: 95,
    date: "2025-11-01",
    status: "sent",
  },
];

export default function AdminNewsletter() {
  const [tab, setTab] = useState("subscribers");
  const [compose, setCompose] = useState({ subject: "", body: "" });
  const [sent, setSent] = useState(false);

  const active = SUBSCRIBERS.filter((s) => s.active).length;

  const handleSend = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setCompose({ subject: "", body: "" });
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
          <h1 className="text-2xl font-bold text-gray-900">Newsletter</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage subscribers and email campaigns
          </p>
        </div>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          {
            label: "Total Subscribers",
            value: SUBSCRIBERS.length,
            icon: Users,
          },
          { label: "Active", value: active, icon: Check },
          { label: "Avg. Open Rate", value: "64%", icon: TrendingUp },
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
              <div className="text-gray-900 font-bold text-lg">{value}</div>
              <div className="text-gray-500 text-xs">{label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {["subscribers", "campaigns", "compose"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
              tab === t
                ? "bg-green-100 border-green-primary/30 text-green-primary"
                : "bg-gray-50 border-gray-200 text-gray-500 hover:text-gray-900"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Subscribers list */}
      {tab === "subscribers" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  {["Email", "Name", "City", "Joined", "Status"].map((h) => (
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
                {SUBSCRIBERS.map((s, i) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-100/30 transition-colors"
                  >
                    <td className="px-5 py-3 text-gray-700 text-xs font-mono">
                      {s.email}
                    </td>
                    <td className="px-5 py-3 text-gray-900 text-xs font-medium">
                      {s.name}
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs">
                      {s.city}
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs">
                      {s.date}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-lg border font-medium ${s.active ? "bg-green-100 text-green-primary border-green-200" : "bg-gray-200 text-gray-500 border-gray-300"}`}
                      >
                        {s.active ? "Active" : "Unsubscribed"}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Campaigns */}
      {tab === "campaigns" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          {CAMPAIGNS.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="text-gray-900 font-semibold text-sm">
                    {c.subject}
                  </div>
                  <div className="text-gray-500 text-xs mt-0.5">
                    Sent {c.date}
                  </div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-lg bg-green-100 text-green-primary border border-green-200 font-medium self-start">
                  Sent
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Sent", value: c.sent, color: "slate" },
                  {
                    label: "Opened",
                    value: c.opened,
                    pct: `${Math.round((c.opened / c.sent) * 100)}%`,
                    color: "blue",
                  },
                  {
                    label: "Clicked",
                    value: c.clicked,
                    pct: `${Math.round((c.clicked / c.sent) * 100)}%`,
                    color: "emerald",
                  },
                ].map(({ label, value, pct, color }) => (
                  <div
                    key={label}
                    className="bg-gray-50 rounded-xl p-3 text-center"
                  >
                    <div className={`text-${color}-400 font-bold`}>{value}</div>
                    {pct && <div className="text-gray-500 text-xs">{pct}</div>}
                    <div className="text-gray-400 text-xs">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Compose */}
      {tab === "compose" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border border-gray-200 rounded-2xl p-6"
        >
          <h2 className="text-gray-900 font-semibold mb-5">Compose Newsletter</h2>
          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
                Subject Line
              </label>
              <input
                type="text"
                value={compose.subject}
                onChange={(e) =>
                  setCompose((f) => ({ ...f, subject: e.target.value }))
                }
                required
                placeholder="e.g. 🎁 Special offer just for you!"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-primary/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
                Message Body
              </label>
              <textarea
                rows={8}
                value={compose.body}
                onChange={(e) =>
                  setCompose((f) => ({ ...f, body: e.target.value }))
                }
                required
                placeholder="Write your newsletter content here…"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-primary/30 resize-none"
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-500 text-xs">
                Will be sent to {active} active subscribers
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg transition-all ${
                  sent
                    ? "bg-green-dark text-white shadow-green-primary/25"
                    : "bg-green-primary hover:bg-green-dark text-white shadow-green-primary/25"
                }`}
              >
                {sent ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {sent ? "Sent!" : "Send Newsletter"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
}
