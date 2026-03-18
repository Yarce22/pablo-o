# CLAUDE.md — Pablo Orozco Portfolio

## Descripción del Proyecto

Portafolio web para **Pablo Orozco**, fotógrafo, animador y videomaker. Estética **rock + neon**: alto contraste, acentos eléctricos neón sobre fondos oscuros. El sitio debe ser completamente dinámico, alimentado por **Contentful** como CMS headless.

---

## Stack Tecnológico

- **Framework:** Next.js (última versión estable, App Router)
- **Lenguaje:** TypeScript
- **CMS:** Contentful (headless)
- **Estilos:** CSS Modules o Tailwind CSS (respetar design tokens del diseño Pencil)
- **Deploy:** Vercel
- **Metodología:** Mobile First

---

## Setup Inicial — Limpieza del proyecto Next.js

Al crear el proyecto con `npx create-next-app@latest`, **eliminar todo el contenido por defecto** que Next.js genera:

- Eliminar `app/favicon.ico` (reemplazar con favicon personalizado de la marca)
- Eliminar `public/next.svg`, `public/vercel.svg`
- Vaciar completamente `app/page.tsx` (eliminar el contenido demo)
- Vaciar completamente `app/globals.css` (eliminar los estilos demo)
- Eliminar cualquier archivo `*.module.css` generado por defecto
- Eliminar las importaciones de `Image` de next/image que apunten a los SVGs eliminados
- Eliminar la metadata por defecto del layout y reemplazarla con la del proyecto (ver sección SEO)

---

## Tipografía

### Fuente personalizada: Dumbledor

- **Archivo:** `public/fonts/Dumbledor.ttf`
- **Uso:** Fuente display para títulos, headings, logo, elementos destacados
- **Carga:** Usar `next/font/local` para cargar la fuente:

```typescript
import localFont from 'next/font/local';

const dumbledor = localFont({
  src: '../public/fonts/dum1.ttf',
  variable: '--font-display',
  display: 'swap',
});
```

### Fuente secundaria: Inter

- **Uso:** Cuerpo de texto, labels, descripciones, botones
- **Carga:** Usar `next/font/google`:

```typescript
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});
```

### Escala tipográfica (Mobile → Desktop)

| Elemento | Mobile | Tablet | Desktop | Font | Weight |
|----------|--------|--------|---------|------|--------|
| Hero Title | 48px | 64px | 96px | --font-display | 900 |
| Page Title | 32px | 40px | 56px | --font-display | 900 |
| Section Title | 22px | 26px | 24-28px | --font-display | 700 |
| Logo Nav | 16px | 18px | 20px | --font-display | 800 |
| Nav Links | — | 14px | 15px | --font-body | 500-600 |
| Body | 15px | 15px | 16-18px | --font-body | 400 |
| Labels/Small | 11-13px | 13px | 14px | --font-body | 500 |
| Hero Tag | 12px | 14px | 14px | --font-body | 500 |
| Card Title | 14px | 14px | 14px | --font-display | 700 |
| Card Category | 11px | 11px | 11px | --font-body | 400 |
| Filter Pills | 12px | 13px | 14px | --font-body | 500-600 |
| Button Text | 14-15px | 14-15px | 14-15px | --font-body | 700 |
| Copyright | 11px | 11px | 11px | --font-body | 400 |

### Letter Spacing

- Logo: `3px`
- Hero Title: `-1px`
- Hero Tag: `2px`
- Buttons/CTA: `1px`
- Brand Name Footer: `1px`

### Line Height

- Hero Title: `0.9` (muy comprimido, estilo display)
- Body: `1.5` (legible)

---

## Design Tokens — Paleta de Colores

### Modo Oscuro (principal)

| Token | Variable CSS | Hex |
|-------|-------------|-----|
| Background | `--bg` | `#060609` |
| Surface / Cards | `--surface` | `#2F3035` |
| Red Accent | `--red` | `#eb2525` |
| Amber / Gold | `--amber` | `#FFB000` |
| Neon Pink | `--pink` | `#F71BAC` |
| Cyan | `--cyan` | `#00A4CA` |
| Border | `--border` | `#3A3A42` |
| Text Primary | `--text-primary` | `#FFFFFF` |
| Text Secondary | `--text-secondary` | `#A0A0A8` |
| Text Muted | `--text-muted` | `#606068` |

### Modo Claro

