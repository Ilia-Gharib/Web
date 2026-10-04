import { Link } from "@tanstack/react-router";
import { Plus, Star } from "lucide-react";
import { useCart } from "@/lib/cart";
import { fa, toman, type Product } from "@/lib/products";

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  return (
    <div className="group animate-rise">
      <Link to="/product/$id" params={{ id: p.id }} className="relative block aspect-[4/5] overflow-hidden rounded-[28px] bg-secondary">
        <img src={p.images[0]} alt={p.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:opacity-0" />
        <img src={p.images[1]} alt="" loading="lazy" className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition duration-700 group-hover:scale-100 group-hover:opacity-100" />
        <span className="absolute right-3 top-3 rounded-full bg-card/90 px-3 py-1 text-[11px]">{p.categoryLabel}</span>
        <span className={`absolute bottom-3 right-3 rounded-full px-3 py-1 text-[11px] ${p.stock <= 5 ? "bg-primary text-primary-foreground" : "bg-olive text-olive-foreground"}`}>
          {p.stock <= 5 ? `فقط ${fa(p.stock)} عدد باقی مانده` : "موجود در انبار"}
        </span>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link to="/product/$id" params={{ id: p.id }} className="line-clamp-1 font-bold hover:text-primary">{p.title}</Link>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <span>{toman(p.price)}</span>
            <span className="flex items-center gap-0.5"><Star className="h-3.5 w-3.5 fill-ochre text-ochre" />{fa(p.rating)}</span>
          </div>
        </div>
        <button onClick={() => add(p.id)} className="flex shrink-0 items-center gap-1 rounded-full border border-primary px-3 py-1.5 text-xs text-primary transition hover:bg-primary hover:text-primary-foreground">
          <Plus className="h-3.5 w-3.5" />افزودن به سبد
        </button>
      </div>
    </div>
  );
}
