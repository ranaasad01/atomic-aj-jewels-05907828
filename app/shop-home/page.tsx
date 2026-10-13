"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, Sparkles, Heart, Star } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { staggerContainer, scaleIn } from "@/lib/motion";
import { products, Product } from "@/lib/data";
type BRAND = any;
const BRAND: any = new Proxy([], { get: (t: any, k) => (k in t ? t[k] : "") });

const CATEGORIES = ["All", "beaded", "charm", "friendship"] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_LABELS: Record<Category, string> = {
  All: "All Bracelets",
  beaded: "Beaded",
  charm: "Charm",
  friendship: "Friendship",
};

function ProductCard({ product, index }: { product: Product; index: number }) {
  const t = useTranslations();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative flex flex-col rounded-3xl bg-white border border-pink-100 shadow-[0_2px_8px_rgba(0,0,0,0.06),0_12px_32px_-8px_rgba(236,72,153,0.10)] overflow-hidden"
    >
      {product.isNew && (
        <span className="absolute top-3 left-3 z-10 rounded-full bg-[var(--accent)] text-white text-xs font-bold px-3 py-1 shadow-sm">
          {t("shop.newBadge")}
        </span>
      )}

      <Link href={`/product?id=${product.id}`} className="block overflow-hidden">
        <div className="relative h-52 bg-gradient-to-br from-pink-50 to-purple-50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/shapes/svg?seed=rainbow%20beaded";
            }}
          />
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/product?id=${product.id}`}>
            <h3 className="font-bold text-gray-800 text-base leading-snug hover:text-pink-500 transition-colors">
              {product.name}
            </h3>
          </Link>
          <span className="shrink-0 text-lg font-extrabold text-pink-500">
            £{product.price.toFixed(2)}
          </span>
        </div>

        <p className="text-sm text-gray-500 leading-relaxed flex-1">
          {product.shortDesc}
        </p>

        <div className="flex items-center gap-1 text-yellow-400">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
          ))}
          <span className="text-xs text-gray-400 ml-1">(5.0)</span>
        </div>

        <button
          onClick={handleAdd}
          aria-label={`Add ${product.name} to cart`}
          className={cn(
            "mt-1 flex items-center justify-center gap-2 rounded-full py-2.5 px-5 text-sm font-bold transition-all duration-300",
            added
              ? "bg-green-400 text-white scale-95"
              : "bg-[var(--accent)] text-white hover:brightness-110 active:scale-95"
          )}
        >
          <ShoppingCart className="h-4 w-4" aria-hidden="true" />
          {added ? t("shop.addedToCart") : t("shop.addToCart")}
        </button>
      </div>
    </motion.div>
  );
}

export default function ShopHomePage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? products
        : products.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const stats = (
    Array.isArray(t.raw("shop.stats")) ? t.raw("shop.stats") : []
  ) as { value: string; label: string }[];

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      {/* Hero */}
      <Reveal>
        <section className="relative overflow-hidden pt-16 pb-12 px-4 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-pink-200/40 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-purple-200/30 blur-2xl" />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full bg-pink-100 border border-pink-200 px-4 py-1.5 text-sm font-semibold text-pink-600 mb-6"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {t("shop.heroBadge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-5xl sm:text-6xl font-extrabold text-gray-800 tracking-tight text-balance leading-tight mb-4"
          >
            {t("shop.heroTitle")}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              {BRAND.name}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
            className="text-lg text-gray-500 max-w-md mx-auto leading-relaxed mb-8 text-pretty"
          >
            {t("shop.heroSub")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-3"
          >
            <button
              onClick={() => {
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-full bg-[var(--accent)] text-white font-bold px-8 py-3 text-base shadow-[0_4px_20px_rgba(236,72,153,0.35)] hover:brightness-110 transition-all duration-300 active:scale-95"
            >
              {t("shop.heroCta")}
            </button>
            <Link
              href="/cart"
              className="rounded-full bg-white border border-pink-200 text-pink-500 font-bold px-8 py-3 text-base hover:bg-pink-50 transition-all duration-300"
            >
              {t("shop.viewCart")}
            </Link>
          </motion.div>
        </section>
      </Reveal>

      {/* Stats strip */}
      <Reveal delay={0.05}>
        <section className="py-8 px-4">
          <div className="max-w-3xl mx-auto grid grid-cols-3 gap-4">
            {stats.map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center rounded-2xl bg-white border border-pink-100 shadow-sm py-5 px-3"
              >
                <span className="text-2xl font-extrabold text-pink-500">
                  {s.value}
                </span>
                <span className="text-xs text-gray-500 text-center mt-1 font-medium">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Filter + Grid */}
      <Reveal delay={0.08}>
        <section id="products" className="py-10 px-4 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h2 className="text-2xl font-extrabold text-gray-800">
              {t("shop.gridHeading")}
            </h2>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-semibold border transition-all duration-200",
                    activeCategory === cat
                      ? "bg-[var(--accent)] text-white border-transparent shadow-sm"
                      : "bg-white text-gray-600 border-pink-200 hover:border-pink-400 hover:text-pink-500"
                  )}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400 text-lg">
              {t("shop.noProducts")}
            </div>
          )}
        </section>
      </Reveal>

      {/* Love note banner */}
      <Reveal delay={0.05}>
        <section className="py-14 px-4">
          <div className="max-w-2xl mx-auto rounded-3xl bg-gradient-to-br from-pink-400 to-purple-400 p-10 text-center text-white shadow-[0_8px_40px_rgba(236,72,153,0.25)]">
            <Heart
              className="h-10 w-10 mx-auto mb-4 fill-white/30 stroke-white"
              aria-hidden="true"
            />
            <h2 className="text-3xl font-extrabold mb-3 tracking-tight">
              {t("shop.loveTitle")}
            </h2>
            <p className="text-white/85 text-base leading-relaxed mb-6 text-pretty">
              {t("shop.loveBody")}
            </p>
            <Link
              href="/cart"
              className="inline-block rounded-full bg-white text-pink-500 font-bold px-8 py-3 text-sm hover:bg-pink-50 transition-all duration-300 shadow-sm"
            >
              {t("shop.loveCta")}
            </Link>
          </div>
        </section>
      </Reveal>
    </main>
  );
}