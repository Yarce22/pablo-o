'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PortfolioCardProps {
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  altText: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
}

export function PortfolioCard({
  title,
  slug,
  category,
  thumbnail,
  altText,
  thumbnailWidth,
  thumbnailHeight,
}: PortfolioCardProps) {
  const [active, setActive] = useState(false);

  const handleTap = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      // On touch devices, first tap reveals overlay; second tap navigates
      if ('ontouchstart' in window) {
        if (!active) {
          e.preventDefault();
          setActive(true);
        }
        // If already active, let the Link navigate normally
      }
    },
    [active],
  );

  // Close overlay when tapping outside (blur)
  const handleBlur = useCallback(() => {
    setActive(false);
  }, []);

  return (
    <Link
      href={`/portafolio/${slug}`}
      className="portfolio-card group"
      onClick={handleTap}
      onBlur={handleBlur}
      tabIndex={0}
      style={{
        position: 'relative',
        display: 'block',
        borderRadius: 8,
        overflow: 'hidden',
        background: 'var(--surface)',
      }}
      aria-label={`Ver proyecto: ${title}`}
    >
      {/* Thumbnail — natural aspect ratio */}
      <Image
        src={thumbnail}
        alt={altText}
        width={thumbnailWidth}
        height={thumbnailHeight}
        style={{ width: '100%', height: 'auto', display: 'block' }}
        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
      />

      {/* Bottom gradient overlay — hidden by default, shown on hover/tap */}
      <div
        className={`portfolio-card__overlay ${active ? 'portfolio-card__overlay--active' : ''}`}
      />

      {/* Text — hidden by default, shown on hover/tap */}
      <div
        className={`portfolio-card__info ${active ? 'portfolio-card__info--active' : ''}`}
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
