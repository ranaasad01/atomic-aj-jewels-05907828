"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Sparkles, X } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const TAX_RATE = 0.1;

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.9 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-2xl bg-[var(--accent)] px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.18)] border border-white/30"
    >
      <Sparkles className="h-5 w-5 text-white" aria-hidden="true" />
      <span className="text-sm font-semibold text-white">{message}</span>
      <button onClick={onClose} aria-label="Close notification" className="ml-1 text-white/70 hover:text-white transition-colors">
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

function EmptyCart() {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="relative mx-auto w-36 h-36 rounded-full bg-[var(--accent)]/10 flex items-center justify-center shadow-[0_4px_32px_rgba(0,0,0,0.06)]">
          <svg
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20"
            aria-hidden="true"
          >
            <circle cx="40" cy="40" r="40" fill="var(--accent)" fillOpacity="0.12" />
            <path
              d="M20 26h4l6 22h20l6-18H30"
              stroke="var(--accent)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="34" cy="54" r="3" fill="var(--accent)" />
            <circle cx="50" cy="54" r="3" fill="var(--accent)" />
            <path d="M36 36l4 4 8-8" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
          </svg>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute -top-2 -right-2 text-2xl"
            aria-hidden="true"
          >
            🛍️
          </motion.div>
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.45, ease: "easeOut" }}
        className="text-2xl font-bold text-[hsl(var(--foreground))] mb-3"
      >
        {t("cart.empty.title")}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.45, ease: "easeOut" }}
        className="text-[hsl(var(--muted-foreground))] text-base mb-8 max-w-xs leading-relaxed"
      >
        {t("cart.empty.message")}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.45, ease: "easeOut" }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3 text-sm font-bold text-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:opacity-90 hover:scale-105 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
        >
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          {t("cart.empty.cta")}
        </Link>
      </motion.div>
    </div>
  );
}

