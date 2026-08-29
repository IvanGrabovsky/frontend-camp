import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HubLayout } from '@/components/HubLayout';
import { LessonCard, RoadmapBlockCard } from '@/components/RoadmapBlockCard';
import { getBlock, ROADMAP_BLOCKS } from '@/data/roadmap';
import { withBasePath } from '@/lib/paths';

interface BlockPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const slugs: { slug: string }[] = [];
  for (const block of ROADMAP_BLOCKS) {
    slugs.push({ slug: block.slug });
    if (block.children) {
      for (const child of block.children) {
        slugs.push({ slug: child.slug });
      }
    }
  }
  return slugs;
}

export async function generateMetadata({ params }: BlockPageProps) {
  const { slug } = await params;
  const block = getBlock(slug);
  if (!block) return { title: 'Блок не знайдено' };
  return {
    title: `${block.title} · Frontend Learning Hub`,
    description: block.subtitle,
  };
}

export default async function BlockPage({ params }: BlockPageProps) {
  const { slug } = await params;
  const block = getBlock(slug);
  if (!block) notFound();

  const isActive = block.status === 'active';

  return (
    <HubLayout
      breadcrumb={[
        { label: 'Курс', href: '/' },
        { label: block.title },
      ]}
    >
      <header className="py-12 md:py-20 mb-12">
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-3xl font-bold text-primary">{String(block.order).padStart(2, '0')}</span>
          {isActive ? (
            <Badge className="bg-primary text-primary-foreground">Доступно</Badge>
          ) : (
            <Badge variant="outline" className="text-muted-foreground border-muted-foreground/30">Скоро</Badge>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 tracking-tight">{block.title}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-6">{block.subtitle}</p>
        <Badge variant="secondary" className="text-sm font-medium">Рівень: {block.level}</Badge>
      </header>

      {isActive && block.lessons ? (
        <>
          <div className="flex flex-wrap gap-4 mb-16">
            <Button asChild size="lg" className="h-12 px-8 font-semibold shadow-md shadow-primary/20">
              <a href={withBasePath(block.startHref || `/courses/${block.courseSlug || block.slug}/01-intro/`)}>
                Почати модуль 01 →
              </a>
            </Button>
            {block.slug === 'javascript-basics' && (
              <>
                <Button asChild variant="outline" size="lg" className="h-12 px-6">
                  <Link href="/playground/">🧪 Пісочниця</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-6 text-accent border-accent/30 hover:bg-accent/10 hover:text-accent">
                  <a href={withBasePath('/courses/js-arrays/crystals/')}>💎 Кристали</a>
                </Button>
              </>
            )}
          </div>

          <section aria-labelledby="topics-title" className="mb-24">
            <h2 id="topics-title" className="text-3xl font-bold mb-8">Теми блоку</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
              {block.lessons.map((lesson) => (
                <LessonCard key={lesson.slug} courseSlug={block.courseSlug || block.slug} {...lesson} />
              ))}
            </div>
          </section>

          {block.slug === 'javascript-basics' && (
            <Card className="mb-24 border-none shadow-md bg-secondary/30">
              <CardHeader>
                <CardTitle className="text-xl">Структура кожного уроку</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-muted-foreground list-none">
                  <li className="flex items-center"><span className="text-accent mr-3">■</span> Теорія з аналогіями та прикладами</li>
                  <li className="flex items-center"><span className="text-accent mr-3">■</span> Жива пісочниця в браузері</li>
                  <li className="flex items-center"><span className="text-accent mr-3">■</span> 4 завдання на занятті (💎 10 кожне)</li>
                  <li className="flex items-center"><span className="text-accent mr-3">■</span> 3 домашні завдання (💎 40)</li>
                  <li className="flex items-center"><span className="text-accent mr-3">■</span> Розбір типових помилок ДЗ та цікаві фішки</li>
                </ul>
              </CardContent>
            </Card>
          )}

          {block.children && (
            <section aria-labelledby="subblocks-title" className="mb-24">
              <h2 id="subblocks-title" className="text-3xl font-bold mb-8">Підмодулі</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {block.children.map((child) => (
                  <RoadmapBlockCard key={child.slug} block={child} />
                ))}
              </div>
            </section>
          )}
        </>
      ) : (
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl">Контент у розробці</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">Цей блок ще в roadmap. Опис і очікувані теми — у README репозиторію:</p>
            <div className="bg-secondary p-4 rounded-lg font-mono text-sm mb-8 text-foreground border border-border/50">
              <code>{block.readmePath}</code>
            </div>
            {block.topics && (
              <>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Заплановані теми</h3>
                <ul className="space-y-2 mb-8">
                  {block.topics.map((topic) => (
                    <li key={topic} className="flex items-center"><span className="text-muted-foreground mr-3">—</span><span className="text-muted-foreground">{topic}</span></li>
                  ))}
                </ul>
              </>
            )}
            <Button asChild variant="outline" className="mt-4">
              <Link href="/">← Повернутися до roadmap</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </HubLayout>
  );
}
