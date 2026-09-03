import React from "react";
import Link from "next/link";
import { ShieldCheck, Truck, RotateCcw, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 text-neutral-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400">
      {/* Guarantees bar */}
      <div className="border-b border-neutral-200 py-8 dark:border-neutral-800">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-rose-600" />
            <div>
              <h4 className="text-xs font-bold uppercase text-neutral-900 dark:text-white">100% Autenticidad</h4>
              <p className="text-xs text-neutral-500">Verificado por expertos sneakerheads</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="h-8 w-8 text-rose-600" />
            <div>
              <h4 className="text-xs font-bold uppercase text-neutral-900 dark:text-white">Envío Exprés</h4>
              <p className="text-xs text-neutral-500">Entrega asegurada en 24/48 horas</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RotateCcw className="h-8 w-8 text-rose-600" />
            <div>
              <h4 className="text-xs font-bold uppercase text-neutral-900 dark:text-white">Devoluciones Fáciles</h4>
              <p className="text-xs text-neutral-500">30 días de garantía sin preguntas</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-rose-600" />
            <div>
              <h4 className="text-xs font-bold uppercase text-neutral-900 dark:text-white">Drops Exclusivos</h4>
              <p className="text-xs text-neutral-500">Acceso prioritario a lanzamientos limitados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <span className="text-2xl font-black uppercase italic tracking-tighter text-black dark:text-white">
              SOLES<span className="text-rose-600">.</span>
            </span>
            <p className="text-xs text-neutral-500 leading-relaxed">
              La plataforma definitiva para coleccionistas y entusiastas del calzado deportivo. Ediciones limitadas, colaboraciones icónicas y drops de alta gama.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">Marcas</h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li><Link href="/productos?brand=Jordan" className="hover:text-black dark:hover:text-white">Jordan Retro</Link></li>
              <li><Link href="/productos?brand=Nike" className="hover:text-black dark:hover:text-white">Nike Sportswear</Link></li>
              <li><Link href="/productos?brand=Adidas" className="hover:text-black dark:hover:text-white">Adidas Originals</Link></li>
              <li><Link href="/productos?brand=New+Balance" className="hover:text-black dark:hover:text-white">New Balance Made</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">Categorías</h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li><Link href="/productos" className="hover:text-black dark:hover:text-white">Basketball</Link></li>
              <li><Link href="/productos" className="hover:text-black dark:hover:text-white">Running & Performance</Link></li>
              <li><Link href="/productos" className="hover:text-black dark:hover:text-white">Streetwear & Casual</Link></li>
              <li><Link href="/productos" className="hover:text-black dark:hover:text-white">Lanzamientos Recientes</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">Newsletter VIP</h3>
            <p className="mt-3 text-xs text-neutral-500">
              Suscríbete y recibe avisos inmediatos de drops y un 10% de descuento en tu primer par.
            </p>
            <div className="mt-3 flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs text-black focus:border-black focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
              />
              <button
                type="button"
                className="rounded-lg bg-black px-4 py-2 text-xs font-bold uppercase text-white hover:bg-neutral-800 dark:bg-white dark:text-black"
              >
                Unirme
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-neutral-200 pt-6 text-center text-xs text-neutral-500 dark:border-neutral-800">
          © {new Date().getFullYear()} SOLES Sneaker Vault Inc. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
