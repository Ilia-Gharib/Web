import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { toman } from "@/lib/products";
import { CartLines, EmptyCart, ShipMeter } from "@/components/site/CartDrawer";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "سبد خرید | روکوکو سرام" },
      { name: "description", content: "مشاهده و ویرایش سبد خرید ظروف دست‌ساز روکوکو سرام." },
      { property: "og:title", content: "سبد خرید روکوکو سرام" },
      { property: "og:description", content: "سبد خرید شما در روکوکو سرام." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, subtotal } = useCart();
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-8">
      <h1 className="text-4xl font-extrabold">سبد خرید</h1>
      {lines.length === 0 ? <EmptyCart /> : (
        <div className="mt-8 grid gap-8 md:grid-cols-[1.5fr_1fr]">
          <div className="rounded-[28px] bg-card px-6"><CartLines /></div>
          <div className="h-fit space-y-4 rounded-[28px] bg-secondary p-6">
            <ShipMeter subtotal={subtotal} />
            <div className="flex justify-between font-bold"><span>جمع کل</span><span>{toman(subtotal)}</span></div>
            <Link to="/checkout" className="block rounded-full bg-primary py-3 text-center text-primary-foreground">ادامه و ثبت سفارش</Link>
          </div>
        </div>
      )}
    </div>
  );
}
