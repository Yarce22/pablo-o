'use client';

import {
  Camera,
  Video,
  Box,
  Layers,
  Smartphone,
  Package,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  camera: Camera,
  video: Video,
  box: Box,
  layers: Layers,
  smartphone: Smartphone,
  package: Package,
};

interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface ServicesGridProps {
  title: string;
  services: Service[];
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = ICON_MAP[service.icon] ?? Box;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 16,
        padding: 20,
        background: 'var(--surface)',
        borderRadius: 8,
        border: '1px solid transparent',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'var(--red)';
        el.style.boxShadow = '0 0 20px rgba(235,37,37,0.15)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'transparent';
        el.style.boxShadow = 'none';
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 8,
          background: 'rgba(235,37,37,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--red)',
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        <Icon size={22} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 16,
            fontWeight: 700,
            color: 'var(--text-primary)',
          }}
        >
          {service.name}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
          }}
        >
          {service.description}
        </p>
      </div>
    </div>
  );
}

export function ServicesGrid({ title, services }: ServicesGridProps) {
  return (
    <section aria-label={title}>
      {/* Mobile: stacked */}
      <div
        className="md:hidden"
        style={{ padding: '32px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </div>

      {/* Tablet: 2 cols */}
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </div>

      {/* Desktop: 3 cols */}
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
