import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { fa } from "@/lib/products";

const NAV = [
  { to: "/", label: "خانه" },
  { to: "/shop", label: "فروشگاه" },
  { to: "/about", label: "درباره ما" },
  { to: "/contact", label: "تماس با ما" },
] as const;

export function Header() {
  const { count, setOpen } = useCart();
  const [q, setQ] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const submit = (e: React.FormEvent) => { e.preventDefault(); navigate({ to: "/shop", search: { q } }); setMenu(false); };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
      <div className="bg-olive-deep py-2 text-center text-xs text-olive-foreground">
        ارسال رایگان برای سفارش‌های بالای ۱ میلیون تومان • ساخت دست ۱۰۰٪
      </div>
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 md:px-8">
        <button className="md:hidden" onClick={() => setMenu(!menu)} aria-label="منو">{menu ? <X /> : <Menu />}</button>
        <Link to="/" className="flex shrink-0 items-center gap-2 text-heading">
          <img src="/logo.png" alt="Rococo Ceram" className="h-12 w-12 rounded-full border object-cover shadow-sm md:h-14 md:w-14" />
          <span className="text-xl font-extrabold">روکوکو سرام</span>
        </Link>
        <nav className="mr-6 hidden gap-6 text-sm md:flex">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: true }} activeProps={{ className: "text-primary font-bold" }} className="transition-colors hover:text-primary">{n.label}</Link>
          ))}
        </nav>
        <form onSubmit={submit} className="mr-auto hidden items-center gap-2 rounded-full border bg-card px-4 py-2 lg:flex">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="جستجوی ماگ، کاسه…" className="w-48 bg-transparent text-sm outline-none" />
        </form>
        <button onClick={() => setOpen(true)} className="relative mr-auto rounded-full p-2 hover:bg-secondary lg:mr-0" aria-label="سبد خرید">
          <ShoppingBag className="h-6 w-6" />
          {count > 0 && <span className="absolute -left-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">{fa(count)}</span>}
        </button>
      </div>
      {menu && (
        <div className="border-t px-4 pb-4 md:hidden">
          <form onSubmit={submit} className="my-3 flex items-center gap-2 rounded-full border bg-card px-4 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="جستجو…" className="w-full bg-transparent text-sm outline-none" />
          </form>
          {NAV.map((n) => <Link key={n.to} to={n.to} onClick={() => setMenu(false)} className="block py-2">{n.label}</Link>)}
        </div>
      )}
    </header>
  );
}
