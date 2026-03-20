import Image from 'next/image';

interface MyPhotosProps {
  title: string;
  photos: string[];
}

export function MyPhotos({ title, photos }: MyPhotosProps) {
  if (photos.length === 0) return null;

  return (
    <section aria-label={title} style={{ padding: '32px' }}>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 26,
          fontWeight: 800,
          color: 'var(--text-primary)',
          marginBottom: 20,
        }}
      >
        {title}
      </h2>

      <div
        className="filter-scroll"
        style={{ display: 'flex', gap: 12, paddingBottom: 8 }}
      >
        {photos.map((url, i) => (
          <div
            key={i}
            style={{
              position: 'relative',
              height: 280,
              width: 380,
              flexShrink: 0,
              borderRadius: 8,
              overflow: 'hidden',
              background: 'var(--surface)',
            }}
          >
            <Image
              src={url}
              alt={`${title} ${i + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="380px"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
