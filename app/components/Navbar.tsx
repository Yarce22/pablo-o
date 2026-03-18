'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Portafolio', href: '/portafolio' },
  { label: 'Sobre mí', href: '/sobre-mi' },
  { label: 'Contacto', href: '/contacto' },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className="sticky top-0 z-40"
        style={{ background: 'var(--bg)' }}
      >
        {/* ── Mobile (< 768px) ── */}
        <div
          className="flex md:hidden items-center justify-between"
          style={{ height: 56, padding: '0 16px' }}
        >
          <Link
            href="/"
            aria-label="Pablo Orozco — Inicio"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: '2px',
              color: 'var(--text-primary)',
            }}
          >
            PABLO OROZCO
          </Link>

          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            style={{
              width: 44,
              height: 44,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <span style={{ width: 24, height: 2, background: 'var(--text-primary)', borderRadius: 1, display: 'block' }} />
            <span style={{ width: 24, height: 2, background: 'var(--text-primary)', borderRadius: 1, display: 'block' }} />
            <span style={{ width: 16, height: 2, background: 'var(--text-primary)', borderRadius: 1, display: 'block' }} />
          </button>
        </div>

        {/* ── Tablet (768px – 1279px) ── */}
        <div
          className="hidden md:flex xl:hidden items-center justify-between"
          style={{ height: 64, padding: '0 32px' }}
        >
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: '2px',
              color: 'var(--text-primary)',
            }}
          >
            PABLO OROZCO
          </Link>

          <nav className="flex items-center" style={{ gap: 24 }} aria-label="Navegación principal">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    fontWeight: active ? 600 : 500,
                    color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                    transition: 'color 0.2s',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <ThemeToggle size={36} />
          </nav>
        </div>

        {/* ── Desktop (1280px+) ── */}
        <div
          className="hidden xl:flex items-center justify-between"
          style={{ height: 72, padding: '0 64px' }}
        >
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: '3px',
              color: 'var(--text-primary)',
            }}
          >
            PABLO OROZCO
          </Link>

          <nav className="flex items-center" style={{ gap: 40 }} aria-label="Navegación principal">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 15,
                    fontWeight: active ? 600 : 500,
                    color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                    transition: 'color 0.2s',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <ThemeToggle size={40} />
          </nav>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        navLinks={NAV_LINKS}
        currentPath={pathname}
      />
    </>
  );
}
