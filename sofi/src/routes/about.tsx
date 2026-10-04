import { createFileRoute, Link } from "@tanstack/react-router";
import potter from "@/assets/potter.jpg";
import hero from "@/assets/hero.jpg";
import p5 from "@/assets/p5.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "درباره ما | داستان کارگاه روکوکو سرام" },
      { name: "description", content: "سفر خاک خام تا ظروف شاعرانه خانه؛ داستان و فلسفه کارگاه سرامیک روکوکو." },
      { property: "og:title", content: "درباره روکوکو سرام" },
      { property: "og:description", content: "از خاک خام تا ظرفی که هر روز در دست‌های شماست." },
    ],
  }),
  component: About,
});

const STEPS = [
  ["ورز دادن خاک", "خاک را ساعت‌ها ورز می‌دهیم تا هوایش خارج شود و نرم و آماده‌ی شکل گرفتن باشد."],
  ["شکل‌دهی روی چرخ", "روی چرخ سفالگری، فرم اصلی ظرف با حوصله و دست ساخته می‌شود."],
  ["جزئیات برجسته", "قارچ‌ها، گربه‌ها و گل‌ها را تک‌تک با ابزار ریز می‌سازیم و به بدنه می‌چسبانیم."],
  ["لعاب و پخت", "دو بار پخت در کوره و لعاب بدون سرب، ظرف را ایمن و ماندگار می‌کند."],
];

function About() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <section className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <span className="text-sm text-primary">درباره ما</span>
          <h1 className="mt-3 text-4xl font-extrabold leading-snug">از دل خاک، تا لحظه‌های روزمره‌ی شما</h1>
          <p className="mt-6 leading-8 text-muted-foreground">روکوکو سرام از یک میز کوچک و یک چرخ سفالگری شروع شد؛ با این باور که ظرف‌های روزمره می‌توانند لبخند بسازند. امروز با کمک ده‌ها هزار همراه، متنوع‌ترین ظروف سرامیکی فانتزی را در ایران تولید می‌کنیم — هر کدام با دست، با حوصله و با کمی خیال.</p>
        </div>
        <div className="overflow-hidden rounded-t-[200px]"><img src={potter} alt="کارگاه روکوکو" className="aspect-[4/5] w-full object-cover" /></div>
      </section>
      <section className="mt-24">
        <h2 className="text-center text-3xl font-extrabold">سفر یک ظرف</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(([t, d], i) => (
            <div key={t} className="rounded-[28px] bg-secondary p-6">
              <span className="text-4xl font-extrabold text-primary">{(i + 1).toLocaleString("fa-IR")}</span>
              <h3 className="mt-4 font-bold">{t}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-24 grid gap-6 md:grid-cols-2">
        <img src={hero} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-[32px] rounded-bl-none object-cover" />
        <img src={p5} alt="" loading="lazy" className="aspect-[4/3] w-full rounded-[32px] rounded-tr-none object-cover" />
      </section>
      <div className="mt-16 text-center"><Link to="/shop" className="rounded-full bg-primary px-8 py-4 text-primary-foreground">دیدن محصولات</Link></div>
    </div>
  );
}
