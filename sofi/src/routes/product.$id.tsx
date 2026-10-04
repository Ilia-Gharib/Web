import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Clock, Minus, Plus, Star } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { fa, getProduct, PRODUCTS, toman } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => { const p = getProduct(params.id); if (!p) throw notFound(); return { id: p.id, title: p.title, desc: p.desc }; },
  head: ({ loaderData }) => loaderData ? {
    meta: [
      { title: `${loaderData.title} | روکوکو سرام` },
      { name: "description", content: loaderData.desc },
      { property: "og:title", content: loaderData.title },
      { property: "og:description", content: loaderData.desc },
    ],
  } : { meta: [{ title: "محصول پیدا نشد" }, { name: "robots", content: "noindex" }] },
  notFoundComponent: () => <div className="py-32 text-center"><p className="font-bold">این محصول پیدا نشد.</p><Link to="/shop" className="mt-4 inline-block underline">بازگشت به فروشگاه</Link></div>,
  component: ProductPage,
});

const REVIEWS = [
  { n: "سارا", t: "از عکس‌ها هم قشنگ‌تره! بسته‌بندی عالی بود.", r: 5 },
  { n: "مهدی", t: "هدیه گرفتم و همه عاشقش شدن. ممنون از ظرافت کار.", r: 5 },
  { n: "نگار", t: "کیفیت لعاب خیلی خوبه، فقط ارسال کمی طول کشید.", r: 4 },
];

function ProductPage() {
  const { id } = Route.useParams();
  const p = getProduct(id)!;
  const { add } = useCart();
  const navigate = useNavigate();
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState(0);
  const tabs = ["توضیحات و مشخصات ساخت", "روش نگهداری و شستشو", "نظرات خریداران"];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8" key={id}>
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden rounded-t-[160px] bg-secondary"><img src={p.images[img]} alt={p.title} className="h-full w-full object-cover" /></div>
          <div className="mt-4 flex gap-3">
            {p.images.map((s, i) => (
              <button key={i} onClick={() => setImg(i)} className={`h-20 w-20 overflow-hidden rounded-2xl border-2 ${i === img ? "border-primary" : "border-transparent"}`}><img src={s} alt="" className="h-full w-full object-cover" /></button>
            ))}
          </div>
        </div>
        <div>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs">{p.categoryLabel}</span>
          <h1 className="mt-4 text-3xl font-extrabold leading-snug">{p.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground" dir="ltr" style={{ textAlign: "right" }}>{p.en}</p>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-ochre text-ochre" />{fa(p.rating)}</span>
            <span className="text-muted-foreground">کد کالا: {p.sku}</span>
            <span className={p.stock <= 5 ? "text-primary" : "text-olive"}>موجودی: {fa(p.stock)} عدد</span>
          </div>
          <p className="mt-6 text-3xl font-bold text-primary">{toman(p.price)}</p>
          <p className="mt-6 leading-8 text-muted-foreground">{p.desc}</p>
          <p className="mt-4 flex items-center gap-2 rounded-2xl bg-secondary p-4 text-sm"><Clock className="h-4 w-4 text-olive" />آماده‌سازی ۳ تا ۵ روز کاری برای کارهای دست‌ساز</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border bg-card">
              <button className="p-3 disabled:opacity-40" disabled={qty >= p.stock} onClick={() => setQty(qty + 1)} aria-label="افزایش"><Plus className="h-4 w-4" /></button>
              <span className="w-8 text-center">{fa(qty)}</span>
              <button className="p-3 disabled:opacity-40" disabled={qty <= 1} onClick={() => setQty(qty - 1)} aria-label="کاهش"><Minus className="h-4 w-4" /></button>
            </div>
            <button onClick={() => add(p.id, qty)} className="rounded-full border border-primary px-6 py-3 text-primary hover:bg-primary hover:text-primary-foreground">افزودن به سبد</button>
            <button onClick={() => { add(p.id, qty); navigate({ to: "/checkout" }); }} className="rounded-full bg-primary px-6 py-3 text-primary-foreground hover:bg-primary-deep">خرید فوری</button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="flex gap-2 overflow-x-auto border-b">
          {tabs.map((t, i) => <button key={t} onClick={() => setTab(i)} className={`shrink-0 border-b-2 px-4 py-3 text-sm ${tab === i ? "border-primary font-bold text-primary" : "border-transparent"}`}>{t}</button>)}
        </div>
        <div className="max-w-3xl py-8 leading-8 text-muted-foreground">
          {tab === 0 && <ul className="list-inside list-disc space-y-1"><li>ساخته‌شده از خاک استون‌ور مرغوب</li><li>جزئیات برجسته کاملاً دست‌ساز و نقاشی با دست</li><li>پخت دوم در دمای ۱۲۰۰ درجه</li><li>هر قطعه منحصربه‌فرد است و ممکن است تفاوت جزئی با تصویر داشته باشد</li></ul>}
          {tab === 1 && <ul className="list-inside list-disc space-y-1"><li>لعاب کوره و بدون سرب؛ ایمن برای مواد غذایی</li><li>قابل استفاده در ماکروویو (به‌جز قطعات با رنگ طلایی)</li><li>برای ماندگاری بیشتر جزئیات برجسته، شستشو با دست توصیه می‌شود</li><li>از تغییر دمای ناگهانی پرهیز کنید</li></ul>}
          {tab === 2 && <div className="space-y-4">{REVIEWS.map((r) => <div key={r.n} className="rounded-2xl bg-card p-4"><div className="flex justify-between"><b className="text-foreground">{r.n}</b><span>{"★".repeat(r.r)}</span></div><p className="mt-2">{r.t}</p></div>)}</div>}
        </div>
      </div>

      <h2 className="mb-8 mt-8 text-2xl font-extrabold">محصولات مرتبط</h2>
      <div className="flex snap-x gap-6 overflow-x-auto pb-4">
        {PRODUCTS.filter((x) => x.id !== p.id).map((x) => <div key={x.id} className="w-72 shrink-0 snap-start"><ProductCard p={x} /></div>)}
      </div>
    </div>
  );
}
