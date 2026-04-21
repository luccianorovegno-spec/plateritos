import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCategories } from "@/lib/tiendanube";

export default async function ContactoPage() {
  const categories = await getCategories(20);

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader categories={categories} />
      <main className="section-padding">
        <div className="content-max-width max-w-4xl">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">Ayuda</p>
            <h1 className="mt-2 text-4xl font-bold">Contacto</h1>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
              Para pedidos de presupuesto para empresas escribe a{" "}
              <a className="text-[var(--primary)]" href="mailto:atencionalempresas@gmail.com">
                atencionalempresas@gmail.com
              </a>
              . Si prefieres, tambien puedes hablar con nosotros por WhatsApp.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <section className="rounded-2xl border border-[var(--line)] bg-[var(--soft-gray)] p-6">
              <h2 className="text-xl font-semibold">Canales de contacto</h2>
              <ul className="mt-4 space-y-3 text-sm text-[var(--foreground)]">
                <li>
                  WhatsApp:{" "}
                  <a
                    href="https://wa.me/542995050045"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--primary)]"
                  >
                    (299) 505-0045
                  </a>
                </li>
                <li>
                  Email:{" "}
                  <a className="text-[var(--primary)]" href="mailto:hola@plateritos.com.ar">
                    hola@plateritos.com.ar
                  </a>
                </li>
                <li>Rivadavia 555, Neuquen</li>
                <li>Gral. Roca 553, Cipolletti</li>
              </ul>
              <Link
                href="/boton-de-arrepentimiento"
                className="mt-6 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[var(--foreground)] ring-1 ring-[var(--line)]"
              >
                Ir al boton de arrepentimiento
              </Link>
            </section>

            <section className="rounded-2xl border border-[var(--line)] bg-white p-6">
              <h2 className="text-xl font-semibold">Escribenos</h2>
              <form className="mt-4 space-y-3">
                <input
                  name="name"
                  placeholder="Nombre"
                  className="w-full rounded-xl border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)]"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-xl border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)]"
                />
                <input
                  name="phone"
                  placeholder="Telefono"
                  className="w-full rounded-xl border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)]"
                />
                <textarea
                  name="message"
                  placeholder="Mensaje"
                  rows={4}
                  className="w-full rounded-xl border border-[var(--line)] px-4 py-3 text-sm outline-none focus:border-[var(--primary)]"
                />
                <button
                  type="button"
                  className="inline-flex rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--primary-dark)]"
                >
                  Enviar
                </button>
              </form>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
