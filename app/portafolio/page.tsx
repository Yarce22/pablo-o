import type { Metadata } from 'next';
import {
  getPortfolioPage,
  getPortfolioCategories,
  getPortfolioProjects,
} from '../lib/contentful-api';
import { portfolioProjects as mockProjects } from '../lib/mock-data';
import PortfolioClient from './PortfolioClient';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPortfolioPage().catch(() => null);
  return {
    title: page?.seoTitle ?? 'Portafolio',
    description: page?.seoDescription ?? 'Proyectos de Pablo Orozco.',
  };
}

export default async function PortfolioPage() {
  const [pageData, cfCategories, cfProjects] = await Promise.all([
    getPortfolioPage().catch(() => null),
    getPortfolioCategories().catch(() => []),
    getPortfolioProjects().catch(() => []),
  ]);

  const title = pageData?.title ?? 'Portafolio';
  const subtitle =
    pageData?.subtitle ?? 'Explorá mi trabajo en fotografía, video y animación.';

  // Always prepend "Todos", then CMS categories
  const categories = [
    { id: 'all', name: 'Todos', slug: 'todos' },
    ...cfCategories,
  ];

  // Use CMS projects; fall back to mock only if CMS returns nothing
  const projects = cfProjects.length > 0 ? cfProjects : mockProjects;

  return (
    <PortfolioClient
      title={title}
      subtitle={subtitle}
      categories={categories}
      projects={projects}
    />
  );
}
