import { notFound } from 'next/navigation';
import { HubLayout } from '@/components/HubLayout';
import { loadLessonData, getAllLessonParams } from '@/data/lessons';
import { getBlock } from '@/data/roadmap';
import { withBasePath } from '@/lib/paths';
import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

// Shadcn UI Components
import { Card } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const components = { Card, Alert, Badge, Button, Tabs, TabsContent, TabsList, TabsTrigger };

interface LessonPageProps {
  params: Promise<{ courseSlug: string; lessonSlug: string }>;
}

export function generateStaticParams() {
  return getAllLessonParams();
}

export async function generateMetadata({ params }: LessonPageProps) {
  const { courseSlug, lessonSlug } = await params;
  const lesson = await loadLessonData(courseSlug, lessonSlug);
  if (!lesson) return { title: 'Урок не знайдено' };
  return {
    title: `${lesson.num} — ${lesson.title} · ${lesson.blockTitle}`,
    description: lesson.description,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { courseSlug, lessonSlug } = await params;
  const lesson = await loadLessonData(courseSlug, lessonSlug);
  if (!lesson) notFound();

  const block = getBlock(lesson.blockSlug);
  const lessons = block?.lessons ?? [];
  const currentIndex = lessons.findIndex((l) => l.slug === lessonSlug);
  const prev = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const next = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  let mdxSource: string | null = null;
  try {
    const mdxPath = path.join(process.cwd(), 'content', 'lessons', courseSlug, `${lessonSlug}.mdx`);
    mdxSource = await fs.readFile(mdxPath, 'utf8');
  } catch (err) {
    // MDX file not found, will fallback to HTML
  }

  return (
    <HubLayout
      breadcrumb={[
        { label: 'Курс', href: '/' },
        { label: lesson.blockTitle, href: `/blocks/${lesson.blockSlug}/` },
        { label: `${lesson.num} · ${lesson.title}` },
      ]}
    >
      {/* Lesson Header */}
      <header className="py-8 sm:py-12 border-b border-border/60 mb-8 sm:mb-12">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl font-bold font-mono text-primary">
              {lesson.num}
            </span>
            <Badge variant="outline" className="text-xs uppercase tracking-wider">
              {lesson.difficulty}
            </Badge>
          </div>
          <span className="text-xs sm:text-sm font-mono text-muted-foreground bg-muted/60 px-3 py-1 rounded-full">
            Урок {currentIndex + 1} з {lessons.length}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
          {lesson.title}
        </h1>

        {lesson.methods && (
          <div className="flex flex-wrap gap-2 pt-2">
            {lesson.methods.split(' · ').map((m) => (
              <Badge key={m} variant="secondary" className="font-mono text-xs px-2.5 py-1">
                {m}
              </Badge>
            ))}
          </div>
        )}
      </header>

      {/* Lesson Content */}
      <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:underline prose-code:font-mono prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none mb-16">
        {mdxSource ? (
          <MDXRemote source={mdxSource} components={components} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: lesson.contentHtml }} />
        )}
      </div>

      {/* Navigation Footer */}
      <div className="pt-8 border-t border-border/60 space-y-6">
        <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Навігація між уроками">
          {prev ? (
            <Link
              className="group flex flex-col p-4 rounded-xl border border-border bg-card hover:bg-muted/40 hover:border-primary/50 transition-all hover:shadow-md"
              href={withBasePath(`/courses/${courseSlug}/${prev.slug}/`)}
            >
              <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1 font-medium group-hover:text-primary transition-colors">
                <ChevronLeft className="w-4 h-4" /> Попередній урок
              </span>
              <span className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                {prev.num} · {prev.title}
              </span>
            </Link>
          ) : (
            <div className="p-4 rounded-xl border border-border/40 bg-card/40 opacity-50 cursor-not-allowed">
              <span className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                <ChevronLeft className="w-4 h-4" /> Початок курсу
              </span>
              <span className="font-medium text-sm sm:text-base text-muted-foreground">
                Це перший урок
              </span>
            </div>
          )}

          {next ? (
            <Link
              className="group flex flex-col p-4 rounded-xl border border-border bg-card hover:bg-muted/40 hover:border-primary/50 transition-all hover:shadow-md text-left sm:text-right"
              href={withBasePath(`/courses/${courseSlug}/${next.slug}/`)}
            >
              <span className="text-xs text-muted-foreground flex items-center justify-start sm:justify-end gap-1 mb-1 font-medium group-hover:text-primary transition-colors">
                Наступний урок <ChevronRight className="w-4 h-4" />
              </span>
              <span className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                {next.num} · {next.title}
              </span>
            </Link>
          ) : (
            <div className="p-4 rounded-xl border border-border/40 bg-card/40 opacity-50 cursor-not-allowed text-left sm:text-right">
              <span className="text-xs text-muted-foreground flex items-center justify-start sm:justify-end gap-1 mb-1">
                Кінець курсу <ChevronRight className="w-4 h-4" />
              </span>
              <span className="font-medium text-sm sm:text-base text-muted-foreground">
                Це останній урок
              </span>
            </div>
          )}
        </nav>

        <div className="flex justify-center pt-2">
          <Button asChild variant="outline" size="sm" className="gap-2">
            <Link href="/">
              <Home className="w-4 h-4" /> Повернутися на головну
            </Link>
          </Button>
        </div>
      </div>
    </HubLayout>
  );
}
