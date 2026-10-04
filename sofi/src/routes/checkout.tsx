import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, CreditCard, Printer } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { fa, FREE_SHIP, SHIP_COST, toEn, toman } from "@/lib/products";
import { EmptyCart } from "@/components/site/CartDrawer";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "ثبت سفارش | روکوکو سرام" },
      { name: "description", content: "تکمیل مشخصات گیرنده، روش ارسال و پرداخت سفارش روکوکو سرام." },
      { property: "og:title", content: "ثبت سفارش روکوکو سرام" },
      { property: "og:description", content: "پرداخت امن و ارسال به سراسر ایران." },
    ],
  }),
  component: Checkout,
});

const STEPS = ["مشخصات گیرنده", "روش ارسال", "روش پرداخت", "تأیید نهایی"];
const field = "w-full rounded-2xl border bg-card px-4 py-3 text-sm outline-none focus:border-primary";
type Order = { code: string; items: { title: string; qty: number; price: number }[]; subtotal: number; ship: number; info: typeof EMPTY; method: string };
const EMPTY = { name: "", mobile: "", province: "", city: "", address: "", postal: "" };

function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const [step, setStep] = useState(0);
  const [info, setInfo] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [method, setMethod] = useState<"post" | "courier">("post");
  const [order, setOrder] = useState<Order | null>(null);
  const [paying, setPaying] = useState(false);

  const ship = method === "post" ? (subtotal >= FREE_SHIP ? 0 : SHIP_COST) : 90_000;
  const total = subtotal + ship;

  if (!order && lines.length === 0) return <div className="mx-auto max-w-3xl px-4 py-12"><EmptyCart /></div>;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!info.name.trim()) e["name"] = "نام را وارد کنید";
    if (!/^09\d{9}$/.test(toEn(info.mobile))) e["mobile"] = "شماره موبایل ۱۱ رقمی با ۰۹ وارد کنید";
    if (!info.province.trim()) e["province"] = "استان را وارد کنید";
    if (!info.city.trim()) e["city"] = "شهر را وارد کنید";
    if (info.address.trim().length < 10) e["address"] = "آدرس دقیق پستی را وارد کنید";
    if (!/^\d{10}$/.test(toEn(info.postal))) e["postal"] = "کد پستی باید ۱۰ رقم باشد";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const pay = (ok: boolean) => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      if (!ok) { toast.error("پرداخت ناموفق بود", { description: "تراکنش لغو شد. دوباره تلاش کنید." }); return; }
      setOrder({ code: `RC-${Math.floor(100000 + Math.random() * 900000)}`, items: lines.map((l) => ({ title: l.product.title, qty: l.qty, price: l.product.price })), subtotal, ship, info, method });
      clear(); setStep(3); toast.success("پرداخت با موفقیت انجام شد");
    }, 1200);
  };

  const input = (k: keyof typeof EMPTY, label: string, extra: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <label className="block text-sm">
      <span className="mb-1 block">{label}</span>
      <input className={field} value={info[k]} onChange={(e) => setInfo({ ...info, [k]: e.target.value })} {...extra} />
      {errors[k] && <span className="mt-1 block text-xs text-destructive">{errors[k]}</span>}
    </label>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-extrabold">ثبت سفارش</h1>
      <ol className="no-print mt-8 grid grid-cols-4 gap-2">
        {STEPS.map((s, i) => (
          <li key={s} className="text-center text-xs sm:text-sm">
            <div className={`mx-auto grid h-9 w-9 place-items-center rounded-full ${i <= step ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>{i < step ? <Check className="h-4 w-4" /> : fa(i + 1)}</div>
            <p className={`mt-2 ${i === step ? "font-bold" : "text-muted-foreground"}`}>{s}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-8 md:grid-cols-[1.5fr_1fr]">
        <div className="rounded-[28px] bg-card p-6 md:p-8">
          {step === 0 && (
            <form onSubmit={(e) => { e.preventDefault(); if (validate()) setStep(1); }} className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">{input("name", "نام و نام خانوادگی")}</div>
              {input("mobile", "شماره موبایل", { inputMode: "numeric", placeholder: "۰۹۱۲۳۴۵۶۷۸۹" })}
              {input("postal", "کد پستی ۱۰ رقمی", { inputMode: "numeric" })}
              {input("province", "استان")}
              {input("city", "شهر")}
              <div className="sm:col-span-2">{input("address", "آدرس دقیق پستی")}</div>
              <button className="rounded-full bg-primary py-3 text-primary-foreground sm:col-span-2">ادامه</button>
            </form>
          )}
          {step === 1 && (
            <div className="space-y-4">
              {([["post", "پست پیشتاز", subtotal >= FREE_SHIP ? "رایگان" : toman(SHIP_COST), "۳ تا ۵ روز کاری"], ["courier", "پیک اکسپرس استودیو", toman(90_000), "تهران — ارسال همان روز"]] as const).map(([v, t, c, d]) => (
                <label key={v} className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 p-5 ${method === v ? "border-primary" : ""}`}>
                  <span className="flex items-center gap-3"><input type="radio" checked={method === v} onChange={() => setMethod(v)} className="accent-primary" /><span><b>{t}</b><span className="block text-xs text-muted-foreground">{d}</span></span></span>
                  <span className="text-sm">{c}</span>
                </label>
              ))}
              <div className="flex gap-3"><button onClick={() => setStep(0)} className="rounded-full border px-6 py-3">بازگشت</button><button onClick={() => setStep(2)} className="flex-1 rounded-full bg-primary py-3 text-primary-foreground">ادامه</button></div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-5">
              <div className="rounded-2xl border-2 border-dashed p-6 text-center">
                <CreditCard className="mx-auto h-10 w-10 text-olive" />
                <p className="mt-3 font-bold">درگاه پرداخت شاپرک (آزمایشی)</p>
                <p className="mt-1 text-sm text-muted-foreground">مبلغ قابل پرداخت: {toman(total)}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <button disabled={paying} onClick={() => pay(true)} className="rounded-full bg-olive py-3 text-olive-foreground disabled:opacity-50">{paying ? "در حال پردازش…" : "پرداخت موفق"}</button>
                <button disabled={paying} onClick={() => pay(false)} className="rounded-full bg-destructive py-3 text-destructive-foreground disabled:opacity-50">پرداخت ناموفق</button>
              </div>
              <button onClick={() => setStep(1)} className="text-sm underline">بازگشت</button>
            </div>
          )}
          {step === 3 && order && (
            <div>
              <div className="text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-olive text-olive-foreground"><Check /></div>
                <h2 className="mt-4 text-2xl font-extrabold">سفارش شما ثبت شد</h2>
                <p className="mt-2 text-sm">کد پیگیری: <b className="text-primary">{order.code}</b></p>
              </div>
              <table className="mt-8 w-full text-sm">
                <thead><tr className="border-b text-muted-foreground"><th className="py-2 text-right">کالا</th><th>تعداد</th><th className="text-left">مبلغ</th></tr></thead>
                <tbody>
                  {order.items.map((i) => <tr key={i.title} className="border-b"><td className="py-2">{i.title}</td><td className="text-center">{fa(i.qty)}</td><td className="text-left">{toman(i.qty * i.price)}</td></tr>)}
                  <tr><td className="py-2">هزینه ارسال ({order.method === "post" ? "پست پیشتاز" : "پیک"})</td><td /><td className="text-left">{order.ship ? toman(order.ship) : "رایگان"}</td></tr>
                  <tr className="font-bold"><td className="py-2">جمع کل</td><td /><td className="text-left">{toman(order.subtotal + order.ship)}</td></tr>
                </tbody>
              </table>
              <p className="mt-6 text-sm leading-7 text-muted-foreground">گیرنده: {order.info.name} — {order.info.mobile}<br />{order.info.province}، {order.info.city}، {order.info.address} — کد پستی {order.info.postal}</p>
              <div className="no-print mt-8 flex gap-3">
                <button onClick={() => window.print()} className="flex items-center gap-2 rounded-full border px-6 py-3"><Printer className="h-4 w-4" />چاپ فاکتور</button>
                <Link to="/shop" className="flex-1 rounded-full bg-primary py-3 text-center text-primary-foreground">بازگشت به فروشگاه</Link>
              </div>
            </div>
          )}
        </div>
        {step < 3 && (
          <aside className="h-fit space-y-3 rounded-[28px] bg-secondary p-6 text-sm">
            <h3 className="font-bold">خلاصه سفارش</h3>
            {lines.map((l) => <div key={l.id} className="flex justify-between gap-2"><span className="line-clamp-1">{l.product.title} × {fa(l.qty)}</span><span className="shrink-0">{toman(l.qty * l.product.price)}</span></div>)}
            <div className="flex justify-between border-t pt-3"><span>ارسال</span><span>{step >= 1 ? (ship ? toman(ship) : "رایگان") : "—"}</span></div>
            <div className="flex justify-between font-bold"><span>جمع کل</span><span>{toman(step >= 1 ? total : subtotal)}</span></div>
          </aside>
        )}
      </div>
    </div>
  );
}
