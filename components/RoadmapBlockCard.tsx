import Link from 'next/link';
import type { RoadmapBlock } from '@/data/roadmap';
import { withBasePath } from '@/lib/paths';

interface RoadmapBlockCardProps {
  block: RoadmapBlock;
}

export function RoadmapBlockCard({ block }: RoadmapBlockCardProps) {
  const isActive = block.status === 'active';
  const href = isActive ? `/blocks/${block.slug}/` : undefined;

  const inner = (
    <>
      <div className="topic-card__top">
        <span className="topic-card__num">{String(block.order).padStart(2, '0')}</span>
        {!isActive && <span className="roadmap-badge roadmap-badge--soon">Скоро</span>}
        {isActive && <span className="roadmap-badge roadmap-badge--active">Доступно</span>}
      </div>
      <span className="topic-card__title">{block.title}</span>
      <span className="topic-card__methods">{block.subtitle}</span>
      <div className="topic-card__meta">
        <span className="topic-card__level">{block.level}</span>
        {block.lessons && <span className="topic-card__crystals">{block.lessons.length} уроків</span>}
      </div>
    </>
  );

  if (href) {
    return (
      <Link className="topic-card topic-card--roadmap" href={href}>
        {inner}
      </Link>
    );
  }

  return <article className="topic-card topic-card--roadmap topic-card--disabled">{inner}</article>;
}

export function ArraysLessonCard({
  num,
  slug,
  title,
  methods,
  difficulty,
  crystals,
}: {
  num: string;
  slug: string;
  title: string;
  methods: string;
  difficulty: 'easy' | 'medium' | 'hard';
  crystals: number;
}) {
  const href = withBasePath(`/courses/js-arrays/${slug}/`);

  return (
    <a className="topic-card" href={href}>
      <div className="topic-card__top">
        <span className="topic-card__num">{num}</span>
      </div>
      <span className="topic-card__title">{title}</span>
      <span className="topic-card__methods">{methods}</span>
      <div className="topic-card__meta">
        <span
          className={`difficulty-indicator difficulty-indicator--${difficulty} difficulty-indicator--compact`}
          role="img"
          aria-label={`Складність: ${difficulty}`}
        >
          <span className="difficulty-indicator__label">Складність</span>
          <span className="difficulty-indicator__bars" aria-hidden="true">
            <span className="difficulty-indicator__bar" />
            <span className="difficulty-indicator__bar" />
            <span className="difficulty-indicator__bar" />
          </span>
        </span>
        <span className="topic-card__crystals">💎 {crystals}</span>
      </div>
    </a>
  );
}
