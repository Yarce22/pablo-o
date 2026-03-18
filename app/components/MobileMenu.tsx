'use client';

import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

type NavLink = { label: string; href: string };

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navLinks: NavLink[];
  currentPath: string;
}

export function MobileMenu({ open, onClose, navLinks, currentPath }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ background: 'var(--bg)' }}
          className="fixed inset-0 z-50 flex flex-col"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between"
            style={{ height: 56, padding: '0 16px' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: '2px',
                color: 'var(--text-primary)',
              }}
            >
              PABLO OROZCO
            </span>
            <button
              onClick={onClose}
              aria-label="Cerrar menú"
              style={{
                width: 44,
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
              }}
            >
              <X size={24} />
            </button>
          </div>

          {/* Links */}
          <nav
            aria-label="Menú móvil"
            className="flex flex-col flex-1 justify-center"
            style={{ padding: '0 32px', gap: 8 }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.22 }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-display)',
                    fontSize: 36,
                    fontWeight: 900,
                    color: currentPath === link.href ? 'var(--red)' : 'var(--text-primary)',
                    lineHeight: 1.2,
                    padding: '12px 0',
                    transition: 'color 0.2s',
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Footer: theme toggle */}
          <div
            className="flex justify-center"
            style={{ padding: '32px 0 48px' }}
          >
            <ThemeToggle size={44} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
