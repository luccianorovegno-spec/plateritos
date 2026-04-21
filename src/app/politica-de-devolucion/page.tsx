import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCategories } from "@/lib/tiendanube";

export default async function ReturnPolicyPage() {
  const categories = await getCategories(20);

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader categories={categories} />
      <main className="section-padding">
        <div className="content-max-width max-w-4xl">
          <h1 className="text-4xl font-bold">Politica de Devolucion</h1>
          <p className="mt-4 text-[var(--ink-soft)]">
            Queremos que compres con tranquilidad. Si algo no salio como esperabas,
            te ayudamos a resolverlo rapido.
          </p>

          <section className="mt-8 space-y-6 text-sm leading-relaxed text-[var(--foreground)]">
            <article>
              <h2 className="text-xl font-semibold">1. Plazo para cambios</h2>
              <p className="mt-2">
                Aceptamos solicitudes de cambio o devolucion dentro de los 10 dias
                corridos desde que recibiste tu pedido.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold">2. Condiciones del producto</h2>
              <p className="mt-2">
                El producto debe estar sin uso, en su empaque original y con todos
                sus accesorios o etiquetas.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold">3. Productos con falla</h2>
              <p className="mt-2">
                Si el producto llego con defecto, contactanos con fotos y numero de
                pedido. Te daremos prioridad para reposicion o reintegro.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold">4. Costos de envio</h2>
              <p className="mt-2">
                Cuando la devolucion es por falla o error de preparacion, asumimos
                el costo logistico. En otros casos, el envio puede quedar a cargo del
                cliente.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-semibold">5. Contacto</h2>
              <p className="mt-2">
                Escribinos por WhatsApp al +54 299 505 0045 o por email a
                hola@plateritos.com.ar para iniciar cualquier gestion.
              </p>
            </article>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
