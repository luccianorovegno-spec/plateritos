import Link from "next/link";

import type { Product } from "@/lib/tiendanube";
import { formatArs } from "@/lib/tiendanube";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0];
  const hasPromo =
    typeof product.promotionalPrice === "number" &&
    product.promotionalPrice < product.price;
  const finalPrice = hasPromo ? product.promotionalPrice : product.price;
  const currentPrice = finalPrice ?? product.price;
  const discount = hasPromo
    ? Math.round((1 - currentPrice / product.price) * 100)
    : undefined;
  const category = product.tags[0] || "Papeleria";

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <Link
        href={`/producto/${product.handle}`}
        className="relative block aspect-square overflow-hidden bg-[var(--soft-gray)]"
      >
        {image ? (
          <img
            src={image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-pastel-blue" />
        )}
        {hasPromo ? (
          <span className="absolute top-3 left-3 rounded-md bg-[var(--primary)] px-2 py-1 text-[10px] font-bold text-white uppercase">
            Oferta
          </span>
        ) : (
          <span className="absolute top-3 left-3 rounded-md bg-emerald-500 px-2 py-1 text-[10px] font-bold text-white uppercase">
            Nuevo
          </span>
        )}
      </Link>
      <div className="p-4">
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--ink-soft)]">
          {category}
        </p>
        <Link href={`/producto/${product.handle}`}>
          <h3 className="mb-2 line-clamp-1 text-[15px] font-semibold leading-snug group-hover:text-[var(--primary)]">
            {product.name}
          </h3>
        </Link>
        <div className="mb-1 flex items-center gap-2">
          <span className="text-lg font-bold text-[var(--primary)]">
            {formatArs(currentPrice)}
          </span>
          {hasPromo ? (
            <>
              <span className="text-sm text-[var(--ink-soft)] line-through">
                {formatArs(product.price)}
              </span>
              <span className="rounded-md bg-pastel-coral px-1.5 py-0.5 text-[10px] font-bold text-[var(--primary)]">
                -{discount}%
              </span>
            </>
          ) : null}
        </div>
        <p className="mb-3 text-xs text-[var(--ink-soft)]">
          6 cuotas sin interes de {formatArs(Math.round(currentPrice / 6))}
        </p>
        <Link
          href={`/producto/${product.handle}`}
          className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--primary)] py-2.5 text-sm font-semibold text-white hover:bg-[var(--primary-dark)]"
        >
          Ver producto
        </Link>
      </div>
    </article>
  );
}
