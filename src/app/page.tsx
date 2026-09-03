import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MOCK_SNEAKERS } from "@/data/mockSneakers";
import { ProductCard } from "@/components/products/ProductCard";
import { ArrowRight, Flame, Sparkles, TrendingUp } from "lucide-react";

export default function HomePage() {
  const newReleases = MOCK_SNEAKERS.filter((s) => s.isNewRelease).slice(0, 4);
  const bestSellers = MOCK_SNEAKERS.filter((s) => s.isFeatured).slice(0, 4);
  const heroDrop = MOCK_SNEAKERS[0]; // Air Jordan 1

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neutral-900 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-rose-600 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-600 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[520px]">
            <div className="space-y-6 max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rose-400 backdrop-blur-md">
                <Flame className="h-3.5 w-3.5 animate-bounce text-rose-500" />
                <span>Drop Exclusivo de Temporada</span>
              </div>

              <h1 className="text-4xl font-black uppercase italic tracking-tight sm:text-6xl lg:text-7xl leading-none">
                REDEFINE TU <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-amber-400 to-rose-600">
                  PASO Y ESTILO.
                </span>
              </h1>

              <p className="text-sm text-neutral-300 sm:text-base leading-relaxed">
                Descubre las siluetas más codiciadas del mundo del calzado deportivo. Ediciones limitadas de Jordan, Nike Dunks y New Balance con autenticidad y envío prioritario.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/productos"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs font-black uppercase tracking-wider text-black transition-transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  <span>Explorar Colección</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/productos/${heroDrop.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800/80 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white backdrop-blur-md transition-colors hover:bg-neutral-800"
                >
                  Ver Air Jordan 1 OG
                </Link>
              </div>
            </div>

            {/* Hero Sneaker Preview Card */}
            <div className="flex justify-center lg:justify-end w-full">
              <Link
                href={`/productos/${heroDrop.slug}`}
                className="group relative w-full max-w-md aspect-square rounded-3xl bg-neutral-800/70 p-6 backdrop-blur-xl border border-neutral-700/60 shadow-2xl flex flex-col justify-between transition-transform duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between z-10">
                  <div className="flex gap-2">
                    <span className="rounded-full bg-rose-600 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow">
                      Destacado
                    </span>
                    <span className="rounded-full bg-neutral-900/80 px-3 py-1 text-[10px] font-bold text-neutral-300 backdrop-blur-md">
                      US 8 - 11
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-neutral-400">
                    EDICIÓN LIMITADA
                  </span>
                </div>

                <div className="relative w-full flex-1 my-2 min-h-[220px]">
                  <Image
                    src={heroDrop.variants[0].images[0].url}
                    alt={heroDrop.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    priority
                    className="object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                  />
                </div>

                <div className="rounded-2xl bg-neutral-900/90 p-4 backdrop-blur-md border border-neutral-700/50 flex items-center justify-between z-10">
                  <div>
                    <h3 className="text-sm font-bold text-white line-clamp-1">{heroDrop.name}</h3>
                    <p className="text-xs text-neutral-400">{heroDrop.variants[0].colorName}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-black text-rose-500">
                      ${heroDrop.basePrice}
                    </span>
                    <span className="block text-[10px] text-neutral-400">Envío Gratis</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías & Marcas Populares */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-black uppercase tracking-wider text-neutral-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-rose-600" />
            Marcas & Siluetas Top
          </h2>
          <Link href="/productos" className="text-xs font-bold text-neutral-500 hover:text-black dark:hover:text-white">
            Ver todas →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { name: "Jordan Retro", slug: "Jordan", subtitle: "Iconos del baloncesto", bg: "from-red-900/30 to-black" },
            { name: "Nike Dunks", slug: "Nike", subtitle: "Cultura callejera", bg: "from-blue-900/30 to-black" },
            { name: "New Balance", slug: "New+Balance", subtitle: "Retro 550 & 2002R", bg: "from-emerald-900/30 to-black" },
            { name: "Adidas Originals", slug: "Adidas", subtitle: "Forum & Ultraboost", bg: "from-purple-900/30 to-black" },
          ].map((cat) => (
            <Link
              key={cat.name}
              href={`/productos?brand=${cat.slug}`}
              className={`group relative overflow-hidden rounded-2xl border border-neutral-200 bg-gradient-to-br ${cat.bg} p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:border-neutral-800`}
            >
              <h3 className="text-base font-black uppercase tracking-tight text-neutral-900 dark:text-white group-hover:text-rose-500 transition-colors">
                {cat.name}
              </h3>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                {cat.subtitle}
              </p>
              <div className="mt-4 flex items-center text-[11px] font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                <span>Ver modelos</span>
                <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Sección Novedades */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">
              Recién llegados
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
              Novedades de la Semana
            </h2>
          </div>
          <Link
            href="/productos"
            className="text-xs font-bold uppercase tracking-wider text-neutral-800 hover:text-black dark:text-neutral-200"
          >
            Ver catálogo completo →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {newReleases.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Banner Promocional Intermedio */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-black px-6 py-12 sm:px-12 lg:px-16 text-white text-center">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-amber-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Garantía de Autenticidad Certificada</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
              CADA PAR INSPECCIONADO <br />
              POR EXPERTOS SNEAKERHEADS
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Todos nuestros modelos pasan por un exhaustivo protocolo de verificación física antes de ser despachados hasta la puerta de tu hogar.
            </p>
            <div className="pt-2">
              <Link
                href="/productos"
                className="inline-flex rounded-xl bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-black transition-transform hover:scale-105 active:scale-95"
              >
                Comprar con Seguridad
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Más Vendidos / Destacados */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">
              Los favoritos
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">
              Más Vendidos & Siluetas Clásicas
            </h2>
          </div>
          <Link
            href="/productos"
            className="text-xs font-bold uppercase tracking-wider text-neutral-800 hover:text-black dark:text-neutral-200"
          >
            Explorar todos →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
