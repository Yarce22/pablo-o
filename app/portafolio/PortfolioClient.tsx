'use client';

import { useState } from 'react';
import { FilterPills } from '../components/FilterPills';
import { PortfolioGrid } from '../components/PortfolioGrid';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  altText: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
}

interface PortfolioClientProps {
  title: string;
  subtitle: string;
  categories: Category[];
  projects: Project[];
}

export default function PortfolioClient({
  title,
  subtitle,
  categories,
  projects,
}: PortfolioClientProps) {
  const [activeCategory, setActiveCategory] = useState('todos');

  const filtered =
    activeCategory === 'todos'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Page header */}
      <div style={{ padding: '32px var(--page-px) 0' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            letterSpacing: '-1px',
            color: 'var(--text-primary)',
            fontSize: 32,
            lineHeight: 1.1,
          }}
          className="md:text-[40px] xl:text-[56px]"
        >
          {title}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-secondary)',
            marginTop: 8,
            fontSize: 14,
          }}
          className="md:text-base xl:text-lg"
        >
          {subtitle}
        </p>
      </div>

      {/* Filter pills */}
      <div style={{ marginTop: 24 }} className="md:mt-6">
        <FilterPills
          categories={categories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />
      </div>

      {/* Grid */}
      <PortfolioGrid projects={filtered} />
    </>
  );
}
