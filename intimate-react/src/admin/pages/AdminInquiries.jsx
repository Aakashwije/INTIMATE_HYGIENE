import { motion } from "framer-motion";
import {
    Building2,
    CheckCircle,
    Clock,
    Eye,
    Mail,
    MapPin,
    MessageSquare,
    Phone,
    X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { fetchInquiries } from "../../lib/database";

const INQUIRIES = [];

const STATUS_META = {
  new: {
    label: "New Lead",
    icon: Clock,
    classes: "bg-blue-50 text-blue-600 border-blue-200",
  },
  negotiating: {
    label: "Negotiating",
    icon: MessageSquare,
    classes: "bg-amber-50 text-amber-600 border-amber-200",
  },
  closed_won: {
    label: "Won",
    icon: CheckCircle,
    classes: "bg-green-100 text-green-primary border-green-200",
  },
  closed_lost: {
    label: "Lost",
    icon: X,
    classes: "bg-red-50 text-red-600 border-red-200",
  },
};

export default function AdminInquiries() {
  const [selected, setSelected] = useState(null);
  const [inquiries, setInquiries] = useState(INQUIRIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchInquiries()
      .then((rows) => {
        if (!mounted || rows.length === 0) return;
        setInquiries(
          rows.map((row, idx) => ({
            id: `B2B-${String(rows.length - idx).padStart(3, "0")}`,
            company: row.company || "Website Inquiry",
            contact: row.name,
            role: row.subject || "Customer",
            phone: row.phone || "",
            email: row.email || "",
            city: "-",
            product: row.product || row.subject || "General",
            qty: row.volume || "-",
            status: STATUS_META[row.status] ? row.status : "new",
            date: new Date(row.created_at).toISOString().slice(0, 10),
            note: row.message,
          })),
        );
      })
      .catch(() => {
        if (mounted) setInquiries(INQUIRIES);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const stats = {
    total: inquiries.length,
    won: inquiries.filter((i) => i.status === "closed_won").length,
    active: inquiries.filter(
      (i) => i.status === "negotiating" || i.status === "new",
    ).length,
  };

  return (
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">B2B Inquiries</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage corporate and bulk buyer leads
          </p>
        </div>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Inquiries", value: loading ? "..." : stats.total, color: "blue" },
          {
            label: "Active / In Progress",
            value: loading ? "..." : stats.active,
            color: "amber",
          },
          { label: "Deals Won", value: loading ? "..." : stats.won, color: "emerald" },
        ].map(({ label, value, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`bg-${color}-500/10 border border-${color}-500/20 rounded-2xl p-4 text-center`}
          >
            <div className={`text-2xl font-bold text-${color}-400`}>
              {value}
            </div>
            <div className="text-gray-500 text-xs mt-1">{label}</div>
          </motion.div>
        ))}
      </div>

      {/* Kanban-style cards */}
      <div className="space-y-3">
        {inquiries.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center text-gray-400 text-sm">
            No inquiries yet
          </div>
        )}
        {inquiries.map((inq, i) => {
          const meta = STATUS_META[inq.status];
          const Icon = meta.icon;
          return (
            <motion.div
              key={inq.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.07 }}
              className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-green-primary/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Company info */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-gray-900 font-semibold">
                      {inq.company}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {inq.contact} · {inq.role}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-gray-500 text-xs font-mono">
                        {inq.id}
                      </span>
                      <span className="text-gray-400">·</span>
                      <span className="text-gray-500 text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {inq.city}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Product & qty */}
                <div className="hidden sm:block text-right">
                  <div className="text-gray-900 text-sm font-medium">
                    {inq.product}
                  </div>
                  <div className="text-gray-500 text-xs">Qty: {inq.qty}</div>
                  <div className="text-gray-400 text-xs">{inq.date}</div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border font-medium ${meta.classes}`}
                  >
                    <Icon className="w-3 h-3" />
                    {meta.label}
                  </span>
                  <button
                    onClick={() =>
                      setSelected(selected?.id === inq.id ? null : inq)
                    }
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-green-primary transition-colors bg-gray-100 hover:bg-green-50 px-2.5 py-1 rounded-lg border border-gray-200 hover:border-green-200"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Details
                  </button>
                </div>
              </div>

              {/* Expanded details */}
              {selected?.id === inq.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  <div className="col-span-2">
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-1">
                      Note
                    </p>
                    <p className="text-gray-700 text-sm">{inq.note}</p>
                  </div>
                  <div className="space-y-2">
                    <a
                      href={`mailto:${inq.email}`}
                      aria-disabled={!inq.email}
                      className="flex items-center gap-2 text-xs text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {inq.email}
                    </a>
                    <a
                      href={
                        inq.phone
                          ? `https://wa.me/${inq.phone.replace(/\D/g, "")}?text=Hello%20${encodeURIComponent(inq.contact)}%2C%20regarding%20your%20B2B%20inquiry%20${inq.id}`
                          : "#"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-green-400 hover:text-green-300 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {inq.phone}
                    </a>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
