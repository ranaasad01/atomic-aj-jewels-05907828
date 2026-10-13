"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, Sparkles, Mail, Camera as Instagram } from 'lucide-react';
import { navLinks, BRAND_NAME, BRAND_TAGLINE } from "@/lib/data";

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();
  const navT = t.raw("nav") as Record<string, string>;

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="border-t border-[var(--border)] bg-[var(--card)] mt-16"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
          {/* Brand column */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-white">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </div>
              <span
                className="text-lg font-bold text-[var(--foreground)]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {BRAND_NAME}
              </span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-[220px]">
              {BRAND_TAGLINE}
            </p>
            <div className="flex items-center gap-1 text-sm text-[var(--primary)]">
              <Heart className="h-4 w-4 fill-[var(--primary)]" aria-hidden="true" />
              <span>{t("footer.madeWith")}</span>
            </div>
          </div>

          {/* Links column */}
          <div className="flex flex-col gap-3">
            <h3
              className="text-sm font-semibold uppercase tracking-widest text-[var(--muted-foreground)]"
            >
              {t("footer.linksHeading")}
            </h3>
            <nav aria-label="Footer navigation" className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isAnchor = link.href.startsWith("#");
                const resolvedHref = isAnchor
                  ? pathname === "/"
                    ? link.href
                    : "/" + link.href
                  : link.href;

                const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (isAnchor && pathname === "/") {
                    e.preventDefault();
                    document
                      .querySelector(link.href)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }
                };

                return (
                  <Link
                    key={link.key}
                    href={resolvedHref}
                    onClick={handleClick}
                    className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors duration-200"
                  >
                    {navT[link.key] ?? link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Contact column */}
          <div className="flex flex-col gap-3">
            <h3
              className="text-sm font-semibold uppercase tracking-widest text-[var(--muted-foreground)]"
            >
              {t("footer.contactHeading")}
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                <Mail className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
                <span>{t("footer.contactEmail")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                <Instagram className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
                <span>{t("footer.contactInstagram")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--muted-foreground)]">
            {t("footer.copyright")}
          </p>
          <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
            {t("footer.handmadeNote")}
            <Heart className="h-3 w-3 fill-[var(--accent)] text-[var(--accent)]" aria-hidden="true" />
          </p>
        </div>
      </div>
    </motion.footer>
  );
}