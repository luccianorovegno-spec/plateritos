const brandLogos = [
  "/brands/marca-1.webp",
  "/brands/marca-2.webp",
  "/brands/marca-3.webp",
  "/brands/marca-4.webp",
  "/brands/marca-5.webp",
  "/brands/marca-6.webp",
  "/brands/marca-7.webp",
  "/brands/marca-8.webp",
];

export function BrandsCarousel() {
  const loop = [...brandLogos, ...brandLogos];

  return (
    <section className="overflow-hidden border-t border-[var(--line)] bg-white py-10 md:py-14">
      <div className="content-max-width mb-8">
        <h2 className="text-center text-2xl font-bold md:text-4xl">Nuestras marcas</h2>
      </div>

      <div className="relative">
        <div className="animate-marquee flex hover:[animation-play-state:paused]">
          {loop.map((logo, index) => (
            <div key={`${logo}-${index}`} className="mx-4 flex-shrink-0 md:mx-6">
              <div className="flex h-32 w-32 items-center justify-center rounded-2xl border border-[var(--line)] bg-white p-3 shadow-sm md:h-36 md:w-36">
                <div className="h-full w-full overflow-hidden rounded-full">
                  <img
                    src={logo}
                    alt={`Marca ${((index % brandLogos.length) + 1).toString()}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
