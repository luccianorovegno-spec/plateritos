"use client";

import { useState } from "react";

import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import type { Product } from "@/lib/tiendanube";

type TabKey = "novedades" | "mas-vendidos" | "oportunidades";

const tabs: { key: TabKey; label: string }[] = [
  { key: "novedades", label: "NOVEDADES" },
  { key: "mas-vendidos", label: "MÁS VENDIDOS" },
  { key: "oportunidades", label: "OPORTUNIDADES" },
];

type NewArrivalsSectionProps = {
  products: Product[];
};

export function NewArrivalsSection({ products }: NewArrivalsSectionProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("novedades");

  const filtered = (() => {
    switch (activeTab) {
      case "novedades":
        return products.slice(0, 4).map((p, i) => ({
          ...p,
          images: [`/images/product-${i + 1}.jpg`],
        }));
      case "mas-vendidos": {
        const sorted = [...products].sort(
          (a, b) => (b.stock ?? 0) - (a.stock ?? 0),
        );
        return sorted.slice(0, 4);
      }
      case "oportunidades": {
        const onSale = products.filter((p) => p.promotionalPrice);
        return onSale.length ? onSale.slice(0, 4) : products.slice(0, 4);
      }
      default:
        return products.slice(0, 4);
    }
  })();

  return (
    <section className="section-padding bg-white">
      <div className="content-max-width">
        <SectionHeading
          title="Novedades"
          subtitle="Descubri lo ultimo que llego a Plateritos"
        />

        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-[var(--primary)] text-white shadow-md"
                  : "bg-[var(--soft-gray)] text-[var(--ink-soft)] hover:bg-[var(--line)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={`${activeTab}-${product.id}`} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
