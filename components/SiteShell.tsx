import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { withBasePath } from '@/lib/paths';

interface SiteHeaderProps {
  breadcrumb?: { label: string; href?: string }[];
}

export function SiteHeader({ breadcrumb }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md shadow-sm">
      <div className="container flex h-14 items-center justify-between px-4 max-w-6xl mx-auto gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <Link className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0" href="/" aria-label="На головну" title="На головну">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <nav className="flex items-center space-x-1 text-xs sm:text-sm font-medium text-muted-foreground overflow-x-auto whitespace-nowrap py-1 scrollbar-none" aria-label="Хлібні крихти">
            {breadcrumb?.length ? (
              breadcrumb.map((item, i) => (
                <span key={item.label} className="inline-flex items-center">
                  {i > 0 && <span className="mx-1.5 sm:mx-2 text-muted-foreground/40">/</span>}
                  {item.href ? (
                    <Link href={item.href} className="hover:text-foreground transition-colors">{item.label}</Link>
                  ) : (
                    <span className="text-foreground font-semibold truncate">{item.label}</span>
                  )}
                </span>
              ))
            ) : (
              <span className="text-foreground font-semibold">Курс</span>
            )}
          </nav>
        </div>
        <div className="flex items-center shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 py-6 sm:py-8 mt-12 sm:mt-16 bg-card/30">
      <div className="container max-w-6xl mx-auto px-4 text-center text-xs sm:text-sm text-muted-foreground">
        <p className="leading-relaxed">
          Проект підготував{' '}
          <a href="https://github.com/IvanGrabovsky" className="hover:text-foreground transition-colors underline decoration-border underline-offset-4">GitHub</a> ·{' '}
          <strong className="text-foreground">Іван Грабовський</strong> · 2026
        </p>
      </div>
    </footer>
  );
}
