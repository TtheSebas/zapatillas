import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MOCK_SNEAKERS } from "@/data/mockSneakers";
import { ProductDetailView } from "@/features/products/components/ProductDetailView";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ color?: string }>;
}

export async function generateStaticParams() {
  return MOCK_SNEAKERS.map((sneaker) => ({
    slug: sneaker.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = MOCK_SNEAKERS.find((s) => s.slug === slug);

  if (!product) {
    return {
      title: "Zapatilla no encontrada | SOLES",
    };
  }

  const mainImage = product.variants[0]?.images[0]?.url || "";

  return {
    title: `${product.name} | SOLES Sneaker Vault`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} - ${product.brand.name}`,
      description: product.description.slice(0, 160),
      images: [
        {
          url: mainImage,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { color } = await searchParams;

  const product = MOCK_SNEAKERS.find((s) => s.slug === slug);

  if (!product) {
    notFound();
  }

  // Productos relacionados: misma marca o misma categoría, excluyendo el actual
  const related = MOCK_SNEAKERS.filter(
    (s) =>
      s.id !== product.id &&
      (s.brand.slug === product.brand.slug ||
        s.category.slug === product.category.slug)
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <ProductDetailView
        product={product}
        relatedProducts={related}
        initialColorName={color}
      />
    </div>
  );
}
