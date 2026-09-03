"use client";

import React from "react";
import { useFilterStore } from "@/store/useFilterStore";
import { Gender } from "@/types/product";
import { RotateCcw } from "lucide-react";

interface FilterOptions {
  brands: { name: string; count: number }[];
  sizes: string[];
  colors: { name: string; hex: string }[];
}

const GENDERS: { label: string; value: Gender }[] = [
  { label: "Hombre", value: "MEN" },
  { label: "Mujer", value: "WOMEN" },
  { label: "Unisex", value: "UNISEX" },
  { label: "Niños", value: "KIDS" },
];

export const ProductFilters: React.FC<{ options: FilterOptions }> = ({
  options,
}) => {
  const {
    brands,
    genders,
    sizes,
    colors,
    priceRange,
    inStockOnly,
    toggleBrand,
    toggleGender,
    toggleSize,
    toggleColor,
    setPriceRange,
    setInStockOnly,
    resetFilters,
    getActiveFiltersCount,
  } = useFilterStore();

  const activeCount = getActiveFiltersCount();

  return (
    <aside className="w-full space-y-6 text-sm text-neutral-800 dark:text-neutral-200">
      {/* Header con botón de reinicio */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <h2 className="text-sm font-bold uppercase tracking-wider">Filtros</h2>
        {activeCount > 0 && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Limpiar ({activeCount})
          </button>
        )}
      </div>

      {/* Disponibilidad inmediata */}
      <div className="flex items-center justify-between py-1">
        <label htmlFor="inStock" className="text-xs font-semibold cursor-pointer">
          Solo con stock disponible
        </label>
        <input
          id="inStock"
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => setInStockOnly(e.target.checked)}
          className="h-4 w-4 rounded border-neutral-300 text-black focus:ring-black dark:border-neutral-700 dark:bg-neutral-800 cursor-pointer"
        />
      </div>

      {/* Filtro: Género */}
      <div className="space-y-2.5">
        <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-500">
          Género
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {GENDERS.map(({ label, value }) => {
            const isSelected = genders.includes(value);
            return (
              <button
                key={value}
                type="button"
                onClick={() => toggleGender(value)}
                className={`rounded-lg py-2 px-3 text-xs font-medium border transition-all ${
                  isSelected
                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                    : "border-neutral-200 bg-white hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtro: Tallas (Grid de Botones) */}
      <div className="space-y-2.5">
        <div className="flex justify-between items-baseline">
          <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-500">
            Talla (US)
          </h3>
          <span className="text-[11px] text-neutral-400">Guía US</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {options.sizes.map((s) => {
            const isSelected = sizes.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => toggleSize(s)}
                className={`h-9 rounded-md text-xs font-mono font-medium border transition-all ${
                  isSelected
                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black shadow-sm"
                    : "border-neutral-200 bg-white hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900"
                }`}
              >
                {s.replace("US ", "")}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtro: Marcas */}
      <div className="space-y-2.5">
        <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-500">
          Marcas
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {options.brands.map((b) => (
            <label
              key={b.name}
              className="flex items-center justify-between cursor-pointer group text-xs"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={brands.includes(b.name)}
                  onChange={() => toggleBrand(b.name)}
                  className="h-4 w-4 rounded border-neutral-300 text-black focus:ring-black dark:border-neutral-700 dark:bg-neutral-800 cursor-pointer"
                />
                <span className="group-hover:text-black dark:group-hover:text-white transition-colors">
                  {b.name}
                </span>
              </div>
              <span className="text-neutral-400">({b.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filtro: Rango de Precio */}
      <div className="space-y-2.5">
        <div className="flex justify-between items-center text-xs">
          <h3 className="font-bold uppercase tracking-wider text-neutral-500">
            Precio Máximo
          </h3>
          <span className="font-bold text-neutral-900 dark:text-white">
            ${priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min="50"
          max="300"
          step="10"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-black dark:accent-white cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-neutral-400">
          <span>$50</span>
          <span>$300+</span>
        </div>
      </div>

      {/* Filtro: Colores */}
      <div className="space-y-2.5">
        <h3 className="font-bold text-xs uppercase tracking-wider text-neutral-500">
          Colores
        </h3>
        <div className="flex flex-wrap gap-2">
          {options.colors.map((c) => {
            const isSelected = colors.includes(c.hex);
            return (
              <button
                key={c.hex}
                type="button"
                onClick={() => toggleColor(c.hex)}
                title={c.name}
                className={`h-6 w-6 rounded-full border transition-transform ${
                  isSelected
                    ? "ring-2 ring-black dark:ring-white scale-110"
                    : "border-neutral-300 dark:border-neutral-700 opacity-80 hover:scale-105"
                }`}
                style={{ backgroundColor: c.hex }}
              />
            );
          })}
        </div>
      </div>
    </aside>
  );
};
