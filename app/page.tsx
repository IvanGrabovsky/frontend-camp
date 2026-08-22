import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeroQuote } from '@/components/HeroQuote';
import { HubLayout } from '@/components/HubLayout';
import { RoadmapBlockCard } from '@/components/RoadmapBlockCard';
import { ROADMAP_BLOCKS } from '@/data/roadmap';
import { withBasePath } from '@/lib/paths';

export default function HomePage() {
  const jsBlock = ROADMAP_BLOCKS.find((b) => b.slug === 'javascript-basics');

  return (
    <HubLayout>
      <section className="py-20 md:py-32 mb-16 relative overflow-hidden flex flex-col items-center text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center space-x-2 bg-muted/50 rounded-full px-4 py-1.5 mb-8 text-sm font-medium text-muted-foreground border border-border">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>v1.0 is live</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6">
            Frontend Learning <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Hub</span>
          </h1>
          <div className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            <HeroQuote />
          </div>
          {jsBlock?.startHref && (
            <Button asChild size="lg" className="h-12 px-8 text-base font-semibold shadow-lg shadow-primary/25 hover:-translate-y-1 transition-all">
              <Link href={`/blocks/${jsBlock.slug}/`}>
                Почати з JavaScript →
              </Link>
            </Button>
          )}
        </div>
      </section>

      <section aria-labelledby="roadmap-title" className="mb-24 px-4 md:px-0">
        <div className="flex flex-col mb-12">
          <h2 id="roadmap-title" className="text-3xl md:text-4xl font-bold mb-4">Шлях навчання</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Курс будується блоками. Зараз доступний блок <strong className="text-foreground font-semibold">JavaScript масиви</strong>.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ contentVisibility: 'auto' }}>
          {ROADMAP_BLOCKS.map((block) => (
            <RoadmapBlockCard key={block.slug} block={block} />
          ))}
        </div>
      </section>

      <section aria-labelledby="how-title" className="mb-24 px-4 md:px-0">
        <h2 id="how-title" className="text-3xl md:text-4xl font-bold mb-12 text-center">Як влаштований курс</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-none shadow-md bg-card/50 hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mb-4">01</div>
              <CardTitle className="text-xl">Блоки roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">Інтернет → HTML → CSS → JavaScript → Next.js → фінальний проект.</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md bg-card/50 hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mb-4">02</div>
              <CardTitle className="text-xl">Активний контент</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">21 урок масивів — теорія, пісочниця, практика, ДЗ, розбір помилок.</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md bg-card/50 hover:shadow-lg transition-all hover:-translate-y-1 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <CardHeader className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center font-bold text-xl mb-4">03</div>
              <CardTitle className="text-xl flex justify-between items-center">
                Кристали
                <Button variant="ghost" size="sm" asChild className="text-accent hover:text-accent hover:bg-accent/10">
                  <a href={withBasePath('/courses/js-arrays/crystals/')}>Дізнатися ↗</a>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-muted-foreground leading-relaxed">Система мотивації за практику та домашні завдання.</p>
            </CardContent>
          </Card>
          <Card className="border-none shadow-md bg-card/50 hover:shadow-lg transition-all hover:-translate-y-1">
            <CardHeader>
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xl mb-4">04</div>
              <CardTitle className="text-xl flex justify-between items-center">
                Пісочниця
                <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10 hover:text-primary">
                  <Link href="/playground/">Відкрити ↗</Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">Приклади з усіх 21 тем одним кліком.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </HubLayout>
  );
}
