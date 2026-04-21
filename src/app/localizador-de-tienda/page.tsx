import { StoreLocator } from "@/components/store-locator";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getCategories } from "@/lib/tiendanube";

const stores = [
  {
    name: "Platerito Neuquen",
    address: "Rivadavia 555, Neuquen Capital",
    city: "Neuquen, Argentina",
    hours: "Lunes a sabado · 9:00 a 20:00",
    mapQuery: "Rivadavia 555, Neuquen, Argentina",
  },
  {
    name: "Platerito Cipolletti",
    address: "Gral. Roca 553, Cipolletti",
    city: "Cipolletti, Rio Negro, Argentina",
    hours: "Lunes a sabado · 9:00 a 20:00",
    mapQuery: "General Roca 553, Cipolletti, Rio Negro, Argentina",
  },
];

export default async function StoreLocatorPage() {
  const categories = await getCategories(20);

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader categories={categories} />
      <main className="section-padding">
        <div className="content-max-width max-w-4xl">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">
            Boutique Locator
          </p>
          <h1 className="mt-2 text-4xl font-bold">Localizador de tienda</h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
            Encuentra tu sucursal mas cercana. Selecciona una tienda y consulta su
            ubicacion en el mapa de la derecha.
          </p>

          <StoreLocator stores={stores} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
