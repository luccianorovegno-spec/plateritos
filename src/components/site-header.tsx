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

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M13.601 2.326A7.854 7.854 0 0 0 8.008 0C3.626 0 .05 3.576.05 7.958c0 1.401.366 2.77 1.062 3.977L0 16l4.151-1.089a7.953 7.953 0 0 0 3.854.981h.003c4.382 0 7.958-3.576 7.958-7.958a7.93 7.93 0 0 0-2.365-5.608ZM8.008 14.55a6.61 6.61 0 0 1-3.37-.92l-.242-.145-2.463.646.657-2.401-.157-.248A6.607 6.607 0 0 1 1.41 7.958a6.602 6.602 0 0 1 6.598-6.598 6.58 6.58 0 0 1 4.672 1.934 6.57 6.57 0 0 1 1.94 4.664c-.004 3.636-2.97 6.592-6.612 6.592Z" />
      <path d="M11.615 9.75c-.197-.1-1.17-.578-1.353-.644-.182-.066-.315-.1-.447.1-.132.197-.512.644-.628.776-.116.132-.231.149-.428.05-.197-.1-.83-.306-1.58-.975-.584-.52-.978-1.164-1.093-1.36-.116-.198-.012-.305.087-.404.09-.089.198-.232.296-.347.1-.116.132-.198.198-.33.066-.132.033-.248-.017-.347-.05-.1-.446-1.074-.61-1.47-.161-.387-.324-.334-.446-.34l-.38-.007a.727.727 0 0 0-.528.248c-.182.198-.694.678-.694 1.652 0 .975.71 1.916.809 2.049.099.132 1.393 2.128 3.376 2.984.472.204.84.325 1.127.416.474.151.906.13 1.247.079.38-.057 1.17-.478 1.336-.941.165-.462.165-.858.115-.941-.05-.083-.182-.132-.38-.231Z" />
    </svg>
  );
}

const quickLinks = [
  { href: "/", label: "Inicio" },
  { href: "/productos", label: "Productos" },
  { href: "/productos?destacado=novedades", label: "Destacados" },
  { href: "/productos?regalos=recomendados", label: "Ideas de Regalos" },
  { href: "/empresa", label: "Empresa" },
  { href: "/contacto", label: "Contacto" },
];

const topBannerItems = [
  "ENVIOS GRATIS DESDE $ 200.000",
  "REGISTRATE EN EL NEWSLETTER Y OBTIENE UN 20% EN LA PRIMER COMPRA",
  "ENCUENTRA TU TIENDA CERCA",
  "HASTA 6 CUOTAS SIN INTERES",
];

const featuredHighlights = [
  {
    title: "NOVEDADES",
    href: "/productos?destacado=novedades",
    image: "/images/collection-regalos.jpg",
  },
  {
    title: "MAS VENDIDOS",
    href: "/productos?destacado=mas-vendidos",
    image: "/images/collection-escolar.jpg",
  },
  {
    title: "OPORTUNIDADES",
    href: "/productos?destacado=oportunidades",
    image: "/images/promo-vueltaalcole.jpg",
  },
];

const giftIdeasMenu = [
  {
    title: "¿PARA QUE OCASIÓN?",
    items: [
      { label: "Cumpleaños", href: "/productos?regalos=ocasion-cumpleanos" },
      { label: "Aniversario", href: "/productos?regalos=ocasion-aniversario" },
      { label: "Graduación", href: "/productos?regalos=ocasion-graduacion" },
      { label: "Vuelta al cole", href: "/productos?regalos=ocasion-vuelta-al-cole" },
      { label: "Amigo invisible", href: "/productos?regalos=ocasion-amigo-invisible" },
    ],
  },
  {
    title: "HOBBIES Y PASIONES",
    items: [
      { label: "Fútbol", href: "/productos?regalos=hobby-futbol" },
      { label: "Basketball", href: "/productos?regalos=hobby-basketball" },
      { label: "Arte y dibujo", href: "/productos?regalos=hobby-arte" },
      { label: "Lectura", href: "/productos?regalos=hobby-lectura" },
      { label: "Viajes", href: "/productos?regalos=hobby-viajes" },
    ],
  },
  {
    title: "RECOMENDADOS",
    items: [{ label: "Ver recomendados", href: "/productos?regalos=recomendados" }],
  },
];

const companyMenu = [
  { title: "Nosotros", href: "/empresa#nosotros" },
  { title: "Trabaja en Plateritos", href: "/empresa#trabaja-con-nosotros" },
  { title: "Comentarios y Sugerencias", href: "/contacto#comentarios-sugerencias" },
];

type CategoryIconKind =
  | "paint"
  | "pouch"
  | "notebook"
  | "folder"
  | "school"
  | "colors"
  | "pen"
  | "marker"
  | "backpack"
  | "sticky"
  | "glue"
  | "paper"
  | "scissors"
  | "bundle"
  | "calc"
  | "calendar"
  | "puzzle"
  | "book";

const categoryIconBySlug: Record<string, CategoryIconKind> = {
  "acuarela-temperas-masas": "paint",
  cartucheras: "pouch",
  cuadernos: "notebook",
  "carpetas-escolares": "folder",
  "elementos-escolares": "school",
  "lapices-de-colores": "colors",
  "lapices-negros-y-portaminas": "pen",
  "lapiceras-y-resaltadores": "pen",
  marcadores: "marker",
  "mochilas-luncheras": "backpack",
  "notas-adhesivas": "sticky",
  "pegamentos-y-cintas-adhesivas": "glue",
  "repuestos-de-hojas-escolares": "paper",
  "tijeras-y-cutter": "scissors",
  papeleria: "paper",
  "kit-escolares": "bundle",
  calculadoras: "calc",
  "calendarios-y-planificadores": "calendar",
  rompecabezas: "puzzle",
  "libros-para-colorear": "book",
};

