const features = [
  { title: "Envio gratis", desc: "Superando $200.000" },
  { title: "3 cuotas sin interes", desc: "Con Visa o Master" },
  { title: "40 años de trayectoria", desc: "Confianza y calidad" },
  { title: "Atencion personalizada", desc: "" },
];

export function FeaturesBar() {
  return (
    <section className="border-b border-[var(--line)] bg-white">
      <div className="content-max-width py-6">
        <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-4">
          {features.map((item) => (
            <article key={item.title} className="flex items-center gap-3 md:gap-4">
              <div className="bg-pastel-coral flex h-10 w-10 items-center justify-center rounded-xl text-sm md:h-12 md:w-12">
                ✓
              </div>
              <div>
                <p className="truncate text-sm font-bold">{item.title}</p>
                {item.desc ? (
                  <p className="truncate text-xs text-[var(--ink-soft)]">{item.desc}</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
