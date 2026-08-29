import type { Difficulty } from '@/data/roadmap';
import { ROADMAP_BLOCKS } from '@/data/roadmap';

// ─── Lesson metadata registry ────────────────────────────────────────────────

export interface LessonData {
  num: string;
  slug: string;
  title: string;
  description: string;
  blockSlug: string;
  blockTitle: string;
  methods: string;
  difficulty: Difficulty;
  contentHtml?: string;
}

// ─── getAllLessonParams ────────────────────────────────────────────────────────

export function getAllLessonParams() {
  const params: { courseSlug: string; lessonSlug: string }[] = [];
  
  const collect = (blocks: typeof ROADMAP_BLOCKS) => {
    for (const block of blocks) {
      if (block.courseSlug && block.lessons) {
        for (const lesson of block.lessons) {
          params.push({ courseSlug: block.courseSlug, lessonSlug: lesson.slug });
        }
      }
      if (block.children) {
        collect(block.children);
      }
    }
  };
  
  collect(ROADMAP_BLOCKS);
  return params;
}

// ─── getLessonData (sync metadata lookup from ROADMAP_BLOCKS) ─────────────────

export function getLessonData(courseSlug: string, lessonSlug: string): LessonData | null {
  // Find block and lesson meta from roadmap
  let block = ROADMAP_BLOCKS.find((b) => b.courseSlug === courseSlug);
  if (!block) {
    for (const b of ROADMAP_BLOCKS) {
      if (b.children) {
        const found = b.children.find((child) => child.courseSlug === courseSlug);
        if (found) {
          block = found;
          break;
        }
      }
    }
  }
  if (!block || !block.lessons) return null;

  const lessonMeta = block.lessons.find((l) => l.slug === lessonSlug);
  if (!lessonMeta) return null;

  return {
    ...lessonMeta,
    description: `${block.title} · ${lessonMeta.title}`,
    blockSlug: block.slug,
    blockTitle: block.title,
  };
}

export async function loadLessonData(courseSlug: string, lessonSlug: string): Promise<LessonData | null> {
  return getLessonData(courseSlug, lessonSlug);
}

