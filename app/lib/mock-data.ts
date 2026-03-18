// ─────────────────────────────────────────
// SITE SETTINGS
// ─────────────────────────────────────────
export const HERO_TAGLINE = 'Fotógrafo · Animador · Videomaker';
export const HERO_TITLE = 'PABLO\nOROZCO';

// ─────────────────────────────────────────
// HERO SLIDES
// ─────────────────────────────────────────
export const heroSlides = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1657462721515-8182e942624d?w=1440&q=80',
    altText: 'Fotografía deportiva - Pablo Orozco',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1648304182131-ad35886f3a59?w=1440&q=80',
    altText: 'Fotografía artística - Pablo Orozco',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1671037575959-0612f4e67e84?w=1440&q=80',
    altText: 'Producción audiovisual - Pablo Orozco',
  },
];

// ─────────────────────────────────────────
// PORTFOLIO
// ─────────────────────────────────────────
export const portfolioCategories = [
  { id: 'all', name: 'Todos', slug: 'todos' },
  { id: 'deportes', name: 'Deportes', slug: 'deportes' },
  { id: 'retrato', name: 'Retrato', slug: 'retrato' },
  { id: 'documental', name: 'Documental', slug: 'documental' },
  { id: 'naturaleza', name: 'Naturaleza', slug: 'naturaleza' },
  { id: 'animacion', name: 'Animación', slug: 'animacion' },
  { id: 'eventos', name: 'Eventos', slug: 'eventos' },
  { id: 'producto', name: 'Producto', slug: 'producto' },
  { id: 'comercial', name: 'Comercial', slug: 'comercial' },
  { id: '3d', name: '3D', slug: '3d' },
];

export const portfolioProjects = [
  {
    id: '1',
    title: 'Carrera de Montaña',
    slug: 'carrera-montana',
    category: 'deportes',
    thumbnail: 'https://picsum.photos/seed/mountain1/600/400',
    altText: 'Atleta corriendo en montaña',
    height: 240,
  },
  {
    id: '2',
    title: 'Retrato Urbano',
    slug: 'retrato-urbano',
    category: 'retrato',
    thumbnail: 'https://picsum.photos/seed/portrait1/600/700',
    altText: 'Retrato urbano en blanco y negro',
    height: 300,
  },
  {
    id: '3',
    title: 'Naturaleza Viva',
    slug: 'naturaleza-viva',
    category: 'naturaleza',
    thumbnail: 'https://picsum.photos/seed/nature1/600/450',
    altText: 'Paisaje natural al amanecer',
    height: 260,
  },
  {
    id: '4',
    title: 'Festival de Música',
    slug: 'festival-musica',
    category: 'eventos',
    thumbnail: 'https://picsum.photos/seed/festival1/600/520',
    altText: 'Fotografía de evento musical',
    height: 280,
  },
  {
    id: '5',
    title: 'Producto Artesanal',
    slug: 'producto-artesanal',
    category: 'producto',
    thumbnail: 'https://picsum.photos/seed/product1/600/400',
    altText: 'Fotografía de producto artesanal',
    height: 240,
  },
  {
    id: '6',
    title: 'Spot Comercial',
    slug: 'spot-comercial',
    category: 'comercial',
    thumbnail: 'https://picsum.photos/seed/commercial1/600/600',
    altText: 'Producción de spot publicitario',
    height: 320,
  },
  {
    id: '7',
    title: 'Personaje 3D',
    slug: 'personaje-3d',
    category: '3d',
    thumbnail: 'https://picsum.photos/seed/3d1/600/400',
    altText: 'Animación de personaje 3D',
    height: 240,
  },
  {
    id: '8',
    title: 'Deporte Extremo',
    slug: 'deporte-extremo',
    category: 'deportes',
    thumbnail: 'https://picsum.photos/seed/extreme1/600/500',
    altText: 'Fotografía de deporte extremo',
    height: 280,
  },
  {
    id: '9',
    title: 'Fine Art Portrait',
    slug: 'fine-art-portrait',
    category: 'retrato',
    thumbnail: 'https://picsum.photos/seed/fineart1/600/460',
    altText: 'Retrato fine art iluminación dramática',
    height: 260,
  },
  {
    id: '10',
    title: 'Ciudad Invisible',
    slug: 'ciudad-invisible',
    category: 'documental',
    thumbnail: 'https://picsum.photos/seed/doc1/600/540',
    altText: 'Documental de vida urbana',
    height: 300,
  },
  {
    id: '11',
    title: 'Animación Corporativa',
    slug: 'animacion-corporativa',
    category: 'animacion',
    thumbnail: 'https://picsum.photos/seed/anim1/600/400',
    altText: 'Animación corporativa 2D',
    height: 240,
  },
  {
    id: '12',
    title: 'Bodegón Editorial',
    slug: 'bodegon-editorial',
    category: 'producto',
    thumbnail: 'https://picsum.photos/seed/still1/600/500',
    altText: 'Fotografía de producto editorial',
    height: 280,
  },
];

