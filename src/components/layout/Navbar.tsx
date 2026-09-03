"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { useFilterStore } from "@/store/useFilterStore";
import { ShoppingBag, Search, Menu, X, Flame } from "lucide-react";
import { useRouter } from "next/navigation";

export const Navbar: React.FC = () => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const totalItems = useCartStore((state) => state.getTotalItems());
  const openCart = useCartStore((state) => state.openCart);
  const setSearch = useFilterStore((state) => state.setSearch);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearch(searchQuery.trim());
      router.push("/productos");
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/95 transition-colors">
      {/* Top Banner: Anuncio de envíos */}
      <div className="bg-black py-1.5 px-4 text-center text-[11px] font-semibold tracking-wider text-white uppercase dark:bg-neutral-900 flex items-center justify-center gap-2">
        <Flame className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
        <span>Drops exclusivos de temporada · Envíos gratuitos en compras superiores a $150</span>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-neutral-700 hover:bg-neutral-100 lg:hidden dark:text-neutral-300 dark:hover:bg-neutral-800"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter uppercase italic text-black dark:text-white">
              SOLES<span className="text-rose-600">.</span>
            </span>
            <span className="hidden text-[10px] font-mono uppercase tracking-widest text-neutral-400 sm:inline-block border-l border-neutral-300 pl-2 dark:border-neutral-700">
              Sneaker Vault
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
            <Link href="/productos" className="transition-colors hover:text-black dark:hover:text-white">
              Catálogo
            </Link>
            <Link href="/productos?brand=Jordan" className="transition-colors hover:text-rose-600">
              Jordan
            </Link>
            <Link href="/productos?brand=Nike" className="transition-colors hover:text-black dark:hover:text-white">
              Nike
            </Link>
            <Link href="/productos?brand=Adidas" className="transition-colors hover:text-black dark:hover:text-white">
              Adidas
            </Link>
            <Link href="/productos?brand=New+Balance" className="transition-colors hover:text-black dark:hover:text-white">
              New Balance
            </Link>
          </nav>
        </div>

        {/* Search Bar & Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search Input */}
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <input
              type="text"
              placeholder="Buscar zapatillas, modelos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 xl:w-64 rounded-full border border-neutral-200 bg-neutral-100 py-1.5 pl-8 pr-4 text-xs text-neutral-900 transition-all placeholder:text-neutral-400 focus:w-72 focus:border-black focus:bg-white focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
            />
            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-neutral-400" />
          </form>

          {/* Cart Trigger */}
          <button
            type="button"
            onClick={openCart}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-800 transition-all hover:bg-neutral-100 active:scale-95 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
            aria-label="Abrir carrito"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow-sm animate-in zoom-in">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="border-b border-neutral-200 bg-white px-4 py-4 lg:hidden dark:border-neutral-800 dark:bg-neutral-950">
          <form onSubmit={handleSearch} className="relative mb-4">
            <input
              type="text"
              placeholder="Buscar modelo o marca..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-neutral-100 py-2 pl-9 pr-4 text-xs text-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
          </form>

          <nav className="flex flex-col gap-3 text-sm font-bold uppercase tracking-wider">
            <Link
              href="/productos"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-neutral-800 hover:text-black dark:text-neutral-200"
            >
              Explorar Catálogo Completo
            </Link>
            <Link
              href="/productos"
              onClick={() => {
                useFilterStore.getState().toggleBrand("Jordan");
                setMobileMenuOpen(false);
              }}
              className="py-1 text-neutral-600 hover:text-black dark:text-neutral-400"
            >
              Jordan Retro
            </Link>
            <Link
              href="/productos"
              onClick={() => {
                useFilterStore.getState().toggleBrand("Nike");
                setMobileMenuOpen(false);
              }}
              className="py-1 text-neutral-600 hover:text-black dark:text-neutral-400"
            >
              Nike Dunks & Air Max
            </Link>
            <Link
              href="/productos"
              onClick={() => {
                useFilterStore.getState().toggleBrand("Adidas");
                setMobileMenuOpen(false);
              }}
              className="py-1 text-neutral-600 hover:text-black dark:text-neutral-400"
            >
              Adidas Originals & Boost
            </Link>
            <Link
              href="/productos"
              onClick={() => {
                useFilterStore.getState().toggleBrand("New Balance");
                setMobileMenuOpen(false);
              }}
              className="py-1 text-neutral-600 hover:text-black dark:text-neutral-400"
            >
              New Balance 550 & 2002R
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
