import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { catalogMenu, findCategoryBySlug, findSubcategoryBySlug } from "@/data/catalog-menu";
import { getCategories, getProducts } from "@/lib/tiendanube";

type ProductsPageProps = {
  searchParams: Promise<{ q?: string; categoria?: string; subcategoria?: string; orden?: string }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const [products, categories] = await Promise.all([getProducts(80), getCategories(30)]);

  const q = (params.q || "").trim().toLowerCase();
  const categoriaSlug = (params.categoria || "").trim().toLowerCase();
  const subcategoriaSlug = (params.subcategoria || "").trim().toLowerCase();
  const orden = (params.orden || "relevancia").toLowerCase();

  const selectedCategory = findCategoryBySlug(categoriaSlug);
  const selectedSubcategory = findSubcategoryBySlug(subcategoriaSlug);

  let filtered = products.filter((product) => {
    const haystack = [product.name, product.description, product.brand, ...product.tags]
      .join(" ")
      .toLowerCase();

    const byQuery = !q || haystack.includes(q);

    const byCategory = !categoriaSlug || !selectedCategory || haystack.includes(selectedCategory.label.toLowerCase());

    const bySubcategory =
      !subcategoriaSlug ||
      !selectedSubcategory ||
      haystack.includes(selectedSubcategory.label.toLowerCase());

    return byQuery && byCategory && bySubcategory;
  });

  if (orden === "precio-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (orden === "precio-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (orden === "nombre") filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name, "es"));

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader categories={categories} />
      <main className="section-padding flex-1">
        <div className="content-max-width">
          <div className="grid gap-8 lg:grid-cols-[290px_1fr]">
            <aside id="categorias" className="space-y-6 lg:sticky lg:top-36 lg:self-start">
              <section className="rounded-2xl border border-[var(--line)] bg-[var(--soft-gray)] p-5">
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="/productos"
                      className={`inline-block rounded-md px-2 py-1 ${
                        !categoriaSlug ? "bg-[var(--primary)] text-white" : "hover:bg-white"
                      }`}
                    >
                      Todo
                    </a>
                  </li>
                  {catalogMenu.map((item) => (
                    <li key={item.slug}>
                      <a
                        href={`/productos?categoria=${encodeURIComponent(item.slug)}`}
                        className={`inline-block rounded-md px-2 py-1 ${
                          item.slug === categoriaSlug ? "bg-[var(--primary)] text-white" : "hover:bg-white"
                        }`}
                      >
                        {item.label}
                      </a>
                      {item.slug === categoriaSlug && item.children?.length ? (
                        <ul className="mt-1 ml-2 space-y-1 border-l border-[var(--line)] pl-3 text-xs">
                          {item.children.map((child) => (
                            <li key={child.slug}>
                              <a
                                href={`/productos?categoria=${encodeURIComponent(item.slug)}&subcategoria=${encodeURIComponent(child.slug)}`}
                                className={`inline-block rounded px-1.5 py-0.5 ${
                                  child.slug === subcategoriaSlug
                                    ? "bg-[var(--primary)] text-white"
                                    : "hover:bg-white"
                                }`}
                              >
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            </aside>

            <section>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold">Productos</h1>
                  <p className="mt-2 text-sm text-[var(--ink-soft)]">
                    {filtered.length} resultados
                    {selectedCategory ? ` en ${selectedCategory.label}` : ""}
                    {selectedSubcategory ? ` / ${selectedSubcategory.label}` : ""}
                  </p>
                </div>

                <form action="/productos" className="flex flex-wrap gap-2">
                  <input type="hidden" name="categoria" value={params.categoria || ""} />
                  <input type="hidden" name="subcategoria" value={params.subcategoria || ""} />
                  <input
                    type="search"
                    name="q"
                    defaultValue={params.q || ""}
                    placeholder="Buscar productos..."
                    className="w-[220px] rounded-xl border border-[var(--line)] px-4 py-2.5 text-sm outline-none focus:border-[var(--primary)]"
                  />
                  <select
                    name="orden"
                    defaultValue={orden}
                    className="rounded-xl border border-[var(--line)] px-3 py-2.5 text-sm outline-none focus:border-[var(--primary)]"
                  >
                    <option value="relevancia">Relevancia</option>
                    <option value="precio-asc">Precio: menor a mayor</option>
                    <option value="precio-desc">Precio: mayor a menor</option>
                    <option value="nombre">Nombre A-Z</option>
                  </select>
                  <button className="rounded-xl bg-[var(--primary)] px-4 py-2.5 text-sm font-semibold text-white">
                    Aplicar
                  </button>
                </form>
              </div>

              {filtered.length ? (
                <div className="grid grid-cols-2 gap-4 md:gap-6 xl:grid-cols-3">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--soft-gray)] p-8 text-center">
                  <p className="text-lg font-semibold">No encontramos productos con ese filtro.</p>
                  <a href="/productos" className="mt-4 inline-block text-[var(--primary)]">
                    Limpiar filtros
                  </a>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
