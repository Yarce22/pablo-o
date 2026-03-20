import type { Metadata } from 'next';
import { StorySection } from '../components/StorySection';
import { ToolsGrid } from '../components/ToolsGrid';
import { FeaturedWork } from '../components/FeaturedWork';
import { ServicesGrid } from '../components/ServicesGrid';
import { getAboutPage, getTools, getServices, getPortfolioProjects } from '../lib/contentful-api';
import { MyPhotos } from '../components/MyPhotos';
import {
  aboutData as mockAboutData,
  tools as mockTools,
  featuredWork,
  services as mockServices,
} from '../lib/mock-data';

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage().catch(() => null);
  return {
    title: about?.seoTitle ?? 'Sobre mí',
    description:
      about?.seoDescription ??
      'Conocé la historia de Pablo Orozco — fotógrafo, animador y videomaker.',
  };
}

export default async function AboutPage() {
  const [about, cfTools, cfServices, cfProjects] = await Promise.all([
    getAboutPage().catch(() => null),
    getTools().catch(() => []),
    getServices().catch(() => []),
    getPortfolioProjects().catch(() => []),
  ]);

  const profilePhoto = about?.profilePhotoUrl ?? mockAboutData.profilePhoto;
  const profilePhotoAlt = about?.profilePhotoAlt ?? mockAboutData.profilePhotoAlt;
  const name = about?.name ?? mockAboutData.name;
  const tagline = about?.tagline ?? mockAboutData.tagline;
  const bio = about?.bio ?? mockAboutData.bio;
  const toolsSectionTitle = about?.toolsSectionTitle ?? mockAboutData.toolsSectionTitle;
  const featuredSectionTitle = about?.featuredSectionTitle ?? mockAboutData.featuredSectionTitle;
  const servicesSectionTitle = about?.servicesSectionTitle ?? mockAboutData.servicesSectionTitle;

  const tools = cfTools.length > 0 ? cfTools : mockTools;
  type ServiceItem = { id: string; name: string; description: string; icon?: string; iconUrl?: string };
  const services: ServiceItem[] = cfServices.length > 0 ? cfServices : mockServices;

  const cfFeatured = cfProjects
    .filter((p) => p.featured)
    .map((p) => ({
      id: p.id,
      title: p.title,
      description: '',
      image: p.thumbnail,
      altText: p.altText,
      link: `/portafolio/${p.slug}`,
    }));
  const featured = cfFeatured.length > 0 ? cfFeatured : featuredWork;

  return (
    <>
      {/* Sección 1: Story */}
      <StorySection
        photo={profilePhoto}
        photoAlt={profilePhotoAlt}
        name={name}
        tagline={tagline}
        bio={bio}
      />

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border)', margin: '0 16px' }} className="md:mx-8 xl:mx-16" />

      {/* Sección 1b: My Photos */}
      {about?.myPhotos && about.myPhotos.length > 0 && (
        <>
          <MyPhotos
            title={about.myPhotosTitle ?? 'Mis fotos'}
            photos={about.myPhotos}
          />
          <div style={{ borderTop: '1px solid var(--border)', margin: '0 16px' }} className="md:mx-8 xl:mx-16" />
        </>
      )}

      {/* Sección 2: Tools */}
      <ToolsGrid title={toolsSectionTitle} tools={tools} toolImageUrl={about?.toolImageUrl} />

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border)', margin: '0 16px' }} className="md:mx-8 xl:mx-16" />

      {/* Sección 3: Featured Work */}
      <FeaturedWork title={featuredSectionTitle} items={featured} />

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border)', margin: '0 16px' }} className="md:mx-8 xl:mx-16" />

      {/* Sección 4: Services */}
      <ServicesGrid title={servicesSectionTitle} services={services} />
    </>
  );
}