| Token | Variable CSS | Hex |
|-------|-------------|-----|
| Background | `--bg` | `#FDDFFE` |
| Surface / Cards | `--surface` | `#D5D6E0` |
| Red Accent | `--red` | `#EB2525` |
| Amber / Gold | `--amber` | `#F99E1B` |
| Neon Pink | `--pink` | `#E017A6` |
| Cyan / Teal | `--cyan` | `#00A56F` |
| Border | `--border` | `#C0C0C8` |
| Text Primary | `--text-primary` | `#0A0A0A` |
| Text Secondary | `--text-secondary` | `#4A4A52` |
| Text Muted | `--text-muted` | `#8A8A92` |

### Implementación del Dark/Light Mode

- Usar CSS custom properties con `data-theme="dark"` y `data-theme="light"` en el `<html>`
- Persistir preferencia en `localStorage`
- Detectar preferencia del sistema con `prefers-color-scheme`
- Toggle visible en la navegación (icono sol/luna con `lucide-react`)

---

## Breakpoints (Mobile First)

| Breakpoint | Ancho | Uso |
|------------|-------|-----|
| Base (Mobile) | 360px+ | Layout por defecto, single column |
| Tablet | 768px+ | `@media (min-width: 768px)` |
| Desktop | 1440px+ | `@media (min-width: 1440px)` |

**Regla:** Todo se escribe primero para mobile, luego se agregan media queries ascendentes.

---

## Estructura de Páginas y Rutas

```
app/
├── layout.tsx          ← Layout global (Nav + Footer + ThemeProvider)
├── page.tsx            ← Home (/)
├── portafolio/
│   └── page.tsx        ← Portafolio (/portafolio)
├── sobre-mi/
│   └── page.tsx        ← Sobre mí (/sobre-mi)
├── contacto/
│   └── page.tsx        ← Contacto (/contacto)
├── globals.css         ← Variables CSS, reset, base styles
└── components/
    ├── Navbar.tsx
    ├── MobileMenu.tsx
    ├── Footer.tsx
    ├── ThemeToggle.tsx
    ├── HeroSlider.tsx
    ├── PortfolioGrid.tsx
    ├── FilterPills.tsx
    ├── PortfolioCard.tsx
    ├── StorySection.tsx
    ├── ToolsGrid.tsx
    ├── FeaturedWork.tsx
    ├── ServicesGrid.tsx
    ├── ContactForm.tsx
    └── SliderDots.tsx
```

---

## Página 1 — HOME (`/`)

### Estructura

Slider hero fullscreen (100vh) con imágenes destacadas. Sin contenido adicional entre el hero y el footer.

### Hero Slider

- **Imágenes:** Provienen de Contentful (content model `HeroSlide`)
- **Overlay:** Gradiente lineal de 180°: `transparent` (0%) → `#060609CC` (60%) → `#060609` (100%)
- **Contenido superpuesto:**
  - Tag: "Fotógrafo · Animador · Videomaker" (desde Contentful) — color `--red`, centrado, 12px mobile → 14px tablet/desktop, weight 500, letter-spacing 2px
  - Título: "PABLO\nOROZCO" (desde Contentful) — color `#FFFFFF`, centrado, 48px → 64px → 96px, weight 900, line-height 0.9, letter-spacing -1px
  - Contenido alineado al fondo con padding-bottom 100px y gap 12px entre tag y título

### Navegación del Slider

- **Mobile:** Swipe táctil + indicadores de puntos (dots) en la parte inferior
  - Dot activo: 24×3px, color `--red`, border-radius 2px
  - Dots inactivos: 8×3px, color `--text-muted`, border-radius 2px
  - Gap entre dots: 8px
- **Tablet / Desktop:** Swipe + dots + flechas laterales
  - Flechas con iconos de Lucide (`chevron-left`, `chevron-right`)
  - Aparecen a los costados del hero

### Comportamiento Responsivo

- **Mobile (360px):** Imágenes con `object-fit: cover`, recortadas vertical/centradas. Contenido centrado.
- **Tablet (768px):** Igual, texto más grande, flechas visibles.
- **Desktop (1440px):** Imágenes landscape, tipografía 96px, flechas con hover reveal.

---

## Página 2 — PORTAFOLIO (`/portafolio`)

### Page Header

- **Título:** Desde Contentful, font-display, weight 900
  - Mobile: 32px, padding 32px 16px 24px 16px
  - Tablet: 40px
  - Desktop: 56px
