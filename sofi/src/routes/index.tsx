import { createFileRoute, Link } from "@tanstack/react-router";
import { Gift, Leaf, Paintbrush, ArrowLeft } from "lucide-react";
import hero from "@/assets/hero.jpg";
import potter from "@/assets/potter.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";
import tCol from "@/assets/tile-collection.png";
import tCus from "@/assets/tile-custom.png";
import tWork from "@/assets/tile-workshop.png";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "روکوکو سرام | ظروف سرامیکی دست‌ساز برای زندگی روزمره" },
      { name: "description", content: "ماگ‌های برجسته فانتزی، کاسه‌های فیگورال و ظروف پذیرایی دست‌ساز از استودیو روکوکو سرام." },
      { property: "og:title", content: "روکوکو سرام | ظروف سرامیکی دست‌ساز" },
      { property: "og:description", content: "قسمتی از خیال که از دل‌مون شکوفه می‌زنه و تو دست‌هامون ریشه می‌کنه." },
    ],
  }),
  component: Home,
});

const MARQUEE = "✦ ۲۰٪ تخفیف محصولات منتخب سفارشی • ارسال رایگان برای سفارش‌های بالای ۱ میلیون تومان • ساخت دست ۱۰۰٪ ارگانیک • ";

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-10 md:grid-cols-2 md:px-8 md:pt-16">
        <div className="overflow-hidden rounded-t-[140px] md:rounded-t-[200px]">
          <img src={hero} alt="ظروف سرامیکی دست‌ساز" width={1024} height={1280} className="aspect-[4/5] w-full object-cover" />
        </div>
        <div className="animate-rise">
          <span className="text-sm text-primary">استودیو سرامیک روکوکو</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.4] md:text-5xl md:leading-[1.35]">ظروف دست‌ساز سرامیکی برای لمس زیبایی در زندگی روزمره</h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-muted-foreground">قسمتی از خیال که از دل‌مون شکوفه می‌زنه و تو دست‌هامون ریشه می‌کنه</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link to="/shop" className="rounded-full bg-primary px-8 py-4 text-primary-foreground transition hover:bg-primary-deep">مشاهده و خرید مجموعه</Link>
            <Link to="/about" className="flex items-center gap-2 text-sm underline-offset-8 hover:underline">داستان کارگاه <ArrowLeft className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* Tiles */}
      <section className="relative mt-20">
        <div className="absolute inset-x-0 top-1/2 h-1/2 -translate-y-1/2 bg-secondary" />
        <div className="relative mx-auto grid max-w-7xl gap-5 px-4 sm:grid-cols-3 md:px-8">
          <Link to="/shop" className="flex aspect-[5/4] flex-col justify-between rounded-[32px] rounded-bl-none bg-primary p-8 text-3xl font-bold text-primary-foreground transition hover:-translate-y-1"><img src={tCol} alt="کالکشن جاری" width={816} height={816} loading="lazy" className="mx-auto h-36 w-auto object-contain drop-shadow-sm md:h-44" /><span>کالکشن جاری</span></Link>
          <Link to="/contact" className="flex aspect-[5/4] flex-col justify-between rounded-[32px] rounded-tr-none border bg-card p-8 text-3xl font-bold text-heading transition hover:-translate-y-1"><img src={tCus} alt="سفارش اختصاصی" width={816} height={816} loading="lazy" className="mx-auto h-36 w-auto object-contain drop-shadow-sm md:h-44" /><span>سفارش اختصاصی</span></Link>
          <Link to="/about" className="flex aspect-[5/4] flex-col justify-between rounded-[32px] rounded-br-none bg-olive p-8 text-3xl font-bold text-olive-foreground transition hover:-translate-y-1"><img src={tWork} alt="ورکشاپ و کارگاه" width={816} height={816} loading="lazy" className="mx-auto h-36 w-auto object-contain drop-shadow-sm md:h-44" /><span>ورکشاپ و کارگاه</span></Link>
        </div>
      </section>

      {/* Offer band */}
      <section className="mt-24 overflow-hidden bg-ochre py-4" aria-label="پیشنهادها">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="inline-flex animate-marquee text-lg font-bold leading-none text-heading">
            <span>{MARQUEE.repeat(4)}</span><span>{MARQUEE.repeat(4)}</span>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="mx-auto mt-16 max-w-7xl px-4 md:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div><span className="text-sm text-primary">محبوب‌ترین‌ها</span><h2 className="mt-2 text-3xl font-extrabold">پرفروش‌های روکوکو</h2></div>
          <Link to="/shop" className="text-sm underline">همه محصولات</Link>
        </div>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {[...PRODUCTS].sort((a, b) => b.sold - a.sold).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Philosophy */}
      <section className="mx-auto mt-28 grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2 md:px-8">
        <div className="blob overflow-hidden"><img src={potter} alt="سرامیکار پشت چرخ سفالگری" loading="lazy" width={1024} height={1024} className="aspect-square w-full object-cover" /></div>
        <div>
          <h2 className="text-3xl font-extrabold leading-snug md:text-4xl">فلسفه‌ی ما: هر ظرف، یک قصه‌ی کوچک</h2>
          <p className="mt-6 leading-8 text-muted-foreground">در روکوکو، خاک را با حوصله ورز می‌دهیم، روی چرخ شکلش می‌دهیم و جزئیات برجسته را تک‌تک با دست می‌سازیم و رنگ می‌کنیم. هیچ دو ظرفی دقیقاً شبیه هم نیستند؛ درست مثل لحظه‌هایی که با آن‌ها می‌سازید.</p>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[["+۵۰ هزار", "مشتری خوشحال"], ["۱۰۰٪", "نقاشی با دست"], ["+۱۲۰", "طرح منحصربه‌فرد"]].map(([n, l]) => (
              <div key={l} className="rounded-2xl bg-secondary p-4"><p className="text-2xl font-extrabold text-primary">{n}</p><p className="mt-1 text-xs">{l}</p></div>
            ))}
          </div>
          <Link to="/about" className="mt-8 inline-block rounded-full bg-olive px-6 py-3 text-sm text-olive-foreground hover:bg-olive-deep">بیشتر بدانید</Link>
        </div>
      </section>

      {/* Service arches */}
      <section className="mt-28 bg-secondary py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="text-center text-3xl font-extrabold">چرا روکوکو؟</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { icon: Gift, t: "بسته‌بندی هدیه و اختصاصی", d: "هر سفارش با کاغذ کرافت، روبان و کارت دست‌نویس به دست‌تان می‌رسد." },
              { icon: Paintbrush, t: "سفارش ماگ‌های برجسته سفارشی", d: "طرح دلخواه، اسم یا حیوان خانگی‌تان را روی ماگ می‌سازیم." },
              { icon: Leaf, t: "خاک مرغوب و لعاب کوره بدون سرب", d: "ایمن برای غذا، ماکروویو و ماشین ظرف‌شویی." },
            ].map(({ icon: I, t, d }) => (
              <div key={t} className="rounded-t-full bg-card px-8 pb-10 pt-20 text-center">
                <I className="mx-auto h-10 w-10 text-primary" />
                <h3 className="mt-6 text-lg font-bold">{t}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social gallery */}
      <section className="mx-auto mt-24 max-w-7xl px-4 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-extrabold">از اینستاگرام و تلگرام ما</h2>
          <div className="flex gap-4 text-sm">
            <a href="https://instagram.com/rocococeram" target="_blank" rel="noreferrer" className="underline">rocococeram@</a>
            <a href="https://t.me/rocococeram" target="_blank" rel="noreferrer" className="underline">کانال تلگرام</a>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
          {[p1, p2, p3, p4, p5, p6].map((src, i) => (
            <a key={i} href="https://instagram.com/rocococeram" target="_blank" rel="noreferrer" className="aspect-square overflow-hidden rounded-2xl">
              <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 hover:scale-110" />
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
