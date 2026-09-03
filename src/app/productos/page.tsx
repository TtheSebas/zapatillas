import React from "react";
import { Metadata } from "next";
import { MOCK_SNEAKERS } from "@/data/mockSneakers";
import { CatalogSection } from "@/features/catalog/components/CatalogSection";

export const metadata: Metadata = {
  title: "Catálogo de Zapatillas | SOLES Sneaker Vault",
  description:
    "Explora nuestro catálogo completo de zapatillas de colección: Jordan, Nike, Adidas, New Balance con filtros interactivos por talla, color y precio.",
};

export default function CatalogPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <CatalogSection initialProducts={MOCK_SNEAKERS} />
    </div>
  );
}
