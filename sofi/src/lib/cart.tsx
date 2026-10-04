import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { getProduct, type Product } from "./products";

type Line = { id: string; qty: number };
type Ctx = {
  lines: (Line & { product: Product })[]; count: number; subtotal: number; open: boolean;
  setOpen: (v: boolean) => void; add: (id: string, qty?: number) => void; setQty: (id: string, qty: number) => void;
  remove: (id: string) => void; clear: () => void;
};
const CartCtx = createContext<Ctx | null>(null);
const KEY = "rococo-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<Line[]>([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try { setRaw(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* ignore */ }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem(KEY, JSON.stringify(raw)); }, [raw, ready]);

  const lines = raw.flatMap((l) => { const product = getProduct(l.id); return product ? [{ ...l, product }] : []; });
  const add = (id: string, qty = 1) => {
    const p = getProduct(id); if (!p) return;
    setRaw((r) => {
      const ex = r.find((l) => l.id === id);
      const next = Math.min(p.stock, (ex?.qty ?? 0) + qty);
      return ex ? r.map((l) => (l.id === id ? { ...l, qty: next } : l)) : [...r, { id, qty: next }];
    });
    toast.success("به سبد خرید اضافه شد", { description: p.title });
  };
  const setQty = (id: string, qty: number) => {
    const p = getProduct(id); if (!p) return;
    setRaw((r) => r.map((l) => (l.id === id ? { ...l, qty: Math.max(1, Math.min(p.stock, qty)) } : l)));
  };
  const remove = (id: string) => setRaw((r) => r.filter((l) => l.id !== id));
  return (
    <CartCtx.Provider value={{
      lines, open, setOpen, add, setQty, remove, clear: () => setRaw([]),
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal: lines.reduce((s, l) => s + l.qty * l.product.price, 0),
    }}>{children}</CartCtx.Provider>
  );
}
export const useCart = () => { const c = useContext(CartCtx); if (!c) throw new Error("no cart"); return c; };
