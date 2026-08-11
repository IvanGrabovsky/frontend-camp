import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';
import { withBasePath } from '@/lib/paths';

interface SiteHeaderProps {
  breadcrumb?: { label: string; href?: string }[];
}

export function SiteHeader({ breadcrumb }: SiteHeaderProps) {
  return (
    <header className="topnav">
      <div className="topnav__inner">
        <Link className="topnav__back" href="/" aria-label="На головну" title="На головну">
          ←
        </Link>
        <nav className="breadcrumb" aria-label="Хлібні крихти">
          {breadcrumb?.length ? (
            breadcrumb.map((item, i) => (
              <span key={item.label}>
                {i > 0 && <span className="breadcrumb__sep"> → </span>}
                {item.href ? (
                  <Link href={item.href}>{item.label}</Link>
                ) : (
                  <span className="breadcrumb__current">{item.label}</span>
                )}
              </span>
            ))
          ) : (
            <span className="breadcrumb__current">Курс</span>
          )}
        </nav>
        <div className="topnav__actions">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        Проект підготував{' '}
        <a href="https://github.com/IvanGrabovsky">GitHub</a> ·{' '}
        <strong>Іван Грабовський</strong> · 2026 · Тільки для некомерційного використання
      </p>
    </footer>
  );
}

export function courseStylesHref(): string {
  return withBasePath('/courses/js-arrays/assets/css/style.css');
}