// ─────────────────────────────────────────
// ABOUT PAGE
// ─────────────────────────────────────────
export const aboutData = {
  profilePhoto: 'https://picsum.photos/seed/pablo-portrait/480/560',
  profilePhotoAlt: 'Pablo Orozco — Fotógrafo, Animador y Videomaker',
  name: 'Pablo Orozco',
  tagline: 'Fotógrafo · Animador · Videomaker',
  bio: 'Soy Pablo Orozco, un creativo visual con más de 8 años de experiencia en fotografía, animación y producción de video. Mi trabajo nace de la pasión por contar historias que impacten y emocionen. Trabajo con marcas, artistas y proyectos independientes que buscan una visión auténtica y cinematográfica.\n\nMe especializo en capturar momentos únicos, crear mundos animados y producir contenido que trasciende lo ordinario. Cada proyecto es una oportunidad de explorar nuevas posibilidades visuales.',
  toolsSectionTitle: 'Herramientas',
  featuredSectionTitle: 'Trabajo Destacado',
  servicesSectionTitle: 'Servicios',
};

export const tools = [
  { id: '1', name: 'Premiere Pro', initial: 'Pr', color: '#9999FF' },
  { id: '2', name: 'After Effects', initial: 'Ae', color: '#9999FF' },
  { id: '3', name: 'Blender', initial: 'Bl', color: '#E87D0D' },
  { id: '4', name: 'Photoshop', initial: 'Ps', color: '#31A8FF' },
  { id: '5', name: 'Lightroom', initial: 'Lr', color: '#31A8FF' },
  { id: '6', name: 'DaVinci', initial: 'Da', color: '#E8C000' },
  { id: '7', name: 'Cinema 4D', initial: 'C4', color: '#011A6A' },
  { id: '8', name: 'Illustrator', initial: 'Ai', color: '#FF9A00' },
];

export const featuredWork = [
  {
    id: '1',
    title: 'Campaña Adidas',
    description: 'Dirección de fotografía para campaña regional de running.',
    image: 'https://picsum.photos/seed/feat1/600/400',
    altText: 'Campaña fotográfica Adidas',
    link: '/portafolio',
  },
  {
    id: '2',
    title: 'Ciudad Invisible',
    description: 'Documental sobre vida nocturna urbana, 25 min.',
    image: 'https://picsum.photos/seed/feat2/600/400',
    altText: 'Documental Ciudad Invisible',
    link: '/portafolio',
  },
  {
    id: '3',
    title: 'Criatura 3D',
    description: 'Personaje animado para cortometraje de ciencia ficción.',
    image: 'https://picsum.photos/seed/feat3/600/400',
    altText: 'Animación 3D Criatura',
    link: '/portafolio',
  },
];

export const services = [
  {
    id: '1',
    name: 'Fotografía',
    description: 'Sesiones profesionales para deportes, retratos, eventos y producto con iluminación de estudio y locación.',
    icon: 'camera',
  },
  {
    id: '2',
    name: 'Videografía',
    description: 'Producción de video corporativo, spots publicitarios, documentales y contenido para redes sociales.',
    icon: 'video',
  },
  {
    id: '3',
    name: 'Animación 3D',
    description: 'Modelado, rigging y animación de personajes y entornos 3D para proyectos audiovisuales e interactivos.',
    icon: 'box',
  },
  {
    id: '4',
    name: 'Post-producción',
    description: 'Edición, colorización, compositing y etalonaje profesional para elevar la calidad visual de tu proyecto.',
    icon: 'layers',
  },
  {
    id: '5',
    name: 'Contenido Digital',
    description: 'Estrategia y producción de contenido visual para redes sociales, web y campañas digitales.',
    icon: 'smartphone',
  },
  {
    id: '6',
    name: 'Foto de Producto',
    description: 'Fotografía de producto para e-commerce, catálogos y campañas con atención al detalle y la estética.',
    icon: 'package',
  },
];

// ─────────────────────────────────────────
// CONTACT PAGE
// ─────────────────────────────────────────
export const contactData = {
  title: 'Hablemos',
  subtitle: 'Creemos algo juntos. Contame sobre tu proyecto y te respondo en menos de 24 horas.',
  submitButtonText: 'Enviar',
  serviceOptions: [
    'Fotografía',
    'Videografía',
    'Animación 3D',
    'Post-producción',
    'Contenido Digital',
    'Fotografía de Producto',
    'Otro',
  ],
  successMessage: '¡Mensaje enviado! Te respondo pronto.',
};
