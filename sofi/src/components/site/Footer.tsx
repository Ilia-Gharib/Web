import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="mt-24 border-t bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-3 md:px-8">
        <div className="text-center md:text-right">
          <img src="/logo.png" alt="Rococo Ceram" className="mx-auto md:mx-0 h-12 w-12 rounded-full border object-cover shadow-sm md:h-14 md:w-14" />
          <p className="mt-2 text-xs tracking-[0.3em] text-muted-foreground">EST. ROCOCO</p>
          <h3 className="mt-3 text-2xl font-extrabold">روکوکو سرام</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Rococo Ceram | استودیو ظروف دست‌ساز روکوکو - تولیدکننده متنوع‌ترین ظروف سرامیکی</p>
        </div>
        <div className="space-y-2 text-sm">
          <h4 className="mb-3 font-bold">ارتباط با ما</h4>
          <a className="block hover:text-primary" href="https://t.me/rocococeram" target="_blank" rel="noreferrer">کانال تلگرام: rocococeram@</a>
          <a className="block hover:text-primary" href="https://t.me/rococo_admin" target="_blank" rel="noreferrer">ثبت سفارش: rococo_admin@</a>
          <a className="block hover:text-primary" href="https://instagram.com/rocococeram" target="_blank" rel="noreferrer">اینستاگرام: rocococeram@</a>
          <Link to="/contact" className="block hover:text-primary">فرم تماس و پشتیبانی</Link>
          <p className="text-muted-foreground">نشانی: تهران، کارگاه سرامیک روکوکو</p>
        </div>
        <div>
          <h4 className="mb-3 font-bold">خبرنامه</h4>
          <p className="mb-4 text-sm text-muted-foreground">از کالکشن‌های تازه و تخفیف‌ها زودتر باخبر شوید.</p>
          <form onSubmit={(e) => { e.preventDefault(); if (!/\S+@\S+\.\S+/.test(email)) { toast.error("ایمیل معتبر وارد کنید"); return; } toast.success("عضویت شما ثبت شد"); setEmail(""); }} className="flex rounded-full border bg-card p-1">
            <input value={email} onChange={(e) => setEmail(e.target.value)} dir="ltr" placeholder="email@example.com" className="w-full bg-transparent px-4 text-sm outline-none" />
            <button className="rounded-full bg-primary px-5 py-2 text-sm text-primary-foreground hover:bg-primary-deep">عضویت</button>
          </form>
        </div>
      </div>
      <div className="border-t py-5 text-center text-xs text-muted-foreground">© ۱۴۰۵ روکوکو سرام — ساخته‌شده با خاک و خیال</div>
    </footer>
  );
}
