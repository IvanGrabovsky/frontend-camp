import type { Difficulty } from '@/data/roadmap';

interface DifficultyIndicatorProps {
  level: Difficulty;
  compact?: boolean;
}

const labels: Record<Difficulty, string> = {
  easy: 'легко',
  medium: 'середньо',
  hard: 'складно',
};

export function DifficultyIndicator({ level, compact = false }: DifficultyIndicatorProps) {
  const className = [
    'difficulty-indicator',
    `difficulty-indicator--${level}`,
    compact ? 'difficulty-indicator--compact' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={className} role="img" aria-label={`Складність: ${labels[level]}`}>
      <span className="difficulty-indicator__label">Складність</span>
      <span className="difficulty-indicator__bars" aria-hidden="true">
        <span className="difficulty-indicator__bar" />
        <span className="difficulty-indicator__bar" />
        <span className="difficulty-indicator__bar" />
      </span>
    </span>
  );
}
