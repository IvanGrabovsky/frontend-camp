'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'js-arrays-theme';

function getInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const current = getInitialTheme();
    setTheme(current);
    setMounted(true);
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9 text-muted-foreground" aria-label="Змінити тему">
        <Sun className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      className="w-9 h-9 text-muted-foreground hover:text-foreground transition-colors"
      aria-label={theme === 'dark' ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'}
      title={theme === 'dark' ? 'Світла тема' : 'Темна тема'}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 scale-100" />
      ) : (
        <Moon className="w-4 h-4 text-slate-700 transition-transform rotate-0 scale-100" />
      )}
    </Button>
  );
}

export function ThemeInitScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');var isDark=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(isDark){document.documentElement.classList.add('dark');document.documentElement.setAttribute('data-theme','dark');}else{document.documentElement.classList.remove('dark');document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`,
      }}
    />
  );
}
