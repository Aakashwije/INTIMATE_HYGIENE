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
import { useState } from "react";

const INQUIRIES = [
  {
    id: "B2B-042",
    company: "Cinnamon Hotels Group",
    contact: "Ruwan Jayasinghe",
    role: "Operations Manager",
    phone: "+94117890123",
    email: "ruwan@cinnamon.com",
    city: "Colombo",
    product: "Enterprise Pack",
    qty: "500/month",
    status: "negotiating",
    date: "2025-12-14",
    note: "Interested in a 12-month contract. Requesting 15% bulk discount.",
  },
  {
    id: "B2B-041",
    company: "SriLankan Airlines",
    contact: "Amara Perera",
    role: "Procurement Head",
    phone: "+94112345678",
    email: "amara@srilankan.com",
    city: "Katunayake",
    product: "Travel Pack",
    qty: "2000/month",
    status: "new",
    date: "2025-12-13",
    note: "Needs custom branding on packaging.",
  },
  {
    id: "B2B-040",
    company: "Lanka Hospitals",
    contact: "Dr. Nimal Fernando",
    role: "Facilities Director",
    phone: "+94112109876",
    email: "facilities@lankahospitals.lk",
    city: "Colombo 10",
    product: "Enterprise Pack",
    qty: "300/month",
    status: "closed_won",
    date: "2025-12-10",
    note: "Contract signed. Monthly delivery arranged.",
  },
  {
    id: "B2B-039",
    company: "HSBC Sri Lanka",
    contact: "Dilini Samarasinghe",
    role: "Facilities Manager",
    phone: "+94112233445",
    email: "d.samarasinghe@hsbc.lk",
    city: "Colombo 1",
    product: "Enterprise Pack",
    qty: "200/month",
    status: "closed_won",
    date: "2025-12-08",
    note: "Quarterly invoicing preferred.",
  },
  {
    id: "B2B-038",
    company: "Keells Super",
    contact: "Malik Rodrigo",
    role: "Category Manager",
    phone: "+94112887766",
    email: "malik@keells.com",
    city: "Colombo 3",
    product: "All Products",
    qty: "Retail",
    status: "negotiating",
    date: "2025-12-07",
    note: "Wants to stock all 3 SKUs in 35 branches.",
  },
  {
    id: "B2B-037",
    company: "University of Kelaniya",
    contact: "Prof. Surani K.",
    role: "Admin Registrar",
    phone: "+94114895623",
    email: "admin@kln.ac.lk",
    city: "Kelaniya",
    product: "Single Use Pack",
    qty: "1000/month",
    status: "new",
    date: "2025-12-06",
    note: "Student welfare department inquiry.",
  },
];

const STATUS_META = {
  new: {
    label: "New Lead",
    icon: Clock,
    classes: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  },
  negotiating: {
    label: "Negotiating",
    icon: MessageSquare,
    classes: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  },
  closed_won: {
    label: "Won",
    icon: CheckCircle,
    classes: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  },
  closed_lost: {
    label: "Lost",
    icon: X,
    classes: "bg-red-500/15 text-red-400 border-red-500/20",
  },
};

export default function AdminInquiries() {
  const [selected, setSelected] = useState(null);

  const stats = {
    total: INQUIRIES.length,
    won: INQUIRIES.filter((i) => i.status === "closed_won").length,
    active: INQUIRIES.filter(
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
          <h1 className="text-2xl font-bold text-white">B2B Inquiries</h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage corporate and bulk buyer leads
          </p>
        </div>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Inquiries", value: stats.total, color: "blue" },
          {
            label: "Active / In Progress",
            value: stats.active,
            color: "amber",
          },
          { label: "Deals Won", value: stats.won, color: "emerald" },
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
            <div className="text-slate-400 text-xs mt-1">{label}</div>
          </motion.div>
        ))}
      </div>

      {/* Kanban-style cards */}
      <div className="space-y-3">
        {INQUIRIES.map((inq, i) => {
          const meta = STATUS_META[inq.status];
          const Icon = meta.icon;
          return (
            <motion.div
              key={inq.id}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.07 }}
              className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5 hover:border-slate-600/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Company info */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <div className="text-white font-semibold">
                      {inq.company}
                    </div>
                    <div className="text-slate-400 text-xs">
                      {inq.contact} · {inq.role}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-slate-500 text-xs font-mono">
                        {inq.id}
                      </span>
                      <span className="text-slate-700">·</span>
                      <span className="text-slate-500 text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {inq.city}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Product & qty */}
                <div className="hidden sm:block text-right">
                  <div className="text-white text-sm font-medium">
                    {inq.product}
                  </div>
                  <div className="text-slate-400 text-xs">Qty: {inq.qty}</div>
                  <div className="text-slate-600 text-xs">{inq.date}</div>
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
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-400 transition-colors bg-slate-800 hover:bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-slate-700 hover:border-emerald-500/20"
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
                  className="mt-4 pt-4 border-t border-slate-700/50 grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  <div className="col-span-2">
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-1">
                      Note
                    </p>
                    <p className="text-slate-300 text-sm">{inq.note}</p>
                  </div>
                  <div className="space-y-2">
                    <a
                      href={`mailto:${inq.email}`}
                      className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {inq.email}
                    </a>
                    <a
                      href={`https://wa.me/${inq.phone.replace(/\D/g, "")}?text=Hello%20${encodeURIComponent(inq.contact)}%2C%20regarding%20your%20B2B%20inquiry%20${inq.id}`}
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