- **Subtítulo:** Desde Contentful, font-body, weight normal
  - Mobile: 14px
  - Tablet: 16px
  - Desktop: 18px

### Filter Pills

Barra de filtros horizontales con categorías:

**Categorías (desde Contentful):** Todos, Deportes, Retrato, Documental, Naturaleza, Animación, Eventos, Producto, Comercial, 3D

- **Pill activo:** fill `--red`, texto `#FFFFFF`, weight 600
- **Pill inactivo:** fill `--surface`, texto `--text-secondary`, weight 500
- **Tamaño pill:** height 32px, padding horizontal 16px, border-radius 16px (full rounded)
- **Gap entre pills:** 8px
- **Mobile:** Scroll horizontal (overflow-x: auto, -webkit-overflow-scrolling: touch), clip activado, padding horizontal 16px, height contenedor 44px
- **Tablet:** Más pills visibles, scroll si necesario
- **Desktop:** Todos visibles en una fila, sin scroll. Font-size 14px

### Gallery Grid

- **Mobile:** 1 columna, full-width cards, gap 16px, padding 16px
- **Tablet:** 2 columnas (masonry), gap 16px
- **Desktop:** 3 columnas (masonry), gap 16px-20px

### Portfolio Card

- **Height:** 240px (mobile), variable en tablet/desktop
- **Background:** Imagen desde Contentful con `object-fit: cover`
- **Overlay inferior:** Gradiente oscuro de abajo hacia arriba, height ~80px
  - Padding: 0 12px 12px 12px
  - **Título del proyecto:** font-display, 14px, weight 700
  - **Categoría:** font-body, 11px, weight normal
- **Hover (desktop):** Efecto de glow neón con border de acento o scale sutil

---

## Página 3 — SOBRE MÍ (`/sobre-mi`)

### Sección 1: Story

- **Mobile:** Stack vertical: foto full-width (aspect ratio 4:5 o cuadrada) + bloque de texto debajo
  - Nombre: font-display, 28px, weight 900 (desde Contentful)
  - Tag/Rol: font-body, 13px (desde Contentful)
  - Bio: font-body, 15px (desde Contentful, Rich Text)
- **Tablet:** Lado a lado con gap 32px. Foto 40%, texto 60%.
  - Nombre: 36px
- **Desktop:** Lado a lado con gap 64px. Más whitespace.
  - Nombre: tamaño más grande

### Sección 2: Tools (Herramientas)

- **Título de sección:** font-display, 22px mobile → 26px tablet → 24-28px desktop
- **Grid de herramientas:**
  - Cada herramienta: Icono + label debajo, gap 6-8px entre icono y label
  - **Mobile:** Grid de 3 columnas, gap 16px
  - **Tablet:** 4 columnas, gap 16px
  - **Desktop:** 6 columnas, gap 24px
- **Datos desde Contentful:** Cada tool tiene nombre e icono/imagen

### Sección 3: Featured Work (Trabajos Destacados)

- **Título de sección:** font-display, 22px → 26px → tamaño desktop
- **Cards:** Imagen + texto con gap 10-12px entre imagen y texto
  - Gap interno del texto: 4px
- **Mobile:** Stack vertical, 1 card por fila
- **Tablet:** Horizontal scroll/carrusel de 3 cards, gap 16px
- **Desktop:** Fila horizontal de 3 cards visibles, gap 24px

### Sección 4: Services (Servicios)

- **Título de sección:** font-display, 22px → tamaño desktop
- **Card de servicio:** Icono neón + nombre del servicio + descripción breve, gap 12-16px internos
- **Mobile:** Stack vertical, 1 card full-width
- **Tablet:** Grid de 2 columnas, gap 16px
- **Desktop:** Grid de 3 o 4 columnas, gap 20px
- **Hover (desktop):** Glow effect en el borde

---

## Página 4 — CONTACTO (`/contacto`)

### Form Header

- **Título:** Desde Contentful (ej: "Hablemos"), font-display, weight 900
  - Mobile: 32px
  - Tablet: escalado
  - Desktop: mayor
- **Subtítulo:** Desde Contentful, font-body, weight normal, 14px mobile

### Campos del Formulario

Cada campo tiene: label arriba + input

