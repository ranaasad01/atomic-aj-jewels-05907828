"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ShoppingBag, Star, ChevronLeft, ChevronRight, Heart, Package, Droplets, Sparkles, Check } from 'lucide-react';
import { products, type Product } from "@/lib/data";
import { fadeInUp, scaleIn, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

// ── Quantity stepper ──────────────────────────────────────────────────────────
function QuantityStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-0 rounded-2xl border-2 border-[var(--primary)] overflow-hidden w-fit">
      <button
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, value - 1))}
        className="px-4 py-2 text-xl font-bold text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors duration-200"
      >
        −
      </button>
      <span className="px-5 py-2 text-lg font-bold text-[var(--primary)] min-w-[3rem] text-center">
        {value}
      </span>
      <button
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(99, value + 1))}
        className="px-4 py-2 text-xl font-bold text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors duration-200"
      >
        +
      </button>
    </div>
  );
}

// ── Related product card ──────────────────────────────────────────────────────
function RelatedCard({ product }: { product: Product }) {
  const t = useTranslations();
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex-shrink-0 w-52 rounded-3xl bg-white border-2 border-[var(--primary)]/20 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)] overflow-hidden group"
    >
      <Link href={`/product?id=${product.id}`} className="block">
        <div className="relative h-44 bg-[var(--muted-foreground)] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/shapes/svg?seed=rainbow%20beaded";
            }}
          />
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-[var(--primary)] text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {t("product.newBadge")}
            </span>
          )}
        </div>
        <div className="p-3">
          <p className="font-bold text-[var(--primary)] text-sm leading-tight line-clamp-2">
            {product.name}
          </p>
          <p className="mt-1 text-[var(--primary)] font-extrabold text-base">
            £{product.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
function ProductPageInner() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? products[0]?.id ?? "";

  const product = useMemo(
    () => products.find((p) => p.id === id) ?? products[0],
    [id]
  );

  const related = useMemo(
    () =>
      products
        .filter((p) => p.id !== product?.id)
        .slice(0, 4),
    [product]
  );

  // Fake thumbnail images (main + 3 alternates using same image for demo)
  const thumbnails = useMemo(
    () => [
      product?.image ?? "https://api.dicebear.com/7.x/shapes/svg?seed=rainbow%20beaded",
      "https://api.dicebear.com/7.x/shapes/svg?seed=rainbow%20beaded",
      "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/3f95171a0dfb49b29b71b4fc4a08a522.jpg",
      "https://api.dicebear.com/7.x/shapes/svg?seed=charm%20bracelet",
    ],
    [product]
  );

  const [activeThumb, setActiveThumb] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  // Reset when product changes
  useEffect(() => {
    setActiveThumb(0);
    setQuantity(1);
    setAdded(false);
  }, [id]);

  function handleAddToCart() {
    if (!product) return;
    try {
      const raw = localStorage.getItem("aj-cart");
      const cart: Array<{ id: string; quantity: number }> = raw
        ? JSON.parse(raw)
        : [];
      const existing = cart.find((c) => c.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ id: product.id, quantity });
      }
      localStorage.setItem("aj-cart", JSON.stringify(cart));
    } catch {
      // localStorage unavailable — silently ignore
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--primary)] text-xl font-bold">
          {t("product.notFound")}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--primary)] pb-24">
      {/* ── Breadcrumb ── */}
      <Reveal>
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
            <Link
              href="/"
              className="hover:text-[var(--primary)] transition-colors font-medium flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              {t("product.backToShop")}
            </Link>
            <span>/</span>
            <span className="text-[var(--primary)] font-semibold truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>
      </Reveal>

      {/* ── Two-column detail ── */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-4 pt-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Left: image gallery */}
            <div className="flex flex-col gap-4">
              {/* Main image */}
              <motion.div
                key={activeThumb}
                variants={scaleIn}
                initial="hidden"
                animate="visible"
                className="relative rounded-3xl overflow-hidden bg-[var(--muted-foreground)] border-2 border-[var(--primary)]/15 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)] aspect-square"
              >
                <img
                  src={thumbnails[activeThumb]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/shapes/svg?seed=rainbow%20beaded";
                  }}
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-[var(--primary)] text-white text-sm font-extrabold px-3 py-1 rounded-full shadow-md">
                    ✨ {t("product.newBadge")}
                  </span>
                )}
                {/* Wishlist button */}
                <button
                  aria-label={t("product.wishlistLabel")}
                  onClick={() => setWishlisted((w) => !w)}
                  className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2.5 shadow-md hover:scale-110 transition-transform duration-200"
                >
                  <Heart
                    className={cn(
                      "h-5 w-5 transition-colors duration-200",
                      wishlisted
                        ? "fill-red-400 text-red-400"
                        : "text-[var(--muted-foreground)]"
                    )}
                    aria-hidden="true"
                  />
                </button>
              </motion.div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {thumbnails.map((src, i) => (
                  <button
                    key={i}
                    aria-label={`${t("product.thumbnailLabel")} ${i + 1}`}
                    onClick={() => setActiveThumb(i)}
                    className={cn(
                      "flex-1 aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-200",
                      activeThumb === i
                        ? "border-[var(--primary)] shadow-[0_0_0_3px_var(--primary)]"
                        : "border-transparent opacity-60 hover:opacity-90"
                    )}
                  >
                    <img
                      src={src}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://api.dicebear.com/7.x/shapes/svg?seed=rainbow%20beaded";
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: product info */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-5 pt-2"
            >
              {/* Category pill */}
              <motion.div variants={fadeInUp}>
                <span className="inline-block bg-[var(--primary)]/15 text-[var(--primary)] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </motion.div>

              {/* Name */}
              <motion.h1
                variants={fadeInUp}
                className="text-3xl sm:text-4xl font-extrabold text-[var(--primary)] leading-tight tracking-tight text-balance"
              >
                {product.name}
              </motion.h1>

              {/* Stars + in-stock */}
              <motion.div variants={fadeInUp} className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-0.5" aria-label="5 stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 fill-[var(--accent)] text-[var(--accent)]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="text-sm text-[var(--muted-foreground)] font-medium">
                  {t("product.reviews")}
                </span>
                <span className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                  <Check className="h-3 w-3" aria-hidden="true" />
                  {t("product.inStock")}
                </span>
              </motion.div>

              {/* Price */}
              <motion.div variants={fadeInUp}>
                <p className="text-4xl font-extrabold text-[var(--primary)]">
                  £{product.price.toFixed(2)}
                </p>
                <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
                  {t("product.handmadeNote")}
                </p>
              </motion.div>

              {/* Description */}
              <motion.p
                variants={fadeInUp}
                className="text-[var(--primary)]/80 leading-relaxed text-base"
              >
                {product.description}
              </motion.p>

              {/* Materials */}
              <motion.div
                variants={fadeInUp}
                className="rounded-2xl bg-[var(--muted-foreground)] border border-[var(--primary)]/15 p-4 flex flex-col gap-3"
              >
                <div className="flex items-start gap-3">
                  <Sparkles
                    className="h-5 w-5 text-[var(--primary)] mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-0.5">
                      {t("product.materialsLabel")}
                    </p>
                    <p className="text-sm text-[var(--primary)] leading-relaxed">
                      {product.materials}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Droplets
                    className="h-5 w-5 text-[var(--primary)] mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-0.5">
                      {t("product.careLabel")}
                    </p>
                    <p className="text-sm text-[var(--primary)] leading-relaxed">
                      {product.care}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Package
                    className="h-5 w-5 text-[var(--primary)] mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[var(--muted-foreground)] mb-0.5">
                      {t("product.shippingLabel")}
                    </p>
                    <p className="text-sm text-[var(--primary)] leading-relaxed">
                      {t("product.shippingValue")}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Quantity + Add to cart */}
              <motion.div variants={fadeInUp} className="flex flex-col gap-3">
                <p className="text-sm font-bold text-[var(--primary)]">
                  {t("product.quantityLabel")}
                </p>
                <QuantityStepper value={quantity} onChange={setQuantity} />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className={cn(
                    "flex items-center justify-center gap-2 w-full rounded-2xl py-4 text-lg font-extrabold transition-all duration-300 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)]",
                    added
                      ? "bg-green-500 text-white"
                      : "bg-[var(--primary)] text-white hover:bg-[var(--primary)]"
                  )}
                  aria-live="polite"
                >
                  {added ? (
                    <>
                      <Check className="h-5 w-5" aria-hidden="true" />
                      {t("product.addedToCart")}
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                      {t("product.addToCart")}
                    </>
                  )}
                </motion.button>
                <Link
                  href="/cart"
                  className="text-center text-sm text-[var(--primary)] font-semibold underline underline-offset-2 hover:text-[var(--primary)] transition-colors"
                >
                  {t("product.viewCart")}
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── You may also like ── */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-4 pb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl" aria-hidden="true">💖</span>
            <h2 className="text-2xl font-extrabold text-[var(--primary)]">
              {t("product.relatedTitle")}
            </h2>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.08} className="snap-start">
                <RelatedCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Fun promo band ── */}
      <Reveal>
        <section className="max-w-6xl mx-auto px-4">
          <div className="rounded-3xl bg-[var(--primary)] px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15)]">
            <div>
              <p className="text-white font-extrabold text-xl leading-tight">
                {t("product.promoBandTitle")}
              </p>
              <p className="text-white/80 text-sm mt-1">
                {t("product.promoBandSub")}
              </p>
            </div>
            <Link
              href="/"
              className="flex-shrink-0 bg-white text-[var(--primary)] font-extrabold px-6 py-3 rounded-2xl hover:bg-[var(--muted-foreground)] transition-colors duration-200 shadow-md text-sm"
            >
              {t("product.promoBandCta")}
            </Link>
          </div>
        </section>
      </Reveal>
    </main>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={null}>
      <ProductPageInner />
    </Suspense>
  );
}
