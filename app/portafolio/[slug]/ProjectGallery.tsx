'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectGalleryProps {
  images: string[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fotoParam = searchParams.get('foto');
  const activeIndex =
    fotoParam !== null &&
    !isNaN(parseInt(fotoParam, 10)) &&
    parseInt(fotoParam, 10) >= 0 &&
    parseInt(fotoParam, 10) < images.length
      ? parseInt(fotoParam, 10)
      : null;

  const isOpen = activeIndex !== null;

  function openPhoto(index: number) {
    router.push(`${pathname}?foto=${index}`);
  }

  function closePhoto() {
    router.push(pathname);
  }

  function goTo(index: number) {
    router.replace(`${pathname}?foto=${index}`);
  }

  // Bloquear scroll del body cuando está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Navegación con teclado
  useEffect(() => {
    if (!isOpen || activeIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closePhoto();
      if (e.key === 'ArrowLeft' && activeIndex! > 0) goTo(activeIndex! - 1);
      if (e.key === 'ArrowRight' && activeIndex! < images.length - 1) goTo(activeIndex! + 1);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, activeIndex]);

  return (
    <>
      {/* Scroll horizontal de miniaturas */}
      <div
        className="filter-scroll"
        style={{ display: 'flex', gap: 12, padding: '0 var(--page-px) 40px' }}
      >
        {images.map((url, i) => (
          <button
            key={i}
            onClick={() => openPhoto(i)}
            aria-label={`Ver foto ${i + 1} en pantalla completa`}
            style={{
              position: 'relative',
              width: 280,
              height: 200,
              flexShrink: 0,
              borderRadius: 8,
              overflow: 'hidden',
              background: 'var(--surface)',
              cursor: 'pointer',
              border: 'none',
              padding: 0,
              transition: 'opacity 0.2s',
            }}
          >
            <Image
              src={url}
              alt={`Foto ${i + 1}`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="280px"
            />
          </button>
        ))}
      </div>

      {/* Modal fullscreen */}
      {isOpen && activeIndex !== null && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.96)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={closePhoto}
        >
          {/* Imagen */}
          <div
            style={{ position: 'relative', width: '100%', height: '100%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt={`Foto ${activeIndex + 1}`}
              fill
              style={{ objectFit: 'contain' }}
              sizes="100vw"
              priority
            />
          </div>

          {/* Cerrar */}
          <button
            onClick={closePhoto}
            aria-label="Cerrar"
            style={{
              position: 'fixed',
              top: 20,
              right: 20,
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 51,
            }}
          >
            <X size={22} />
          </button>

          {/* Anterior */}
          {activeIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); goTo(activeIndex - 1); }}
              aria-label="Foto anterior"
              style={{
                position: 'fixed',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 51,
              }}
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Siguiente */}
          {activeIndex < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goTo(activeIndex + 1); }}
              aria-label="Foto siguiente"
              style={{
                position: 'fixed',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 51,
              }}
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Contador */}
          <div
            style={{
              position: 'fixed',
              bottom: 24,
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              color: 'rgba(255,255,255,0.6)',
              zIndex: 51,
            }}
          >
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
