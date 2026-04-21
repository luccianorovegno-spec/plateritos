export function PromoSection() {
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="mx-4 overflow-hidden rounded-3xl bg-pastel-yellow sm:mx-6 lg:mx-8">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-8 md:px-12 md:py-12 lg:px-16">
            <span className="mb-4 w-fit rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
              Vuelta al cole 2026
            </span>
            <h3 className="text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
              Preparate con todo para el nuevo año
            </h3>
            <p className="mt-3 max-w-md text-base leading-relaxed text-[var(--ink-soft)]">
              Mochilas, utiles, agendas escolares y mucho mas. Envio gratis en
              compras mayores a $200.000.
            </p>
            <a
              href="#productos"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 font-semibold text-white hover:bg-[var(--primary-dark)]"
            >
              Ver coleccion escolar →
            </a>
          </div>
          <div className="relative flex items-center justify-center py-6 md:py-0">
            <div className="absolute h-48 w-48 rounded-full bg-white/20 md:h-64 md:w-64" />
            <img
              src="/images/promo-vueltaalcole.jpg"
              alt="Vuelta al cole"
              className="relative z-10 w-full max-w-[280px] rounded-3xl object-contain shadow-lg md:max-w-[360px] lg:max-w-[420px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
