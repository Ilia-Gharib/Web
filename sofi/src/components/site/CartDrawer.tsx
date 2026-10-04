import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { FREE_SHIP, fa, toman } from "@/lib/products";

export function ShipMeter({ subtotal }: { subtotal: number }) {
  const left = FREE_SHIP - subtotal;
  return (
    <div className="rounded-2xl bg-secondary p-4 text-sm">
      <p>{left > 0 ? <>{toman(left)} دیگر خرید کنید تا ارسال رایگان شود!</> : "تبریک! ارسال سفارش شما رایگان است 🎉"}</p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-card">
        <div className="h-full rounded-full bg-olive transition-all" style={{ width: `${Math.min(100, (subtotal / FREE_SHIP) * 100)}%` }} />
      </div>
    </div>
  );
}

export function CartLines() {
  const { lines, setQty, remove } = useCart();
  return (
    <ul className="divide-y">
      {lines.map(({ product: p, qty }) => (
        <li key={p.id} className="flex gap-4 py-4">
          <img src={p.images[0]} alt={p.title} className="h-20 w-20 rounded-2xl object-cover" loading="lazy" />
          <div className="min-w-0 flex-1">
            <p className="line-clamp-2 text-sm font-bold">{p.title}</p>
            <p className="mt-1 text-sm text-primary">{toman(p.price)}</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex items-center rounded-full border">
                <button className="p-1.5" onClick={() => setQty(p.id, qty + 1)} disabled={qty >= p.stock} aria-label="افزایش"><Plus className="h-3.5 w-3.5" /></button>
                <span className="w-6 text-center text-sm">{fa(qty)}</span>
                <button className="p-1.5" onClick={() => setQty(p.id, qty - 1)} aria-label="کاهش"><Minus className="h-3.5 w-3.5" /></button>
              </div>
              <button onClick={() => remove(p.id)} className="text-muted-foreground hover:text-destructive" aria-label="حذف"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function EmptyCart({ onClose }: { onClose?: () => void }) {
  return (
    <div className="py-16 text-center">
      <div className="mx-auto grid h-24 w-24 place-items-center rounded-t-full bg-secondary"><ShoppingBag className="h-10 w-10 text-primary" /></div>
      <p className="mt-5 font-bold">سبد خرید شما خالی است</p>
      <p className="mt-1 text-sm text-muted-foreground">هنوز ظرفی دل‌تان را نبرده؟</p>
      <Link to="/shop" onClick={onClose} className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground">رفتن به فروشگاه</Link>
    </div>
  );
}

export function CartDrawer() {
  const { open, setOpen, lines, subtotal } = useCart();
  return (
    <div className={`fixed inset-0 z-50 ${open ? "" : "pointer-events-none"}`}>
      <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-heading/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`} />
      <aside className={`absolute inset-y-0 left-0 flex w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-lg font-bold">سبد خرید</h2>
          <button onClick={() => setOpen(false)} aria-label="بستن"><X /></button>
        </div>
        {lines.length === 0 ? <EmptyCart onClose={() => setOpen(false)} /> : (
          <>
            <div className="flex-1 overflow-y-auto px-5"><div className="pt-4"><ShipMeter subtotal={subtotal} /></div><CartLines /></div>
            <div className="space-y-3 border-t p-5">
              <div className="flex justify-between font-bold"><span>جمع کل</span><span>{toman(subtotal)}</span></div>
              <Link to="/checkout" onClick={() => setOpen(false)} className="block rounded-full bg-primary py-3 text-center text-primary-foreground hover:bg-primary-deep">ادامه و ثبت سفارش</Link>
              <Link to="/cart" onClick={() => setOpen(false)} className="block text-center text-sm underline">مشاهده سبد خرید</Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
