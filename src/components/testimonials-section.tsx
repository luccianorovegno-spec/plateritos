"use client";

import { useState } from "react";

const testimonials = [
  {
    id: "1",
    name: "Wanda Montecino",
    text: "Siempre infalible y la atencion excelente. Mis suenos de nina cumplidos por una libreria historica.",
  },
  {
    id: "2",
    name: "Yasmin Manquelef",
    text: "Compramos toda la lista del colegio y me parecio muy economico. La atencion excelente.",
  },
  {
    id: "3",
    name: "Analia Maldonado",
    text: "Compre desde otra provincia y quede muy satisfecha por la calidad y rapidez del envio.",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const item = testimonials[current];

  return (
    <section className="section-padding bg-pastel-lavender/40">
      <div className="content-max-width">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold md:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
          <div className="mt-4 flex justify-center">
            <div className="h-2 w-2 rounded-full bg-[var(--primary)]" />
          </div>
        </div>

        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm md:p-12">
          <p className="mb-6 text-base leading-relaxed italic md:text-lg">
            &ldquo;{item.text}&rdquo;
          </p>
          <div className="flex items-center justify-between">
            <p className="font-bold">{item.name}</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setCurrent((prev) =>
                    prev === 0 ? testimonials.length - 1 : prev - 1,
                  )
                }
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)]"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)]"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
