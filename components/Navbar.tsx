"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingBag, Sparkles } from 'lucide-react';
import { navLinks, BRAND_NAME } from "@/lib/data";

export default function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const navT = t.raw("nav") as Record<string, string>;

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label={BRAND_NAME}
        >
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-[0_2px_8px_rgba(201,132,90,0.4)]"
          >
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </motion.div>
          <span
            className="font-bold text-[var(--foreground)] text-xl tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {BRAND_NAME}
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1 sm:gap-2" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            const isAnchor = link.href.startsWith("#");

            const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
              if (isAnchor && pathname === "/") {
                e.preventDefault();
                document
                  .querySelector(link.href)
                  ?.scrollIntoView({ behavior: "smooth" });
              }
            };

            const resolvedHref = isAnchor
              ? pathname === "/"
                ? link.href
                : "/" + link.href
              : link.href;

            const isCart = link.key === "cart";

            return (
              <motion.div
                key={link.key}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href={resolvedHref}
                  onClick={handleClick}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-600 transition-all duration-200 ${
                    isCart
                      ? "bg-[var(--primary)] text-white shadow-[0_2px_8px_rgba(201,132,90,0.35)] hover:bg-[var(--accent)]"
                      : isActive
                      ? "bg-[var(--border)] text-[var(--foreground)] font-semibold"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--border)]"
                  }`}
                >
                  {isCart && <ShoppingBag className="h-4 w-4" aria-hidden="true" />}
                  {navT[link.key] ?? link.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>
    </motion.header>
  );
}