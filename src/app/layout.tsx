import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://soles-sneakers.vercel.app"
  ),
  title: {
    default: "SOLES | Tienda Exclusiva de Zapatillas & Drops",
    template: "%s | SOLES Sneaker Vault",
  },
  description:
    "Plataforma exclusiva de zapatillas de colección: Air Jordan, Nike Dunks, New Balance y Adidas con autenticidad 100% garantizada y envíos prioritarios.",
  keywords: [
    "sneakers",
    "zapatillas",
    "jordan retro",
    "nike dunk",
    "new balance 550",
    "drops exclusivos",
    "streetwear",
    "tienda de zapatillas",
  ],
  authors: [{ name: "SOLES Sneaker Vault" }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "SOLES Sneaker Vault",
    title: "SOLES | Tienda Exclusiva de Zapatillas & Drops",
    description:
      "Descubre y compra las siluetas más codiciadas del calzado deportivo con autenticidad 100% verificada.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "SOLES Sneaker Vault - Drops Exclusivos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOLES | Tienda Exclusiva de Zapatillas & Drops",
    description:
      "Descubre y compra las siluetas más codiciadas del calzado deportivo con autenticidad garantizada.",
    images: [
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&h=630&q=80",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <Navbar />
        <CartDrawer />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
