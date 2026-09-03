import { create } from "zustand";
import { CatalogFilterState, Gender } from "@/types/product";

interface FilterStore extends CatalogFilterState {
  setSearch: (search: string) => void;
  toggleBrand: (brand: string) => void;
  toggleGender: (gender: Gender) => void;
  toggleSize: (size: string) => void;
  toggleColor: (colorHex: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setInStockOnly: (inStock: boolean) => void;
  setSortBy: (sort: CatalogFilterState["sortBy"]) => void;
  resetFilters: () => void;
  getActiveFiltersCount: () => number;
}

const DEFAULT_FILTERS: CatalogFilterState = {
  search: "",
  brands: [],
  genders: [],
  sizes: [],
  colors: [],
  priceRange: [0, 300],
  inStockOnly: false,
  sortBy: "featured",
};

export const useFilterStore = create<FilterStore>((set, get) => ({
  ...DEFAULT_FILTERS,

  setSearch: (search) => set({ search }),

  toggleBrand: (brand) =>
    set((state) => ({
      brands: state.brands.includes(brand)
        ? state.brands.filter((b) => b !== brand)
        : [...state.brands, brand],
    })),

  toggleGender: (gender) =>
    set((state) => ({
      genders: state.genders.includes(gender)
        ? state.genders.filter((g) => g !== gender)
        : [...state.genders, gender],
    })),

  toggleSize: (size) =>
    set((state) => ({
      sizes: state.sizes.includes(size)
        ? state.sizes.filter((s) => s !== size)
        : [...state.sizes, size],
    })),

  toggleColor: (colorHex) =>
    set((state) => ({
      colors: state.colors.includes(colorHex)
        ? state.colors.filter((c) => c !== colorHex)
        : [...state.colors, colorHex],
    })),

  setPriceRange: (priceRange) => set({ priceRange }),

  setInStockOnly: (inStockOnly) => set({ inStockOnly }),

  setSortBy: (sortBy) => set({ sortBy }),

  resetFilters: () => set({ ...DEFAULT_FILTERS }),

  getActiveFiltersCount: () => {
    const s = get();
    let count = 0;
    if (s.search.trim()) count++;
    count += s.brands.length;
    count += s.genders.length;
    count += s.sizes.length;
    count += s.colors.length;
    if (s.inStockOnly) count++;
    if (s.priceRange[0] > 0 || s.priceRange[1] < 300) count++;
    return count;
  },
}));
