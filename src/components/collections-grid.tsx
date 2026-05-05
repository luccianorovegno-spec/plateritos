import { SectionHeading } from "@/components/section-heading";

const collections = [
  {
    id: "1",
    title: "Oficina",
    image: "/images/collection-oficina.jpg",
    description: "Tu espacio de trabajo ideal",
    color: "bg-pastel-blue",
    count: 28,
  },
  {
    id: "2",
    title: "Escolar",
    image: "/images/collection-escolar.jpg",
    description: "Todo para la vuelta al cole",
    color: "bg-pastel-yellow",
    count: 68,
  },
  {
    id: "3",
    title: "Papeleria Bonita",
    image: "/images/collection-agendas.jpg",
    description: "Organiza tu año con estilo",
    color: "bg-pastel-pink",
    count: 45,
  },
  {
    id: "4",
    title: "Arte y Dibujo",
    image: "/images/collection-arte.jpg",
    description: "Libera tu creatividad",
    color: "bg-pastel-mint",
    count: 32,
  },
  {
    id: "5",
    title: "Estudios",
    image: "/images/collection-cuadernos.jpg",
    description: "Para tus ideas y suenos",
    color: "bg-pastel-lavender",
    count: 40,
  },
  {
    id: "6",
    title: "Productos para Crear",
    image: "/images/collection-regalos.jpg",
    description: "Detalles que enamoran",
    color: "bg-pastel-coral",
    count: 24,
  },
];

export function CollectionsGrid() {
  return (
    <section id="colecciones" className="section-padding bg-white">
      <div className="content-max-width">
        <SectionHeading
          title="Nuestras Categorias"
          subtitle="Encontra todo lo que necesitas organizado por categorias"
        />

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {collections.map((item) => (
            <a
              key={item.id}
              href="#productos"
              className={`group relative overflow-hidden rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-6 ${item.color}`}
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold md:text-xl">{item.title}</h3>
                  <p className="text-sm text-[var(--ink-soft)]">{item.description}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 text-sm">
                  →
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <span className="absolute right-5 bottom-5 rounded-lg bg-white/85 px-2.5 py-1 text-xs font-semibold text-[var(--ink-soft)] md:right-6 md:bottom-6">
                {item.count} productos
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
