import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import p6 from "@/assets/p6.jpg";

export type Category = "mug" | "bowl" | "decor";
export const CATEGORIES: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "همه" },
  { id: "mug", label: "ماگ‌های برجسته" },
  { id: "bowl", label: "کاسه و پیاله" },
  { id: "decor", label: "ظروف دکوراتیو" },
];

export type Product = {
  id: string; title: string; en: string; price: number; categoryLabel: string; category: Category;
  rating: number; stock: number; sold: number; added: number; sku: string; images: string[]; desc: string;
};

export const PRODUCTS: Product[] = [
  { id: "fairy-cottage-mug", title: "ماگ کلبه جنگلی و قارچ برجسته", en: "Fairy Cottage & Mushroom 3D Mug", price: 680000, categoryLabel: "ماگ‌های فانتزی برجسته", category: "mug", rating: 4.9, stock: 8, sold: 320, added: 5, sku: "RC-101", images: [p1, p4, p5], desc: "ماگی به شکل کلبه‌ای کوچک در دل جنگل، با درِ چوبی، پنجره‌ی روشن و گل‌های برجسته که تک‌تک با دست شکل گرفته‌اند." },
  { id: "hidden-animal-mug", title: "ماگ حیوانات کف فنجان (سورپرایز کوسه و گربه)", en: "Hidden Animal Bottom Mug", price: 540000, categoryLabel: "ماگ‌های فانتزی", category: "mug", rating: 4.8, stock: 12, sold: 510, added: 3, sku: "RC-102", images: [p2, p3, p1], desc: "تا ته فنجان بنوشید تا با یک دوست کوچک روبه‌رو شوید؛ گربه یا کوسه‌ای که کف ماگ منتظر شماست." },
  { id: "kitty-bowl", title: "پیاله و کاسه فیگورال گربه لبه‌نشین", en: "Hanging Kitty Ceramic Bowl", price: 490000, categoryLabel: "کاسه و پیاله", category: "bowl", rating: 5.0, stock: 5, sold: 280, added: 6, sku: "RC-103", images: [p3, p2, p6], desc: "کاسه‌ای با لعاب صدفی و گربه‌ای بازیگوش که از لبه‌اش آویزان شده؛ برای صبحانه یا دکور." },
  { id: "mushroom-roof-mug", title: "ماگ سرامیکی کلبه قارچی با درب گل برجسته", en: "Mushroom Roof Covered Mug", price: 720000, categoryLabel: "ماگ‌های دست‌ساز", category: "mug", rating: 4.9, stock: 4, sold: 190, added: 4, sku: "RC-104", images: [p4, p1, p5], desc: "درِ قارچی قرمز با گل‌های برجسته که چای شما را گرم نگه می‌دارد؛ یک اثر کلکسیونی برای هر روز." },
  { id: "miniature-square-mug", title: "ماگ مکعبی کاراکترهای مینیاتوری دست‌ساز", en: "Miniature World Square Mug", price: 610000, categoryLabel: "کلکسیونی", category: "decor", rating: 4.7, stock: 6, sold: 140, added: 2, sku: "RC-105", images: [p5, p4, p2], desc: "دنیایی کوچک روی لبه‌ی ماگ: باغچه، نرده و آدمک‌هایی که با سوزن و قلم‌موی ریز ساخته شده‌اند." },
  { id: "organic-platter", title: "دیس شیرینی‌خوری ارگانیک مات دست‌ساز", en: "Organic Matte Serving Platter", price: 850000, categoryLabel: "ظروف پذیرایی", category: "decor", rating: 4.8, stock: 9, sold: 230, added: 1, sku: "RC-106", images: [p6, p3, p1], desc: "دیسی با فرم آزاد و لعاب مات شنی، برای پذیرایی گرم و بی‌تکلف از مهمان‌ها." },
];

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const fa = (n: number) => n.toLocaleString("fa-IR");
export const toman = (n: number) => `${fa(n)} تومان`;
export const FREE_SHIP = 1_000_000;
export const SHIP_COST = 45_000;
export const toEn = (s: string) => s.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d))).replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
