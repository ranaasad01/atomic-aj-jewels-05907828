import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocaleProvider from "@/components/LocaleProvider";
import LanguageToggle from "@/components/LanguageToggle";

export const metadata: Metadata = {
  formatDetection: { telephone: false, date: false, email: false, address: false },
  title: "AJ Jewels — Handmade Bracelets",
  description: "Handmade bracelets crafted with love. Beaded, friendship, sparkly and more — each one unique, made just for you.",
  openGraph: {
    title: "AJ Jewels — Handmade Bracelets",
    description: "Handmade bracelets crafted with love. Beaded, friendship, sparkly and more — each one unique, made just for you.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LocaleProvider>
          <LanguageToggle />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}