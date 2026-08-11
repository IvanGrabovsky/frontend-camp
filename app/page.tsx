import Link from 'next/link';
import { HeroQuote } from '@/components/HeroQuote';
import { HubLayout } from '@/components/HubLayout';
import { RoadmapBlockCard } from '@/components/RoadmapBlockCard';
import { ROADMAP_BLOCKS } from '@/data/roadmap';
import { withBasePath } from '@/lib/paths';

export default function HomePage() {
  const activeBlock = ROADMAP_BLOCKS.find((b) => b.status === 'active');

  return (
    <HubLayout>
      <section className="hero">
        <span className="hero__badge">Roadmap · HTML → CSS → JS → Next.js</span>
        <h1>Frontend Learning Hub</h1>
        <HeroQuote />
        {activeBlock?.startHref && (
          <Link className="btn btn--run playground-cta" href={`/blocks/${activeBlock.slug}/`}>
            Почати з JavaScript масивів
          </Link>
        )}
      </section>

      <section aria-labelledby="roadmap-title">
        <h2 id="roadmap-title">Шлях навчання</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Курс будується блоками. Зараз доступний блок <strong>JavaScript масиви</strong> — решта в
          roadmap як заглушки.
        </p>
        <div className="topics-grid">
          {ROADMAP_BLOCKS.map((block) => (
            <RoadmapBlockCard key={block.slug} block={block} />
          ))}
        </div>
      </section>

      <section aria-labelledby="how-title">
        <h2 id="how-title">Як влаштований курс</h2>
        <div className="how-steps">
          <div className="how-step">
            <div className="how-step__num">01</div>
            <h4>Блоки roadmap</h4>
            <p>HTML/CSS → JS основи → масиви → Next.js → фінальний проект.</p>
          </div>
          <div className="how-step">
            <div className="how-step__num">02</div>
            <h4>Активний контент</h4>
            <p>21 урок масивів — теорія, пісочниця, практика, ДЗ, розбір помилок.</p>
          </div>
          <div className="how-step">
            <div className="how-step__num">03</div>
            <h4>Кристали</h4>
            <p>Система мотивації за практику та домашні завдання.</p>
            <span className="how-step__time">
              <a href={withBasePath('/courses/js-arrays/crystals/')}>💎 дізнатися →</a>
            </span>
          </div>
          <div className="how-step">
            <div className="how-step__num">04</div>
            <h4>Пісочниця</h4>
            <p>Приклади з усіх 21 тем одним кліком.</p>
            <span className="how-step__time">
              <a href={withBasePath('/courses/js-arrays/playground/')}>відкрити →</a>
            </span>
          </div>
        </div>
      </section>
    </HubLayout>
  );
}
