import { StorySection } from '../components/StorySection';
import { ToolsGrid } from '../components/ToolsGrid';
import { FeaturedWork } from '../components/FeaturedWork';
import { ServicesGrid } from '../components/ServicesGrid';
import {
  aboutData,
  tools,
  featuredWork,
  services,
} from '../lib/mock-data';

export const metadata = {
  title: 'Sobre mí',
  description:
    'Conocé la historia de Pablo Orozco — fotógrafo, animador y videomaker con más de 8 años de experiencia.',
};

export default function AboutPage() {
  return (
    <>
      {/* Sección 1: Story */}
      <StorySection
        photo={aboutData.profilePhoto}
        photoAlt={aboutData.profilePhotoAlt}
        name={aboutData.name}
        tagline={aboutData.tagline}
        bio={aboutData.bio}
      />

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border)', margin: '0 16px' }} className="md:mx-8 xl:mx-16" />

      {/* Sección 2: Tools */}
      <ToolsGrid title={aboutData.toolsSectionTitle} tools={tools} />

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border)', margin: '0 16px' }} className="md:mx-8 xl:mx-16" />

      {/* Sección 3: Featured Work */}
      <FeaturedWork title={aboutData.featuredSectionTitle} items={featuredWork} />

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border)', margin: '0 16px' }} className="md:mx-8 xl:mx-16" />

      {/* Sección 4: Services */}
      <ServicesGrid title={aboutData.servicesSectionTitle} services={services} />
    </>
  );
}
