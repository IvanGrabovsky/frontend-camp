import { notFound } from 'next/navigation';
import { HubLayout } from '@/components/HubLayout';
import { loadLessonData, getAllLessonParams } from '@/data/lessons';
import { getBlock } from '@/data/roadmap';
import { withBasePath } from '@/lib/paths';
import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';

// Shadcn UI Components
import { Card } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const components = { Card, Alert, Badge, Tabs, TabsContent, TabsList, TabsTrigger };

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
      <header className="lesson-header">
        <div className="lesson-header__meta">
          <span className="lesson-num">{lesson.num}</span>
          <span
            className={`difficulty-indicator difficulty-indicator--${lesson.difficulty}`}
            role="img"
            aria-label={`Складність: ${lesson.difficulty}`}
          >
            <span className="difficulty-indicator__label">Складність</span>
            <span className="difficulty-indicator__bars" aria-hidden="true">
              <span className="difficulty-indicator__bar" />
              <span className="difficulty-indicator__bar" />
              <span className="difficulty-indicator__bar" />
            </span>
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Урок {currentIndex + 1} / {lessons.length}
          </span>
        </div>
        <h1>{lesson.title}</h1>
        {lesson.methods && (
          <div className="method-tags">
            {lesson.methods.split(' · ').map((m) => (
              <span key={m} className="method-tag">{m}</span>
            ))}
          </div>
        )}
      </header>

      {/* Lesson content */}
      <div className="mt-8 prose prose-slate dark:prose-invert max-w-none">
        {mdxSource ? (
          <MDXRemote source={mdxSource} components={components} />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: lesson.contentHtml }} />
        )}
      </div>

      {/* Navigation */}
      <nav className="nav-pills" aria-label="Навігація між уроками">
        {prev ? (
          <Link className="nav-pill" href={withBasePath(`/courses/${courseSlug}/${prev.slug}/`)}>
            <span className="nav-pill__label">← Назад</span>
            <span className="nav-pill__title">{prev.num} · {prev.title}</span>
          </Link>
        ) : (
          <a className="nav-pill nav-pill--disabled" aria-disabled="true" href="#">
            <span className="nav-pill__label">← Назад</span>
            <span className="nav-pill__title">Це перший урок</span>
          </a>
        )}
        {next ? (
          <Link className="nav-pill nav-pill--next" href={withBasePath(`/courses/${courseSlug}/${next.slug}/`)}>
            <span className="nav-pill__label">Далі →</span>
            <span className="nav-pill__title">{next.num} · {next.title}</span>
          </Link>
        ) : (
          <a className="nav-pill nav-pill--next nav-pill--disabled" aria-disabled="true" href="#">
            <span className="nav-pill__label">Далі →</span>
            <span className="nav-pill__title">Це останній урок</span>
          </a>
        )}
      </nav>
      <div className="nav-pills__home">
        <Link className="btn btn--ghost nav-home-link" href="/">🏠 Повернутися на головну</Link>
      </div>
    </HubLayout>
  );
}
