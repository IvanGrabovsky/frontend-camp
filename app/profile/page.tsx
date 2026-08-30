'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import { HubLayout } from '@/components/HubLayout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ROADMAP_BLOCKS } from '@/data/roadmap';
import { withBasePath } from '@/lib/paths';
import { Sparkles, BookCheck, Trophy, ArrowRight, User as UserIcon, LogIn, CheckCircle2, ShieldCheck, Flame } from 'lucide-react';

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, openAuthModal } = useAuth();

  // Calculate stats
  let totalLessonsCount = 0;
  const courseModules: {
    slug: string;
    courseSlug: string;
    title: string;
    total: number;
    completed: number;
  }[] = [];

  for (const block of ROADMAP_BLOCKS) {
    if (block.lessons && block.courseSlug) {
      totalLessonsCount += block.lessons.length;
      const completedCount = block.lessons.filter((l) =>
        user?.completedLessons.includes(`${block.courseSlug}/${l.slug}`)
      ).length;

      courseModules.push({
        slug: block.slug,
        courseSlug: block.courseSlug,
        title: block.title,
        total: block.lessons.length,
        completed: completedCount,
      });
    }

    if (block.children) {
      for (const child of block.children) {
        if (child.lessons && child.courseSlug) {
          totalLessonsCount += child.lessons.length;
          const completedCount = child.lessons.filter((l) =>
            user?.completedLessons.includes(`${child.courseSlug}/${l.slug}`)
          ).length;

          courseModules.push({
            slug: child.slug,
            courseSlug: child.courseSlug,
            title: child.title,
            total: child.lessons.length,
            completed: completedCount,
          });
        }
      }
    }
  }

  const completedTotal = user?.completedLessons.length || 0;
  const progressPercent = totalLessonsCount > 0 ? Math.round((completedTotal / totalLessonsCount) * 100) : 0;

  if (isLoading) {
    return (
      <HubLayout breadcrumb={[{ label: 'Курс', href: '/' }, { label: 'Особистий кабінет' }]}>
        <div className="py-16 animate-pulse space-y-6">
          <div className="h-40 rounded-3xl bg-muted/50" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-32 rounded-2xl bg-muted/40" />
            <div className="h-32 rounded-2xl bg-muted/40" />
            <div className="h-32 rounded-2xl bg-muted/40" />
          </div>
        </div>
      </HubLayout>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <HubLayout breadcrumb={[{ label: 'Курс', href: '/' }, { label: 'Особистий кабінет' }]}>
        <div className="py-20 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-6">
            <UserIcon className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold mb-3">Особистий кабінет</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Увійдіть або зареєструйтесь, щоб відстежувати власний прогрес, збирати кристали 💎 та відкривати всі модулі курсу.
          </p>
          <Button onClick={openAuthModal} size="lg" className="h-12 px-8 font-semibold shadow-lg shadow-primary/25 gap-2">
            <LogIn className="w-4 h-4" /> Увійти / Зареєструватися
          </Button>
        </div>
      </HubLayout>
    );
  }

  return (
    <HubLayout breadcrumb={[{ label: 'Курс', href: '/' }, { label: 'Особистий кабінет' }]}>
      {/* Profile Header */}
      <section className="py-8 sm:py-12 border-b border-border/60 mb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-3xl bg-primary/10 border-2 border-primary/30 p-1 object-cover shadow-md"
              />
            ) : (
              <div className="w-20 h-20 rounded-3xl bg-primary/20 text-primary border-2 border-primary/30 flex items-center justify-center text-2xl font-bold">
                {user.name.charAt(0)}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">{user.name}</h1>
                <Badge className="bg-primary/15 text-primary border-primary/30 hover:bg-primary/20 text-xs">
                  Студент Camp
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground font-mono">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button asChild variant="outline" size="sm">
              <Link href="/">До уроків →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <Card className="border-border/80 bg-gradient-to-br from-amber-500/10 via-card to-card shadow-sm">
          <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Баланс кристалів</CardTitle>
            <span className="text-2xl">💎</span>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
              {user.crystals}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Отримуйте +10 💎 за кожне виконане завдання</p>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-gradient-to-br from-emerald-500/10 via-card to-card shadow-sm">
          <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Пройдено уроків</CardTitle>
            <BookCheck className="w-5 h-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-foreground font-mono">
              {completedTotal} <span className="text-base text-muted-foreground font-normal">/ {totalLessonsCount}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{progressPercent}% усього навчального шляху</p>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-gradient-to-br from-primary/10 via-card to-card shadow-sm">
          <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Рівень навичок</CardTitle>
            <Trophy className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-primary">
              {completedTotal >= 20 ? 'Middle' : completedTotal >= 5 ? 'Junior' : 'Trainee'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {completedTotal >= 20 ? 'Впевнений рівень розробки' : 'Початковий етап навчання'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Course Modules Progress */}
      <section id="progress" className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Прогрес за модулями</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {courseModules.map((mod) => {
            const modPercent = mod.total > 0 ? Math.round((mod.completed / mod.total) * 100) : 0;
            const isDone = mod.completed === mod.total && mod.total > 0;

            return (
              <Card key={mod.slug} className="border-border hover:shadow-md transition-all p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-foreground">{mod.title}</h3>
                    {isDone && (
                      <span className="text-emerald-500 text-xs flex items-center gap-0.5 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Завершено
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-xs font-semibold text-muted-foreground">
                    {mod.completed} / {mod.total}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden mb-4">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isDone
                        ? 'bg-emerald-500'
                        : modPercent > 0
                        ? 'bg-gradient-to-r from-primary to-accent'
                        : 'bg-transparent'
                    }`}
                    style={{ width: `${modPercent}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">{modPercent}% пройдено</span>
                  <Button asChild variant="ghost" size="sm" className="h-7 px-2 text-primary hover:text-primary">
                    <Link href={`/blocks/${mod.slug}/`}>Перейти до модуля →</Link>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Completed Lessons List */}
      {completedTotal > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Останні вивчені теми</h2>
          <div className="rounded-2xl border border-border bg-card divide-y divide-border/60 overflow-hidden shadow-sm">
            {user.completedLessons.map((item) => {
              const [courseSlug, lessonSlug] = item.split('/');
              return (
                <div key={item} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                      <span className="font-semibold text-sm text-foreground capitalize">
                        {lessonSlug.replace(/-/g, ' ')}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2 font-mono">({courseSlug})</span>
                    </div>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="text-xs">
                    <Link href={withBasePath(`/courses/${courseSlug}/${lessonSlug}/`)}>Відкрити урок ↗</Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </HubLayout>
  );
}
