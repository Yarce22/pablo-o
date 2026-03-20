'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSlide {
  id: string;
  image: string;
  altText: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
  tagline: string;
  heroTitle: string;
}

export function HeroSlider({ slides, tagline, heroTitle }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
  }, [slides.length]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const go = (idx: number) => {
    setCurrent((idx + slides.length) % slides.length);
    resetTimer();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? go(current + 1) : go(current - 1);
  };

  const titleLines = heroTitle.split('\n');

  return (
    <section
      className="hero-section"
      aria-label="Hero — Pablo Orozco"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: i === current ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
          aria-hidden={i !== current}
        >
          {/* Fondo blur — misma imagen escalada y desenfocada */}
          <Image
            src={slide.image}
            alt=""
            fill
            style={{ objectFit: 'cover', filter: 'blur(24px)', transform: 'scale(1.1)' }}
            priority={i === 0}
            sizes="100vw"
            aria-hidden="true"
          />
          {/* Imagen principal completa */}
          <Image
            src={slide.image}
            alt={slide.altText}
            fill
            style={{ objectFit: 'contain' }}
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, transparent 0%, rgba(6,6,9,0.8) 60%, #060609 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Text content */}
      <div
        className="hero-content-pad"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          textAlign: 'center',
          gap: 12,
        }}
      >
        <p
          className="hero-tag"
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            letterSpacing: '2px',
            color: 'var(--red)',
            textTransform: 'uppercase',
          }}
        >
          {tagline}
        </p>

        <h1
          className="hero-title"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: '-1px',
            color: '#ffffff',
          }}
        >
          {titleLines.map((line, i) => (
            <span key={i} style={{ display: 'block' }}>
              {line}
            </span>
          ))}
        </h1>
      </div>

      {/* Arrow — prev */}
      <button
        onClick={() => go(current - 1)}
        aria-label="Slide anterior"
        className="hero-arrow"
        style={{ left: 16 }}
      >
        <ChevronLeft size={22} />
      </button>

      {/* Arrow — next */}
      <button
        onClick={() => go(current + 1)}
        aria-label="Siguiente slide"
        className="hero-arrow"
        style={{ right: 16 }}
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          zIndex: 10,
        }}
        role="tablist"
        aria-label="Navegación de slides"
      >
        {slides.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
            onClick={() => go(i)}
            style={{
              width: i === current ? 24 : 8,
              height: 3,
              borderRadius: 2,
              background: i === current ? 'var(--red)' : 'var(--text-muted)',
              transition: 'width 0.3s ease, background 0.3s ease',
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}
