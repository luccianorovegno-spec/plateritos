import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCategories } from "@/lib/tiendanube";

export default async function ProfilePage() {
  const categories = await getCategories(20);

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader categories={categories} />
      <main className="section-padding">
        <div className="content-max-width max-w-3xl">
          <h1 className="text-4xl font-bold">Perfil</h1>
          <p className="mt-4 text-[var(--ink-soft)]">
            Accede a tu cuenta para revisar pedidos, datos personales y direcciones.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-[var(--line)] bg-[var(--soft-gray)] p-6">
              <h2 className="text-xl font-semibold">Iniciar sesion</h2>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">
                Si ya compraste en Plateritos, entra con tu email para ver tu historial.
              </p>
              <button className="mt-5 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-white">
                Ingresar
              </button>
            </article>

            <article className="rounded-2xl border border-[var(--line)] bg-white p-6">
              <h2 className="text-xl font-semibold">Crear cuenta</h2>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">
                Registrate para guardar tus datos y acelerar tu proceso de compra.
              </p>
              <button className="mt-5 rounded-xl border border-[var(--line)] px-4 py-2.5">
                Registrarme
              </button>
            </article>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