| Campo | Tipo | Label | Placeholder |
|-------|------|-------|-------------|
| Nombre | `text` | Nombre | Tu nombre completo |
| WhatsApp | `tel` | WhatsApp | +52 ... |
| Ciudad | `text` | Ciudad | Tu ciudad |
| Correo | `email` | Correo | tu@email.com |
| Servicio | `select` / `text` | Servicio | Selecciona un servicio |

- **Label:** font-body, 13px, weight 500
- **Input:** height 48px, padding horizontal 16px, fill `--surface`, border-radius 4px
- **Gap entre label e input:** 6px
- **Gap entre campos:** 16px mobile → 20px desktop

### Botón Submit

- **Texto:** "Enviar" (desde Contentful), font-body, 15px, weight 700, color `#FFFFFF`, letter-spacing 1px
- **Fill:** `--red`
- **Height:** 52px
- **Border-radius:** 4px
- **Mobile:** Full-width
- **Desktop:** Full-width dentro del contenedor del form, o auto-width centrado

### Layout Responsivo del Formulario

- **Mobile:** Single column, full-width, padding 32px 16px, gap 24px
- **Tablet:** Single column centrada, max-width ~560px
- **Desktop:** Contenedor centrado max-width ~600px. Opcionalmente: Nombre y WhatsApp lado a lado, Ciudad y Correo lado a lado (row con gap 16px), Servicio full-width debajo

### Envío del formulario

- Enviar datos a una API Route de Next.js (`/api/contact`)
- Opciones de destino: enviar email (con Resend, SendGrid, etc.) o enviar notificación a WhatsApp Business API
- Validación client-side antes del envío
- Mostrar estados: loading, success, error

---

## Navegación (Navbar)

### Mobile (360px)

- Height: 56px
- Padding horizontal: 16px
- Logo "PABLO OROZCO" a la izquierda: font-display, 16px, weight 800, letter-spacing 3px, color `--text-primary`
- Botón hamburguesa a la derecha: 3 líneas (rectangles)
- **Menú abierto:** Overlay fullscreen con links apilados verticalmente, grandes y espaciados (tap-friendly). Toggle de modo oscuro/claro al fondo.

### Tablet (768px)

- Height: 64px
- Logo izquierda: 18px
- Links horizontales a la derecha: "Home", "Portafolio", "Sobre mí", "Contacto" — 14px, font-body
- Toggle dark/light mode visible (icono sol/luna en círculo de 40px, fill `--surface`, border-radius 20px)

### Desktop (1440px)

- Height: 72px
- Padding horizontal: 64px
- Logo izquierda: 20px
- Links a la derecha con gap 40px: 15px, font-body
  - Link activo: color `--text-primary`, weight 600
  - Links inactivos: color `--text-secondary`, weight 500
  - Hover: underline neón o glow sutil
- Toggle modo: 40×40px, fill `--surface`, border-radius 20px, icono Lucide `sun` / `moon`
- Background: `--bg`

---

## Footer

### Estructura de 3 secciones + copyright

- **Border top:** 1px solid `--border`
- **Background:** `--bg`

### Mobile (360px)

Todo centrado y apilado verticalmente. Padding: 48px 16px.

1. **CTA Section:**
   - Pregunta: "¿Listo para crear algo increíble?" (desde Contentful) — font-display, 20px, weight 700, color `--text-primary`
   - Botón CTA: "Contáctame" (desde Contentful) — full-width, height 48px, fill `--red`, border-radius 4px, font-body, 14px, weight 700, color `#FFFFFF`, letter-spacing 1px, padding-h 32px

2. **Nav Section:**
   - Links apilados verticalmente: Home, Portafolio, Sobre mí, Contacto — font-body, 14px, weight 500, color `--text-secondary`

3. **Brand Section:**
   - Nombre "Pablo Orozco" — font-display, 18px, weight 800, letter-spacing 1px, color `--text-primary`
   - Iconos sociales en fila: 4 círculos de 36×36px, fill `--surface`, border-radius 18px, gap 12px
     - Redes: Instagram, YouTube, Vimeo, Behance (iconos de Lucide o SVGs custom)

4. **Copyright:** "© 2026 Pablo Orozco. Todos los derechos reservados." (desde Contentful) — font-body, 11px, color `--text-muted`

### Desktop (1440px)

Layout de 3 columnas en una fila con `justify-content: space-between`. Padding: 48px 64px.

