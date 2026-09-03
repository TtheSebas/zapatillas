import { Product } from "@/types/product";

export const MOCK_SNEAKERS: Product[] = [
  {
    id: "prod-aj1-high",
    name: "Air Jordan 1 Retro High OG",
    slug: "air-jordan-1-retro-high-og",
    description: "Un icono inmortal dentro y fuera de la pista. El Air Jordan 1 Retro High OG combina cuero premium de grano fino con la legendaria amortiguación Air encapsulada en el talón. Lanzadas originalmente en 1985, mantienen el perfil clásico que revolucionó la cultura sneaker para siempre.",
    details: [
      "Parte superior de cuero auténtico y sintético para mayor durabilidad",
      "Unidad Air-Sole encapsulada en el talón para amortiguación ligera",
      "Suela de goma con punto de pivote clásico de baloncesto",
      "Cuello acolchado de corte alto para soporte del tobillo"
    ],
    gender: "UNISEX",
    basePrice: 189.99,
    isFeatured: true,
    isNewRelease: true,
    brand: {
      id: "brand-jordan",
      name: "Jordan",
      slug: "jordan"
    },
    category: {
      id: "cat-basket",
      name: "Basketball",
      slug: "basketball"
    },
    variants: [
      {
        id: "var-aj1-chicago",
        productId: "prod-aj1-high",
        colorName: "Chicago Red / White / Black",
        colorHex: "#b91c1c",
        sku: "DZ5485-612",
        price: 189.99,
        compareAtPrice: 219.99,
        isDefault: true,
        images: [
          {
            id: "img-aj1-1",
            url: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80",
            altText: "Air Jordan 1 Chicago lateral",
            isMain: true,
            order: 1
          },
          {
            id: "img-aj1-2",
            url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80",
            altText: "Air Jordan 1 Chicago ángulo",
            isMain: false,
            order: 2
          }
        ],
        sizes: [
          { id: "sz-aj1-c-8", size: "US 8", stock: 4 },
          { id: "sz-aj1-c-85", size: "US 8.5", stock: 6 },
          { id: "sz-aj1-c-9", size: "US 9", stock: 2 },
          { id: "sz-aj1-c-95", size: "US 9.5", stock: 5 },
          { id: "sz-aj1-c-10", size: "US 10", stock: 0 },
          { id: "sz-aj1-c-105", size: "US 10.5", stock: 3 },
          { id: "sz-aj1-c-11", size: "US 11", stock: 1 }
        ]
      },
      {
        id: "var-aj1-blue",
        productId: "prod-aj1-high",
        colorName: "University Blue / Obsidian",
        colorHex: "#38bdf8",
        sku: "555088-134",
        price: 199.99,
        compareAtPrice: null,
        isDefault: false,
        images: [
          {
            id: "img-aj1-b1",
            url: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80",
            altText: "Air Jordan 1 University Blue",
            isMain: true,
            order: 1
          },
          {
            id: "img-aj1-b2",
            url: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80",
            altText: "Air Jordan 1 University Blue vista detalle",
            isMain: false,
            order: 2
          }
        ],
        sizes: [
          { id: "sz-aj1-b-85", size: "US 8.5", stock: 3 },
          { id: "sz-aj1-b-9", size: "US 9", stock: 7 },
          { id: "sz-aj1-b-95", size: "US 9.5", stock: 4 },
          { id: "sz-aj1-b-10", size: "US 10", stock: 2 }
        ]
      }
    ]
  },
  {
    id: "prod-dunk-low",
    name: "Nike Dunk Low Retro",
    slug: "nike-dunk-low-retro",
    description: "Nacido en la cancha y adoptado por la calle. El Nike Dunk Low Retro regresa con revestimientos nítidos y bloques de color clásicos inspirados en los equipos universitarios. Construcción resistente y estilo atemporal.",
    details: [
      "Parte superior de cuero brillante que envejece con suavidad",
      "Mediasuela de espuma que ofrece amortiguación reactiva y ligera",
      "Zona del tobillo acolchada de perfil bajo",
      "Suela exterior de goma circular con tracción óptima"
    ],
    gender: "UNISEX",
    basePrice: 119.99,
    isFeatured: true,
    isNewRelease: false,
    brand: {
      id: "brand-nike",
      name: "Nike",
      slug: "nike"
    },
    category: {
      id: "cat-casual",
      name: "Casual",
      slug: "casual"
    },
    variants: [
      {
        id: "var-dunk-panda",
        productId: "prod-dunk-low",
        colorName: "White / Black (Panda)",
        colorHex: "#171717",
        sku: "DD1391-100",
        price: 119.99,
        compareAtPrice: 139.99,
        isDefault: true,
        images: [
          {
            id: "img-dunk-p1",
            url: "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&w=1000&q=80",
            altText: "Nike Dunk Low Panda lateral",
            isMain: true,
            order: 1
          },
          {
            id: "img-dunk-p2",
            url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80",
            altText: "Nike Dunk Low Panda vista cenital",
            isMain: false,
            order: 2
          }
        ],
        sizes: [
          { id: "sz-dnk-8", size: "US 8", stock: 12 },
          { id: "sz-dnk-85", size: "US 8.5", stock: 8 },
          { id: "sz-dnk-9", size: "US 9", stock: 15 },
          { id: "sz-dnk-95", size: "US 9.5", stock: 0 },
          { id: "sz-dnk-10", size: "US 10", stock: 6 },
          { id: "sz-dnk-11", size: "US 11", stock: 4 }
        ]
      },
      {
        id: "var-dunk-green",
        productId: "prod-dunk-low",
        colorName: "Team Green / Sail",
        colorHex: "#15803d",
        sku: "DD1391-101",
        price: 129.99,
        compareAtPrice: null,
        isDefault: false,
        images: [
          {
            id: "img-dunk-g1",
            url: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1000&q=80",
            altText: "Nike Dunk Low Green",
            isMain: true,
            order: 1
          }
        ],
        sizes: [
          { id: "sz-dnk-g-9", size: "US 9", stock: 5 },
          { id: "sz-dnk-g-95", size: "US 9.5", stock: 3 },
          { id: "sz-dnk-g-10", size: "US 10", stock: 1 }
        ]
      }
    ]
  },
  {
    id: "prod-nb-550",
    name: "New Balance 550",
    slug: "new-balance-550",
    description: "El modelo 550 original debutó en 1989 y dejó su huella en las canchas de baloncesto de costa a costa. Tras quedar archivado, el 550 volvió a finales de 2020 para consagrarse como un referente indiscutible del streetwear mundial.",
    details: [
      "Diseño retro de corte bajo y silueta aerodinámica",
      "Empeine de piel de primera calidad, ante y malla transpirable",
      "Suela de goma para una tracción confiable y duradera",
      "Cierre con cordones ajustables para ajuste personalizado"
    ],
    gender: "UNISEX",
    basePrice: 129.99,
    isFeatured: true,
    isNewRelease: true,
    brand: {
      id: "brand-nb",
      name: "New Balance",
      slug: "new-balance"
    },
    category: {
      id: "cat-casual",
      name: "Casual",
      slug: "casual"
    },
    variants: [
      {
        id: "var-nb550-green",
        productId: "prod-nb-550",
        colorName: "Sea Salt / Pine Green",
        colorHex: "#166534",
        sku: "BB550WT1",
        price: 129.99,
        compareAtPrice: null,
        isDefault: true,
        images: [
          {
            id: "img-nb550-1",
            url: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=80",
            altText: "New Balance 550 Green lateral",
            isMain: true,
            order: 1
          },
          {
            id: "img-nb550-2",
            url: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1000&q=80",
            altText: "New Balance 550 Green detalles",
            isMain: false,
            order: 2
          }
        ],
        sizes: [
          { id: "sz-nb-8", size: "US 8", stock: 5 },
          { id: "sz-nb-85", size: "US 8.5", stock: 7 },
          { id: "sz-nb-9", size: "US 9", stock: 9 },
          { id: "sz-nb-95", size: "US 9.5", stock: 6 },
          { id: "sz-nb-10", size: "US 10", stock: 4 },
          { id: "sz-nb-105", size: "US 10.5", stock: 2 }
        ]
      },
      {
        id: "var-nb550-navy",
        productId: "prod-nb-550",
        colorName: "White / Team Navy",
        colorHex: "#1e3a8a",
        sku: "BB550WA1",
        price: 129.99,
        compareAtPrice: 145.00,
        isDefault: false,
        images: [
          {
            id: "img-nb550-n1",
            url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80",
            altText: "New Balance 550 Navy",
            isMain: true,
            order: 1
          }
        ],
        sizes: [
          { id: "sz-nb-n-85", size: "US 8.5", stock: 3 },
          { id: "sz-nb-n-9", size: "US 9", stock: 5 },
          { id: "sz-nb-n-95", size: "US 9.5", stock: 4 }
        ]
      }
    ]
  },
  {
    id: "prod-forum-84",
    name: "Adidas Forum 84 Low",
    slug: "adidas-forum-84-low",
    description: "Más que una zapatilla de basket: una declaración de principios. La adidas Forum irrumpió en las pistas en 1984 y rápidamente conquistó las calles con su inconfundible correa en el tobillo en forma de X y su estética vintage.",
    details: [
      "Parte superior de piel premium y ante envejecido",
      "Correa de tobillo ajustable con cierre de contacto",
      "Forro textil cómodo y transpirable",
      "Suela de caucho cosida con acabado retro"
    ],
    gender: "MEN",
    basePrice: 109.99,
    isFeatured: false,
    isNewRelease: true,
    brand: {
      id: "brand-adidas",
      name: "Adidas",
      slug: "adidas"
    },
    category: {
      id: "cat-casual",
      name: "Casual",
      slug: "casual"
    },
    variants: [
      {
        id: "var-forum-blue",
        productId: "prod-forum-84",
        colorName: "Cloud White / Royal Blue",
        colorHex: "#2563eb",
        sku: "FY7756",
        price: 109.99,
        compareAtPrice: 125.00,
        isDefault: true,
        images: [
          {
            id: "img-forum-1",
            url: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=1000&q=80",
            altText: "Adidas Forum 84 Blue lateral",
            isMain: true,
            order: 1
          }
        ],
        sizes: [
          { id: "sz-frm-8", size: "US 8", stock: 6 },
          { id: "sz-frm-85", size: "US 8.5", stock: 4 },
          { id: "sz-frm-9", size: "US 9", stock: 8 },
          { id: "sz-frm-95", size: "US 9.5", stock: 2 },
          { id: "sz-frm-10", size: "US 10", stock: 5 }
        ]
      }
    ]
  },
  {
    id: "prod-ultraboost-light",
    name: "Adidas Ultraboost Light",
    slug: "adidas-ultraboost-light",
    description: "Siente una energía épica con la Ultraboost más ligera jamás creada. Equipada con la amortiguación Light BOOST de última generación, proporciona un retorno de energía constante kilómetro tras kilómetro sin añadir peso.",
    details: [
      "Ajuste tipo calcetín con tecnología adidas PRIMEKNIT+",
      "Mediasuela Light BOOST con un 30% menos de peso",
      "Sistema Linear Energy Push (LEP) para mayor propulsión",
      "Suela Continental™ Better Rubber para un agarre excepcional"
    ],
    gender: "MEN",
    basePrice: 199.99,
    isFeatured: true,
    isNewRelease: false,
    brand: {
      id: "brand-adidas",
      name: "Adidas",
      slug: "adidas"
    },
    category: {
      id: "cat-running",
      name: "Running",
      slug: "running"
    },
    variants: [
      {
        id: "var-ub-black",
        productId: "prod-ultraboost-light",
        colorName: "Core Black / Solar Red",
        colorHex: "#111827",
        sku: "HQ6351",
        price: 199.99,
        compareAtPrice: 220.00,
        isDefault: true,
        images: [
          {
            id: "img-ub-1",
            url: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80",
            altText: "Adidas Ultraboost Black",
            isMain: true,
            order: 1
          }
        ],
        sizes: [
          { id: "sz-ub-85", size: "US 8.5", stock: 4 },
          { id: "sz-ub-9", size: "US 9", stock: 6 },
          { id: "sz-ub-95", size: "US 9.5", stock: 10 },
          { id: "sz-ub-10", size: "US 10", stock: 3 },
          { id: "sz-ub-11", size: "US 11", stock: 5 }
        ]
      }
    ]
  },
  {
    id: "prod-pegasus-40",
    name: "Nike Air Zoom Pegasus 40",
    slug: "nike-air-zoom-pegasus-40",
    description: "El caballo de batalla con alas regresa con su comodidad legendaria y respuesta elástica. La combinación de espuma React y dos unidades Zoom Air (antepié y talón) garantiza una transición suave en cada zancada.",
    details: [
      "Malla técnica transpirable de una sola capa",
      "Espuma Nike React suave y elástica",
      "Dos unidades Zoom Air para despegues explosivos",
      "Suela tipo gofre para excelente tracción en asfalto"
    ],
    gender: "WOMEN",
    basePrice: 139.99,
    isFeatured: false,
    isNewRelease: true,
    brand: {
      id: "brand-nike",
      name: "Nike",
      slug: "nike"
    },
    category: {
      id: "cat-running",
      name: "Running",
      slug: "running"
    },
    variants: [
      {
        id: "var-peg-pink",
        productId: "prod-pegasus-40",
        colorName: "Pearl Pink / White",
        colorHex: "#f472b6",
        sku: "DV3853-600",
        price: 139.99,
        compareAtPrice: null,
        isDefault: true,
        images: [
          {
            id: "img-peg-1",
            url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
            altText: "Nike Pegasus 40",
            isMain: true,
            order: 1
          }
        ],
        sizes: [
          { id: "sz-peg-65", size: "US 6.5", stock: 4 },
          { id: "sz-peg-7", size: "US 7", stock: 7 },
          { id: "sz-peg-75", size: "US 7.5", stock: 8 },
          { id: "sz-peg-8", size: "US 8", stock: 3 }
        ]
      }
    ]
  },
  {
    id: "prod-jordan-4-retro",
    name: "Air Jordan 4 Retro",
    slug: "air-jordan-4-retro",
    description: "Uno de los modelos más deseados de la franquicia Jordan. Con sus características alas en los cordones, malla transpirable en los paneles laterales y unidad Air visible, el Jordan 4 es sinónimo de cultura urbana y exclusividad.",
    details: [
      "Piel nubuck de máxima calidad con detalles de plástico moldeado",
      "Paneles de malla lateral para ventilación clásica",
      "Unidad Air-Sole visible en talón y antepié",
      "Suela exterior con patrón de espiga para tracción multidireccional"
    ],
    gender: "UNISEX",
    basePrice: 219.99,
    isFeatured: true,
    isNewRelease: true,
    brand: {
      id: "brand-jordan",
      name: "Jordan",
      slug: "jordan"
    },
    category: {
      id: "cat-basket",
      name: "Basketball",
      slug: "basketball"
    },
    variants: [
      {
        id: "var-j4-military",
        productId: "prod-jordan-4-retro",
        colorName: "Military Black / White",
        colorHex: "#262626",
        sku: "DH6927-111",
        price: 219.99,
        compareAtPrice: 249.99,
        isDefault: true,
        images: [
          {
            id: "img-j4-1",
            url: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1000&q=80",
            altText: "Air Jordan 4 Military Black",
            isMain: true,
            order: 1
          }
        ],
        sizes: [
          { id: "sz-j4-85", size: "US 8.5", stock: 2 },
          { id: "sz-j4-9", size: "US 9", stock: 0 },
          { id: "sz-j4-95", size: "US 9.5", stock: 3 },
          { id: "sz-j4-10", size: "US 10", stock: 1 }
        ]
      }
    ]
  },
  {
    id: "prod-nb-2002r",
    name: "New Balance 2002R Protection Pack",
    slug: "new-balance-2002r-protection-pack",
    description: "Una deconstrucción magistral del calzado técnico de running de los años 2000. El 'Protection Pack' destaca por sus bordes dentados de ante desgastado, amortiguación N-ergy y tecnología ABZORB.",
    details: [
      "Capas superpuestas de ante desgastado prémium",
      "Mediasuela ABZORB que absorbe los impactos mediante amortiguación y compresión",
      "Tecnología N-ergy en la suela que proporciona una absorción de impactos superior",
      "Suela Stability Web para soporte en el puente del pie"
    ],
    gender: "UNISEX",
    basePrice: 179.99,
    isFeatured: true,
    isNewRelease: false,
    brand: {
      id: "brand-nb",
      name: "New Balance",
      slug: "new-balance"
    },
    category: {
      id: "cat-casual",
      name: "Casual",
      slug: "casual"
    },
    variants: [
      {
        id: "var-2002r-grey",
        productId: "prod-nb-2002r",
        colorName: "Rain Cloud / Magnet Grey",
        colorHex: "#737373",
        sku: "M2002RDA",
        price: 179.99,
        compareAtPrice: 199.99,
        isDefault: true,
        images: [
          {
            id: "img-2002-1",
            url: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=1000&q=80",
            altText: "New Balance 2002R Rain Cloud",
            isMain: true,
            order: 1
          }
        ],
        sizes: [
          { id: "sz-2002-8", size: "US 8", stock: 4 },
          { id: "sz-2002-85", size: "US 8.5", stock: 5 },
          { id: "sz-2002-9", size: "US 9", stock: 8 },
          { id: "sz-2002-95", size: "US 9.5", stock: 3 },
          { id: "sz-2002-10", size: "US 10", stock: 2 }
        ]
      }
    ]
  }
];
