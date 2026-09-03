"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, ProductVariant } from "@/types/product";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import {
  ShoppingBag,
  Heart,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  Ruler,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
  initialColorName?: string;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  relatedProducts,
  initialColorName,
}) => {
  const addItem = useCartStore((state) => state.addItem);

  // Seleccionar variante inicial según URL o default
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(() => {
    if (initialColorName) {
      const idx = product.variants.findIndex(
        (v) => v.colorName.toLowerCase() === initialColorName.toLowerCase()
      );
      if (idx !== -1) return idx;
    }
    const defIdx = product.variants.findIndex((v) => v.isDefault);
    return defIdx !== -1 ? defIdx : 0;
  });

  const currentVariant: ProductVariant = product.variants[selectedVariantIndex];

  // Imagen activa en galería
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Talla seleccionada
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(() => {
    const firstInStock = currentVariant.sizes.find((s) => s.stock > 0);
    return firstInStock ? firstInStock.id : null;
  });

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("details");

  const selectedSize = currentVariant.sizes.find((s) => s.id === selectedSizeId);
  const isOutOfStock = !selectedSize || selectedSize.stock === 0;

  // Precios
  const currentPrice = Number(currentVariant.price ?? product.basePrice);
  const comparePrice = currentVariant.compareAtPrice
    ? Number(currentVariant.compareAtPrice)
    : null;
  const discount = comparePrice ? calculateDiscount(comparePrice, currentPrice) : 0;

  const handleColorChange = (idx: number) => {
    setSelectedVariantIndex(idx);
    setActiveImageIndex(0);
    const newVariant = product.variants[idx];
    const available = newVariant.sizes.find((s) => s.stock > 0);
    setSelectedSizeId(available ? available.id : null);
  };

  const handleAddToCart = () => {
    if (!selectedSize || isOutOfStock || isAdding) return;

    setIsAdding(true);
    addItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      brandName: product.brand.name,
      variantId: currentVariant.id,
      colorName: currentVariant.colorName,
      colorHex: currentVariant.colorHex,
      imageUrl: currentVariant.images[0]?.url || "",
      sizeId: selectedSize.id,
      size: selectedSize.size,
      price: currentPrice,
      quantity: 1,
      maxStock: selectedSize.stock,
    });

    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setIsAdding(false);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center gap-2 text-xs font-medium text-neutral-500">
        <Link href="/" className="hover:text-black dark:hover:text-white">
          Inicio
        </Link>
        <span>/</span>
        <Link href="/productos" className="hover:text-black dark:hover:text-white">
          Catálogo
        </Link>
        <span>/</span>
        <span className="font-semibold text-neutral-900 dark:text-white">
          {product.name}
        </span>
      </nav>

      {/* Grid Principal del Producto */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Galería de Imágenes */}
        <div className="flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          {currentVariant.images.length > 1 && (
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[550px] pb-2 sm:pb-0">
              {currentVariant.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                    activeImageIndex === idx
                      ? "border-black dark:border-white shadow-md scale-105"
                      : "border-neutral-200 dark:border-neutral-800 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={img.altText}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Imagen Principal */}
          <div className="relative aspect-square w-full flex-1 overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800">
            <Image
              src={
                currentVariant.images[activeImageIndex]?.url ||
                currentVariant.images[0]?.url ||
                ""
              }
              alt={`${product.name} - ${currentVariant.colorName}`}
              fill
              priority
              className="object-cover object-center transition-all duration-300"
            />

            {/* Badge de Novedad / Descuento */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              {product.isNewRelease && (
                <span className="rounded-full bg-black px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white dark:bg-white dark:text-black">
                  Drop Exclusivo
                </span>
              )}
              {discount > 0 && (
                <span className="rounded-full bg-rose-600 px-3 py-1 text-[11px] font-black tracking-wider text-white">
                  -{discount}% OFF
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-md transition-transform active:scale-90 hover:bg-white dark:bg-neutral-800/80 shadow-md"
              aria-label="Añadir a wishlist"
            >
              <Heart
                className={`h-5 w-5 ${
                  isWishlisted
                    ? "fill-rose-500 text-rose-500"
                    : "text-neutral-700 dark:text-neutral-300"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Panel de Compra y Especificaciones */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600">
              {product.brand.name} · {product.category.name}
            </span>
            <h1 className="mt-1 text-2xl sm:text-4xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
              {product.name}
            </h1>
            <p className="mt-2 text-xs font-mono text-neutral-500">
              SKU: {currentVariant.sku}
            </p>
          </div>

          {/* Precios */}
          <div className="flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
              {formatPrice(currentPrice)}
            </span>
            {comparePrice && comparePrice > currentPrice && (
              <span className="text-base text-neutral-400 line-through">
                {formatPrice(comparePrice)}
              </span>
            )}
          </div>

          {/* Selector de Variantes (Colores) */}
          <div className="space-y-2 border-t border-neutral-200 pt-5 dark:border-neutral-800">
            <div className="flex justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-neutral-500">
                Colorway
              </span>
              <span className="font-semibold text-neutral-900 dark:text-white">
                {currentVariant.colorName}
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5 pt-1">
              {product.variants.map((variant, idx) => (
                <button
                  key={variant.id}
                  onClick={() => handleColorChange(idx)}
                  className={`flex items-center gap-2 rounded-xl border p-2 text-xs font-semibold transition-all ${
                    selectedVariantIndex === idx
                      ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow"
                      : "border-neutral-200 bg-white hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
                  }`}
                >
                  <span
                    className="h-4 w-4 rounded-full border border-neutral-300"
                    style={{ backgroundColor: variant.colorHex }}
                  />
                  <span>{variant.colorName.split("/")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Selector de Tallas */}
          <div className="space-y-3 border-t border-neutral-200 pt-5 dark:border-neutral-800">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold uppercase tracking-wider text-neutral-500">
                Selecciona tu talla (US)
              </span>
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(true)}
                className="flex items-center gap-1 font-semibold text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white underline"
              >
                <Ruler className="h-3.5 w-3.5" />
                Guía de tallas
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {currentVariant.sizes.map((s) => {
                const isSelected = selectedSizeId === s.id;
                const inStock = s.stock > 0;

                return (
                  <button
                    key={s.id}
                    type="button"
                    disabled={!inStock}
                    onClick={() => setSelectedSizeId(s.id)}
                    className={`relative flex flex-col items-center justify-center rounded-xl border py-3 text-xs font-mono font-bold transition-all ${
                      isSelected
                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-md scale-105"
                        : inStock
                        ? "border-neutral-200 bg-white hover:border-black dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-white"
                        : "border-neutral-100 bg-neutral-100/60 text-neutral-300 line-through cursor-not-allowed dark:border-neutral-800/40 dark:bg-neutral-900/40 dark:text-neutral-600"
                    }`}
                  >
                    <span>{s.size}</span>
                    {inStock && s.stock <= 3 && (
                      <span className="text-[9px] font-sans text-rose-500 font-bold">
                        ¡Solo {s.stock}!
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mensaje de disponibilidad */}
            {selectedSize && (
              <div className="text-xs text-neutral-500">
                {selectedSize.stock > 0 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Disponible para despacho inmediato ({selectedSize.stock} unidades en almacén)
                  </span>
                ) : (
                  <span className="text-rose-500 font-medium">
                    Talla agotada temporalmente
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Botón de Añadir al Carrito */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock || isAdding}
              className={`flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-xs font-black uppercase tracking-wider text-white shadow-xl transition-all duration-300 active:scale-95 ${
                isOutOfStock
                  ? "bg-neutral-300 cursor-not-allowed dark:bg-neutral-800 dark:text-neutral-500"
                  : "bg-black hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="h-5 w-5 text-emerald-400 stroke-[3]" />
                  <span>¡Añadido al Carrito!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  <span>{isOutOfStock ? "Talla Agotada" : "Añadir a la Bolsa"}</span>
                </>
              )}
            </button>
          </div>

          {/* Garantías y Beneficios */}
          <div className="grid grid-cols-3 gap-3 rounded-2xl border border-neutral-200 bg-neutral-50/70 p-4 text-center dark:border-neutral-800 dark:bg-neutral-900/50">
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="h-5 w-5 text-rose-600" />
              <span className="text-[11px] font-bold">100% Original</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Truck className="h-5 w-5 text-rose-600" />
              <span className="text-[11px] font-bold">Envío Asegurado</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="h-5 w-5 text-rose-600" />
              <span className="text-[11px] font-bold">30 Días Garantía</span>
            </div>
          </div>

          {/* Acordeón de Descripción y Especificaciones Técnicas */}
          <div className="border-t border-neutral-200 pt-4 dark:border-neutral-800 space-y-3">
            {/* Descripción */}
            <div className="border-b border-neutral-200 pb-3 dark:border-neutral-800">
              <button
                onClick={() =>
                  setOpenAccordion(openAccordion === "desc" ? null : "desc")
                }
                className="flex w-full items-center justify-between text-left text-xs font-bold uppercase tracking-wider"
              >
                <span>Historia & Descripción</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openAccordion === "desc" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === "desc" && (
                <p className="mt-3 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {product.description}
                </p>
              )}
            </div>

            {/* Especificaciones */}
            <div className="border-b border-neutral-200 pb-3 dark:border-neutral-800">
              <button
                onClick={() =>
                  setOpenAccordion(openAccordion === "details" ? null : "details")
                }
                className="flex w-full items-center justify-between text-left text-xs font-bold uppercase tracking-wider"
              >
                <span>Especificaciones Técnicas</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openAccordion === "details" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openAccordion === "details" && (
                <ul className="mt-3 list-disc space-y-1.5 pl-4 text-xs text-neutral-600 dark:text-neutral-400">
                  {product.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                  <li>Género: {product.gender}</li>
                  <li>Silueta: Calzado de colección de alto rendimiento</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Guía de Tallas */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsSizeGuideOpen(false)}
          />
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <h3 className="text-base font-bold uppercase tracking-tight text-neutral-900 dark:text-white mb-4">
              Tabla de Equivalencias de Tallas
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800 font-bold uppercase text-neutral-500">
                    <th className="pb-2">US Hombre</th>
                    <th className="pb-2">US Mujer</th>
                    <th className="pb-2">EU</th>
                    <th className="pb-2">CM (Longitud)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 font-mono dark:divide-neutral-800">
                  {[
                    ["US 7", "US 8.5", "40", "25.0 cm"],
                    ["US 7.5", "US 9", "40.5", "25.5 cm"],
                    ["US 8", "US 9.5", "41", "26.0 cm"],
                    ["US 8.5", "US 10", "42", "26.5 cm"],
                    ["US 9", "US 10.5", "42.5", "27.0 cm"],
                    ["US 9.5", "US 11", "43", "27.5 cm"],
                    ["US 10", "US 11.5", "44", "28.0 cm"],
                    ["US 10.5", "US 12", "44.5", "28.5 cm"],
                    ["US 11", "US 12.5", "45", "29.0 cm"],
                  ].map(([usm, usw, eu, cm]) => (
                    <tr key={usm}>
                      <td className="py-2 font-bold">{usm}</td>
                      <td className="py-2 text-neutral-500">{usw}</td>
                      <td className="py-2">{eu}</td>
                      <td className="py-2 text-neutral-500">{cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="mt-6 w-full rounded-xl bg-black py-2.5 text-xs font-bold uppercase text-white dark:bg-white dark:text-black"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Bloque de Recomendaciones Relacionadas */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 border-t border-neutral-200 pt-12 dark:border-neutral-800">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-rose-600" />
            <h2 className="text-xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
              Podría Gustarte También
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