- **Columna izquierda (width ~400px):** CTA pregunta (24px) + botón (auto-width con padding-h 32px), gap 16px
- **Columna centro:** Links de navegación en fila horizontal con gap 32px
- **Columna derecha (align end):** Brand name (20px) + iconos sociales, gap 16px, alineados a la derecha

---

## Contentful — Content Models

### 1. `siteSettings` (Singleton)

Configuración global del sitio.

| Field | Type | Description |
|-------|------|-------------|
| `siteName` | Short text | Nombre del sitio ("Pablo Orozco") |
| `siteDescription` | Long text | Meta description para SEO |
| `logo` | Short text | Texto del logo ("PABLO OROZCO") |
| `heroTagline` | Short text | Tagline del hero ("Fotógrafo · Animador · Videomaker") |
| `heroTitle` | Short text | Título del hero ("PABLO\nOROZCO") |
| `footerCtaQuestion` | Short text | Pregunta CTA del footer ("¿Listo para crear algo increíble?") |
| `footerCtaButtonText` | Short text | Texto del botón CTA ("Contáctame") |
| `copyrightText` | Short text | Texto de copyright |
| `socialLinks` | JSON | Array de objetos `{ platform, url, icon }` |
| `favicon` | Media (Asset) | Favicon del sitio |
| `ogImage` | Media (Asset) | Imagen para Open Graph/social sharing |

### 2. `heroSlide`

Slides del carrusel hero en la home.

| Field | Type | Description |
|-------|------|-------------|
| `title` | Short text | Título interno (para identificación en CMS) |
| `image` | Media (Asset) | Imagen del slide (alta resolución, landscape) |
| `imageMobile` | Media (Asset) | Imagen optimizada para mobile (portrait/cuadrada) |
| `altText` | Short text | Texto alternativo de la imagen |
| `order` | Integer | Orden de aparición |

### 3. `portfolioCategory`

Categorías para filtrar el portafolio.

| Field | Type | Description |
|-------|------|-------------|
| `name` | Short text | Nombre visible ("Deportes", "Retrato", etc.) |
| `slug` | Short text | Slug para filtros URL-friendly ("deportes", "retrato") |
| `order` | Integer | Orden de aparición en la barra de filtros |

### 4. `portfolioProject`

Cada proyecto/trabajo del portafolio.

| Field | Type | Description |
|-------|------|-------------|
| `title` | Short text | Título del proyecto |
| `slug` | Short text | Slug URL-friendly |
| `category` | Reference → `portfolioCategory` | Categoría del proyecto |
| `thumbnail` | Media (Asset) | Imagen miniatura para la grid |
| `altText` | Short text | Texto alternativo de la imagen |
| `description` | Long text | Descripción corta del proyecto |
| `images` | Media (Assets, multiple) | Galería de imágenes del proyecto |
| `videoUrl` | Short text | URL de video (YouTube, Vimeo) si aplica |
| `featured` | Boolean | ¿Es proyecto destacado? |
| `order` | Integer | Orden de aparición |

### 5. `aboutPage`

Contenido de la página Sobre mí (singleton).

| Field | Type | Description |
|-------|------|-------------|
| `profilePhoto` | Media (Asset) | Foto de perfil de Pablo |
| `profilePhotoAlt` | Short text | Alt text de la foto |
| `name` | Short text | Nombre para mostrar ("Pablo Orozco") |
| `tagline` | Short text | Rol/tag ("Fotógrafo · Animador · Videomaker") |
| `bio` | Rich Text | Historia/biografía larga |
| `toolsSectionTitle` | Short text | Título de la sección herramientas |
| `featuredSectionTitle` | Short text | Título de la sección trabajos destacados |
| `servicesSectionTitle` | Short text | Título de la sección servicios |

### 6. `tool`

Herramientas/software que maneja.

| Field | Type | Description |
|-------|------|-------------|
| `name` | Short text | Nombre de la herramienta ("Adobe Premiere", "Blender") |
| `icon` | Media (Asset) | Icono/logo de la herramienta |
| `order` | Integer | Orden de aparición |

### 7. `featuredWork`

Trabajos destacados para la sección About.

| Field | Type | Description |
|-------|------|-------------|
| `title` | Short text | Título del trabajo |
| `description` | Short text | Descripción breve |
| `image` | Media (Asset) | Imagen del trabajo |
| `altText` | Short text | Alt text |
| `link` | Short text | Link al proyecto completo (puede ser ref a portfolioProject) |
| `order` | Integer | Orden |

