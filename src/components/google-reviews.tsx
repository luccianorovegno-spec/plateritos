"use client";

import { useState } from "react";

const reviews = [
  {
    id: 1,
    name: "Maria G.",
    date: "15 abr 2025",
    rating: 5,
    text: "Excelente atencion, encontre todo lo que necesitaba para la vuelta al cole. La calidad de los productos es increible y los precios muy accesibles. ¡Muy recomendable!",
  },
  {
    id: 2,
    name: "Juan P.",
    date: "3 abr 2025",
    rating: 5,
    text: "La variedad de cuadernos y agendas es impresionante. Me encantan los diseños exclusivos que no encontras en otro lado. Atencion personalizada de primera.",
  },
  {
    id: 3,
    name: "Ana L.",
    date: "28 mar 2025",
    rating: 4,
    text: "Envio rapido y bien embalado. Compre desde Buenos Aires y llego perfecto. La unica razon de 4 estrellas es que queria un producto que estaba agotado, pero me avisaron rapido.",
  },
  {
    id: 4,
    name: "Carlos R.",
    date: "10 mar 2025",
    rating: 5,
    text: "Hace años que compro en Plateritos y nunca me decepcionaron. Desde articulos escolares hasta regalos originales, siempre tienen lo mejor. Un clasico de Neuquen.",
  },
  {
    id: 5,
    name: "Lucia M.",
    date: "2 mar 2025",
    rating: 5,
    text: "La tienda fisica es hermosa, muy bien organizada y con una atmosfera acogedora. Online tambien es muy facil de usar. ¡Mis hijos aman ir a Plateritos!",
  },
  {
    id: 6,
    name: "Pedro S.",
    date: "20 feb 2025",
    rating: 5,
    text: "Compre un set de oficina para mi empresa y quedo excelente. La calidad premium a precio accesible es real. Volvere a comprar sin dudas.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${
            star <= rating ? "text-amber-400" : "text-gray-200"
          }`}
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function GoogleReviewsSection() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;
  const maxIndex = Math.max(0, reviews.length - visibleCount);

  const next = () => setStartIndex((prev) => Math.min(prev + 1, maxIndex));
  const prev = () => setStartIndex((prev) => Math.max(prev - 1, 0));

  const visible = reviews.slice(startIndex, startIndex + visibleCount);

  return (
    <section className="section-padding bg-pastel-pink/20">
      <div className="content-max-width">
        <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
          Lo que dicen nuestros clientes
        </h2>

        <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <div className="flex items-center gap-2">
            <StarRating rating={5} />
            <span className="text-sm font-semibold text-[var(--ink-soft)]">
              4.8
            </span>
          </div>
          <span className="hidden text-[var(--ink-soft)] sm:inline">·</span>
          <span className="text-sm text-[var(--ink-soft)]">
            120+ reviews en Google
          </span>
          <a
            href="https://www.google.com/search?q=Libreria+Platerito+Opiniones"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary)] hover:underline"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Ver en Google
          </a>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {visible.map((review) => (
              <div
                key={review.id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="mb-3 flex items-center justify-between">
                  <StarRating rating={review.rating} />
                  <span className="text-xs text-[var(--ink-soft)]">
                    {review.date}
                  </span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-[var(--foreground)]">
                  "{review.text}"
                </p>
                <p className="text-xs font-semibold text-[var(--ink-soft)]">
                  {review.name}
                </p>
              </div>
            ))}
          </div>

          {reviews.length > visibleCount && (
            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                onClick={prev}
                disabled={startIndex === 0}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--foreground)] transition hover:bg-[var(--soft-gray)] disabled:opacity-40"
                aria-label="Anterior"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M12.7 4.3a1 1 0 0 1 0 1.4L8.4 10l4.3 4.3a1 1 0 1 1-1.4 1.4l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 0 1 1.4 0Z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={next}
                disabled={startIndex >= maxIndex}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--foreground)] transition hover:bg-[var(--soft-gray)] disabled:opacity-40"
                aria-label="Siguiente"
              >
                <svg
                  viewBox="0 0 20 20"
                  className="h-5 w-5"
                  fill="currentColor"
                >
                  <path d="M7.3 15.7a1 1 0 0 1 0-1.4L11.6 10 7.3 5.7a1 1 0 0 1 1.4-1.4l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4 0Z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
