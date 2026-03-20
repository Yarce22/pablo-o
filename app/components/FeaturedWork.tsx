import Image from 'next/image';
import Link from 'next/link';

interface FeaturedItem {
  id: string;
  title: string;
  description: string;
  image: string;
  altText: string;
  link: string;
}

interface FeaturedWorkProps {
  title: string;
  items: FeaturedItem[];
}

function FeaturedCard({ item }: { item: FeaturedItem }) {
  return (
    <Link
      href={item.link}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        flexShrink: 0,
        textDecoration: 'none',
      }}
      aria-label={`Ver trabajo: ${item.title}`}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/10',
          borderRadius: 8,
          overflow: 'hidden',
          background: 'var(--surface)',
        }}
      >
        <Image
          src={item.image}
          alt={item.altText}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 280px, 100vw"
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 14,
            fontWeight: 700,
            color: 'var(--text-primary)',
          }}
        >
          {item.title}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: 'var(--text-secondary)',
            lineHeight: 1.4,
          }}
        >
          {item.description}
        </p>
      </div>
    </Link>
  );
}

export function FeaturedWork({ title, items }: FeaturedWorkProps) {
  return (
    <section aria-label={title} style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 26,
          fontWeight: 800,
          color: 'var(--text-primary)',
        }}
      >
        {title}
      </h2>
      {/* Mobile y tablet: columna vertical */}
      <div className="xl:hidden" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.map((item) => (
          <FeaturedCard key={item.id} item={item} />
        ))}
      </div>

      {/* Desktop: 3 columnas */}
      <div className="hidden xl:grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {items.map((item) => (
          <FeaturedCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
