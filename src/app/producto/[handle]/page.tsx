import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatArs, getCategories, getProductByHandle, getProducts } from "@/lib/tiendanube";

type ProductPageProps = {
  params: Promise<{ handle: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;

  const [product, categories, allProducts] = await Promise.all([
    getProductByHandle(handle),
    getCategories(20),
    getProducts(12),
  ]);

  if (!product) notFound();

  const hasPromo =
    typeof product.promotionalPrice === "number" &&
    product.promotionalPrice < product.price;
  const finalPrice = hasPromo ? product.promotionalPrice : product.price;
  const related = allProducts.filter((item) => item.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader categories={categories} />

      <main className="flex-1">
        <div className="border-b border-[var(--line)] bg-[var(--soft-gray)]">
          <div className="content-max-width py-3 text-sm text-[var(--ink-soft)]">
            <Link href="/" className="hover:text-[var(--primary)]">
              Inicio
            </Link>{" "}
            / Producto / <span className="text-[var(--foreground)]">{product.name}</span>
          </div>
        </div>

        <section className="section-padding">
          <div className="content-max-width">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
              <article>
                <div className="relative mb-4 aspect-square overflow-hidden rounded-3xl bg-[var(--soft-gray)]">
                  {product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                {product.images.length > 1 ? (
                  <div className="flex gap-3">
                    {product.images.slice(0, 4).map((image) => (
                      <div key={image} className="h-20 w-20 overflow-hidden rounded-xl">
                        <img src={image} alt={product.name} className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>

              <article>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--ink-soft)]">
                  {product.tags[0] || "Papeleria"}
                </p>
                <h1 className="mb-4 text-2xl font-bold md:text-4xl">{product.name}</h1>
                <div className="mb-2 flex items-center gap-3">
                  <span className="text-3xl font-bold text-[var(--primary)]">
                    {formatArs(finalPrice || 0)}
                  </span>
                  {hasPromo ? (
                    <span className="text-lg text-[var(--ink-soft)] line-through">
                      {formatArs(product.price)}
                    </span>
                  ) : null}
                </div>
                <p className="mb-6 text-sm text-[var(--ink-soft)]">
                  6 cuotas sin interes de {formatArs(Math.round((finalPrice || 0) / 6))}
                </p>
                <p className="mb-6 text-base leading-relaxed text-[var(--ink-soft)]">
                  {product.description || "Descripcion pendiente de catalogo."}
                </p>
                <a
                  href="/politica-de-devolucion"
                  className="mb-6 inline-flex text-sm font-semibold text-[var(--primary)] hover:underline"
                >
                  Cambios y devoluciones
                </a>

                <div className="mb-8 grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-pastel-coral/40 p-3 text-center text-[11px]">
                    Envio gratis +$200k
                  </div>
                  <div className="rounded-xl bg-pastel-coral/40 p-3 text-center text-[11px]">
                    100% original
                  </div>
                  <div className="rounded-xl bg-pastel-coral/40 p-3 text-center text-[11px]">
                    Devolucion 30 dias
                  </div>
                </div>

                {product.checkoutUrl ? (
                  <a
                    href={product.checkoutUrl}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--primary)] px-6 py-4 font-semibold text-white hover:bg-[var(--primary-dark)]"
                  >
                    Comprar en Tienda Nube
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--primary)] px-6 py-4 font-semibold text-white opacity-60"
                  >
                    Configura TIENDANUBE_STORE_URL para comprar
                  </button>
                )}
              </article>
            </div>
          </div>
        </section>

        {related.length ? (
          <section className="section-padding border-t border-[var(--line)] bg-pastel-coral/30">
            <div className="content-max-width">
              <h2 className="mb-8 text-2xl font-bold md:text-3xl">Tambien te puede gustar</h2>
              <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
                {related.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <SiteFooter />
    </div>
  );
}
