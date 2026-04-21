const API_BASE =
  process.env.TIENDANUBE_API_BASE?.trim() || "https://api.tiendanube.com/v1";

const STORE_ID = process.env.TIENDANUBE_STORE_ID?.trim();
const ACCESS_TOKEN = process.env.TIENDANUBE_ACCESS_TOKEN?.trim();
const USER_AGENT =
  process.env.TIENDANUBE_USER_AGENT?.trim() ||
  "Plateritos Headless (hola@platerito.com.ar)";
const STORE_URL = process.env.TIENDANUBE_STORE_URL?.trim();
const LANGUAGE = process.env.TIENDANUBE_LANG?.trim() || "es";

type LocalizedValue = string | Record<string, string | undefined> | null;

type RawVariant = {
  id: number;
  price?: string | null;
  promotional_price?: string | null;
  stock?: number | null;
};

type RawImage = {
  id: number;
  src?: string | null;
  position?: number;
};

type RawProduct = {
  id: number;
  name?: LocalizedValue;
  description?: LocalizedValue;
  handle?: LocalizedValue;
  brand?: string | null;
  tags?: string | null;
  variants?: RawVariant[];
  images?: RawImage[];
};

type RawCategory = {
  id: number;
  name?: LocalizedValue;
  handle?: LocalizedValue;
};

export type Product = {
  id: number;
  name: string;
  handle: string;
  description: string;
  brand: string;
  tags: string[];
  price: number;
  promotionalPrice?: number;
  stock: number | null;
  images: string[];
  checkoutUrl: string | null;
};

export type Category = {
  id: number;
  name: string;
  handle: string;
};

const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "Planner Academico A5 Pastel",
    handle: "planner-academico-a5-pastel",
    description:
      "Planificador escolar con hojas punteadas, separadores y tapa dura suave al tacto.",
    brand: "Plateritos",
    tags: ["Escolar", "Organizacion"],
    price: 28900,
    promotionalPrice: 24900,
    stock: 14,
    images: ["/images/collection-agendas.jpg", "/images/product-1.jpg"],
    checkoutUrl: null,
  },
  {
    id: 2,
    name: "Set Oficina Creativa x 3 Cuadernos",
    handle: "set-oficina-creativa-cuadernos",
    description:
      "Set premium accesible de cuadernos para trabajo diario, ideas y reuniones.",
    brand: "Plateritos",
    tags: ["Oficina", "Cuadernos"],
    price: 32900,
    stock: 20,
    images: ["/images/collection-oficina.jpg", "/images/product-2.jpg"],
    checkoutUrl: null,
  },
  {
    id: 3,
    name: "Lapices Soft Color x 24",
    handle: "lapices-soft-color-x24",
    description:
      "Pigmentos vibrantes para apuntes, mapas mentales y estudio visual.",
    brand: "Plateritos",
    tags: ["Escolar", "Arte"],
    price: 16900,
    stock: 35,
    images: ["/images/collection-arte.jpg", "/images/product-3.jpg"],
    checkoutUrl: null,
  },
  {
    id: 4,
    name: "Cuaderno Inteligente A5",
    handle: "cuaderno-inteligente-a5",
    description:
      "Sistema de hojas removibles ideal para estudio y productividad diaria.",
    brand: "Plateritos",
    tags: ["Cuadernos", "Destacado"],
    price: 38900,
    stock: 10,
    images: ["/images/collection-cuadernos.jpg", "/images/product-4.jpg"],
    checkoutUrl: null,
  },
];

const fallbackCategories: Category[] = [
  { id: 1, name: "Escolar", handle: "escolar" },
  { id: 2, name: "Oficina", handle: "oficina" },
  { id: 3, name: "Cuadernos", handle: "cuadernos" },
  { id: 4, name: "Arte y dibujo", handle: "arte-y-dibujo" },
  { id: 5, name: "Regalos", handle: "regalos" },
];

function pickLocalized(value: LocalizedValue | undefined): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  return (
    value[LANGUAGE] ||
    value.es ||
    value.en ||
    value.pt ||
    Object.values(value).find(Boolean) ||
    ""
  );
}

function parseMoney(value?: string | null): number | undefined {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function normalizeProduct(raw: RawProduct): Product {
  const variants = raw.variants ?? [];
  const firstVariant = variants[0];
  const handle = pickLocalized(raw.handle) || String(raw.id);

  return {
    id: raw.id,
    name: pickLocalized(raw.name) || `Producto ${raw.id}`,
    handle,
    description: pickLocalized(raw.description),
    brand: raw.brand || "Plateritos",
    tags:
      raw.tags
        ?.split(",")
        .map((tag) => tag.trim())
        .filter(Boolean) ?? [],
    price: parseMoney(firstVariant?.price) ?? 0,
    promotionalPrice: parseMoney(firstVariant?.promotional_price),
    stock: firstVariant?.stock ?? null,
    images:
      raw.images
        ?.sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
        .map((img) => img.src || "")
        .filter(Boolean) ?? [],
    checkoutUrl: STORE_URL ? `${STORE_URL}/productos/${handle}` : null,
  };
}

function normalizeCategory(raw: RawCategory): Category {
  const handle = pickLocalized(raw.handle) || String(raw.id);
  return {
    id: raw.id,
    name: pickLocalized(raw.name) || `Categoria ${raw.id}`,
    handle,
  };
}

async function tnFetch<T>(path: string): Promise<T> {
  if (!STORE_ID || !ACCESS_TOKEN) {
    throw new Error("Missing Tiendanube credentials");
  }

  const res = await fetch(`${API_BASE}/${STORE_ID}${path}`, {
    headers: {
      Authentication: `bearer ${ACCESS_TOKEN}`,
      "User-Agent": USER_AGENT,
      "Content-Type": "application/json; charset=utf-8",
    },
    next: { revalidate: 120 },
  });

  if (!res.ok) {
    throw new Error(`Tiendanube API error ${res.status}`);
  }

  return (await res.json()) as T;
}

export async function getProducts(limit = 12): Promise<Product[]> {
  if (!STORE_ID || !ACCESS_TOKEN) return fallbackProducts;

  try {
    const raw = await tnFetch<RawProduct[]>(`/products?per_page=${limit}`);
    const products = raw.map(normalizeProduct).filter((p) => p.name);
    return products.length ? products : fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

export async function getCategories(limit = 20): Promise<Category[]> {
  if (!STORE_ID || !ACCESS_TOKEN) return fallbackCategories;

  try {
    const raw = await tnFetch<RawCategory[]>(`/categories?per_page=${limit}`);
    const categories = raw.map(normalizeCategory).filter((c) => c.name);
    return categories.length ? categories : fallbackCategories;
  } catch {
    return fallbackCategories;
  }
}

export async function getProductByHandle(
  handle: string,
): Promise<Product | null> {
  const products = await getProducts(50);
  return products.find((p) => p.handle === handle) ?? null;
}

export function isTiendanubeConfigured(): boolean {
  return Boolean(STORE_ID && ACCESS_TOKEN && STORE_URL);
}

export function formatArs(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}
