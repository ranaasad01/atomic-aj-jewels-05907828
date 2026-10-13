"use client";
import { ElementType, useMemo, useState } from 'react';
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Sparkles, Star, Package, ShoppingBag } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { staggerContainer, scaleIn } from "@/lib/motion";
const PRODUCTS = [
  {
    id: "rainbow-beaded",
    name: "Rainbow Beaded Bracelet",
    price: 4.5,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=rainbow%20beaded",
    shortDesc: "Bright rainbow beads on stretchy cord. So fun to wear every day!",
    isNew: false,
    category: "Beaded",
  },
  {
    id: "golden-star-charm",
    name: "Golden Star Charm Bracelet",
    price: 5.0,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=gold%20bracelet",
    shortDesc: "Shiny gold beads with a little star charm. Super pretty!",
    isNew: true,
    category: "Charm",
  },
  {
    id: "pastel-friendship",
    name: "Pastel Friendship Bracelet",
    price: 3.5,
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/3f95171a0dfb49b29b71b4fc4a08a522.jpg",
    shortDesc: "Soft pink, lilac and mint threads woven together. Great to share with your bestie!",
    isNew: false,
    category: "Friendship",
  },
  {
    id: "ocean-wave",
    name: "Ocean Wave Bracelet",
    price: 4.0,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=blue",
    shortDesc: "Blue and white beads that look just like the sea.",
    isNew: false,
    category: "Beaded",
  },
  {
    id: "strawberry-charm",
    name: "Strawberry Charm Bracelet",
    price: 5.5,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=charm%20bracelet",
    shortDesc: "Red and green beads with a tiny strawberry charm. So cute!",
    isNew: true,
    category: "Charm",
  },
  {
    id: "silver-sparkle",
    name: "Silver Sparkle Bracelet",
    price: 4.5,
    image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/08ea1d937c004129bbaa1b66db7c0bb0.jpg",
    shortDesc: "Clear sparkly beads that catch the light. Feels like wearing glitter!",
    isNew: false,
    category: "Beaded",
  },
];

const CATEGORIES = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

// Icons paired by index to the values.items array in messages/en.json
const VALUE_ICONS: { icon: ElementType; color: string }[] = [
  { icon: Heart,    color: "bg-pink-100 text-pink-500" },
  { icon: Sparkles, color: "bg-yellow-100 text-yellow-500" },
  { icon: Star,     color: "bg-purple-100 text-purple-500" },
  { icon: Package,  color: "bg-blue-100 text-blue-500" },
];

const REVIEWS = [
  {
    name: "Lily",
    text: "I got the rainbow bracelet and I wear it every single day! It is so pretty and it fits perfectly.",
    stars: 5,
    emoji: "🌈",
  },
  {
    name: "Mia",
    text: "The strawberry charm one is my favourite thing I own. My friends all want one now!",
    stars: 5,
    emoji: "🍓",
  },
  {
    name: "Zoe",
    text: "I bought the friendship bracelet for me and my bestie. We love them so much!",
    stars: 5,
    emoji: "💜",
  },
];

