import Image from "next/image";
import Link from "next/link";

const buyLinks = [
  "Agendas",
  "Cuadernos",
  "Arte y dibujo",
  "Escolar",
  "Juegos",
  "Mochilas",
  "Oficina",
  "Regalos",
];

const helpLinks = [
  { label: "Medios de pago", href: "#" },
  { label: "Politica de devolucion", href: "/politica-de-devolucion" },
  { label: "Terminos y condiciones", href: "#" },
  { label: "Boton de arrepentimiento", href: "/boton-de-arrepentimiento" },
  { label: "Contacto", href: "/contacto" },
  { label: "Preguntas frecuentes", href: "#" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--soft-gray)]">
      <div className="content-max-width py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo-platerito.webp"
                alt="Platerito"
                width={220}
                height={61}
                className="h-11 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--ink-soft)]">
              Hace mas de 40 años acompanamos a estudiantes, familias y amantes de la
              libreria en Neuquen Capital y Cipolletti.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a
                href="https://instagram.com/libreria.platerito"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Platerito"
                className="rounded-xl border border-[var(--line)] bg-white p-2.5 text-[var(--foreground)] transition hover:text-[var(--primary)]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.9">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://facebook.com/libreriaplaterito"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Platerito"
                className="rounded-xl border border-[var(--line)] bg-white p-2.5 text-[var(--foreground)] transition hover:text-[var(--primary)]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M13.5 21v-7h2.3l.4-3h-2.7V9.2c0-.9.2-1.5 1.5-1.5h1.3V5.1c-.2 0-1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.5v3H11v7h2.5z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-base font-bold">Comprar</h4>
            <ul className="space-y-2.5 text-sm text-[var(--ink-soft)]">
              {buyLinks.map((item) => (
                <li key={item}>
                  <a href="/productos" className="hover:text-[var(--primary)]">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-base font-bold">Ayuda</h4>
            <ul className="space-y-2.5 text-sm text-[var(--ink-soft)]">
              {helpLinks.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-[var(--primary)]">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-base font-bold">Contacto</h4>
            <ul className="space-y-3 text-sm text-[var(--ink-soft)]">
              <li>
                <a
                  href="https://wa.me/542995050045"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--primary)]"
                >
                  (299) 505-0045
                </a>
              </li>
              <li>
                <a href="mailto:hola@plateritos.com.ar" className="hover:text-[var(--primary)]">
                  hola@plateritos.com.ar
                </a>
              </li>
              <li>Rivadavia 555, Neuquen</li>
              <li>Gral. Roca 553, Cipolletti</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--line)] pt-6 sm:flex-row">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--ink-soft)]">
            <span>© 2026 Plateritos. Todos los derechos reservados.</span>
            <span className="hidden sm:inline">|</span>
            <a
              href="https://autogestion.produccion.gob.ar/consumidores"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--primary)]"
            >
              Defensa del consumidor
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="/boton-de-arrepentimiento" className="hover:text-[var(--primary)]">
              Boton de arrepentimiento
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
