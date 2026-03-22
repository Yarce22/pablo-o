import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getPortfolioProject, getPortfolioProjects } from '../../lib/contentful-api';
import { ProjectGallery } from './ProjectGallery';

function getEmbedUrl(videoUrl: string): string | null {
  const yt = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?rel=0`;
  const vimeo = videoUrl.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

export async function generateStaticParams() {
  const projects = await getPortfolioProjects().catch(() => []);
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPortfolioProject(slug).catch(() => null);
  return {
    title: project?.title ?? 'Proyecto',
    description: project?.description || `Proyecto de ${project?.categoryName ?? 'portafolio'}.`,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getPortfolioProject(slug).catch(() => null);
  if (!project) notFound();

  const embedUrl = project.videoUrl ? getEmbedUrl(project.videoUrl) : null;

  return (
    <article>
      {/* Hero: video o imagen principal */}
      <div style={{ padding: '40px var(--page-px) 0' }}>
        {embedUrl ? (
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              maxHeight: '80dvh',
              background: 'var(--surface)',
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            <iframe
              src={embedUrl}
              title={project.title}
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <Image
            src={project.thumbnail}
            alt={project.altText}
            width={project.thumbnailWidth}
            height={project.thumbnailHeight}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '80dvh',
              objectFit: 'contain',
              display: 'block',
              borderRadius: 8,
            }}
            sizes="100vw"
            priority
          />
        )}
      </div>

      {/* Info del proyecto */}
      <div style={{ padding: '32px var(--page-px)', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--red)',
            letterSpacing: '1px',
            textTransform: 'capitalize',
          }}
        >
          {project.categoryName}
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 900,
            color: 'var(--text-primary)',
            lineHeight: 1.1,
          }}
        >
          {project.title}
        </h1>
        {project.description && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 16,
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: 720,
            }}
          >
            {project.description}
          </p>
        )}
      </div>

      {/* Galería de imágenes */}
      {project.images.length > 0 && (
        <Suspense>
          <ProjectGallery images={project.images} />
        </Suspense>
      )}
    </article>
  );
}
