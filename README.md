<div align="center">

# 👟 SOLES — Sneaker Vault E-Commerce

### *Plataforma de Comercio Electrónico de Alto Rendimiento para Zapatillas de Colección & Drops Exclusivos*

[![Next.js](https://img.shields.io/badge/Next.js-15.3%20(App%20Router)-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

<br />

[✨ Características](#-características-y-experiencia-de-usuario) • [🏗️ Arquitectura](#-arquitectura-de-software-y-patrones) • [🐳 Despliegue con Docker](#-despliegue-con-docker-en-1-comando) • [💻 Instalación Local](#-instalación-y-ejecución-local) • [🗄️ Modelo de Datos](#-modelo-de-datos-relacional) • [📜 Scripts](#-scripts-disponibles)

---

</div>

## 📖 Acerca del Proyecto

**SOLES** es una plataforma e-commerce moderna, altamente escalable y responsive, inspirada en las tiendas de referencia internacional del mundo del calzado deportivo (como *Kith, GOAT y Flight Club*). 

A diferencia de un comercio electrónico tradicional donde los productos son entidades simples, **el calzado de colección requiere una arquitectura especializada**:
1. **Desacoplamiento Producto ➔ Colorway ➔ Talla**: Una zapatilla (*Air Jordan 1*) se bifurca en múltiples combinaciones de color (*Chicago, University Blue*), cada una con su propia galería fotográfica en alta definición y códigos SKU únicos.
2. **Control Granular de Stock por Talla Física**: Cada colorway cuenta con su propia matriz de tallas (*US 7 a 13*), donde cada unidad de inventario se gestiona individualmente para evitar condiciones de carrera (*race conditions*) durante lanzamientos masivos (*Drops*).
3. **Experiencia de Usuario Inmediata (Optimistic UI)**: Conmutación de variantes de color en milisegundos sin recargas, filtros facetados multidimensionales y drawer de compras sincronizado en memoria con persistencia en cliente.

---

## ✨ Características y Experiencia de Usuario

### 1. 🔥 Landing Page Inmersiva (`/`)
- **Hero Drop de Temporada**: Banner de alto impacto visual con silueta destacada (*Air Jordan 1 Retro High OG*), información de precio, disponibilidad de tallas y efecto hover dinámico.
- **Top Marcas & Siluetas**: Accesos directos segmentados a las franquicias más codiciadas (*Jordan Retro, Nike Dunks, New Balance Made, Adidas Originals*).
- **Carruseles Curados**: Secciones automáticas de *Novedades de la Semana* y *Más Vendidos*.
- **Sellos de Confianza**: Garantías de autenticidad verificada por sneakerheads, envíos exprés asegurados y devoluciones sin costo.

### 2. 🎛️ Catálogo Interactivo con Filtros Reactivos (`/productos`)
- **Filtrado Facetado Simultáneo**:
  - **Marcas**: Selección múltiple con contador dinámico de existencias.
  - **Talla (US)**: Matriz de botones tipo *pill* con indicación de disponibilidad.
  - **Género**: Segmentación inmediata por Hombre, Mujer, Unisex y Niños.
  - **Rango de Precio**: Slider interactivo de $50 a $300+.
  - **Paleta de Colores (Swatches)**: Selector visual por código hexadecimal.
  - **Disponibilidad Inmediata**: Toggle de filtro *"Solo con stock disponible"*.
- **Barra de Filtros Activos**: Chips interactivos con eliminación individual y botón de reinicio global (*"Limpiar todo"*).
- **Ordenamiento Inteligente**: Por Destacados, Lanzamientos Recientes, Precio Ascendente y Descendente.
- **Diseño Adaptable**: Sidebar fija para escritorio y Drawer modal flotante optimizado para móviles.

### 3. 👟 Tarjeta de Producto (`ProductCard`)
- **Selector de Variantes en Vivo**: Conmuta la foto y el SKU de la zapatilla instantáneamente al hacer clic o hover sobre los puntos de color.
- **Imagen Dual**: Vista principal del calzado y cambio suave a la vista lateral/cenital en hover.
- **Badges Dinámicos**: Etiquetas de *Novedad*, *Descuento porcentual* y *Agotado*.
- **Compra Rápida**: Botón flotante con microinteracción visual (`Check` animado) que selecciona automáticamente la primera talla disponible.
- **Wishlist Integrada**: Botón de favoritos con animación de corazón.

### 4. 🛍️ Drawer de Carrito Persistente (`CartDrawer`)
- **Persistencia en LocalStorage**: El carrito se conserva entre recargas y sesiones gracias al middleware de Zustand.
- **Barra de Progreso de Envío Gratis**: Indicador interactivo con meta de $150 que incentiva el incremento del ticket promedio.
- **Controles de Cantidad con Límite de Stock**: Impide que el cliente añada más unidades de las disponibles en almacén.
- **Resumen Financiero en Vivo**: Cálculo transparente de subtotal, envío estimado y total final.

### 5. 🔍 Ficha de Detalle de Producto (`/productos/[slug]`)
- **Renderizado Híbrido (ISR/SSR)**: Páginas pre-renderizadas para máxima velocidad y SEO con etiquetas OpenGraph dinámicas.
- **Galería de Miniaturas**: Navegación fluida entre ángulos y perspectivas del sneaker.
- **Matriz de Tallas en Vivo**: Alertas visuales de stock bajo (*"¡Solo 2 unidades!"*) y tallas agotadas tachadas.
- **Modal de Guía de Tallas Internacional**: Tabla de equivalencias con correspondencia entre US Hombre, US Mujer, EU y longitud en centímetros (CM).
- **Acordeón Técnico**: Especificaciones de amortiguación, materiales de la capellada y suela de tracción.
- **Recomendaciones Relacionadas**: Sugerencias automáticas por marca y categoría.

---

## 🏗️ Arquitectura de Software y Patrones

```mermaid
flowchart TD
    subgraph Client["Capa Cliente (Navegador)"]
        UI["React 19 (Server & Client Components)"]
        ZCart["Zustand Cart Store\n(Persistencia en LocalStorage)"]
        ZFilter["Zustand Filter Store\n(Sincronización en memoria)"]
    end

    subgraph NextServer["Servidor Next.js 15 (App Router)"]
        Landing["/ (ISR - Revalidate 3600s)"]
        Catalog["/productos (SSR Streaming)"]
        PDP["/productos/[slug] (ISR + generateStaticParams)"]
        StandAlone["Node.js Standalone Runner\n(Puerto 3000)"]
    end

    subgraph DataLayer["Capa de Datos & Servicios"]
        Prisma["Prisma ORM 6 Client\n(Singleton Pattern)"]
        Postgres[("PostgreSQL 16\n(Docker / Supabase)")]
        MockData["Mock Sneaker Vault\n(Fallback Offline de alta resolución)"]
    end

    UI --> Landing
    UI --> Catalog
    UI --> PDP
    UI <--> ZCart
    UI <--> ZFilter

    Landing --> Prisma
    Catalog --> Prisma
    PDP --> Prisma
    Prisma --> Postgres
    Prisma -.->|Fallback de desarrollo| MockData
    StandAlone --> NextServer
```

### Principios Arquitectónicos Aplicados:
- **Feature-Driven Architecture (Vertical Slices)**: Cada módulo del negocio (`features/catalog`, `features/products`, `components/cart`) encapsula sus propios componentes, hooks y acciones, facilitando el trabajo en equipo y la mantenibilidad.
- **Server Components por Defecto**: Las consultas de datos y metadatos se resuelven en el servidor, manteniendo el bundle de JavaScript en el cliente al mínimo.
- **Islas de Interactividad**: `"use client"` se reserva estrictamente para componentes interactivos (selectores de color, drawer, filtros reactivos).
- **Prisma Singleton**: Evita el agotamiento de conexiones en el pool de PostgreSQL durante el hot-reloading de desarrollo.

---

## 🛠️ Stack Tecnológico Detallado

| Dominio | Herramienta | Versión | Propósito |
| :--- | :--- | :--- | :--- |
| **Framework Web** | Next.js | `15.3` | App Router, Server Components, renderizado ISR y SSR |
| **Biblioteca UI** | React | `19.2` | Componentes concurrentes y renderizado declarativo |
| **Tipado** | TypeScript | `5.0` | Tipado estricto en datos de inventario, filtros y modelos |
| **Estilos** | Tailwind CSS | `v4.0` | Utility-first CSS moderno y configuración de temas |
| **Iconos** | Lucide React | `1.39` | Iconografía SVG ligera y consistente |
| **Estado Global** | Zustand | `5.0` | Gestión de estado reactivo del carrito y filtros |
| **Base de Datos** | PostgreSQL | `16` | Almacén relacional transaccional |
| **ORM** | Prisma | `6.19` | Tipado de base de datos, migraciones y queries seguras |
| **Contenedores** | Docker & Compose | `v2+` | Entorno reproducible y portátil para cualquier máquina |

---

## 📂 Estructura de Directorios

```text
c:\Users\gabri\Desktop\Zapatillas\
├── prisma/
│   └── schema.prisma                 # Modelado relacional completo (Productos, Variantes, Stock)
├── public/                           # Recursos gráficos estáticos
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Layout principal (Navbar, CartDrawer, Footer)
│   │   ├── page.tsx                  # Landing Page (Hero, Novedades, Banners)
│   │   ├── globals.css               # Importaciones de Tailwind CSS v4
│   │   └── productos/
│   │       ├── page.tsx              # Página del catálogo completo
│   │       └── [slug]/
│   │           └── page.tsx          # Ficha de producto (generateStaticParams + SEO)
│   ├── components/                   # Componentes visuales transversales
│   │   ├── cart/
│   │   │   └── CartDrawer.tsx        # Drawer deslizante del carrito
│   │   ├── layout/
│   │   │   ├── Navbar.tsx            # Navegación con buscador y badge de carrito
│   │   │   └── Footer.tsx            # Enlaces, garantías y newsletter
│   │   └── products/
│   │       └── ProductCard.tsx       # Tarjeta de zapatilla interactiva con selector de color
│   ├── data/
│   │   └── mockSneakers.ts           # Catálogo offline con 8 modelos icónicos y fotos HD
│   ├── features/                     # Módulos por dominio de negocio (Clean Architecture)
│   │   ├── catalog/
│   │   │   └── components/
│   │   │       ├── CatalogSection.tsx # Orquestador del catálogo y ordenamiento
│   │   │       └── ProductFilters.tsx # Barra lateral de filtros reactivos
│   │   └── products/
│   │       └── components/
│   │           └── ProductDetailView.tsx # Vista interactiva de detalle de producto
│   ├── lib/                          # Utilidades y singletons
│   │   ├── prisma.ts                 # Instancia Singleton de Prisma Client
│   │   └── utils.ts                  # Formateador de moneda (USD) y cálculo de descuentos
│   ├── store/                        # Estado global con Zustand
│   │   ├── useCartStore.ts           # Carrito con persistencia en localStorage
│   │   └── useFilterStore.ts         # Filtros reactivos multidimensionales
│   └── types/                        # Definiciones de TypeScript
│       ├── cart.ts                   # Interfaces del carrito de compras
│       └── product.ts                # Interfaces de Producto, Variante, Talla y Filtros
├── Dockerfile                        # Multi-stage Dockerfile para modo standalone
├── docker-compose.yml                # Orquestación de App (Next.js) + Base de Datos (PostgreSQL)
├── .dockerignore                     # Archivos excluidos de la imagen Docker
├── .env.example                      # Variables de entorno modelo
├── next.config.ts                    # Dominios de imágenes externos y output standalone
└── tsconfig.json                     # Configuración de compilación de TypeScript
```

---

## 🐳 Despliegue con Docker (En 1 Solo Comando)

El proyecto incluye una configuración de **Docker Multi-stage** combinada con **Docker Compose** que permite levantar tanto la aplicación Next.js como una base de datos PostgreSQL 16 lista para producción en **cualquier máquina (Windows, Linux, macOS)** sin requerir instalación previa de Node.js ni PostgreSQL.

### 📋 Prerrequisito Único
Tener instalado y en ejecución [Docker Desktop](https://www.docker.com/products/docker-desktop/).

### 🚀 1. Iniciar la aplicación y la base de datos
Abre tu terminal en la raíz del proyecto y ejecuta:

```bash
docker compose up --build
```

#### ¿Qué hace este comando tras bambalinas?
1. **Descarga e inicializa PostgreSQL 16 Alpine** en el puerto `5432` con un volumen persistente para no perder información al reiniciar.
2. **Ejecuta el Multi-stage Dockerfile de Next.js**:
   - Etapa 1 (`deps`): Instala dependencias con `npm ci` y genera el cliente tipado de Prisma.
   - Etapa 2 (`builder`): Compila la aplicación en modo `standalone`, optimizando assets y páginas estáticas.
   - Etapa 3 (`runner`): Empaqueta únicamente el servidor standalone en una imagen ultra liviana (~120 MB) bajo un usuario sin privilegios de root (`nextjs`) por máxima seguridad.
3. **Verifica la salud de la base de datos** (*Healthcheck*) antes de permitir el arranque de la aplicación.

### 🌐 2. Acceso Web
Una vez veas el mensaje `Ready in ...ms`, ingresa a:
- **Tienda**: [http://localhost:3000](http://localhost:3000)
- **Catálogo**: [http://localhost:3000/productos](http://localhost:3000/productos)

### 🗄️ 3. Sincronizar el Esquema de Base de Datos (Opcional)
Para reflejar el modelo de `schema.prisma` dentro del contenedor de PostgreSQL:

```bash
docker compose exec app npx prisma db push
```

### 🛑 4. Detener los Contenedores
```bash
docker compose down
```
*(Tus datos continuarán a salvo en el volumen Docker `postgres_data`).*

---

## 💻 Instalación y Ejecución Local (Sin Docker)

Si prefieres trabajar de forma nativa en tu entorno local:

### Requisitos
- **Node.js**: `v20.x` o superior recomendado (`v18.18+` mínimo)
- **npm**: `v10.x` o superior

### Paso a Paso

1. **Clonar o situarse en el repositorio**:
   ```bash
   cd c:\Users\gabri\Desktop\Zapatillas
   ```

2. **Instalar dependencias del proyecto**:
   ```bash
   npm install
   ```

3. **Configurar el archivo de entorno**:
   ```bash
   cp .env.example .env
   ```

4. **Generar los tipos de Prisma Client**:
   ```bash
   npx prisma generate
   ```

5. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

6. **Abrir en el navegador**:
   Visita [http://localhost:3000](http://localhost:3000).

---

## 🗄️ Modelo de Datos Relacional

El modelo de datos diseñado en [`prisma/schema.prisma`](file:///c:/Users/gabri/Desktop/Zapatillas/prisma/schema.prisma) modela el negocio real de sneakers:

```mermaid
erDiagram
    BRAND ||--o{ PRODUCT : "fabrica"
    CATEGORY ||--o{ PRODUCT : "categoriza"
    PRODUCT ||--o{ PRODUCT_VARIANT : "dispone de colorways"
    PRODUCT_VARIANT ||--o{ PRODUCT_IMAGE : "galeria"
    PRODUCT_VARIANT ||--o{ VARIANT_SIZE : "tallas fisicas"
    USER ||--o{ ORDER : "genera"
    ORDER ||--o{ ORDER_ITEM : "contiene"
    VARIANT_SIZE ||--o{ ORDER_ITEM : "descuenta stock"
    ORDER ||--|| PAYMENT : "asociado a"

    PRODUCT {
        string id PK
        string name "Nombre del modelo"
        string slug UK "Identificador URL"
        string description "Historia y detalles"
        decimal basePrice "Precio base"
        enum gender "MEN, WOMEN, UNISEX, KIDS"
        boolean isFeatured "Destacado en home"
        boolean isNewRelease "Novedad semanal"
    }

    PRODUCT_VARIANT {
        string id PK
        string colorName "Ej: Chicago Red"
        string colorHex "Color visual para selector"
        string sku UK "Codigo unico de inventario"
        decimal price "Precio especifico de la variante"
        decimal compareAtPrice "Precio antes de descuento"
        boolean isDefault "Variante predeterminada"
    }

    VARIANT_SIZE {
        string id PK
        string size "Talla US (Ej: US 9.5)"
        int stock "Inventario disponible"
    }
```

---

## ⚙️ Variables de Entorno (`.env`)

| Variable | Descripción | Valor Ejemplo |
| :--- | :--- | :--- |
| `DATABASE_URL` | Cadena de conexión a PostgreSQL (Docker o Supabase) | `postgresql://postgres:postgres@localhost:5432/zapatillas_db?schema=public` |
| `NEXTAUTH_URL` | URL canónica de la aplicación | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Llave para encriptar sesiones de autenticación | `clave-secreta-aleatoria-de-produccion` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Llave pública de Stripe para checkout | `pk_test_...` |
| `STRIPE_SECRET_KEY` | Llave secreta de Stripe para Server Actions | `sk_test_...` |

---

## 📜 Scripts Disponibles

| Script | Comando | Descripción |
| :--- | :--- | :--- |
| **Desarrollo** | `npm run dev` | Inicia el servidor Next.js en `http://localhost:3000` con Hot Reloading |
| **Compilación** | `npm run build` | Compila TypeScript y genera la salida optimizada `standalone` |
| **Producción** | `npm run start` | Arranca la aplicación compilada en modo producción |
| **Linter** | `npm run lint` | Valida buenas prácticas y sintaxis con ESLint |
| **Prisma Generate** | `npx prisma generate` | Regenera el cliente tipado de Prisma a partir de `schema.prisma` |
| **Prisma Studio** | `npx prisma studio` | Panel visual en navegador para explorar y editar registros de base de datos |

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si deseas colaborar:
1. Haz un Fork del proyecto.
2. Crea una rama para tu característica: `git checkout -b feature/nueva-caracteristica`.
3. Haz commit de tus cambios: `git commit -m 'Añade nueva funcionalidad'`.
4. Haz push a tu rama: `git push origin feature/nueva-caracteristica`.
5. Abre un **Pull Request**.

---

## 📄 Licencia

Este proyecto se distribuye bajo los términos de la Licencia **MIT**. Consulta el archivo `LICENSE` para más información.

<div align="center">
  <sub>Desarrollado con pasión para la comunidad sneakerhead y entusiastas del desarrollo web moderno.</sub>
</div>
