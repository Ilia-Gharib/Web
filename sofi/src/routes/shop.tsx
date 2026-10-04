import { createFileRoute } from "@tanstack/react-router";
import { Search, SearchX } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { CATEGORIES, PRODUCTS, toman } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/shop")({
  validateSearch: z.object({ q: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "فروشگاه | همه محصولات روکوکو سرام" },
      { name: "description", content: "خرید آنلاین ماگ‌های برجسته، کاسه و پیاله و ظروف دکوراتیو دست‌ساز روکوکو سرام." },
      { property: "og:title", content: "فروشگاه روکوکو سرام" },
      { property: "og:description", content: "همه ظروف سرامیکی دست‌ساز روکوکو در یک‌جا." },
    ],
  }),
  component: Shop,
});

const MAX = 900_000;
function Shop() {
  const { q: initial } = Route.useSearch();
  const [q, setQ] = useState(initial ?? "");
  const [cat, setCat] = useState<string>("all");
  const [max, setMax] = useState(MAX);
  const [sort, setSort] = useState("popular");

  const list = useMemo(() => {
    const r = PRODUCTS.filter((p) => (cat === "all" || p.category === cat) && p.price <= max && (p.title + p.categoryLabel + p.en).toLowerCase().includes(q.trim().toLowerCase()));
    const s = { cheap: (a: typeof r[0], b: typeof r[0]) => a.price - b.price, expensive: (a: typeof r[0], b: typeof r[0]) => b.price - a.price, new: (a: typeof r[0], b: typeof r[0]) => b.added - a.added, popular: (a: typeof r[0], b: typeof r[0]) => b.sold - a.sold }[sort]!;
    return r.sort(s);
  }, [q, cat, max, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-extrabold">فروشگاه</h1>
      <p className="mt-2 text-muted-foreground">هر ظرف با دست ساخته و نقاشی شده است.</p>
      <div className="mt-8 grid gap-4 rounded-[28px] bg-secondary p-5 lg:grid-cols-[1fr_auto_auto] lg:items-center">
        <label className="flex items-center gap-2 rounded-full bg-card px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="جستجو در محصولات…" className="w-full bg-transparent text-sm outline-none" />
        </label>
        <label className="flex items-center gap-3 text-sm">
          <span className="shrink-0">تا {toman(max)}</span>
          <input type="range" min={400000} max={MAX} step={10000} value={max} onChange={(e) => setMax(+e.target.value)} className="w-40 accent-primary" />
        </label>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full bg-card px-4 py-3 text-sm outline-none">
          <option value="popular">پرفروش‌ترین</option>
          <option value="new">جدیدترین</option>
          <option value="cheap">ارزان‌ترین</option>
          <option value="expensive">گران‌ترین</option>
        </select>
        <div className="flex flex-wrap gap-2 lg:col-span-3">
          {CATEGORIES.map((c) => (
            <button key={c.id} onClick={() => setCat(c.id)} className={`rounded-full px-4 py-2 text-sm transition ${cat === c.id ? "bg-primary text-primary-foreground" : "bg-card hover:bg-background"}`}>{c.label}</button>
          ))}
        </div>
      </div>
      {list.length === 0 ? (
        <div className="py-24 text-center">
          <SearchX className="mx-auto h-12 w-12 text-primary" />
          <p className="mt-4 font-bold">محصولی با این مشخصات پیدا نشد</p>
          <button onClick={() => { setQ(""); setCat("all"); setMax(MAX); }} className="mt-4 text-sm underline">پاک کردن فیلترها</button>
        </div>
      ) : (
        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      )}
    </div>
  );
}
