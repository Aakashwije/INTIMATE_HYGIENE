import { Minus, PartyPopper, Plus, ShoppingBag, ShoppingCart, Truck, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useLang } from "../context/LangContext";

const PHONE = "94729991950";

function buildWhatsAppMessage(items, subtotal, t) {
  const lines = items
    .map((i, idx) => `${idx + 1}. ${i.name} × ${i.qty} — LKR ${(i.price * i.qty).toLocaleString()}`)
    .join("%0A");
  const txt =
    `Hello%21 I%27d like to place this order via Hygenc Covers%3A%0A%0A` +
    `${lines}%0A%0A` +
    `${t.cartSubtotal || "Subtotal"}%3A LKR ${subtotal.toLocaleString()}%0A%0A` +
    `Please confirm availability and delivery%2C thank you%21`;
  return `https://wa.me/${PHONE}?text=${txt}`;
}

export default function CartDrawer() {
  const { items, updateQty, remove, subtotal, open, setOpen, clear } = useCart();
  const { t } = useLang();

  if (!open) return null;

  const checkoutUrl = buildWhatsAppMessage(items, subtotal, t);
  const freeDeliveryThreshold = 3000;
  const remaining = Math.max(0, freeDeliveryThreshold - subtotal);
  const progress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  return (
    <div className="fixed inset-0 z-[150] flex justify-end">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeInScreen"
        onClick={() => setOpen(false)}
      />

      <aside className="relative w-full sm:w-[420px] h-full bg-white shadow-2xl flex flex-col animate-slideInRight">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#28a745]" />
            {t.yourCart || "Your Cart"}
            {items.length > 0 && (
              <span className="text-xs font-semibold bg-[#28a745] text-white px-2 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.qty, 0)}
              </span>
            )}
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-gray-700 p-1"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free delivery progress */}
        {items.length > 0 && (
          <div className="px-5 py-3 bg-green-50 border-b border-green-100">
            <p className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
              {remaining > 0 ? (
                <>
                  <Truck className="w-3.5 h-3.5 text-[#28a745]" />
                  {t.cartAddMore || "Add"} LKR {remaining.toLocaleString()} {t.cartForFreeDelivery || "more for free delivery"}
                </>
              ) : (
                <>
                  <PartyPopper className="w-3.5 h-3.5 text-[#28a745]" />
                  {t.cartFreeUnlocked || "You unlocked free delivery!"}
                </>
              )}
            </p>
            <div className="h-2 rounded-full bg-green-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#28a745] to-[#5cd65c] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-14 h-14 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">{t.cartEmpty || "Your cart is empty"}</p>
              <p className="text-gray-400 text-xs mt-1">{t.cartEmptySub || "Add a product to get started"}</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((i) => (
                <li
                  key={i.id}
                  className="flex gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <img src={i.img} alt={i.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-800 truncate">{i.name}</p>
                    <p className="text-xs text-gray-500 mb-1.5">LKR {i.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(i.id, i.qty - 1)}
                        className="w-7 h-7 rounded-md bg-white border border-gray-200 text-gray-600 flex items-center justify-center hover:border-[#28a745] hover:text-[#28a745]"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">{i.qty}</span>
                      <button
                        onClick={() => updateQty(i.id, i.qty + 1)}
                        className="w-7 h-7 rounded-md bg-white border border-gray-200 text-gray-600 flex items-center justify-center hover:border-[#28a745] hover:text-[#28a745]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => remove(i.id)}
                        className="ml-auto text-xs text-gray-400 hover:text-red-500"
                      >
                        {t.cartRemove || "Remove"}
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-[#28a745] whitespace-nowrap">
                    LKR {(i.price * i.qty).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{t.cartSubtotal || "Subtotal"}</span>
              <span className="text-xl font-bold text-gray-800">LKR {subtotal.toLocaleString()}</span>
            </div>
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shimmer flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#1ea952] transition-colors shadow-lg"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t.cartCheckout || "Checkout via WhatsApp"}
            </a>
            <button
              onClick={clear}
              className="w-full text-xs text-gray-400 hover:text-gray-700 underline"
            >
              {t.cartClear || "Clear cart"}
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
