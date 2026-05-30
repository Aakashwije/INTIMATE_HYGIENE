import { createContext, useContext, useEffect, useState } from "react";
import { addOnProductIds, bundleProductIds } from "../data/catalog";

const CartContext = createContext();

const STORAGE_KEY = "hygenc_cart_v1";

function hasBundle(items) {
  return items.some((item) => bundleProductIds.has(item.id));
}

function withoutOrphanAddOns(items) {
  if (hasBundle(items)) return items;
  return items.filter((item) => !addOnProductIds.has(item.id));
}

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? withoutOrphanAddOns(parsed) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readStored());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota errors
    }
  }, [items]);

  const add = (item) => {
    if (addOnProductIds.has(item.id) && !hasBundle(items)) {
      return false;
    }

    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + (item.qty || 1) } : p
        );
      }
      return [...prev, { ...item, qty: item.qty || 1 }];
    });
    setOpen(true);
    return true;
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) return remove(id);
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));
  };

  const remove = (id) => {
    setItems((prev) => withoutOrphanAddOns(prev.filter((p) => p.id !== id)));
  };

  const clear = () => setItems([]);

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <CartContext.Provider
      value={{ items, add, updateQty, remove, clear, count, subtotal, open, setOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
