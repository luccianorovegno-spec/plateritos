# Plateritos Headless (Next.js + Tienda Nube)

Base headless para la nueva web de Plateritos con enfoque:

- Premium accesible
- Fondo blanco + pasteles
- Estilo colorido creativo
- Prioridad escolar/oficina
- Checkout final en Tienda Nube

## Estructura

- Home: Hero, mundos, productos destacados, contacto.
- Producto: galeria, precio, stock, descripcion, boton de compra en Tienda Nube.
- Integracion: `src/lib/tiendanube.ts` consume API de Tienda Nube y cae en datos demo si faltan credenciales.

## Configuracion

1. Copiar variables:

```bash
cp .env.example .env.local
```

2. Completar:

- `TIENDANUBE_STORE_ID`
- `TIENDANUBE_ACCESS_TOKEN`
- `TIENDANUBE_STORE_URL` (ej: `https://platerito.com.ar`)
- `TIENDANUBE_USER_AGENT` (requerido por API)

## Desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Build y lint

```bash
npm run lint
npm run build
```

## Notas Tienda Nube

- Endpoints usados: `GET /products`.
- Headers obligatorios: `Authentication: bearer ...` y `User-Agent`.
- Base URL: `https://api.tiendanube.com/v1/{store_id}`.

Referencia oficial:

- https://tiendanube.github.io/api-documentation/v1/intro
- https://tiendanube.github.io/api-documentation/resources/product