function CategoryIcon({ kind }: { kind: CategoryIconKind }) {
  switch (kind) {
    case "paint":
      return <span aria-hidden="true">🎨</span>;
    case "pouch":
      return <span aria-hidden="true">👝</span>;
    case "folder":
      return <span aria-hidden="true">📁</span>;
    case "school":
      return <span aria-hidden="true">📐</span>;
    case "colors":
      return <span aria-hidden="true">🖍️</span>;
    case "pen":
      return <span aria-hidden="true">✏️</span>;
    case "marker":
      return <span aria-hidden="true">🖊️</span>;
    case "backpack":
      return <span aria-hidden="true">🎒</span>;
    case "sticky":
      return <span aria-hidden="true">🗒️</span>;
    case "glue":
      return <span aria-hidden="true">🧴</span>;
    case "paper":
      return <span aria-hidden="true">📄</span>;
    case "scissors":
      return <span aria-hidden="true">✂️</span>;
    case "bundle":
      return <span aria-hidden="true">🧰</span>;
    case "calc":
      return <span aria-hidden="true">🧮</span>;
    case "calendar":
      return <span aria-hidden="true">🗓️</span>;
    case "puzzle":
      return <span aria-hidden="true">🧩</span>;
    case "book":
      return <span aria-hidden="true">📚</span>;
    case "notebook":
    default:
      return <span aria-hidden="true">📓</span>;
  }
}

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
        <div className="w-full overflow-hidden py-1">
          <div
            className="flex min-h-7 w-max items-center gap-3 px-4 text-xs whitespace-nowrap text-[var(--ink-soft)] md:px-6"
            style={{ animation: "top-banner-marquee 20s linear infinite" }}
          >
            {[...topBannerItems, ...topBannerItems].map((item, idx) => (
              <span key={`${item}-${idx}`} className="inline-flex items-center">
                <span>{item}</span>
                <span className="mx-3 text-[var(--foreground)]">-</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="content-max-width grid grid-cols-[auto_1fr_auto] items-center gap-3 py-3 md:gap-6">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo-platerito.webp"
            alt="Platerito"
            width={280}
            height={78}
            priority
            className="h-12 w-auto md:h-14"
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
              placeholder="¿Que estas buscando?"
              className="w-full rounded-full border border-[#e53935] bg-[var(--soft-gray)] py-3 pr-4 pl-12 text-sm outline-none transition focus:border-[#d32f2f]"
            />
          </label>
        </form>

        <div className="hidden items-center gap-1 text-[var(--foreground)] md:flex">
          <Link
            href="/perfil"
            aria-label="Registro"
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
          <Link
            href="https://wa.me/542995050045"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="rounded-full p-2.5 text-[#25D366] transition hover:bg-[var(--soft-gray)]"
          >
            <WhatsAppIcon />
          </Link>
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
                      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
                        activeCategorySlug === item.slug
                          ? "bg-pastel-coral text-[var(--foreground)]"
                          : "text-[var(--foreground)] hover:bg-[var(--soft-gray)]"
                      }`}
                    >
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/70 text-[13px]">
                        <CategoryIcon kind={categoryIconBySlug[item.slug] || "notebook"} />
                      </span>
                      <span>{item.label}</span>
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

          <div className="group relative">
            <Link
              href="/productos?destacado=novedades"
              className="inline-flex items-center gap-1 text-[var(--foreground)] transition hover:text-[var(--primary)]"
            >
              Destacados
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
                <path d="M5.5 7.5 10 12l4.5-4.5" />
              </svg>
            </Link>

            <div className="invisible absolute top-full left-0 z-40 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <div className="grid min-w-[860px] grid-cols-3 gap-4 rounded-2xl border border-[var(--line)] bg-white p-4 shadow-xl">
                {featuredHighlights.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group/card block overflow-hidden rounded-2xl border border-[var(--line)] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative h-[170px] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover transition duration-500 group-hover/card:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="px-4 py-3">
                      <p className="text-sm font-bold tracking-wide text-[var(--foreground)]">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="group relative">
            <Link
              href="/productos?regalos=recomendados"
              className="inline-flex items-center gap-1 text-[var(--foreground)] transition hover:text-[var(--primary)]"
            >
              Ideas de Regalos
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
                <path d="M5.5 7.5 10 12l4.5-4.5" />
              </svg>
            </Link>

            <div className="invisible absolute top-full left-0 z-40 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <div className="grid min-w-[860px] grid-cols-3 gap-4 rounded-2xl border border-[var(--line)] bg-white p-5 shadow-xl">
                {giftIdeasMenu.map((section) => (
                  <div key={section.title} className="rounded-2xl bg-[var(--soft-gray)] p-4">
                    <p className="mb-3 text-xs font-bold tracking-wide text-[var(--ink-soft)]">
                      {section.title}
                    </p>
                    <div className="space-y-1.5">
                      {section.items.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block rounded-lg px-2 py-1.5 text-sm text-[var(--foreground)] transition hover:bg-white"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="group relative">
            <Link
              href="/empresa"
              className="inline-flex items-center gap-1 text-[var(--foreground)] transition hover:text-[var(--primary)]"
            >
              Empresa
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
                <path d="M5.5 7.5 10 12l4.5-4.5" />
              </svg>
            </Link>

            <div className="invisible absolute top-full left-0 z-40 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100">
              <div className="min-w-[340px] rounded-2xl border border-[var(--line)] bg-white p-4 shadow-xl">
                <div className="space-y-1.5">
                  {companyMenu.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--soft-gray)]"
                    >
                      {item.title}
                    </Link>
                  ))}
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
      <style jsx global>{`
        @keyframes top-banner-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </header>
  );
}
