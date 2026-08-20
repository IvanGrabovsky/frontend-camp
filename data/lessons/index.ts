import type { Difficulty } from '@/data/roadmap';
import { ROADMAP_BLOCKS } from '@/data/roadmap';

// ─── Lesson content registry ─────────────────────────────────────────────────

export interface LessonData {
  num: string;
  slug: string;
  title: string;
  description: string;
  blockSlug: string;
  blockTitle: string;
  methods: string;
  difficulty: Difficulty;
  contentHtml: string;
}

// ─── Lazy content loaders (one file per course) ───────────────────────────────

const loaders: Record<string, () => Promise<Record<string, string>>> = {
  'how-internet-works': () =>
    import('@/data/lessons/how-internet-works').then((m) => m.LESSONS_HTML),
  html: () => import('@/data/lessons/html').then((m) => m.LESSONS_HTML),
  css: () => import('@/data/lessons/css').then((m) => m.LESSONS_HTML),
  'js-arrays': () => import('@/data/lessons/js-arrays').then((m) => m.LESSONS_HTML),
  'js-basics': () => import('@/data/lessons/js-basics').then((m) => m.LESSONS_HTML),
  nextjs: () => import('@/data/lessons/nextjs').then((m) => m.LESSONS_HTML),
  'web-security': () => import('@/data/lessons/web-security').then((m) => m.LESSONS_HTML),
};

// ─── getAllLessonParams ────────────────────────────────────────────────────────

export function getAllLessonParams() {
  const params: { courseSlug: string; lessonSlug: string }[] = [];
  for (const block of ROADMAP_BLOCKS) {
    if (block.courseSlug && block.lessons) {
      for (const lesson of block.lessons) {
        params.push({ courseSlug: block.courseSlug, lessonSlug: lesson.slug });
      }
    }
  }
  return params;
}

// ─── getLessonData (sync lookup from cache) ───────────────────────────────────

const _cache: Record<string, Record<string, string>> = {};

async function loadCourse(courseSlug: string): Promise<Record<string, string>> {
  if (_cache[courseSlug]) return _cache[courseSlug];
  const loader = loaders[courseSlug];
  if (!loader) return {};
  const html = await loader();
  _cache[courseSlug] = html;
  return html;
}

export function getLessonData(courseSlug: string, lessonSlug: string): LessonData | null {
  // Find block and lesson meta from roadmap
  const block = ROADMAP_BLOCKS.find((b) => b.courseSlug === courseSlug);
  if (!block || !block.lessons) return null;

  const lessonMeta = block.lessons.find((l) => l.slug === lessonSlug);
  if (!lessonMeta) return null;

  // Content is loaded synchronously from the pre-loaded cache
  // (Next.js RSC will await this via the page calling loadLessonData)
  const contentHtml = _cache[courseSlug]?.[lessonSlug] ?? '<p>Контент завантажується…</p>';

  return {
    ...lessonMeta,
    description: `${block.title} · ${lessonMeta.title}`,
    blockSlug: block.slug,
    blockTitle: block.title,
    contentHtml,
  };
}

// Used by the page to pre-warm the cache before calling getLessonData
export async function loadLessonData(courseSlug: string, lessonSlug: string): Promise<LessonData | null> {
  await loadCourse(courseSlug);
  return getLessonData(courseSlug, lessonSlug);
}
