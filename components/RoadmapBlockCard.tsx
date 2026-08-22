import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { RoadmapBlock } from '@/data/roadmap';
import { withBasePath } from '@/lib/paths';

interface RoadmapBlockCardProps {
  block: RoadmapBlock;
}

export function RoadmapBlockCard({ block }: RoadmapBlockCardProps) {
  const isActive = block.status === 'active';
  const href = isActive ? `/blocks/${block.slug}/` : undefined;

  const inner = (
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      <CardHeader className="flex-row items-center justify-between pb-2 space-y-0">
        <span className="text-3xl font-bold text-primary group-hover:text-accent transition-colors">{String(block.order).padStart(2, '0')}</span>
        {!isActive && <Badge variant="outline" className="text-[0.65rem] uppercase tracking-widest text-muted-foreground border-muted-foreground/30">Скоро</Badge>}
        {isActive && <Badge className="text-[0.65rem] uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90">Доступно</Badge>}
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <CardTitle className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">{block.title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{block.subtitle}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-xs font-mono text-muted-foreground pt-4 border-t border-border/50 group-hover:border-accent/30 transition-colors">
        <span>{block.level}</span>
        {block.lessons && <span className="font-semibold text-foreground">{block.lessons.length} уроків</span>}
      </CardFooter>
    </Card>
  );

  if (href) {
    return (
      <Link className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl" href={href}>
        {inner}
      </Link>
    );
  }

  return <article className="opacity-70 cursor-not-allowed h-full">{inner}</article>;
}

export function LessonCard({
  courseSlug,
  num,
  slug,
  title,
  methods,
  difficulty,
  crystals,
}: {
  courseSlug: string;
  num: string;
  slug: string;
  title: string;
  methods: string;
  difficulty: 'easy' | 'medium' | 'hard';
  crystals: number;
}) {
  const href = withBasePath(`/courses/${courseSlug}/${slug}/`);

  return (
    <a className="block outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl h-full" href={href}>
      <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group border-border">
        <CardHeader className="pb-2 flex-row justify-between items-center space-y-0">
          <span className="text-2xl font-mono text-primary group-hover:text-accent transition-colors">{num}</span>
          <span className="text-accent font-bold text-sm">💎 {crystals}</span>
        </CardHeader>
        <CardContent className="flex-1 pb-4">
          <CardTitle className="text-lg font-medium mb-1 group-hover:text-accent transition-colors">{title}</CardTitle>
          <CardDescription className="text-sm font-mono text-muted-foreground">{methods}</CardDescription>
        </CardContent>
        <CardFooter className="pt-4 border-t border-border/50 group-hover:border-accent/30 transition-colors">
          <span className="text-xs text-muted-foreground font-mono">
            Складність: <strong className="text-foreground uppercase">{difficulty}</strong>
          </span>
        </CardFooter>
      </Card>
    </a>
  );
}
