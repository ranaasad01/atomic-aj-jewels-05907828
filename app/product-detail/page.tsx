"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Star, Heart, ShoppingBag, ChevronRight, Sparkles, Shield, Package } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { products, type Product } from "@/lib/data";

// ── inline mock: the featured product for this detail view ──────────────────
const FEATURED_ID = "strawberry-charm";
const featured: Product =
  products.find((p) => p.id === FEATURED_ID) ?? products[0];

// ── related products (same category, excluding featured) ────────────────────
const related: Product[] = products
  .filter((p) => p.category === featured.category && p.id !== featured.id)
  .slice(0, 3);

// ── review data ─────────────────────────────────────────────────────────────
const REVIEWS = [
  { id: "r1", name: "Mia", stars: 5, text: "So cute! I wear it every single day and everyone asks where I got it!" },
  { id: "r2", name: "Lily", stars: 5, text: "My bestie and I both got one. It is our matching bracelet now!" },
  { id: "r3", name: "Zoe", stars: 4, text: "Really pretty and arrived super fast. Love the little charm!" },
];

// ── star renderer ────────────────────────────────────────────────────────────
function Stars({ count }: { count: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("h-4 w-4", i < count ? "fill-[var(--accent)] text-[var(--accent)]" : "fill-none text-[var(--accent)]/30")}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export default function ProductDetailPage() {
  const t = useTranslations();
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [qty, setQty] = useState(1);

  function handleAdd() {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <main className="min-h-screen bg-[var(--background)] pb-24">

      {/* ── breadcrumb ── */}
      <Reveal>
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-sm text-[var(--muted-foreground)]">
            <Link href="/" className="hover:text-[var(--accent)] transition-colors font-medium">
              {t("productDetail.breadcrumbShop")}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-[var(--foreground)] font-semibold truncate max-w-[200px]">
              {featured.name}
            </span>
          </nav>
        </div>
      </Reveal>

      {/* ── back link ── */}
      <Reveal>
        <div className="mx-auto max-w-6xl px-4 pt-3 pb-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t("productDetail.backToShop")}
          </Link>
        </div>
      </Reveal>

      {/* ── hero: image + info ── */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 pt-6">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-start">

            {/* image */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="relative rounded-3xl overflow-hidden shadow-[0_4px_32px_-8px_rgba(0,0,0,0.14)] border border-[var(--border)] bg-[var(--card)] aspect-square"
            >
              <img
                src={featured.image}
                alt={featured.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "https://api.dicebear.com/7.x/shapes/svg?seed=rainbow%20beaded";
                }}
              />
              {featured.isNew && (
                <span className="absolute top-4 left-4 bg-[var(--accent)] text-[var(--foreground)] text-xs font-bold px-3 py-1 rounded-full shadow">
                  {t("productDetail.badgeNew")}
                </span>
              )}
              <button
                onClick={() => setWishlisted((w) => !w)}
                aria-label={t("productDetail.wishlistAria")}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2.5 shadow hover:scale-110 transition-transform"
              >
                <Heart
                  className={cn("h-5 w-5 transition-colors", wishlisted ? "fill-rose-500 text-rose-500" : "text-rose-400")}
                  aria-hidden="true"
                />
              </button>
            </motion.div>

            {/* info */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-5"
            >
              {/* category pill */}
              <motion.div variants={fadeInUp}>
                <span className="inline-block bg-[var(--accent)]/15 text-[var(--accent)] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  {featured.category}
                </span>
              </motion.div>

              {/* name */}
              <motion.h1
                variants={fadeInUp}
                className="text-3xl sm:text-4xl font-extrabold text-[var(--foreground)] leading-tight tracking-tight text-balance"
              >
                {featured.name}
              </motion.h1>

              {/* stars + review count */}
              <motion.div variants={fadeInUp} className="flex items-center gap-2">
                <Stars count={5} />
                <span className="text-sm text-[var(--muted-foreground)] font-medium">
                  {t("productDetail.reviewCount", { count: REVIEWS.length })}
                </span>
              </motion.div>

              {/* price */}
              <motion.div variants={fadeInUp} className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-[var(--accent)]">
                  £{featured.price.toFixed(2)}
                </span>
                <span className="text-sm text-[var(--muted-foreground)]">{t("productDetail.eachLabel")}</span>
              </motion.div>

              {/* short desc */}
              <motion.p variants={fadeInUp} className="text-[var(--muted-foreground)] leading-relaxed text-base">
                {featured.shortDesc}
              </motion.p>

              {/* qty + add to cart */}
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 pt-2">
                {/* qty stepper */}
                <div className="flex items-center gap-0 rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-sm">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label={t("productDetail.qtyDecrease")}
                    className="px-4 py-3 text-lg font-bold text-[var(--foreground)] hover:bg-[var(--accent)]/10 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 py-3 text-base font-bold text-[var(--foreground)] min-w-[2.5rem] text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    aria-label={t("productDetail.qtyIncrease")}
                    className="px-4 py-3 text-lg font-bold text-[var(--foreground)] hover:bg-[var(--accent)]/10 transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* add to cart */}
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdd}
                  className={cn(
                    "flex-1 min-w-[160px] flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 font-bold text-base shadow-md transition-all duration-300",
                    added
                      ? "bg-green-400 text-white"
                      : "bg-[var(--accent)] text-[var(--foreground)] hover:brightness-105"
                  )}
                >
                  <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                  {added ? t("productDetail.addedLabel") : t("productDetail.addToCart")}
                </motion.button>
              </motion.div>

              {/* trust badges */}
              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-3 gap-3 pt-2"
              >
                {(
                  [
                    { icon: Sparkles, label: t("productDetail.badge1") },
                    { icon: Shield,   label: t("productDetail.badge2") },
                    { icon: Package,  label: t("productDetail.badge3") },
                  ] as const
                ).map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1.5 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 text-center shadow-sm"
                  >
                    <Icon className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
                    <span className="text-xs font-semibold text-[var(--foreground)] leading-tight">
                      {label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── full description + materials + care ── */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 pt-16">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* description */}
            <div className="md:col-span-2 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-7 shadow-sm">
              <h2 className="text-xl font-extrabold text-[var(--foreground)] mb-3">
                {t("productDetail.aboutHeading")}
              </h2>
              <p className="text-[var(--muted-foreground)] leading-relaxed">{featured.description}</p>
            </div>

            {/* materials + care stacked */}
            <div className="flex flex-col gap-4">
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
                <h3 className="text-base font-extrabold text-[var(--foreground)] mb-2">
                  {t("productDetail.materialsHeading")}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{featured.materials}</p>
              </div>
              <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
                <h3 className="text-base font-extrabold text-[var(--foreground)] mb-2">
                  {t("productDetail.careHeading")}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{featured.care}</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── reviews ── */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 pt-16">
          <h2 className="text-2xl font-extrabold text-[var(--foreground)] mb-6">
            {t("productDetail.reviewsHeading")}
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {REVIEWS.map((review, i) => (
              <Reveal key={review.id} delay={i * 0.08}>
                <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm flex flex-col gap-3">
                  <Stars count={review.stars} />
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <span className="text-sm font-bold text-[var(--foreground)]">{review.name}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── you might also like ── */}
      {related.length > 0 && (
        <Reveal>
          <section className="mx-auto max-w-6xl px-4 pt-16">
            <h2 className="text-2xl font-extrabold text-[var(--foreground)] mb-6">
              {t("productDetail.relatedHeading")}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.08}>
                  <Link
                    href="/product-detail"
                    className="group block rounded-3xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "https://api.dicebear.com/7.x/shapes/svg?seed=rainbow%20beaded";
                        }}
                      />
                    </div>
                    <div className="p-5">
                      <p className="font-extrabold text-[var(--foreground)] text-base leading-snug">{p.name}</p>
                      <p className="text-sm text-[var(--muted-foreground)] mt-1 line-clamp-2">{p.shortDesc}</p>
                      <p className="mt-3 font-black text-[var(--accent)] text-lg">£{p.price.toFixed(2)}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {/* ── handmade promise banner ── */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-4 pt-16">
          <div className="rounded-3xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 p-8 text-center">
            <span className="text-4xl mb-3 block" aria-hidden="true">🌈</span>
            <h2 className="text-xl font-extrabold text-[var(--foreground)] mb-2">
              {t("productDetail.promiseHeading")}
            </h2>
            <p className="text-[var(--muted-foreground)] max-w-md mx-auto leading-relaxed text-sm">
              {t("productDetail.promiseBody")}
            </p>
          </div>
        </section>
      </Reveal>

    </main>
  );
}