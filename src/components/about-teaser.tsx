export function AboutTeaser() {
  return (
    <section id="historia" className="section-padding bg-white">
      <div className="content-max-width">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <img
                src="/images/about-store.jpg"
                alt="Tienda Plateritos"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -right-2 -bottom-4 rounded-2xl bg-[var(--primary)] px-5 py-3 text-white shadow-lg md:-right-6 md:bottom-6">
              <p className="text-2xl font-extrabold md:text-3xl">40+</p>
              <p className="text-xs opacity-90">años de historia</p>
            </div>
          </div>
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--primary)]">
              Empresa
            </span>
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Somos Plateritos, tu libreria de confianza
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
              Hace mas de 40 años acompanamos a estudiantes, familias y amantes de la
              libreria. Estamos en Neuquen Capital y Cipolletti, y llegamos a todo el
              pais con nuestra tienda online.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-pastel-coral/40 p-4">
                <p className="text-sm font-semibold">Rivadavia 555</p>
                <p className="text-xs text-[var(--ink-soft)]">Neuquen Capital</p>
              </div>
              <div className="rounded-2xl bg-pastel-coral/40 p-4">
                <p className="text-sm font-semibold">Gral. Roca 553</p>
                <p className="text-xs text-[var(--ink-soft)]">Cipolletti</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
