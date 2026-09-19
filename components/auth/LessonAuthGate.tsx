'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { Lock, BookOpen, CheckCircle, ArrowRight, UserPlus, LogIn } from 'lucide-react';
import { withBasePath } from '@/lib/paths';

interface LessonAuthGateProps {
  courseSlug: string;
  lessonSlug: string;
  lessonIndex: number;
  firstLessonSlug?: string;
  children: React.ReactNode;
}

export function LessonAuthGate({
  courseSlug,
  lessonSlug,
  lessonIndex,
  firstLessonSlug,
  children,
}: LessonAuthGateProps) {
  const { isAuthenticated, isLoading, openAuthModal, toggleLessonCompleted, isLessonCompleted } = useAuth();

  const isFreeLesson = lessonIndex === 0;
  const isCompleted = isLessonCompleted(courseSlug, lessonSlug);

  // During initial mount hydration
  if (isLoading) {
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
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                isCompleted
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'bg-primary/10 text-primary'
              }`}
            >
              {isCompleted ? <CheckCircle className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {isCompleted ? 'Урок успішно завершено!' : 'Опанували матеріал уроку?'}
              </p>
              <p className="text-xs text-muted-foreground">
                {isCompleted ? 'Прогрес зафіксовано у вашому кабінеті' : 'Позначте тему для збереження прогресу'}
              </p>
            </div>
          </div>

          <Button
            onClick={() => toggleLessonCompleted(courseSlug, lessonSlug)}
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
                Позначити як пройдено
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

          <h3 className="text-xl sm:text-2xl font-extrabold text-foreground mb-3">
            Урок доступний після входу
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Перший урок кожного модуля відкритий для всіх. Для доступу до наступних уроків, збереження прогресу та інтерактивних тестів увійдіть у свій акаунт.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
            <Button
              onClick={openAuthModal}
              size="lg"
              className="w-full sm:w-auto font-semibold shadow-md shadow-primary/20 gap-2"
            >
              <LogIn className="w-4 h-4" /> Увійти / Зареєструватися
            </Button>

            {firstLessonSlug && (
              <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                <Link href={withBasePath(`/courses/${courseSlug}/${firstLessonSlug}/`)}>
                  До першого уроку
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
