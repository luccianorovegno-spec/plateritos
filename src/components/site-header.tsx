"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { catalogMenu } from "@/data/catalog-menu";
import type { Category } from "@/lib/tiendanube";

type SiteHeaderProps = {
  categories?: Category[];
  cartCount?: number;
};

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="7" />
      <line x1="16.65" y1="16.65" x2="21" y2="21" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.8-4 5-6 8-6s6.2 2 8 6" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 7h12l-1 13H7L6 7z" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

const quickLinks = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader({ categories: _categories = [], cartCount = 0 }: SiteHeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategorySlug, setActiveCategorySlug] = useState(catalogMenu[0]?.slug || "");
  const hasDynamicCategories = _categories.length > 0;

  const activeCategory =
    catalogMenu.find((item) => item.slug === activeCategorySlug) || catalogMenu[0];

  useEffect(() => {
    document.body.style.overflow = cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  const cartDrawer = cartOpen ? (
    <div className="fixed inset-0 z-[200]">
      <button
        type="button"
        aria-label="Cerrar carrito"
        onClick={() => setCartOpen(false)}
        className="absolute inset-0 bg-black/35"
      />
      <aside className="absolute top-0 right-0 flex h-full w-full max-w-[560px] flex-col border-l border-[var(--line)] bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-[var(--line)] px-6 py-6">
          <h3 className="text-3xl font-semibold">Carrito de compras</h3>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="rounded-full p-2 text-[var(--ink-soft)] hover:bg-[var(--soft-gray)]"
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 20 20" className="h-6 w-6" fill="currentColor">
              <path d="M11.4 10l4.3-4.3a1 1 0 0 0-1.4-1.4L10 8.6 5.7 4.3a1 1 0 0 0-1.4 1.4L8.6 10l-4.3 4.3a1 1 0 1 0 1.4 1.4L10 11.4l4.3 4.3a1 1 0 0 0 1.4-1.4L11.4 10Z" />
            </svg>
          </button>
        </header>

        <div className="p-6">
          <div className="rounded-md border border-[#8ec0e6] bg-[#f8fcff] px-4 py-3 text-center text-sm text-[#4d94cf]">
            El carrito de compras esta vacio.
          </div>
        </div>

        <div className="mt-auto border-t border-[var(--line)] p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              disabled
              className="rounded-xl bg-[var(--foreground)] px-4 py-3 text-sm font-semibold text-white opacity-50"
            >
              Finalizar compra
            </button>
            <button
              type="button"
              onClick={() => {
                setCartOpen(false);
                window.location.href = "/productos";
              }}
              className="rounded-xl border border-[var(--line)] px-4 py-3 text-sm font-semibold"
            >
              Ver productos
            </button>
          </div>
        </div>
      </aside>
    </div>
  ) : null;

  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--line)] bg-white/95 backdrop-blur-md"
      data-has-dynamic-categories={hasDynamicCategories}
    >
      <div className="border-b border-[var(--line)] bg-[#fff5d9]">
        <div className="content-max-width flex min-h-9 items-center justify-between gap-3 py-1 text-xs text-[var(--ink-soft)]">
          <p>Envio gratis superando $200.000</p>
          <p className="hidden sm:block">3 cuotas sin interes con Visa o Master</p>
          <Link
            href="/localizador-de-tienda"
            className="hidden font-semibold text-[var(--foreground)] underline-offset-2 hover:underline lg:block"
          >
            Localizador de tienda
          </Link>
        </div>
      </div>

      <div className="content-max-width grid grid-cols-[auto_1fr_auto] items-center gap-3 py-3 md:gap-6">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo-platerito.webp"
            alt="Platerito"
            width={220}
            height={61}
            priority
            className="h-10 w-auto md:h-11"
          />
        </Link>

        <form action="/busqueda" className="hidden w-full md:flex">
          <label className="relative w-full">
            <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[var(--ink-soft)]">
              <SearchIcon />
            </span>
            <input
              type="search"
              name="q"
              placeholder="Buscar cuadernos, agendas, mochilas..."
              className="w-full rounded-full border border-[var(--line)] bg-[var(--soft-gray)] py-3 pr-4 pl-12 text-sm outline-none transition focus:border-[var(--primary)]"
            />
          </label>
        </form>

        <div className="hidden items-center gap-1 text-[var(--foreground)] md:flex">
          <Link
            href="/busqueda"
            aria-label="Busqueda"
            className="rounded-full p-2.5 transition hover:bg-[var(--soft-gray)]"
          >
            <SearchIcon />
          </Link>
          <Link
            href="/perfil"
            aria-label="Perfil"
            className="rounded-full p-2.5 transition hover:bg-[var(--soft-gray)]"
          >
            <UserIcon />
          </Link>
          <button
            type="button"
            aria-label="Carrito"
            onClick={() => setCartOpen(true)}
            className="relative rounded-full p-2.5 transition hover:bg-[var(--soft-gray)]"
          >
            <BagIcon />
            <span className="absolute -top-0.5 -right-0.5 rounded-full bg-[var(--primary)] px-1.5 text-[10px] font-bold text-white">
              {cartCount}
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-semibold md:hidden"
        >
          Menu
        </button>
      </div>

      <div className="hidden border-t border-[var(--line)] md:block">
        <div className="content-max-width flex items-center gap-8 py-3 text-[15px] font-semibold">
          <Link
            href="/"
            className={`transition hover:text-[var(--primary)] ${
              pathname === "/" ? "text-[var(--primary)]" : "text-[var(--foreground)]"
            }`}
          >
            Inicio
          </Link>

          <div className="group relative" onMouseEnter={() => setActiveCategorySlug(catalogMenu[0]?.slug || "")}> 
            <Link
              href="/productos"
              className={`inline-flex items-center gap-1 transition hover:text-[var(--primary)] ${
                pathname === "/productos" ? "text-[var(--primary)]" : "text-[var(--foreground)]"
              }`}
            >
              Productos
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
                <path d="M5.5 7.5 10 12l4.5-4.5" />
              </svg>
            </Link>

            <div className="invisible absolute top-full left-0 z-40 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <div className="grid min-w-[820px] grid-cols-[1.15fr_1fr] gap-5 rounded-2xl border border-[var(--line)] bg-white p-5 shadow-xl">
                <div className="grid grid-cols-2 gap-2">
                  {catalogMenu.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/productos?categoria=${encodeURIComponent(item.slug)}`}
                      onMouseEnter={() => setActiveCategorySlug(item.slug)}
                      className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
                        activeCategorySlug === item.slug
                          ? "bg-pastel-coral text-[var(--foreground)]"
                          : "text-[var(--foreground)] hover:bg-[var(--soft-gray)]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="rounded-xl bg-[var(--soft-gray)] p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--ink-soft)]">
                    {activeCategory?.label}
                  </p>
                  {activeCategory?.children?.length ? (
                    <ul className="space-y-1">
                      {activeCategory.children.map((child) => (
                        <li key={child.slug}>
                          <Link
                            href={`/productos?categoria=${encodeURIComponent(activeCategory.slug)}&subcategoria=${encodeURIComponent(child.slug)}`}
                            className="block rounded-lg px-2 py-1.5 text-sm text-[var(--foreground)] hover:bg-white"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-[var(--ink-soft)]">Selecciona esta categoria para ver todos sus productos.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/contacto"
            className={`transition hover:text-[var(--primary)] ${
              pathname === "/contacto" ? "text-[var(--primary)]" : "text-[var(--foreground)]"
            }`}
          >
            Contacto
          </Link>
        </div>
      </div>

      {mobileOpen ? (
        <div className="border-t border-[var(--line)] bg-white md:hidden">
          <div className="content-max-width space-y-4 py-4">
            <form action="/busqueda">
              <label className="relative block">
                <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-[var(--ink-soft)]">
                  <SearchIcon />
                </span>
                <input
                  type="search"
                  name="q"
                  placeholder="Buscar productos..."
                  className="w-full rounded-full border border-[var(--line)] bg-[var(--soft-gray)] py-3 pr-4 pl-12 text-sm outline-none"
                />
              </label>
            </form>

            <div className="space-y-1">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-2 py-2 text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--soft-gray)]"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/perfil"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-2 py-2 text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--soft-gray)]"
              >
                Perfil
              </Link>
              <button
                type="button"
                onClick={() => {
                  setCartOpen(true);
                  setMobileOpen(false);
                }}
                className="block w-full rounded-lg px-2 py-2 text-left text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--soft-gray)]"
              >
                Carrito
              </button>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--ink-soft)]">Categorias</p>
              <div className="space-y-2">
                {catalogMenu.map((item) => (
                  <details key={item.slug} className="rounded-lg bg-[var(--soft-gray)]">
                    <summary className="cursor-pointer list-none px-3 py-2 text-xs font-semibold text-[var(--foreground)]">
                      {item.label}
                    </summary>
                    <div className="space-y-1 px-3 pb-3">
                      <Link
                        href={`/productos?categoria=${encodeURIComponent(item.slug)}`}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-md bg-white px-2 py-1.5 text-xs text-[var(--foreground)]"
                      >
                        Ver todo
                      </Link>
                      {item.children?.map((child) => (
                        <Link
                          key={child.slug}
                          href={`/productos?categoria=${encodeURIComponent(item.slug)}&subcategoria=${encodeURIComponent(child.slug)}`}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-md bg-white px-2 py-1.5 text-xs text-[var(--foreground)]"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {typeof window !== "undefined" && cartOpen ? createPortal(cartDrawer, document.body) : null}
    </header>
  );
}
