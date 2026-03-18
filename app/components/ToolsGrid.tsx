interface Tool {
  id: string;
  name: string;
  initial: string;
  color: string;
}

interface ToolsGridProps {
  title: string;
  tools: Tool[];
}

function ToolItem({ tool }: { tool: Tool }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {/* Icon placeholder — replaced by next/image from Contentful in production */}
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 12,
          background: tool.color,
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

export function ToolsGrid({ title, tools }: ToolsGridProps) {
  return (
    <section aria-label={title}>
      {/* Mobile */}
      <div className="md:hidden" style={{ padding: '32px 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {tools.map((tool) => (
            <ToolItem key={tool.id} tool={tool} />
          ))}
        </div>
      </div>

      {/* Tablet */}
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {tools.map((tool) => (
            <ToolItem key={tool.id} tool={tool} />
          ))}
        </div>
      </div>

      {/* Desktop */}
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 24 }}>
          {tools.map((tool) => (
            <ToolItem key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
