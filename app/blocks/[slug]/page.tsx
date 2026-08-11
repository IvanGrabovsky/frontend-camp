import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HubLayout } from '@/components/HubLayout';
import { ArraysLessonCard } from '@/components/RoadmapBlockCard';
import { getBlock, ROADMAP_BLOCKS } from '@/data/roadmap';
import { withBasePath } from '@/lib/paths';

interface BlockPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ROADMAP_BLOCKS.map((block) => ({ slug: block.slug }));
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
      <header className="lesson-header">
        <div className="lesson-header__meta">
          <span className="lesson-num">{String(block.order).padStart(2, '0')}</span>
          {isActive ? (
            <span className="roadmap-badge roadmap-badge--active">Доступно</span>
          ) : (
            <span className="roadmap-badge roadmap-badge--soon">Скоро</span>
          )}
        </div>
        <h1>{block.title}</h1>
        <p style={{ color: 'var(--text-muted)' }}>{block.subtitle}</p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Рівень: {block.level}</p>
      </header>

      {isActive && block.lessons ? (
        <>
          <div className="block-actions">
            <a className="btn btn--run" href={withBasePath(block.startHref || '/courses/js-arrays/01-intro/')}>
              Почати урок 01
            </a>
            <a className="btn btn--ghost" href={withBasePath('/courses/js-arrays/playground/')}>
              🧪 Пісочниця
            </a>
            <a className="btn btn--ghost" href={withBasePath('/courses/js-arrays/crystals/')}>
              💎 Кристали
            </a>
          </div>

          <section aria-labelledby="topics-title">
            <h2 id="topics-title">Теми блоку</h2>
            <div className="topics-grid">
              {block.lessons.map((lesson) => (
                <ArraysLessonCard key={lesson.slug} {...lesson} />
              ))}
            </div>
          </section>

          <section className="motivation-block" style={{ marginTop: '2rem' }}>
            <h2>Структура кожного уроку</h2>
            <ul>
              <li>Теорія з аналогіями та прикладами</li>
              <li>Жива пісочниця в браузері</li>
              <li>4 завдання на занятті (💎 10 кожне)</li>
              <li>3 домашні завдання (💎 40)</li>
              <li>Розбір типових помилок ДЗ та цікаві фішки</li>
            </ul>
          </section>
        </>
      ) : (
        <section className="lesson-card">
          <h2>Контент у розробці</h2>
          <p>Цей блок ще в roadmap. Опис і очікувані теми — у README репозиторію:</p>
          <p>
            <code>{block.readmePath}</code>
          </p>
          {block.topics && (
            <>
              <h3>Заплановані теми</h3>
              <ul>
                {block.topics.map((topic) => (
                  <li key={topic}>{topic}</li>
                ))}
              </ul>
            </>
          )}
          <p style={{ marginTop: '1.5rem' }}>
            <Link href="/">← Повернутися до roadmap</Link>
          </p>
        </section>
      )}
    </HubLayout>
  );
}
