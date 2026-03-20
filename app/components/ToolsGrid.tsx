import Image from 'next/image';

interface Tool {
  id: string;
  name: string;
  iconUrl?: string;
  initial?: string;
  color?: string;
}

interface ToolsGridProps {
  title: string;
  tools: Tool[];
  toolImageUrl?: string | null;
}

function ToolItem({ tool }: { tool: Tool }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      {tool.iconUrl ? (
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            overflow: 'hidden',
            position: 'relative',
            background: 'var(--surface)',
          }}
          aria-hidden="true"
        >
          <Image
            src={tool.iconUrl}
            alt={tool.name}
            fill
            style={{ objectFit: 'contain', padding: 8 }}
            sizes="56px"
          />
        </div>
      ) : (
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 12,
            background: tool.color ?? 'var(--surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontFamily: 'var(--font-display)',
            fontSize: 16,
            fontWeight: 700,
          }}
          aria-hidden="true"
        >
          {tool.initial}
        </div>
      )}
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 11,
          color: 'var(--text-secondary)',
          textAlign: 'center',
          lineHeight: 1.3,
        }}
      >
        {tool.name}
      </span>
    </div>
  );
}

export function ToolsGrid({ title, tools, toolImageUrl }: ToolsGridProps) {
  return (
    <section aria-label={title} style={{ padding: '32px var(--page-px)' }}>
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

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32, alignItems: 'start' }}>
        {/* Columna izquierda: iconos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {tools.map((tool) => (
            <ToolItem key={tool.id} tool={tool} />
          ))}
        </div>

        {/* Columna derecha: imagen */}
        {toolImageUrl && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '4/3',
              borderRadius: 8,
              overflow: 'hidden',
              background: 'var(--surface)',
            }}
          >
            <Image
              src={toolImageUrl}
              alt="Herramientas de trabajo"
              fill
              style={{ objectFit: 'cover' }}
              sizes="50vw"
            />
          </div>
        )}
      </div>
    </section>
  );
}
