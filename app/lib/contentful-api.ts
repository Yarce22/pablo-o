import { cfFetch, resolveAsset, resolveAssetWithDimensions, resolveEntry, CfLink } from './contentful';

// Extrae texto plano de un documento Rich Text de Contentful
function richTextToString(doc: unknown): string {
  if (!doc || typeof doc !== 'object') return '';
  const node = doc as { nodeType?: string; content?: unknown[]; value?: string };
  if (node.nodeType === 'text') return node.value ?? '';
  if (!Array.isArray(node.content)) return '';
  return node.content
    .map((child) => {
      const n = child as { nodeType?: string; content?: unknown[]; value?: string };
      if (n.nodeType === 'paragraph') {
        const text = (n.content ?? [])
          .map((c) => richTextToString(c))
          .join('');
        return text;
      }
      return richTextToString(child);
    })
    .filter(Boolean)
    .join('\n\n');
}

// ─────────────────────────────────────────
// SITE SETTINGS
// ─────────────────────────────────────────
interface SiteSettingsFields {
  siteName: string;
  siteDescription: string;
  heroTagline: string;
  heroTitle: string;
  footerCtaQuestion: string;
  footerCtaButtonText: string;
  copyrightText: string;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  heroTagline: string;
  heroTitle: string;
  footerCtaQuestion: string;
  footerCtaButtonText: string;
  copyrightText: string;
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const data = await cfFetch<SiteSettingsFields>('siteSettings');
  const item = data.items[0];
  if (!item) return null;
  const f = item.fields;
  return {
    siteName: f.siteName,
    siteDescription: f.siteDescription,
    heroTagline: f.heroTagline,
    heroTitle: f.heroTitle,
    footerCtaQuestion: f.footerCtaQuestion,
    footerCtaButtonText: f.footerCtaButtonText,
    copyrightText: f.copyrightText,
  };
}

// ─────────────────────────────────────────
// HERO SLIDES
// ─────────────────────────────────────────
interface HeroSlideFields {
  title: string;
  image: CfLink;
  altText: string;
  order: number;
}

export interface HeroSlide {
  id: string;
  image: string;
  altText: string;
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const data = await cfFetch<HeroSlideFields>('heroSlide', {
    order: 'fields.order',
  });
  return data.items
    .map((item) => ({
      id: item.sys.id,
      image: resolveAsset(item.fields.image, data.includes) ?? '',
      altText: item.fields.altText,
    }))
    .filter((s) => s.image);
}

// ─────────────────────────────────────────
// PORTFOLIO PAGE
// ─────────────────────────────────────────
interface PortfolioPageFields {
  title: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
}

export interface PortfolioPageData {
  title: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
}

export async function getPortfolioPage(): Promise<PortfolioPageData | null> {
  const data = await cfFetch<PortfolioPageFields>('portfolioPage');
  const item = data.items[0];
  if (!item) return null;
  return {
    title: item.fields.title,
    subtitle: item.fields.subtitle,
    seoTitle: item.fields.seoTitle,
    seoDescription: item.fields.seoDescription,
  };
}

// ─────────────────────────────────────────
// PORTFOLIO CATEGORIES
// ─────────────────────────────────────────
interface PortfolioCategoryFields {
  name: string;
  slug: string;
  order: number;
}

export interface PortfolioCategory {
  id: string;
  name: string;
  slug: string;
}

export async function getPortfolioCategories(): Promise<PortfolioCategory[]> {
  const data = await cfFetch<PortfolioCategoryFields>('portfolioCategory', {
    order: 'fields.order',
  });
  return data.items.map((item) => ({
    id: item.sys.id,
    name: item.fields.name,
    slug: item.fields.slug,
  }));
}

// ─────────────────────────────────────────
// PORTFOLIO PROJECTS
// ─────────────────────────────────────────
interface PortfolioProjectFields {
  title: string;
  slug: string;
  category: CfLink;
  thumbnail: CfLink;
  altText: string;
  description?: string;
  featured?: boolean;
  order?: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  altText: string;
  featured: boolean;
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const data = await cfFetch<PortfolioProjectFields>('portfolioProject', {
    order: 'fields.order',
  });
  return data.items.map((item) => {
    const f = item.fields;
    const catEntry = resolveEntry<PortfolioCategoryFields>(
      f.category,
      data.includes,
    );
    const thumb = resolveAssetWithDimensions(f.thumbnail, data.includes);
    return {
      id: item.sys.id,
      title: f.title,
      slug: f.slug,
      category: catEntry?.fields.slug ?? '',
      thumbnail: thumb?.url ?? '',
      thumbnailWidth: thumb?.width ?? 600,
      thumbnailHeight: thumb?.height ?? 400,
      altText: f.altText,
      featured: f.featured ?? false,
    };
  });
}

