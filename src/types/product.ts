export type Gender = "MEN" | "WOMEN" | "UNISEX" | "KIDS";

export interface ProductImage {
  id: string;
  url: string;
  altText: string;
  isMain: boolean;
  order: number;
}

export interface VariantSize {
  id: string;
  size: string;
  stock: number;
}

export interface ProductVariant {
  id: string;
  productId: string;
  colorName: string;
  colorHex: string;
  sku: string;
  price: number;
  compareAtPrice?: number | null;
  isDefault: boolean;
  images: ProductImage[];
  sizes: VariantSize[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  details: string[];
  gender: Gender;
  basePrice: number;
  isFeatured: boolean;
  isNewRelease: boolean;
  brand: {
    id: string;
    name: string;
    slug: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
  variants: ProductVariant[];
  totalStock?: number;
}

export interface CatalogFilterState {
  search: string;
  brands: string[];
  genders: Gender[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  inStockOnly: boolean;
  sortBy: "featured" | "newest" | "price-asc" | "price-desc";
}
