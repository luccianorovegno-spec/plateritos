import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCategories } from "@/lib/tiendanube";

export default async function BotonArrepentimientoPage() {
  const categories = await getCategories(20);

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader categories={categories} />
      <main className="section-padding">
        <div className="content-max-width max-w-3xl">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">Legal</p>
          <h1 className="mt-2 text-4xl font-bold">Boton de arrepentimiento</h1>

          <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">
            Si te arrepentiste de una compra, puedes pedir la cancelacion enviando este
            formulario. Tienes hasta 10 dias corridos desde que recibiste el producto.
          </p>

          <section className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--soft-gray)] p-6">
            <form className="space-y-3">
              <input
                name="name"
                placeholder="Nombre"
                className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--primary)]"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--primary)]"
              />
              <input
                name="phone"
                placeholder="Telefono"
                className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--primary)]"
              />
              <textarea
                name="message"
                rows={5}
                placeholder="Mensaje"
                className="w-full rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--primary)]"
              />
              <button
                type="button"
                className="inline-flex rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--primary-dark)]"
              >
                Enviar solicitud
              </button>
            </form>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
