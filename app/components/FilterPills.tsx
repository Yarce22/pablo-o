'use client';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface FilterPillsProps {
  categories: Category[];
  active: string;
  onSelect: (slug: string) => void;
}

export function FilterPills({ categories, active, onSelect }: FilterPillsProps) {
  return (
    <div
      className="filter-scroll"
      style={{ height: 44, display: 'flex', alignItems: 'center' }}
      role="group"
      aria-label="Filtrar por categoría"
    >
      <div
        style={{
          display: 'flex',
          gap: 8,
          padding: '0 16px',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        {categories.map((cat) => {
          const isActive = cat.slug === active;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.slug)}
              aria-pressed={isActive}
              style={{
                height: 32,
                padding: '0 16px',
                borderRadius: 16,
                background: isActive ? 'var(--red)' : 'var(--surface)',
                color: isActive ? '#fff' : 'var(--text-secondary)',
                fontFamily: 'var(--font-body)',
                fontSize: 12,
                fontWeight: isActive ? 600 : 500,
                whiteSpace: 'nowrap',
                transition: 'background 0.2s, color 0.2s',
                flexShrink: 0,
              }}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
