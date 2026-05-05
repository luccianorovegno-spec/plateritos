"use client";

import Link from "next/link";

const trends = [
  {
    id: "novedades",
    title: "NOVEDADES",
    href: "/productos?destacado=novedades",
    image: "/images/collection-agendas.jpg",
    bgColor: "#ffe8ef",
  },
  {
    id: "best-seller",
    title: "BEST SELLER",
    href: "/productos?destacado=mas-vendidos",
    image: "/images/collection-arte.jpg",
    bgColor: "#e5f3ff",
  },
  {
    id: "plateritos-friends",
    title: "PLATERITOS FRIENDS",
    href: "/productos?destacado=amigos",
    image: "/images/collection-escolar.jpg",
    bgColor: "#e6faee",
  },
  {
    id: "oportunidades",
    title: "OPORTUNIDADES",
    href: "/productos?destacado=oportunidades",
    image: "/images/collection-regalos.jpg",
    bgColor: "#fff5d9",
  },
];

export function TrendingSection() {
  return (
    <section className="section-padding bg-white">
      <div className="content-max-width">
        <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">
          Tendencias del{" "}
          <span className="text-[var(--primary)]">momento</span>
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {trends.map((trend) => (
            <Link
              key={trend.id}
              href={trend.href}
              className="group block"
            >
              <div
                className="relative mb-4 aspect-square overflow-hidden rounded-3xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-lg"
                style={{ backgroundColor: trend.bgColor }}
              >
                <img
                  src={trend.image}
                  alt={trend.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <p className="text-center text-sm font-bold uppercase tracking-wider text-[var(--foreground)] transition-colors group-hover:text-[var(--primary)] md:text-base">
                {trend.title}{" "}
                <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
