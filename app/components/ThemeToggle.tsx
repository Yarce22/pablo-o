'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle({ size = 40 }: { size?: number }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme') as 'dark' | 'light';
    setTheme(current ?? 'dark');
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setTheme(next);
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'var(--surface)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-primary)',
        flexShrink: 0,
        transition: 'background 0.2s',
      }}
    >
      {theme === 'dark' ? <Sun size={size * 0.4} /> : <Moon size={size * 0.4} />}
    </button>
  );
}
