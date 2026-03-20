import Image from 'next/image';

interface StorySectionProps {
  photo: string;
  photoAlt: string;
  name: string;
  tagline: string;
  bio: string;
}

export function StorySection({ photo, photoAlt, name, tagline, bio }: StorySectionProps) {
  const bioParagraphs = bio.split('\n\n').filter(Boolean);

  return (
    <section aria-label="Historia de Pablo Orozco">
      <div
        className="flex flex-col xl:flex-row xl:items-start"
        style={{ padding: '40px var(--page-px)', gap: 32 }}
      >
        {/* Foto */}
        <div
          className="relative w-full aspect-[4/5] xl:w-[280px] xl:h-[340px] xl:aspect-auto xl:shrink-0"
          style={{ borderRadius: 8, overflow: 'hidden', background: 'var(--surface)' }}
        >
          <Image
            src={photo}
            alt={photoAlt}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(min-width: 1280px) 280px, 100vw"
          />
        </div>

        {/* Texto */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 28,
              fontWeight: 900,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
            }}
          >
            {name}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              color: 'var(--red)',
              fontWeight: 500,
              letterSpacing: '1px',
            }}
          >
            {tagline}
          </p>
          {bioParagraphs.map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
