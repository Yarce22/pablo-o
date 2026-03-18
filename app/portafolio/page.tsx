'use client';

import { useState } from 'react';
import { FilterPills } from '../components/FilterPills';
import { PortfolioGrid } from '../components/PortfolioGrid';
import { portfolioCategories, portfolioProjects } from '../lib/mock-data';

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('todos');

  const filtered =
    activeCategory === 'todos'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Page header */}
      <div style={{ padding: '32px 16px 0' }} className="md:px-8 xl:px-16 xl:pt-12">
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
          Portafolio
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
          Explorá mi trabajo en fotografía, video y animación.
        </p>
      </div>

      {/* Filter pills */}
      <div style={{ marginTop: 24 }} className="md:mt-6">
        <FilterPills
          categories={portfolioCategories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />
      </div>

      {/* Grid */}
      <PortfolioGrid projects={filtered} />
    </>
  );
}
