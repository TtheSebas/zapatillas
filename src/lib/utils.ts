import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency = "USD"): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(price);
}

export function calculateDiscount(compareAtPrice: number, currentPrice: number): number {
  if (!compareAtPrice || compareAtPrice <= currentPrice) return 0;
  return Math.round(((compareAtPrice - currentPrice) / compareAtPrice) * 100);
}
