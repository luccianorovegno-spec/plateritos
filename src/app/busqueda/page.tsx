import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCategories, getProducts } from "@/lib/tiendanube";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = (params.q || "").trim().toLowerCase();
  const [products, categories] = await Promise.all([getProducts(80), getCategories(20)]);

  const results = query
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    : [];

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader categories={categories} />
      <main className="section-padding">
        <div className="content-max-width">
          <h1 className="text-4xl font-bold">Busqueda</h1>
          <form action="/busqueda" className="mt-6 flex w-full max-w-2xl gap-2">
            <input
              type="search"
              name="q"
              defaultValue={params.q || ""}
              placeholder="Que estas buscando?"
              className="w-full rounded-xl border border-[var(--line)] px-4 py-3 outline-none focus:border-[var(--primary)]"
              autoFocus
            />
            <button className="rounded-xl bg-[var(--primary)] px-5 py-3 text-white">Buscar</button>
          </form>

          {!query ? (
            <p className="mt-6 text-[var(--ink-soft)]">
              Escribe una palabra para buscar productos por nombre, descripcion o categoria.
            </p>
          ) : (
            <p className="mt-6 text-[var(--ink-soft)]">
              Resultados para <strong>&ldquo;{params.q}&rdquo;</strong>: {results.length}
            </p>
          )}

          {results.length ? (
            <div className="mt-8 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : query ? (
            <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--soft-gray)] p-8 text-center">
              <p className="text-lg font-semibold">No encontramos coincidencias.</p>
              <a href="/productos" className="mt-3 inline-block text-[var(--primary)]">
                Ver todos los productos
              </a>
            </div>
          ) : null}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
