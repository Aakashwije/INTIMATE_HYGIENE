import { motion } from "framer-motion";
import { Bell, Check, Phone, Save, Shield, Store, Truck } from "lucide-react";
import { useState } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";

const SectionCard = ({ icon: Icon, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white border border-gray-200 rounded-2xl p-6"
  >
    <div className="flex items-center gap-2.5 mb-5">
      <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center text-green-primary">
        <Icon className="w-4 h-4" />
      </div>
      <h2 className="text-gray-900 font-semibold">{title}</h2>
    </div>
    {children}
  </motion.div>
);

const Field = ({ label, ...props }) => (
  <div>
    <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
      {label}
    </label>
    <input
      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-primary/30 transition-all"
      {...props}
    />
  </div>
);

const Toggle = ({ label, desc, checked, onChange }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
    <div>
      <div className="text-gray-900 text-sm font-medium">{label}</div>
      {desc && <div className="text-gray-500 text-xs mt-0.5">{desc}</div>}
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-all duration-300 ${checked ? "bg-green-primary" : "bg-gray-200"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${checked ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  </div>
);

export default function AdminSettings() {
  const { user } = useAdminAuth();
  const [saved, setSaved] = useState(false);
  const [store, setStore] = useState({
    name: "Intimate Hygiene LK",
    email: "hello@intimate.lk",
    phone: "+94771234567",
    address: "Colombo 3, Sri Lanka",
  });
  const [whatsapp, setWhatsapp] = useState({
    number: "+94771234567",
    greeting: "Hello! Welcome to Intimate Hygiene. How can we help you today?",
  });
  const [delivery, setDelivery] = useState({
    colomboFee: "0",
    outsideColomboFee: "350",
    expressAvail: true,
    codAvail: true,
  });
  const [notifs, setNotifs] = useState({
    newOrder: true,
    lowStock: true,
    newInquiry: true,
    newsletter: false,
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-6 space-y-5 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage store configuration and preferences
        </p>
      </motion.div>

      <form onSubmit={handleSave} className="space-y-5">
        {/* Store Info */}
        <SectionCard icon={Store} title="Store Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Store Name"
              value={store.name}
              onChange={(e) =>
                setStore((s) => ({ ...s, name: e.target.value }))
              }
            />
            <Field
              label="Email"
              type="email"
              value={store.email}
              onChange={(e) =>
                setStore((s) => ({ ...s, email: e.target.value }))
              }
            />
            <Field
              label="Phone"
              value={store.phone}
              onChange={(e) =>
                setStore((s) => ({ ...s, phone: e.target.value }))
              }
            />
            <Field
              label="Address"
              value={store.address}
              onChange={(e) =>
                setStore((s) => ({ ...s, address: e.target.value }))
              }
            />
          </div>
        </SectionCard>

        {/* WhatsApp */}
        <SectionCard icon={Phone} title="WhatsApp Settings">
          <div className="space-y-4">
            <Field
              label="WhatsApp Number"
              value={whatsapp.number}
              onChange={(e) =>
                setWhatsapp((s) => ({ ...s, number: e.target.value }))
              }
            />
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
                Auto-Greeting Message
              </label>
              <textarea
                rows={3}
                value={whatsapp.greeting}
                onChange={(e) =>
                  setWhatsapp((s) => ({ ...s, greeting: e.target.value }))
                }
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-primary/30 resize-none"
              />
            </div>
          </div>
        </SectionCard>

        {/* Delivery */}
        <SectionCard icon={Truck} title="Delivery Settings">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <Field
              label="Colombo Area Fee (LKR)"
              type="number"
              value={delivery.colomboFee}
              onChange={(e) =>
                setDelivery((s) => ({ ...s, colomboFee: e.target.value }))
              }
            />
            <Field
              label="Outside Colombo Fee (LKR)"
              type="number"
              value={delivery.outsideColomboFee}
              onChange={(e) =>
                setDelivery((s) => ({
                  ...s,
                  outsideColomboFee: e.target.value,
                }))
              }
            />
          </div>
          <Toggle
            label="Express Delivery Available"
            desc="Same-day delivery option shown to customers"
            checked={delivery.expressAvail}
            onChange={(v) => setDelivery((s) => ({ ...s, expressAvail: v }))}
          />
          <Toggle
            label="Cash on Delivery (COD)"
            desc="Allow customers to pay on delivery"
            checked={delivery.codAvail}
            onChange={(v) => setDelivery((s) => ({ ...s, codAvail: v }))}
          />
        </SectionCard>

        {/* Notifications */}
        <SectionCard icon={Bell} title="Notification Preferences">
          <Toggle
            label="New Order Alerts"
            desc="Notify when a new order is placed"
            checked={notifs.newOrder}
            onChange={(v) => setNotifs((n) => ({ ...n, newOrder: v }))}
          />
          <Toggle
            label="Low Stock Warnings"
            desc="Alert when product stock falls below threshold"
            checked={notifs.lowStock}
            onChange={(v) => setNotifs((n) => ({ ...n, lowStock: v }))}
          />
          <Toggle
            label="New B2B Inquiries"
            desc="Notify when a new B2B lead arrives"
            checked={notifs.newInquiry}
            onChange={(v) => setNotifs((n) => ({ ...n, newInquiry: v }))}
          />
          <Toggle
            label="Newsletter Confirmations"
            desc="Confirm when newsletter is sent"
            checked={notifs.newsletter}
            onChange={(v) => setNotifs((n) => ({ ...n, newsletter: v }))}
          />
        </SectionCard>

        {/* Admin Account Info (read-only) */}
        <SectionCard icon={Shield} title="Admin Account">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                label: "Admin 1",
                user: "owner",
                name: "Aakash Wijesekara",
                role: "Super Admin",
              },
              {
                label: "Admin 2",
                user: "manager",
                name: "Upul Wijesekara",
                role: "Manager",
              },
              {
                label: "Admin 3",
                user: "analytics",
                name: "Analytics User",
                role: "Analyst",
              },
            ].map((a) => (
              <div
                key={a.user}
                className={`bg-gray-50 rounded-xl p-4 border ${user?.username === a.user ? "border-green-primary/30" : "border-gray-200"}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center text-green-primary text-xs font-bold">
                    {a.user.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-gray-900 text-xs font-semibold">
                      {a.name}
                    </div>
                    <div className="text-gray-500 text-xs">{a.role}</div>
                  </div>
                </div>
                <div className="text-gray-400 text-xs font-mono">@{a.user}</div>
                {user?.username === a.user && (
                  <div className="mt-2 text-xs text-green-primary font-medium">
                    ● You
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-3">
            To change passwords, update{" "}
            <span className="font-mono text-gray-500">
              AdminAuthContext.jsx
            </span>
          </p>
        </SectionCard>

        {/* Save */}
        <div className="flex justify-end">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold shadow-lg transition-all ${
              saved
                ? "bg-green-dark text-white shadow-green-primary/20"
                : "bg-green-primary hover:bg-green-dark text-white shadow-green-primary/20"
            }`}
          >
            {saved ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saved ? "Saved!" : "Save Settings"}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
