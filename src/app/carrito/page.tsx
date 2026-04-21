import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCategories } from "@/lib/tiendanube";

export default async function CartPage() {
  const categories = await getCategories(20);

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader categories={categories} cartCount={0} />
      <main className="section-padding">
        <div className="content-max-width">
          <h1 className="text-4xl font-bold">Carrito</h1>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
            <section className="rounded-2xl border border-[var(--line)] bg-[var(--soft-gray)] p-8 text-center">
              <p className="text-lg font-semibold">Tu carrito esta vacio.</p>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">
                Agrega productos para comenzar tu compra.
              </p>
              <a
                href="/productos"
                className="mt-5 inline-block rounded-xl bg-[var(--primary)] px-5 py-3 text-white"
              >
                Ver productos
              </a>
            </section>

            <aside className="h-fit rounded-2xl border border-[var(--line)] bg-white p-6">
              <h2 className="text-xl font-semibold">Resumen</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>$0</span>
                </div>
                <div className="flex justify-between">
                  <span>Envio</span>
                  <span>A calcular</span>
                </div>
                <div className="mt-2 border-t border-[var(--line)] pt-2 text-base font-semibold">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span>$0</span>
                  </div>
                </div>
              </div>
              <button className="mt-5 w-full rounded-xl bg-[var(--foreground)] px-4 py-3 font-semibold text-white opacity-60" disabled>
                Finalizar compra
              </button>
              <a
                href="/politica-de-devolucion"
                className="mt-3 block text-center text-xs text-[var(--ink-soft)] hover:text-[var(--primary)]"
              >
                Ver cambios y devoluciones
              </a>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
