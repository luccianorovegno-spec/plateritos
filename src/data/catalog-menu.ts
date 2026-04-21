export type CatalogSubcategory = {
  label: string;
  slug: string;
};

export type CatalogCategory = {
  label: string;
  slug: string;
  children?: CatalogSubcategory[];
};

export const catalogMenu: CatalogCategory[] = [
  { label: "Acuarela, Temperas, Masas", slug: "acuarela-temperas-masas" },
  { label: "Cartucheras", slug: "cartucheras" },
  {
    label: "Cuadernos",
    slug: "cuadernos",
    children: [
      { label: "Cuadernos Escolares", slug: "cuadernos-escolares" },
      { label: "Cuadernos A4", slug: "cuadernos-a4" },
      { label: "Cuadernos A5", slug: "cuadernos-a5" },
      { label: "Repuestos para Cuadernos", slug: "repuestos-para-cuadernos" },
    ],
  },
  {
    label: "Carpetas Escolares",
    slug: "carpetas-escolares",
    children: [
      { label: "Carpetas A4", slug: "carpetas-a4" },
      { label: "Carpetas N° 3", slug: "carpetas-n3" },
      { label: "Carpetas de Dibujo", slug: "carpetas-de-dibujo" },
      { label: "Etiquetas Adhesivas", slug: "etiquetas-adhesivas" },
      { label: "Folios y Separadores A4", slug: "folios-separadores-a4" },
      { label: "Folios y Separadores N° 3", slug: "folios-separadores-n3" },
    ],
  },
  {
    label: "Elementos Escolares",
    slug: "elementos-escolares",
    children: [
      { label: "Gomas de Borrar", slug: "gomas-de-borrar" },
      { label: "Sacapuntas", slug: "sacapuntas" },
      { label: "Correctores", slug: "correctores" },
      { label: "Elementos de Geometria", slug: "elementos-de-geometria" },
    ],
  },
  { label: "Lapices de Colores", slug: "lapices-de-colores" },
  { label: "Lapices Negros y Portaminas", slug: "lapices-negros-y-portaminas" },
  { label: "Lapiceras y Resaltadores", slug: "lapiceras-y-resaltadores" },
  { label: "Marcadores", slug: "marcadores" },
  {
    label: "Mochilas / Luncheras",
    slug: "mochilas-luncheras",
    children: [
      { label: "Mochilas Carro", slug: "mochilas-carro" },
      { label: "Mochilas Espalda", slug: "mochilas-espalda" },
      { label: "Luncheras", slug: "luncheras" },
    ],
  },
  { label: "Notas Adhesivas", slug: "notas-adhesivas" },
  { label: "Pegamentos y Cintas Adhesivas", slug: "pegamentos-y-cintas-adhesivas" },
  { label: "Repuestos de Hojas Escolares", slug: "repuestos-de-hojas-escolares" },
  { label: "Tijeras y Cutter", slug: "tijeras-y-cutter" },
  { label: "Papeleria", slug: "papeleria" },
  { label: "Kit Escolares", slug: "kit-escolares" },
  { label: "Calculadoras", slug: "calculadoras" },
  { label: "Calendarios y Planificadores", slug: "calendarios-y-planificadores" },
  { label: "Rompecabezas", slug: "rompecabezas" },
  { label: "Libros para Colorear", slug: "libros-para-colorear" },
];

export function findCategoryBySlug(slug: string) {
  return catalogMenu.find((item) => item.slug === slug);
}

export function findSubcategoryBySlug(slug: string) {
  for (const category of catalogMenu) {
    const subcategory = category.children?.find((item) => item.slug === slug);
    if (subcategory) return subcategory;
  }
  return undefined;
}
