import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HubLayout } from '@/components/HubLayout';
import { LessonCard, RoadmapBlockCard } from '@/components/RoadmapBlockCard';
import { getBlock, ROADMAP_BLOCKS } from '@/data/roadmap';
import { withBasePath } from '@/lib/paths';
import { CAPSTONE_PROJECTS, CAPSTONE_CRITERIA } from '@/data/capstone-projects';

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

      {isActive && (block.lessons || block.children) ? (
        <>
          <div className="flex flex-wrap gap-4 mb-16">
            {block.startHref && (
              <Button asChild size="lg" className="h-12 px-8 font-semibold shadow-md shadow-primary/20">
                <a href={withBasePath(block.startHref)}>
                  {block.children ? 'Почати навчання →' : 'Почати модуль 01 →'}
                </a>
              </Button>
            )}
            {(block.slug === 'javascript' || block.slug.startsWith('js-')) && (
              <>
                <Button asChild variant="outline" size="lg" className="h-12 px-6">
                  <Link href="/playground/">🧪 Пісочниця</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-6">
                  <a href={withBasePath('/learning-materials/')}>📖 Навчальні посібники</a>
                </Button>
              </>
            )}
          </div>

          {block.children && (
            <section aria-labelledby="subblocks-title" className="mb-24">
              <h2 id="subblocks-title" className="text-3xl font-bold mb-8">Підмодулі курсу</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {block.children.map((child) => (
                  <RoadmapBlockCard key={child.slug} block={child} />
                ))}
              </div>
            </section>
          )}

          {block.lessons && (
            <section aria-labelledby="topics-title" className="mb-24">
              <h2 id="topics-title" className="text-3xl font-bold mb-8">Уроки модулю</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
                {block.lessons.map((lesson) => (
                  <LessonCard key={lesson.slug} courseSlug={block.courseSlug || block.slug} {...lesson} />
                ))}
              </div>
            </section>
          )}

          {(block.slug === 'javascript' || block.slug.startsWith('js-')) && (
            <Card className="mb-24 border-none shadow-md bg-secondary/30">
              <CardHeader>
                <CardTitle className="text-xl">Структура кожного уроку</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-muted-foreground list-none">
                  <li className="flex items-center"><span className="text-accent mr-3">■</span> Теорія з практичними прикладами та поясненнями</li>
                  <li className="flex items-center"><span className="text-accent mr-3">■</span> Жива пісочниця в браузері для тестування коду</li>
                  <li className="flex items-center"><span className="text-accent mr-3">■</span> Інтерактивні бліц-тести для швидкої самоперевірки</li>
                  <li className="flex items-center"><span className="text-accent mr-3">■</span> Практичні завдання та розбір типових помилок</li>
                </ul>
              </CardContent>
            </Card>
          )}
        </>
      ) : block.slug === 'capstone' ? (
        <div className="space-y-12 mb-20">
          {/* Header Description */}
          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 backdrop-blur-md">
            <h2 className="text-2xl font-bold mb-2 text-foreground flex items-center gap-2">
              <span>🎯</span> Оберіть ідею для вашого фінального проекту
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Фінальний проект — це головний експонат вашого портфоліо. Оберіть один із готових варіантів нижче або запропонуйте власний, що відповідає технічним критеріям курсу.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPSTONE_PROJECTS.map((project) => (
              <Card
                key={project.id}
                className="group flex flex-col justify-between border-border/70 hover:border-primary/50 hover:shadow-xl transition-all bg-card/60 backdrop-blur-md overflow-hidden"
              >
                <div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-3xl p-2 rounded-xl bg-muted/60">{project.icon}</span>
                      <div className="flex items-center gap-1.5">
                        <Badge variant="outline" className="text-[11px] font-medium uppercase tracking-wider">
                          {project.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {project.category}
                    </span>
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground font-medium pt-0.5">
                      {project.subtitle}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4 text-xs sm:text-sm">
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>

                    <div>
                      <div className="font-semibold text-foreground text-xs mb-2 uppercase tracking-wider">
                        Ключовий функціонал:
                      </div>
                      <ul className="space-y-1.5 list-none">
                        {project.features.map((f, idx) => (
                          <li key={idx} className="flex items-start text-muted-foreground leading-tight">
                            <span className="text-primary mr-1.5 shrink-0">✓</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-border/50">
                      <div className="font-semibold text-foreground text-xs mb-2 uppercase tracking-wider">
                        Стек технологій:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-[11px] font-mono py-0.5 px-2">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </div>

                <div className="p-4 sm:p-6 pt-0 mt-2">
                  <div className="p-3 rounded-xl bg-muted/40 border border-border/60 text-[11px] text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">💎 Для портфоліо:</strong> {project.portfolioHighlight}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Technical Criteria Box */}
          <Card className="border-border/80 bg-muted/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <span>📋</span> Обовʼязкові технічні критерії для здачі
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {CAPSTONE_CRITERIA.map((crit, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-border/60 bg-card/50">
                    <div className="font-semibold text-sm text-foreground mb-1 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-mono">
                        {idx + 1}
                      </span>
                      {crit.label}
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed">
                      {crit.desc}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center pt-4">
            <Button asChild variant="outline" size="lg">
              <Link href="/">← Повернутися до Roadmap</Link>
            </Button>
          </div>
        </div>
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
