"use client";

import React, { useState, useMemo } from "react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductFilters } from "./ProductFilters";
import { useFilterStore } from "@/store/useFilterStore";
import { SlidersHorizontal, ArrowUpDown, X } from "lucide-react";

interface CatalogSectionProps {
  initialProducts: Product[];
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  initialProducts,
}) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const {
    search,
    brands,
    genders,
    sizes,
    colors,
    priceRange,
    inStockOnly,
    sortBy,
    setSortBy,
    getActiveFiltersCount,
    resetFilters,
    toggleBrand,
    toggleSize,
    toggleGender,
  } = useFilterStore();

  // Calcular opciones disponibles para los filtros dinámicamente
  const filterOptions = useMemo(() => {
    const brandMap = new Map<string, number>();
    const sizeSet = new Set<string>();
    const colorMap = new Map<string, string>();

    initialProducts.forEach((p) => {
      brandMap.set(p.brand.name, (brandMap.get(p.brand.name) || 0) + 1);
      p.variants.forEach((v) => {
        colorMap.set(v.colorHex, v.colorName);
        v.sizes.forEach((s) => sizeSet.add(s.size));
      });
    });

    return {
      brands: Array.from(brandMap.entries()).map(([name, count]) => ({
        name,
        count,
      })),
      sizes: Array.from(sizeSet).sort((a, b) => {
        const numA = parseFloat(a.replace("US ", ""));
        const numB = parseFloat(b.replace("US ", ""));
        return numA - numB;
      }),
      colors: Array.from(colorMap.entries()).map(([hex, name]) => ({
        hex,
        name,
      })),
    };
  }, [initialProducts]);

  // Filtrado reactivo en cliente
  const filteredProducts = useMemo(() => {
    return initialProducts
      .filter((product) => {
        // Búsqueda por texto
        if (search.trim()) {
          const query = search.toLowerCase();
          const matchName = product.name.toLowerCase().includes(query);
          const matchBrand = product.brand.name.toLowerCase().includes(query);
          if (!matchName && !matchBrand) return false;
        }

        // Filtro de Marca
        if (brands.length > 0 && !brands.includes(product.brand.name)) {
          return false;
        }

        // Filtro de Género
        if (genders.length > 0 && !genders.includes(product.gender)) {
          return false;
        }

        // Filtro de Precio
        const effectivePrice = Number(
          product.variants[0]?.price ?? product.basePrice
        );
        if (effectivePrice < priceRange[0] || effectivePrice > priceRange[1]) {
          return false;
        }

        // Filtro de Tallas
        if (sizes.length > 0) {
          const hasSelectedSize = product.variants.some((v) =>
            v.sizes.some((s) => sizes.includes(s.size) && s.stock > 0)
          );
          if (!hasSelectedSize) return false;
        }

        // Filtro de Colores
        if (colors.length > 0) {
          const hasSelectedColor = product.variants.some((v) =>
            colors.includes(v.colorHex)
          );
          if (!hasSelectedColor) return false;
        }

        // Filtro de Stock
        if (inStockOnly) {
          const hasAnyStock = product.variants.some((v) =>
            v.sizes.some((s) => s.stock > 0)
          );
          if (!hasAnyStock) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = Number(a.variants[0]?.price ?? a.basePrice);
        const priceB = Number(b.variants[0]?.price ?? b.basePrice);

        if (sortBy === "price-asc") return priceA - priceB;
        if (sortBy === "price-desc") return priceB - priceA;
        if (sortBy === "newest")
          return (b.isNewRelease ? 1 : 0) - (a.isNewRelease ? 1 : 0);
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [
    initialProducts,
    search,
    brands,
    genders,
    sizes,
    colors,
    priceRange,
    inStockOnly,
    sortBy,
  ]);

  const activeCount = getActiveFiltersCount();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Barra Superior: Título, Contador y Orden */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
            Explorar Sneakers
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Mostrando {filteredProducts.length} de {initialProducts.length} modelos
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Botón Filtros Móvil */}
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="flex lg:hidden items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2.5 text-xs font-bold uppercase tracking-wider dark:border-neutral-800"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros ({activeCount})
          </button>

          {/* Selector de Ordenamiento */}
          <div className="relative flex items-center">
            <ArrowUpDown className="absolute left-3 h-4 w-4 text-neutral-400 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-xl border border-neutral-200 bg-white py-2.5 pl-9 pr-8 text-xs font-semibold uppercase tracking-wider text-neutral-800 focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 cursor-pointer"
            >
              <option value="featured">Destacados</option>
              <option value="newest">Lanzamientos Recientes</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-4">
          <span className="text-xs font-semibold text-neutral-400">Filtros activos:</span>
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => toggleBrand(b)}
              className="flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-800 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200"
            >
              <span>{b}</span>
              <X className="h-3 w-3" />
            </button>
          ))}
          {genders.map((g) => (
            <button
              key={g}
              onClick={() => toggleGender(g)}
              className="flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-800 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200"
            >
              <span>{g}</span>
              <X className="h-3 w-3" />
            </button>
          ))}
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => toggleSize(s)}
              className="flex items-center gap-1 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-800 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200"
            >
              <span>Talla {s}</span>
              <X className="h-3 w-3" />
            </button>
          ))}
          <button
            onClick={resetFilters}
            className="text-xs font-bold text-rose-600 hover:underline ml-2"
          >
            Limpiar todo
          </button>
        </div>
      )}

      {/* Disposición Principal: Sidebar + Cuadrícula */}
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Sidebar Desktop */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-24">
            <ProductFilters options={filterOptions} />
          </div>
        </div>

        {/* Cuadrícula de Productos */}
        <main className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-neutral-200 p-12 text-center dark:border-neutral-800">
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                No se encontraron zapatillas con estos filtros
              </h3>
              <p className="mt-1 text-xs text-neutral-500 max-w-sm">
                Intenta ajustar la talla, rango de precio o restablecer los filtros para ver más opciones.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 rounded-xl bg-black px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-neutral-800 dark:bg-white dark:text-black"
              >
                Restablecer todos los filtros
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Modal / Drawer de Filtros Móvil */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col bg-white p-6 shadow-2xl dark:bg-neutral-950 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <h2 className="text-base font-bold uppercase tracking-tight">Filtros</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-full p-2 text-neutral-400 hover:text-black dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4">
              <ProductFilters options={filterOptions} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
