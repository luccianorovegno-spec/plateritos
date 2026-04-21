"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image: "/images/hero-1.jpg",
    badge: "Nueva coleccion",
    title: "Descubri una libreria creativa para estudiar mejor",
    subtitle:
      "Cuadernos, agendas y esenciales de oficina con estilo premium accesible.",
  },
  {
    id: 2,
    image: "/images/hero-2.jpg",
    badge: "Vuelta al cole",
    title: "Todo lo escolar en un solo lugar",
    subtitle:
      "Seleccion curada para primaria, secundaria y universidad con diseno pastel.",
  },
  {
    id: 3,
    image: "/images/hero-3.jpg",
    badge: "Organizacion diaria",
    title: "Planifica tu dia con color y claridad",
    subtitle:
      "Sistemas de organizacion que combinan productividad y estetica.",
  },
];

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full">
      <article className="relative h-[430px] overflow-hidden md:h-[620px]">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/18 to-transparent" />
          </div>
        ))}

        <div className="content-max-width relative z-10 flex h-full items-center">
          <div className="max-w-2xl px-4 text-white md:px-0">
            <p className="inline-flex rounded-full bg-white/25 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-sm">
              {slides[index].badge}
            </p>
            <h1 className="mt-4 text-4xl leading-tight font-semibold md:text-6xl">
              {slides[index].title}
            </h1>
            <p className="mt-4 max-w-xl text-sm text-white/90 md:text-base">
              {slides[index].subtitle}
            </p>
            <a
              href="#productos"
              className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold text-[var(--foreground)]"
            >
              Ver productos
            </a>
          </div>
        </div>

        <button
          type="button"
          aria-label="Slide anterior"
          onClick={prev}
          className="absolute top-1/2 left-4 z-20 -translate-y-1/2 rounded-full bg-white/25 p-3 text-white backdrop-blur-sm transition hover:bg-white/35 md:left-10"
        >
          <svg viewBox="0 0 20 20" className="h-6 w-6" fill="currentColor">
            <path d="M12.7 4.3a1 1 0 0 1 0 1.4L8.4 10l4.3 4.3a1 1 0 1 1-1.4 1.4l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 0 1 1.4 0Z" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Slide siguiente"
          onClick={next}
          className="absolute top-1/2 right-4 z-20 -translate-y-1/2 rounded-full bg-white/25 p-3 text-white backdrop-blur-sm transition hover:bg-white/35 md:right-10"
        >
          <svg viewBox="0 0 20 20" className="h-6 w-6" fill="currentColor">
            <path d="M7.3 15.7a1 1 0 0 1 0-1.4L11.6 10 7.3 5.7a1 1 0 0 1 1.4-1.4l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4 0Z" />
          </svg>
        </button>

        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              className={`h-2.5 rounded-full transition-all ${
                i === index ? "w-8 bg-white" : "w-2.5 bg-white/60"
              }`}
              onClick={() => setIndex(i)}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
        </div>
      </article>
    </section>
  );
}
