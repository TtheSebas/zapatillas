"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getSubtotal,
    getTotalItems,
  } = useCartStore();

  const subtotal = getSubtotal();
  const totalCount = getTotalItems();
  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(
    (subtotal / freeShippingThreshold) * 100,
    100
  );

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl dark:bg-neutral-950 flex flex-col">
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-neutral-800 dark:text-neutral-200" />
              <h2 className="text-base font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                Tu Carrito ({totalCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="rounded-full p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-white"
              aria-label="Cerrar carrito"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Free shipping banner */}
          <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800">
            <div className="flex justify-between text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
              <span>
                {subtotal >= freeShippingThreshold
                  ? "🎉 ¡Tienes envío exprés gratuito!"
                  : `Faltan ${formatPrice(
                      freeShippingThreshold - subtotal
                    )} para envío gratis`}
              </span>
              <span>{Math.round(progressToFreeShipping)}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
              <div
                className="h-full bg-rose-600 transition-all duration-300 rounded-full"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-900 mb-4">
                  <ShoppingBag className="h-8 w-8 text-neutral-400" />
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  Tu carrito está vacío
                </h3>
                <p className="mt-1 text-xs text-neutral-500 max-w-xs">
                  Explora nuestros lanzamientos y encuentra el par ideal para tu colección.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-6 rounded-xl bg-black px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-neutral-800 dark:bg-white dark:text-black"
                >
                  Ver Zapatillas
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-xl border border-neutral-100 p-3 bg-neutral-50/50 dark:border-neutral-800/80 dark:bg-neutral-900/40"
                >
                  {/* Thumbnail */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
                    <Image
                      src={item.imageUrl}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info & Quantity */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-bold uppercase text-neutral-500">
                            {item.brandName}
                          </span>
                          <h4 className="text-xs font-bold text-neutral-900 dark:text-white line-clamp-1">
                            {item.productName}
                          </h4>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-400 hover:text-rose-600 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="mt-1 flex items-center gap-2 text-[11px] text-neutral-500">
                        <span className="font-mono font-semibold bg-neutral-200 px-1.5 py-0.5 rounded text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                          {item.size}
                        </span>
                        <span>·</span>
                        <div className="flex items-center gap-1">
                          <span
                            className="h-2.5 w-2.5 rounded-full border border-neutral-300"
                            style={{ backgroundColor: item.colorHex }}
                          />
                          <span className="line-clamp-1">{item.colorName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      {/* Quantity Selector */}
                      <div className="flex items-center rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-black dark:hover:text-white"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="p-1 hover:text-black disabled:opacity-30 dark:hover:text-white"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-neutral-900 dark:text-white">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {items.length > 0 && (
            <div className="border-t border-neutral-200 p-6 space-y-4 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
              <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Envío estimado</span>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {subtotal >= freeShippingThreshold ? "GRATIS" : formatPrice(15)}
                  </span>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-3 flex justify-between text-base font-bold text-neutral-900 dark:border-neutral-800 dark:text-white">
                <span>Total</span>
                <span>
                  {formatPrice(
                    subtotal + (subtotal >= freeShippingThreshold ? 0 : 15)
                  )}
                </span>
              </div>

              <Link
                href="/productos"
                onClick={closeCart}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-all hover:bg-neutral-800 active:scale-95 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              >
                <span>Proceder al Pago</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
