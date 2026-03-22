import { PortfolioCard } from './PortfolioCard';

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  altText: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
}

interface PortfolioGridProps {
  projects: Project[];
}

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  if (projects.length === 0) {
    return (
      <div
        style={{
          padding: '64px 16px',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-body)',
          fontSize: 15,
        }}
      >
        No hay proyectos en esta categoría.
      </div>
    );
  }

  return (
    <div className="portfolio-masonry">
      {projects.map((project) => (
        <div key={project.id} className="portfolio-card-wrap">
          <PortfolioCard
            title={project.title}
            slug={project.slug}
            category={project.category}
            thumbnail={project.thumbnail}
            altText={project.altText}
            thumbnailWidth={project.thumbnailWidth}
            thumbnailHeight={project.thumbnailHeight}
          />
        </div>
      ))}
    </div>
  );
}