function CartItemRow({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  item: CartItem;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const t = useTranslations();
  const lineTotal = item.price * item.quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex gap-4 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_4px_16px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_8px_24px_-8px_rgba(0,0,0,0.12)] transition-shadow duration-200"
    >
      {/* Thumbnail */}
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-[hsl(var(--border))]">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "https://api.dicebear.com/7.x/shapes/svg?seed=rainbow%20beaded";
          }}
        />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-[hsl(var(--foreground))] leading-snug truncate pr-2">
            {item.name}
          </h3>
          <button
            onClick={() => onRemove(item.id)}
            aria-label={t("cart.item.removeLabel")}
            className="flex-shrink-0 rounded-full p-1.5 text-[hsl(var(--muted-foreground))] hover:text-red-500 hover:bg-red-50 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
          {/* Qty controls */}
          <div className="flex items-center gap-1 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-1 py-0.5">
            <button
              onClick={() => onDecrease(item.id)}
              aria-label={t("cart.item.decreaseLabel")}
              className="flex h-7 w-7 items-center justify-center rounded-full text-[hsl(var(--muted-foreground))] hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              <Minus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <span className="w-6 text-center text-sm font-bold text-[hsl(var(--foreground))]">
              {item.quantity}
            </span>
            <button
              onClick={() => onIncrease(item.id)}
              aria-label={t("cart.item.increaseLabel")}
              className="flex h-7 w-7 items-center justify-center rounded-full text-[hsl(var(--muted-foreground))] hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-xs text-[hsl(var(--muted-foreground))]">
              £{item.price.toFixed(2)} {t("cart.item.each")}
            </p>
            <p className="text-sm font-bold text-[var(--accent)]">
              £{lineTotal.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const DEMO_CART: CartItem[] = [
  {
    id: "rainbow-beaded",
    name: "Rainbow Beaded Bracelet",
    price: 4.5,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=rainbow%20beaded",
    quantity: 2,
  },
  {
    id: "golden-star-charm",
    name: "Golden Star Charm Bracelet",
    price: 5.0,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=gold%20bracelet",
    quantity: 1,
  },
  {
    id: "strawberry-charm",
    name: "Strawberry Charm Bracelet",
    price: 5.5,
    image: "https://api.dicebear.com/7.x/shapes/svg?seed=charm%20bracelet",
    quantity: 1,
  },
];

export default function CartPage() {
  const t = useTranslations();
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("aj-cart");
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setItems(parsed);
          return;
        }
      }
    } catch {
      // ignore parse errors
    }
    setItems(DEMO_CART);
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem("aj-cart", JSON.stringify(items));
      } catch {
        // ignore storage errors
      }
    }
  }, [items, mounted]);

  const handleIncrease = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const handleDecrease = useCallback((id: string) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const handleRemove = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleCheckout = useCallback(() => {
    setToastMessage(t("cart.toast.message"));
    setShowToast(true);
  }, [t]);

  const closeToast = useCallback(() => setShowToast(false), []);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[hsl(var(--background))]">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <div className="h-10 w-48 rounded-xl bg-[hsl(var(--muted-foreground))] animate-pulse mb-8" />
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 rounded-2xl bg-[hsl(var(--muted-foreground))] animate-pulse" />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[hsl(var(--background))]">
      {/* Page header */}
      <Reveal>
        <section className="border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]">
          <div className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/15">
                <ShoppingBag className="h-5 w-5 text-[var(--accent)]" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                  {t("cart.heading")}
                </h1>
                {itemCount > 0 && (
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    {itemCount === 1
                      ? t("cart.itemCountSingular")
                      : t("cart.itemCountPlural", { count: itemCount })}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
            {/* Cart items list */}
            <Reveal>
              <section aria-label={t("cart.itemsLabel")}>
                <AnimatePresence mode="popLayout">
                  <div className="flex flex-col gap-4">
                    {items.map((item) => (
                      <CartItemRow
                        key={item.id}
                        item={item}
                        onIncrease={handleIncrease}
                        onDecrease={handleDecrease}
                        onRemove={handleRemove}
                      />
                    ))}
                  </div>
                </AnimatePresence>

                <div className="mt-6">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[var(--accent)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" aria-hidden="true" />
                    {t("cart.continueShopping")}
                  </Link>
                </div>
              </section>
            </Reveal>

            {/* Summary panel */}
            <Reveal delay={0.1}>
              <aside
                aria-label={t("cart.summaryLabel")}
                className="lg:sticky lg:top-24 h-fit rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_32px_-8px_rgba(0,0,0,0.1)]"
              >
                <h2 className="text-lg font-bold text-[hsl(var(--foreground))] mb-5">
                  {t("cart.summary.heading")}
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-[hsl(var(--muted-foreground))]">
                    <span>{t("cart.summary.subtotal")}</span>
                    <span className="font-medium text-[hsl(var(--foreground))]">
                      £{subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[hsl(var(--muted-foreground))]">
                    <span>{t("cart.summary.tax")}</span>
                    <span className="font-medium text-[hsl(var(--foreground))]">
                      £{tax.toFixed(2)}
                    </span>
                  </div>
                  <div className="my-3 border-t border-[hsl(var(--border))]" />
                  <div className="flex justify-between">
                    <span className="font-bold text-[hsl(var(--foreground))] text-base">
                      {t("cart.summary.total")}
                    </span>
                    <span className="font-bold text-[var(--accent)] text-base">
                      £{total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCheckout}
                  className="mt-6 w-full rounded-full bg-[var(--accent)] py-3.5 text-sm font-bold text-white shadow-[0_4px_16px_rgba(0,0,0,0.14)] hover:opacity-90 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  {t("cart.summary.checkoutCta")}
                </motion.button>

                <p className="mt-3 text-center text-xs text-[hsl(var(--muted-foreground))] leading-relaxed">
                  {t("cart.summary.note")}
                </p>

                {/* Fun badge */}
                <div className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)]/8 border border-[var(--accent)]/20 px-4 py-2.5">
                  <span className="text-lg" aria-hidden="true">✨</span>
                  <p className="text-xs font-medium text-[var(--accent)]">
                    {t("cart.summary.handmadeBadge")}
                  </p>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      )}

      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <Toast message={toastMessage} onClose={closeToast} />
        )}
      </AnimatePresence>
    </main>
  );
}