### 8. `service`

Servicios que ofrece.

| Field | Type | Description |
|-------|------|-------------|
| `name` | Short text | Nombre del servicio ("Fotografía", "Animación 3D") |
| `description` | Long text | Descripción del servicio |
| `icon` | Short text | Nombre del icono de Lucide (ej: "camera", "video", "box") |
| `order` | Integer | Orden de aparición |

### 9. `portfolioPage`

Contenido dinámico de la página de portafolio (singleton).

| Field | Type | Description |
|-------|------|-------------|
| `title` | Short text | Título de la página ("Portafolio") |
| `subtitle` | Long text | Subtítulo / descripción debajo del título |
| `seoTitle` | Short text | Título para SEO |
| `seoDescription` | Long text | Meta description para SEO |

### 10. `contactPage`

Contenido de la página de contacto (singleton).

| Field | Type | Description |
|-------|------|-------------|
| `title` | Short text | Título del formulario ("Hablemos") |
| `subtitle` | Long text | Subtítulo del formulario |
| `submitButtonText` | Short text | Texto del botón ("Enviar") |
| `serviceOptions` | Short text (list) | Opciones del dropdown de servicios |
| `successMessage` | Short text | Mensaje al enviar exitosamente |
| `seoTitle` | Short text | Título para SEO |
| `seoDescription` | Long text | Meta description |

### 11. `navigationLink`

Links de navegación dinámicos.

| Field | Type | Description |
|-------|------|-------------|
| `label` | Short text | Texto visible ("Home", "Portafolio") |
| `href` | Short text | Ruta ("/", "/portafolio") |
| `order` | Integer | Orden de aparición |

---

## Contentful — Setup del Cliente

```typescript
// lib/contentful.ts
import { createClient } from 'contentful';

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// Para preview/draft
export const contentfulPreviewClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN!,
  host: 'preview.contentful.com',
});
```

### Variables de Entorno

```env
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_PREVIEW_TOKEN=
```

### Data Fetching

- Usar `fetch` con `next: { revalidate: 60 }` o ISR (Incremental Static Regeneration) para que el contenido se actualice sin re-deploy
- Opcionalmente configurar **Contentful Webhooks → Vercel** para revalidación on-demand

---

## SEO — Mejores Prácticas

### Metadata Global (layout.tsx)

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://pabloorozco.com'),
  title: {
    default: 'Pablo Orozco — Fotógrafo, Animador & Videomaker',
    template: '%s | Pablo Orozco',
  },
  description: 'Portafolio de Pablo Orozco: fotografía, animación, video y contenido visual creativo.',
  keywords: ['fotografía', 'animación', 'videomaker', 'portafolio', 'Pablo Orozco', '3D', 'producción audiovisual'],
  authors: [{ name: 'Pablo Orozco' }],
  creator: 'Pablo Orozco',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://pabloorozco.com',
    siteName: 'Pablo Orozco',
    title: 'Pablo Orozco — Fotógrafo, Animador & Videomaker',
    description: 'Portafolio de fotografía, animación, video y contenido visual.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pablo Orozco — Fotógrafo, Animador & Videomaker',
    description: 'Portafolio de fotografía, animación, video y contenido visual.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};
