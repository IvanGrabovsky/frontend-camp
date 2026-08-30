'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Lock, Sparkles, CheckCircle, ArrowRight, UserPlus, LogIn } from 'lucide-react';
import { withBasePath } from '@/lib/paths';

interface LessonAuthGateProps {
  courseSlug: string;
  lessonSlug: string;
  lessonIndex: number;
  crystals?: number;
  firstLessonSlug?: string;
  children: React.ReactNode;
}

export function LessonAuthGate({
  courseSlug,
  lessonSlug,
  lessonIndex,
  crystals = 10,
  firstLessonSlug,
  children,
}: LessonAuthGateProps) {
  const { isAuthenticated, isLoading, openAuthModal, toggleLessonCompleted, isLessonCompleted } = useAuth();

  const isFreeLesson = lessonIndex === 0;
  const isCompleted = isLessonCompleted(courseSlug, lessonSlug);

  // During initial mount hydration
  if (isLoading) {
    // If it's the first lesson, show it right away
    if (isFreeLesson) {
      return <div>{children}</div>;
    }
    return (
      <div className="space-y-4 py-8 animate-pulse">
        <div className="h-28 rounded-2xl bg-muted/60" />
        <div className="h-64 rounded-2xl bg-muted/40" />
      </div>
    );
  }

  // If user is authenticated OR it's the first free lesson of the module
  if (isAuthenticated || isFreeLesson) {
    return (
      <div>
        {children}

        {/* Completion status bar */}
        <div className="my-10 p-5 rounded-2xl border border-border/80 bg-card/70 backdrop-blur-sm shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${isCompleted ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-primary/10 text-primary'}`}>
              {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {isCompleted ? 'Урок успішно пройдено!' : 'Завершили вивчення теми?'}
              </p>
              <p className="text-xs text-muted-foreground">
                {isCompleted ? 'Нагороду 💎 додано до вашого профілю' : `Отримайте +${crystals} 💎 за виконання завдань`}
              </p>
            </div>
          </div>

          <Button
            onClick={() => toggleLessonCompleted(courseSlug, lessonSlug, crystals)}
            variant={isCompleted ? 'outline' : 'default'}
            className={`w-full sm:w-auto font-semibold gap-2 transition-all ${
              isCompleted
                ? 'border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10'
                : 'shadow-md shadow-primary/20'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle className="w-4 h-4" /> Пройдено
              </>
            ) : (
              <>
                Позначити як пройдено (+{crystals} 💎)
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }

  // Locked Lesson for unauthenticated visitors (Lessons 02+)
  return (
    <div className="relative my-8">
      {/* Blurred Preview Teaser */}
      <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 sm:p-10 shadow-lg">
        {/* Decorative background glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-b from-primary/15 via-accent/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-lg mx-auto text-center flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-5 shadow-inner">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mb-3">
            Урок доступний після авторизації
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
            Перший урок модуля завжди безкоштовний. Щоб відкрити наступні уроки, зберігати прогрес та отримувати кристали 💎 — увійдіть або зареєструйтесь.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mb-6">
            <Button
              onClick={openAuthModal}
              size="lg"
              className="h-11 px-8 text-base font-semibold shadow-lg shadow-primary/25 gap-2"
            >
              <LogIn className="w-4 h-4" /> Увійти / Зареєструватися
            </Button>

            {firstLessonSlug && (
              <Button asChild variant="outline" size="lg" className="h-11 px-6 text-sm">
                <Link href={withBasePath(`/courses/${courseSlug}/${firstLessonSlug}/`)}>
                  ← До 1-го уроку модуля
                </Link>
              </Button>
            )}
          </div>

          <div className="pt-6 border-t border-border/60 w-full flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-accent" /> +100 💎 за реєстрацію
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-500" /> 100% безкоштовно
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
