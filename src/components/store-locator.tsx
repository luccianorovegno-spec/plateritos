"use client";

import { useState } from "react";

type Store = {
  name: string;
  address: string;
  city: string;
  hours: string;
  mapQuery: string;
};

type StoreLocatorProps = {
  stores: Store[];
};

export function StoreLocator({ stores }: StoreLocatorProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = stores[selectedIndex];
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(selected.mapQuery)}&z=15&output=embed`;

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      <section className="space-y-3">
        {stores.map((store, index) => (
          <button
            key={store.name}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={`w-full rounded-2xl border p-5 text-left transition ${
              selectedIndex === index
                ? "border-[var(--primary)] bg-pastel-coral/40"
                : "border-[var(--line)] bg-[var(--soft-gray)] hover:border-[var(--primary)]/40"
            }`}
          >
            <p className="text-lg font-semibold">{store.name}</p>
            <p className="mt-1 text-sm text-[var(--ink-soft)]">{store.address}</p>
            <p className="mt-1 text-sm text-[var(--ink-soft)]">{store.city}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[var(--foreground)]/80">
              {store.hours}
            </p>
          </button>
        ))}
      </section>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
          <iframe
            title={`Mapa de ${selected.name}`}
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[460px] w-full"
          />
        </div>
      </aside>
    </div>
  );
}