```

**NOTA:** Los valores de title, description y keywords deben venir de Contentful (`siteSettings`). Usar `generateMetadata()` dinámico.

### Metadata por Página

Cada página debe tener su propia metadata generada dinámicamente desde Contentful:

```typescript
export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPageData('portfolioPage');
  return {
    title: pageData.seoTitle,
    description: pageData.seoDescription,
    openGraph: { ... },
  };
}
```

### Checklist SEO Obligatorio

- [ ] **Etiquetas semánticas HTML:** Usar `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` correctamente
- [ ] **Un solo `<h1>` por página**
- [ ] **Jerarquía de headings:** h1 → h2 → h3 sin saltar niveles
- [ ] **Alt text en todas las imágenes** (desde Contentful)
- [ ] **next/image:** Usar `<Image>` de Next.js para optimización automática (WebP, lazy loading, responsive sizes)
- [ ] **Sitemap automático:** Generar `sitemap.xml` con `next-sitemap` o el API de Next.js App Router
- [ ] **robots.txt:** Configurar correctamente
- [ ] **Canonical URLs** en cada página
- [ ] **Structured Data (JSON-LD):**
  - Schema `Person` para Pablo Orozco
  - Schema `WebSite` para el sitio
  - Schema `CreativeWork` para proyectos del portafolio
  - Schema `Service` para los servicios ofrecidos
- [ ] **Performance:** Lighthouse score > 90 en todas las categorías
- [ ] **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1
- [ ] **Preload de fuentes** con `next/font`
- [ ] **Lazy loading** de imágenes del portafolio bajo el fold
- [ ] **Idioma:** `<html lang="es">` en el layout

### JSON-LD Ejemplo

```typescript
// components/JsonLd.tsx
export function PersonJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Pablo Orozco',
    jobTitle: 'Fotógrafo, Animador y Videomaker',
    url: 'https://pabloorozco.com',
    sameAs: [
      'https://instagram.com/pabloorozco',
      'https://youtube.com/@pabloorozco',
      'https://vimeo.com/pabloorozco',
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
```

---

## Reglas Generales de Desarrollo

### Mobile First

- Escribir CSS mobile por defecto, usar `min-width` media queries para tablet/desktop
- Touch targets mínimo 44×44px
- No horizontal scroll en ninguna página (excepto carruseles intencionales como filter pills)
- Imágenes responsive con `object-fit: cover` y `sizes` attribute

### Espaciado

- Base mobile: 16px
- Tablet: escalar a 20-24px
- Desktop: 24-32px
- Padding del contenedor:
  - Mobile: 16px horizontal
  - Desktop: 64px horizontal

### Animaciones

- Transiciones suaves en cambios de estado (menu open/close, filtros, hover)
- Neon glow effects sutiles en mobile (performance), más prominentes en desktop
- `prefers-reduced-motion: reduce` — respetar preferencia del usuario
- Usar `framer-motion` o CSS transitions/animations

### Accesibilidad

- Contraste WCAG AA en todas las combinaciones de color
- Focus visible en todos los elementos interactivos
- Aria labels en iconos sin texto
- Skip to content link
- Roles semánticos en la navegación

### Performance

- Optimizar imágenes de Contentful usando sus parámetros de transformación (`?w=800&fm=webp&q=80`)
- Lazy load imágenes del portafolio
- Preconnect a Contentful CDN
- Minimizar JavaScript del lado del cliente

---

## Variables de Entorno para Vercel

```env
# Contentful
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_PREVIEW_TOKEN=

# Site
NEXT_PUBLIC_SITE_URL=https://pabloorozco.com

# Contact Form (elegir servicio)
RESEND_API_KEY=
# o
SENDGRID_API_KEY=
```

---

## Deploy en Vercel

- Conectar repositorio de GitHub/GitLab
- Configurar variables de entorno
- Framework preset: Next.js (automático)
- Build command: `next build`
- Output directory: `.next`
- Configurar dominio personalizado: `pabloorozco.com`
- Habilitar Analytics y Speed Insights de Vercel

---

## Referencia del Diseño Pencil

El archivo `pencil-new.pen` contiene el diseño completo con los siguientes frames que deben usarse como referencia visual y estructural:

| Frame | Breakpoint | Descripción |
|-------|-----------|-------------|
| Nav/Mobile | 360px | Navbar con hamburger |
| Nav/Tablet | 768px | Navbar con links horizontales |
| Nav/Desktop | 1440px | Navbar full con logo, links y toggle |
| Footer/Mobile | 360px | Footer stack vertical |
| Footer/Desktop | 1440px | Footer 3 columnas |
| 01 Home / Mobile | 360px | Hero slider mobile |
| 01 Home / Tablet | 768px | Hero slider tablet |
| 01 Home / Desktop | 1440px | Hero slider desktop |
| 02 Portfolio / Mobile | 360px | Grid 1 col + filter pills scroll |
| 02 Portfolio / Tablet | 768px | Grid 2 cols |
| 02 Portfolio / Desktop | 1440px | Grid 3 cols + all pills visible |
| 03 Sobre Mí / Mobile | 360px | Secciones apiladas |
| 03 Sobre Mí / Tablet | 768px | Story side-by-side, tools 4 cols |
| 03 Sobre Mí / Desktop | 1440px | Story side-by-side, tools 6 cols, services 4 cols |
| 04 Contacto / Mobile | 360px | Form single column |
| 04 Contacto / Tablet | 768px | Form centrado |
| 04 Contacto / Desktop | 1440px | Form con campos en 2 cols |