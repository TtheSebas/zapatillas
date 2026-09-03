"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { Product, ProductVariant } from "@/types/product";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice, calculateDiscount } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  // Variante seleccionada por defecto
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(() => {
    const defaultIndex = product.variants.findIndex((v) => v.isDefault);
    return defaultIndex !== -1 ? defaultIndex : 0;
  });

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const currentVariant: ProductVariant | undefined = product.variants[selectedVariantIndex];

  // Stock total de la variante seleccionada
  const variantStock = useMemo(() => {
    return currentVariant?.sizes.reduce((acc, s) => acc + s.stock, 0) ?? 0;
  }, [currentVariant]);

  const isSoldOut = variantStock === 0;

  // Imágenes
  const mainImage =
    currentVariant?.images.find((img) => img.isMain)?.url ||
    currentVariant?.images[0]?.url ||
    "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80";

  const hoverImage = currentVariant?.images[1]?.url || mainImage;

  // Precios
  const currentPrice = Number(currentVariant?.price ?? product.basePrice);
  const comparePrice = currentVariant?.compareAtPrice
    ? Number(currentVariant.compareAtPrice)
    : null;
  const discountPercent = comparePrice
    ? calculateDiscount(comparePrice, currentPrice)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isSoldOut || isAdding || !currentVariant) return;

    // Seleccionar la primera talla disponible en inventario
    const availableSize = currentVariant.sizes.find((s) => s.stock > 0);
    if (!availableSize) return;

    setIsAdding(true);
    addItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      brandName: product.brand.name,
      variantId: currentVariant.id,
      colorName: currentVariant.colorName,
      colorHex: currentVariant.colorHex,
      imageUrl: mainImage,
      sizeId: availableSize.id,
      size: availableSize.size,
      price: currentPrice,
      quantity: 1,
      maxStock: availableSize.stock,
    });

    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setIsAdding(false);
    }, 1500);
  };

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white p-3.5 transition-all duration-300 hover:shadow-xl dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800">
      {/* Contenedor de Imagen y Badges */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
        <Link href={`/productos/${product.slug}?color=${encodeURIComponent(currentVariant?.colorName || "")}`}>
          {/* Imagen Principal */}
          <Image
            src={mainImage}
            alt={`${product.name} - ${currentVariant?.colorName}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            priority={product.isFeatured}
          />

          {/* Imagen Secundaria en Hover */}
          {hoverImage !== mainImage && (
            <Image
              src={hoverImage}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
        </Link>

        {/* Badges Flotantes */}
        <div className="absolute left-2.5 top-2.5 flex flex-col gap-1 z-10">
          {product.isNewRelease && (
            <span className="rounded-full bg-black/85 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white dark:bg-white dark:text-black">
              Novedad
            </span>
          )}
          {discountPercent > 0 && (
            <span className="rounded-full bg-rose-600 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-white">
              -{discountPercent}%
            </span>
          )}
          {isSoldOut && (
            <span className="rounded-full bg-neutral-800/90 px-2.5 py-0.5 text-[10px] font-medium text-neutral-300">
              Agotado
            </span>
          )}
        </div>

        {/* Botón de Wishlist */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          aria-label="Añadir a lista de deseos"
          className="absolute right-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 backdrop-blur-md transition-transform active:scale-90 hover:bg-white dark:bg-neutral-800/80 dark:hover:bg-neutral-800 shadow-sm"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isWishlisted
                ? "fill-rose-500 text-rose-500"
                : "text-neutral-600 dark:text-neutral-300"
            }`}
          />
        </button>

        {/* Botón Flotante de Compra Rápida */}
        {!isSoldOut && (
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isAdding}
            className="absolute bottom-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 group-hover:opacity-100 opacity-90 sm:opacity-0 dark:bg-white dark:text-black"
            title="Añadir al carrito rápido"
          >
            {justAdded ? (
              <Check className="h-5 w-5 text-emerald-400 stroke-[3]" />
            ) : (
              <ShoppingBag className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {/* Datos del Producto */}
      <div className="flex flex-1 flex-col pt-3">
        {/* Selector de Variantes (Color Dots) */}
        {product.variants.length > 1 && (
          <div className="mb-2 flex items-center gap-1.5">
            {product.variants.map((v, idx) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariantIndex(idx)}
                aria-label={`Color ${v.colorName}`}
                className={`h-3.5 w-3.5 rounded-full border transition-all ${
                  selectedVariantIndex === idx
                    ? "ring-2 ring-black dark:ring-white scale-110"
                    : "border-neutral-300 dark:border-neutral-700 opacity-60 hover:opacity-100"
                }`}
                style={{ backgroundColor: v.colorHex }}
              />
            ))}
            <span className="text-[10px] text-neutral-400 ml-1">
              {product.variants.length} colores
            </span>
          </div>
        )}

        {/* Marca y Género */}
        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          {product.brand.name} · {product.category.name}
        </span>

        {/* Título */}
        <Link
          href={`/productos/${product.slug}`}
          className="mt-1 line-clamp-1 text-sm font-semibold text-neutral-900 transition-colors hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300"
        >
          {product.name}
        </Link>

        {/* Tallas disponibles */}
        <div className="mt-2 flex flex-wrap gap-1">
          {currentVariant?.sizes.slice(0, 5).map((s) => (
            <span
              key={s.id}
              className={`rounded px-1.5 py-0.5 text-[10px] font-mono ${
                s.stock > 0
                  ? "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                  : "bg-neutral-50 text-neutral-400 line-through dark:bg-neutral-900 dark:text-neutral-600"
              }`}
            >
              {s.size.replace("US ", "")}
            </span>
          ))}
          {(currentVariant?.sizes.length ?? 0) > 5 && (
            <span className="text-[10px] text-neutral-400">...</span>
          )}
        </div>

        {/* Precio */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-base font-bold text-neutral-900 dark:text-white">
            {formatPrice(currentPrice)}
          </span>
          {comparePrice && comparePrice > currentPrice && (
            <span className="text-xs text-neutral-400 line-through">
              {formatPrice(comparePrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