// ─────────────────────────────────────────
// TOOLS
// ─────────────────────────────────────────
interface ToolFields {
  name: string;
  icon: CfLink;
  order: number;
}

export interface ContentfulTool {
  id: string;
  name: string;
  iconUrl: string;
}

export async function getTools(): Promise<ContentfulTool[]> {
  const data = await cfFetch<ToolFields>('tool', { order: 'fields.order' });
  return data.items
    .map((item) => ({
      id: item.sys.id,
      name: item.fields.name,
      iconUrl: resolveAsset(item.fields.icon, data.includes) ?? '',
    }))
    .filter((t) => t.iconUrl);
}

// ─────────────────────────────────────────
// PORTFOLIO PROJECT DETAIL
// ─────────────────────────────────────────
interface PortfolioProjectDetailFields {
  title: string;
  slug: string;
  category: CfLink;
  thumbnail: CfLink;
  altText: string;
  description?: string;
  images?: CfLink[];
  videoUrl?: string;
  featured?: boolean;
}

export interface PortfolioProjectDetail {
  id: string;
  title: string;
  slug: string;
  categoryName: string;
  categorySlug: string;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  altText: string;
  description: string;
  images: string[];
  videoUrl: string | null;
}

export async function getPortfolioProject(
  slug: string,
): Promise<PortfolioProjectDetail | null> {
  const data = await cfFetch<PortfolioProjectDetailFields>('portfolioProject', {
    'fields.slug': slug,
    include: '2',
  });
  const item = data.items[0];
  if (!item) return null;
  const f = item.fields;
  const catEntry = resolveEntry<PortfolioCategoryFields>(f.category, data.includes);
  const thumb = resolveAssetWithDimensions(f.thumbnail, data.includes);
  return {
    id: item.sys.id,
    title: f.title,
    slug: f.slug,
    categoryName: catEntry?.fields.name ?? '',
    categorySlug: catEntry?.fields.slug ?? '',
    thumbnail: thumb?.url ?? '',
    thumbnailWidth: thumb?.width ?? 600,
    thumbnailHeight: thumb?.height ?? 400,
    altText: f.altText,
    description: f.description ?? '',
    images: (f.images ?? [])
      .map((link) => resolveAsset(link, data.includes))
      .filter((url): url is string => !!url),
    videoUrl: f.videoUrl ?? null,
  };
}

// ─────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────
interface ServiceFields {
  title: string;
  description: string;
  icon: CfLink;
  order?: number;
}

export interface ContentfulService {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  order: number;
}

export async function getServices(): Promise<ContentfulService[]> {
  const data = await cfFetch<ServiceFields>('services', { order: 'fields.order' });
  return data.items.map((item) => ({
    id: item.sys.id,
    name: item.fields.title,
    description: item.fields.description,
    iconUrl: resolveAsset(item.fields.icon, data.includes) ?? '',
    order: item.fields.order ?? 0,
  }));
}

// ─────────────────────────────────────────
// ABOUT PAGE
// ─────────────────────────────────────────
interface AboutPageFields {
  name: string;
  tagline: string;
  profilePhoto: CfLink;
  profilePhotoAlt: string;
  bio: unknown; // Rich Text document
  toolsSectionTitle: string;
  featuredSectionTitle: string;
  servicesSectionTitle: string;
  toolImage?: CfLink;
  myPhotosTitle?: string;
  myPhotos?: CfLink[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface AboutPageData {
  name: string;
  tagline: string;
  profilePhotoUrl: string | null;
  profilePhotoAlt: string;
  bio: string;
  toolsSectionTitle: string;
  featuredSectionTitle: string;
  servicesSectionTitle: string;
  toolImageUrl: string | null;
  myPhotosTitle: string | null;
  myPhotos: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export async function getAboutPage(): Promise<AboutPageData | null> {
  const data = await cfFetch<AboutPageFields>('aboutPage');
  const item = data.items[0];
  if (!item) return null;
  const f = item.fields;
  return {
    name: f.name,
    tagline: f.tagline,
    profilePhotoUrl: resolveAsset(f.profilePhoto, data.includes),
    profilePhotoAlt: f.profilePhotoAlt,
    bio: richTextToString(f.bio),
    toolsSectionTitle: f.toolsSectionTitle,
    featuredSectionTitle: f.featuredSectionTitle,
    servicesSectionTitle: f.servicesSectionTitle,
    toolImageUrl: f.toolImage ? resolveAsset(f.toolImage, data.includes) : null,
    myPhotosTitle: f.myPhotosTitle ?? null,
    myPhotos: (f.myPhotos ?? [])
      .map((link) => resolveAsset(link, data.includes))
      .filter((url): url is string => !!url),
    seoTitle: f.seoTitle,
    seoDescription: f.seoDescription,
  };
}
