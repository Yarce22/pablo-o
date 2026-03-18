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
    <section aria-label={title}>
      {/* Mobile: stacked */}
      <div
        className="md:hidden"
        style={{ padding: '32px 16px', display: 'flex', flexDirection: 'column', gap: 20 }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            fontWeight: 800,
            color: 'var(--text-primary)',
          }}
        >
          {title}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {items.map((item) => (
            <FeaturedCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Tablet: horizontal scroll */}
      <div
        className="hidden md:flex xl:hidden flex-col"
        style={{ padding: '32px', gap: 20 }}
      >
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
        <div
          className="filter-scroll"
          style={{ display: 'flex', gap: 16, paddingBottom: 8 }}
        >
          {items.map((item) => (
            <div key={item.id} style={{ width: 280, flexShrink: 0 }}>
              <FeaturedCard item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: row of 3 */}
      <div
        className="hidden xl:flex flex-col"
        style={{ padding: '48px 64px', gap: 24 }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 32,
            fontWeight: 800,
            color: 'var(--text-primary)',
          }}
        >
          {title}
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
        >
          {items.map((item) => (
            <FeaturedCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