export default function ShopPage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  // Read values items as an array from the catalog (safe guard against missing key)
  const valueItems = Array.isArray(t.raw("values.items"))
    ? (t.raw("values.items") as { title: string; desc: string }[])
    : [];

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* ── HERO ── */}
      <Reveal>
        <section
          id="hero"
          className="relative overflow-hidden px-4 pt-12 pb-16 text-center sm:pt-16 sm:pb-24"
        >
          {/* Background blobs */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute -top-16 -left-16 h-72 w-72 rounded-full bg-pink-200/60 blur-3xl" />
            <div className="absolute top-8 right-0 h-64 w-64 rounded-full bg-yellow-200/50 blur-3xl" />
            <div className="absolute bottom-0 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-purple-200/40 blur-3xl" />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-1.5 text-sm font-semibold text-pink-600"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {t("hero.badge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-5xl font-extrabold leading-tight tracking-tight text-[var(--foreground)] sm:text-6xl"
          >
            {t("hero.title")}
            <span className="block text-[var(--accent)]">{t("hero.titleAccent")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22, ease: "easeOut" }}
            className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-[var(--foreground)]/70"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.34, ease: "easeOut" }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <a
              href="#shop"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3 text-base font-bold text-white shadow-lg shadow-pink-300/40 transition-all duration-300 hover:scale-105 hover:shadow-pink-400/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              <ShoppingBag className="h-5 w-5" aria-hidden="true" />
              {t("hero.cta")}
            </a>
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--accent)] bg-white px-7 py-3 text-base font-bold text-[var(--accent)] transition-all duration-300 hover:bg-pink-50 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              {t("hero.cartLink")}
            </Link>
          </motion.div>

          {/* Floating emoji decorations */}
          <motion.span
            aria-hidden="true"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
            className="absolute left-8 top-24 hidden text-4xl sm:block"
          >
            ✨
          </motion.span>
          <motion.span
            aria-hidden="true"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut", delay: 0.5 }}
            className="absolute right-10 top-20 hidden text-4xl sm:block"
          >
            💖
          </motion.span>
          <motion.span
            aria-hidden="true"
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-10 left-16 hidden text-3xl sm:block"
          >
            🌈
          </motion.span>
          <motion.span
            aria-hidden="true"
            animate={{ y: [0, -9, 0] }}
            transition={{ repeat: Infinity, duration: 3.0, ease: "easeInOut", delay: 0.8 }}
            className="absolute bottom-12 right-14 hidden text-3xl sm:block"
          >
            🌟
          </motion.span>
        </section>
      </Reveal>

      {/* ── SHOP GRID ── */}
      <Reveal>
        <section id="shop" className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
                {t("shop.heading")}
              </h2>
              <p className="mt-2 text-base text-[var(--foreground)]/60">
                {t("shop.subheading")}
              </p>
            </div>

            {/* Category filters */}
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "rounded-full border-2 px-5 py-2 text-sm font-bold transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]",
                    activeCategory === cat
                      ? "border-[var(--accent)] bg-[var(--accent)] text-white shadow-md shadow-pink-200"
                      : "border-pink-200 bg-white text-[var(--foreground)]/70 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product grid */}
            <motion.div
              key={activeCategory}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((product) => (
                <motion.div key={product.id} variants={scaleIn}>
                  <Link
                    href="/product-detail"
                    className="group block rounded-3xl border-2 border-pink-100 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_12px_32px_-8px_rgba(236,72,153,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-pink-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08),0_20px_40px_-8px_rgba(236,72,153,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  >
                    <div className="relative mb-4 overflow-hidden rounded-2xl bg-pink-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            "https://api.dicebear.com/7.x/shapes/svg?seed=rainbow%20beaded";
                        }}
                      />
                      {product.isNew && (
                        <span className="absolute left-3 top-3 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-bold text-white shadow">
                          {t("shop.newBadge")}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-extrabold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-200">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--foreground)]/60">
                      {product.shortDesc}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-extrabold text-[var(--accent)]">
                        £{product.price.toFixed(2)}
                      </span>
                      <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-500 border border-pink-200">
                        {product.category}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── VALUE PROPS ── */}
      <Reveal>
        <section
          id="about"
          className="bg-gradient-to-br from-pink-50 via-purple-50 to-yellow-50 px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
                {t("values.heading")}
              </h2>
              <p className="mt-3 text-base text-[var(--foreground)]/60">
                {t("values.subheading")}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {valueItems.map((item, i) => {
                const vp = VALUE_ICONS[i] ?? VALUE_ICONS[0];
                const Icon = vp.icon;
                return (
                  <Reveal key={i} delay={i * 0.08}>
                    <div className="flex flex-col items-center rounded-3xl border-2 border-white bg-white/80 p-6 text-center shadow-[0_2px_8px_rgba(0,0,0,0.05)] backdrop-blur-sm">
                      <div
                        className={cn(
                          "mb-4 flex h-14 w-14 items-center justify-center rounded-2xl",
                          vp.color
                        )}
                      >
                        <Icon className="h-7 w-7" aria-hidden="true" />
                      </div>
                      <h3 className="mb-2 text-base font-extrabold text-[var(--foreground)]">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[var(--foreground)]/60">
                        {item.desc}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── REVIEWS ── */}
      <Reveal>
        <section
          id="reviews"
          className="px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)] sm:text-4xl">
                {t("reviews.heading")}
              </h2>
              <p className="mt-3 text-base text-[var(--foreground)]/60">
                {t("reviews.subheading")}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {REVIEWS.map((review, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="rounded-3xl border-2 border-pink-100 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.05),0_8px_24px_-8px_rgba(236,72,153,0.1)]">
                    <div className="mb-3 text-3xl">{review.emoji}</div>
                    <div className="mb-3 flex gap-0.5">
                      {Array.from({ length: review.stars }).map((_, si) => (
                        <Star
                          key={si}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-[var(--foreground)]/70">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <p className="text-sm font-extrabold text-[var(--accent)]">
                      {review.name}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── CTA BAND ── */}
      <Reveal>
        <section
          id="contact"
          className="mx-4 mb-20 overflow-hidden rounded-3xl bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 px-6 py-16 text-center shadow-[0_8px_32px_rgba(236,72,153,0.3)] sm:mx-6 lg:mx-auto lg:max-w-5xl"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="mb-4 text-5xl"
            aria-hidden="true"
          >
            💎
          </motion.div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t("cta.heading")}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/80">
            {t("cta.body")}
          </p>
          <a
            href="#shop"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-extrabold text-pink-500 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            {t("cta.button")}
          </a>
        </section>
      </Reveal>
    </main>
  );
}
