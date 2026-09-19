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
import { BookCheck, Trophy, ArrowRight, User as UserIcon, LogIn, CheckCircle2, ShieldCheck, Flame, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, openAuthModal, logout } = useAuth();

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
            Увійдіть або зареєструйтесь, щоб відстежувати власний прогрес та відкривати всі модулі курсу.
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
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="text-destructive hover:bg-destructive/10 hover:text-destructive gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Вийти</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <Card className="border-border/80 bg-gradient-to-br from-primary/10 via-card to-card shadow-sm">
          <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Завершено уроків</CardTitle>
            <BookCheck className="w-5 h-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-foreground font-mono">
              {completedTotal} <span className="text-base text-muted-foreground font-normal">/ {totalLessonsCount}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Опановано тем на платформі</p>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-gradient-to-br from-emerald-500/10 via-card to-card shadow-sm">
          <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Загальний прогрес</CardTitle>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              {progressPercent}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">усього навчального шляху</p>
          </CardContent>
        </Card>

        <Card className="border-border/80 bg-gradient-to-br from-purple-500/10 via-card to-card shadow-sm">
          <CardHeader className="pb-2 flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-muted-foreground">Рівень навичок</CardTitle>
            <Trophy className="w-5 h-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">
              {completedTotal >= 20 ? 'Middle' : completedTotal >= 5 ? 'Junior' : 'Trainee'}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Автоматично оновлюється з прогресом</p>
          </CardContent>
        </Card>
      </div>

      {/* Modules Progress Table */}
      <section>
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
          <span>📊</span> Прогрес за навчальними модулями
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courseModules.map((mod) => {
            const pct = mod.total > 0 ? Math.round((mod.completed / mod.total) * 100) : 0;
            return (
              <Card key={mod.slug} className="border-border/70 hover:border-primary/40 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm sm:text-base text-foreground truncate max-w-[200px] sm:max-w-xs">
                      {mod.title}
                    </h3>
                    <span className="text-xs font-mono text-muted-foreground">
                      {mod.completed} / {mod.total}
                    </span>
                  </div>

                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden mb-3">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{pct}% завершено</span>
                    <Link
                      href={`/blocks/${mod.slug}/`}
                      className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                    >
                      Перейти <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </HubLayout>
  );
}
