'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'js-arrays-theme';

function getTheme(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    setTheme(getTheme());
  }, []);

  function toggle() {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    setTheme(next);
  }

  const isLight = theme === 'light';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={isLight ? 'Увімкнути темну тему' : 'Увімкнути світлу тему'}
      title={isLight ? 'Темна тема' : 'Світла тема'}
      aria-pressed={isLight}
    >
      <span className="theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true">
        ☀️
      </span>
      <span className="theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true">
        🌙
      </span>
    </button>
  );
}

export function ThemeInitScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var t=localStorage.getItem('js-arrays-theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
      }}
    />
  );
}
