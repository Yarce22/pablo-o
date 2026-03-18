import Image from 'next/image';
import Link from 'next/link';

interface PortfolioCardProps {
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  altText: string;
  height?: number;
}

export function PortfolioCard({
  title,
  slug,
  category,
  thumbnail,
  altText,
  height = 240,
}: PortfolioCardProps) {
  return (
    <Link
      href={`/portafolio/${slug}`}
      className="portfolio-card"
      style={{
        position: 'relative',
        display: 'block',
        height,
        borderRadius: 8,
        overflow: 'hidden',
        background: 'var(--surface)',
      }}
      aria-label={`Ver proyecto: ${title}`}
    >
      {/* Thumbnail */}
      <Image
        src={thumbnail}
        alt={altText}
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
      />

      {/* Bottom gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(0deg, rgba(6,6,9,0.9) 0%, rgba(6,6,9,0.4) 40%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Text */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '0 12px 12px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 14,
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.3,
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 11,
            fontWeight: 400,
            color: 'var(--text-secondary)',
            marginTop: 2,
            textTransform: 'capitalize',
          }}
        >
          {category}
        </p>
      </div>
    </Link>
  );
}
