'use client';

import Image from 'next/image';
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
  icon?: string;
  iconUrl?: string;
}

interface ServicesGridProps {
  title: string;
  services: Service[];
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon ? (ICON_MAP[service.icon] ?? Box) : null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
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
          position: 'relative',
          overflow: 'hidden',
        }}
        aria-hidden="true"
      >
        {service.iconUrl ? (
          <Image
            src={service.iconUrl}
            alt={service.name}
            fill
            style={{ objectFit: 'contain', padding: 8 }}
            sizes="44px"
          />
        ) : Icon ? (
          <Icon size={22} />
        ) : null}
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
    <section
      aria-label={title}
      style={{ padding: '32px var(--page-px)', display: 'flex', flexDirection: 'column', gap: 20 }}
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
      <div className="flex flex-col xl:grid" style={{ gap: 16, gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
    </section>
  );
}
