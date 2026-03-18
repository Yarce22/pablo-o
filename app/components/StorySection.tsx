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
      {/* Mobile: stacked */}
      <div className="md:hidden" style={{ padding: '32px 16px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '4/5',
            borderRadius: 8,
            overflow: 'hidden',
            background: 'var(--surface)',
          }}
        >
          <Image src={photo} alt={photoAlt} fill style={{ objectFit: 'cover' }} sizes="100vw" />
        </div>

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

      {/* Tablet (768px+): side by side */}
      <div
        className="hidden md:flex xl:hidden"
        style={{ padding: '40px 32px', gap: 32, alignItems: 'flex-start' }}
      >
        <div
          style={{
            position: 'relative',
            width: 280,
            height: 340,
            borderRadius: 8,
            overflow: 'hidden',
            background: 'var(--surface)',
            flexShrink: 0,
          }}
        >
          <Image src={photo} alt={photoAlt} fill style={{ objectFit: 'cover' }} sizes="280px" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8 }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 36,
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

      {/* Desktop (1280px+): side by side, larger */}
      <div
        className="hidden xl:flex"
        style={{ padding: '64px 64px', gap: 64, alignItems: 'flex-start' }}
      >
        <div
          style={{
            position: 'relative',
            width: 480,
            height: 560,
            borderRadius: 12,
            overflow: 'hidden',
            background: 'var(--surface)',
            flexShrink: 0,
          }}
        >
          <Image src={photo} alt={photoAlt} fill style={{ objectFit: 'cover' }} sizes="480px" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 24 }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 48,
              fontWeight: 900,
              color: 'var(--text-primary)',
              lineHeight: 1.05,
            }}
          >
            {name}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
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
                fontSize: 16,
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                maxWidth: 560,
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
