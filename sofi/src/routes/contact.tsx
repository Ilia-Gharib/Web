import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { toEn } from "@/lib/products";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تماس با ما | روکوکو سرام" },
      { name: "description", content: "برای سفارش اختصاصی و پشتیبانی با روکوکو سرام در تلگرام و اینستاگرام در ارتباط باشید." },
      { property: "og:title", content: "تماس با روکوکو سرام" },
      { property: "og:description", content: "سفارش اختصاصی، پشتیبانی و همکاری." },
    ],
  }),
  component: Contact,
});

const field = "w-full rounded-2xl border bg-card px-4 py-3 text-sm outline-none focus:border-primary";
function Contact() {
  const [f, setF] = useState({ name: "", phone: "", subject: "", msg: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim() || !f.msg.trim()) { toast.error("نام و متن پیام را وارد کنید"); return; }
    if (!/^09\d{9}$/.test(toEn(f.phone))) { toast.error("شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود"); return; }
    toast.success("پیام شما ارسال شد", { description: "به‌زودی با شما تماس می‌گیریم." });
    setF({ name: "", phone: "", subject: "", msg: "" });
  };
  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 md:grid-cols-[1fr_1.3fr] md:px-8">
      <div>
        <h1 className="text-4xl font-extrabold">تماس با ما</h1>
        <p className="mt-4 leading-8 text-muted-foreground">برای سفارش ماگ اختصاصی، هدیه‌های سازمانی یا هر سؤالی، از راه‌های زیر با ما در ارتباط باشید.</p>
        <div className="mt-8 space-y-4">
          <a href="https://t.me/rocococeram" target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-[28px] rounded-bl-none bg-primary p-5 text-primary-foreground"><Send /> کانال تلگرام: rocococeram@</a>
          <a href="https://t.me/rococo_admin" target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-[28px] rounded-tr-none bg-olive p-5 text-olive-foreground"><Send /> ثبت سفارش در تلگرام: rococo_admin@</a>
          <a href="https://instagram.com/rocococeram" target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-[28px] border bg-card p-5"><Instagram /> اینستاگرام: rocococeram@</a>
        </div>
      </div>
      <form onSubmit={submit} className="space-y-4 rounded-[32px] bg-secondary p-6 md:p-10">
        <div className="grid gap-4 sm:grid-cols-2">
          <input className={field} placeholder="نام" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <input className={field} placeholder="شماره تماس (۰۹...)" inputMode="numeric" value={f.phone} onChange={(e) => setF({ ...f, phone: e.target.value })} />
        </div>
        <input className={field} placeholder="موضوع پیام" value={f.subject} onChange={(e) => setF({ ...f, subject: e.target.value })} />
        <textarea className={field} rows={6} placeholder="متن پیام" value={f.msg} onChange={(e) => setF({ ...f, msg: e.target.value })} />
        <button className="rounded-full bg-primary px-8 py-3 text-primary-foreground hover:bg-primary-deep">ارسال پیام</button>
      </form>
    </div>
  );
}
