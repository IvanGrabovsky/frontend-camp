'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HubLayout } from '@/components/HubLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth/AuthContext';
import { isUserAdmin, verifyAdminPasskey } from '@/lib/auth/admin';
import { getAllStudentReports, StudentReport } from '@/lib/quests/progress';
import { QUESTS } from '@/data/quests';
import {
  ShieldCheck,
  ShieldAlert,
  Users,
  Trophy,
  CheckCircle2,
  Clock,
  Code2,
  Search,
  Download,
  KeyRound,
  ExternalLink,
  RefreshCw,
  Eye,
  X,
  FileCode,
} from 'lucide-react';

export default function AdminPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [reports, setReports] = useState<StudentReport[]>([]);
  const [isReportsLoading, setIsReportsLoading] = useState(true);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [isPasskeyUnlocked, setIsPasskeyUnlocked] = useState(false);
  const [passkeyError, setPasskeyError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'in_progress'>('all');
  
  // Code Inspection Modal
  const [inspectedStudent, setInspectedStudent] = useState<StudentReport | null>(null);
  const [inspectedQuestSlug, setInspectedQuestSlug] = useState<string>(QUESTS[0].slug);

  // Check if admin through session or unlocked passkey in sessionStorage
  const isAdmin = (user && isUserAdmin(user)) || isPasskeyUnlocked;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('admin_passkey_unlocked');
      if (stored === 'true') {
        setIsPasskeyUnlocked(true);
      }
    }
  }, []);

  const handleUnlockWithPasskey = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPasskey(passkeyInput)) {
      setIsPasskeyUnlocked(true);
      setPasskeyError(false);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('admin_passkey_unlocked', 'true');
      }
    } else {
      setPasskeyError(true);
    }
  };

  const loadReports = async () => {
    setIsReportsLoading(true);
    try {
      const data = await getAllStudentReports();
      setReports(data);
    } catch (err) {
      console.error('Error loading reports:', err);
    } finally {
      setIsReportsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadReports();
    }
  }, [isAdmin]);

  // Filter students
  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === 'completed') {
      return r.totalCompletedQuests > 0;
    }
    if (statusFilter === 'in_progress') {
      const hasSome = Object.values(r.quests).some((q) => q.passedTests > 0 && !q.isCompleted);
      return hasSome;
    }
    return true;
  });

  // Calculate high-level stats
  const totalStudents = reports.length;
  const totalCompleted = reports.reduce((acc, r) => acc + r.totalCompletedQuests, 0);
  const dungeonCompleted = reports.filter((r) => r.quests['dungeon-quest']?.isCompleted).length;
  const bouncerCompleted = reports.filter((r) => r.quests['cyber-bouncer']?.isCompleted).length;
  const roverCompleted = reports.filter((r) => r.quests['space-rover']?.isCompleted).length;

  // Export CSV
  const exportToCSV = () => {
    const headers = ['Імʼя', 'Email', 'Кристали', 'Dungeon Quest', 'Cyber Bouncer', 'Space Rover', 'Загалом здано'];
    const rows = filteredReports.map((r) => [
      r.name,
      r.email,
      r.crystals,
      r.quests['dungeon-quest']?.isCompleted ? 'Здано (100%)' : `${r.quests['dungeon-quest']?.passedTests || 0} тестів`,
      r.quests['cyber-bouncer']?.isCompleted ? 'Здано (100%)' : `${r.quests['cyber-bouncer']?.passedTests || 0} тестів`,
      r.quests['space-rover']?.isCompleted ? 'Здано (100%)' : `${r.quests['space-rover']?.passedTests || 0} тестів`,
      r.totalCompletedQuests,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.map((val) => `"${val}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `frontend_camp_students_progress_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // If NOT admin, show security access screen
  if (!isAdmin) {
    return (
      <HubLayout
        breadcrumb={[
          { label: 'Курс', href: '/' },
          { label: 'Панель викладача' },
        ]}
      >
        <div className="max-w-md mx-auto my-16">
          <Card className="bg-card/70 border-border/80 shadow-2xl backdrop-blur text-center p-6 sm:p-8">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <h1 className="text-2xl font-bold mb-2">Закрита панель викладача</h1>
            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
              Ця сторінка містить звіти по кожному учню та доступна лише для Івана Грабовського.
            </p>

            <form onSubmit={handleUnlockWithPasskey} className="space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                  Ключ доступу викладача (Passkey):
                </label>
                <Input
                  type="password"
                  placeholder="Введіть ключ..."
                  value={passkeyInput}
                  onChange={(e) => {
                    setPasskeyInput(e.target.value);
                    setPasskeyError(false);
                  }}
                  className={`bg-background/80 ${passkeyError ? 'border-red-500' : ''}`}
                />
                {passkeyError && (
                  <p className="text-[11px] text-red-400">Невірний ключ доступу. Спробуйте ще раз.</p>
                )}
              </div>

              <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold">
                Підтвердити доступ
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border/60 text-xs text-muted-foreground">
              Увійшли під обліковим записом викладача?{' '}
              <Link href="/profile" className="text-foreground underline">
                Перевірити профіль
              </Link>
            </div>
          </Card>
        </div>
      </HubLayout>
    );
  }

  // Admin Dashboard View
  return (
    <HubLayout
      breadcrumb={[
        { label: 'Курс', href: '/' },
        { label: 'Панель викладача (Звіт по учнях)' },
      ]}
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 gap-1 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                Викладацький доступ активовано
              </Badge>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Звіт успішності учнів 11 класу
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Відстеження проходження завдань з JavaScript, перевірка коду та журнал оцінок.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={loadReports}
              className="text-xs gap-1.5"
              disabled={isReportsLoading}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isReportsLoading ? 'animate-spin' : ''}`} />
              Оновити
            </Button>
            <Button
              size="sm"
              onClick={exportToCSV}
              className="text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              <Download className="w-3.5 h-3.5" />
              Експорт CSV
            </Button>
          </div>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-card/50 border-border/70 p-5">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Всього учнів</span>
              <Users className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-bold text-foreground">{totalStudents}</div>
            <div className="text-xs text-muted-foreground mt-1">зареєстрованих у системі</div>
          </Card>

          <Card className="bg-card/50 border-border/70 p-5">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Здано квестів</span>
              <Trophy className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-emerald-400">{totalCompleted}</div>
            <div className="text-xs text-muted-foreground mt-1">100% пройдених робіт</div>
          </Card>

          <Card className="bg-card/50 border-border/70 p-5">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Dungeon Quest</span>
              <span className="text-xs font-mono text-amber-400">⚔️ RPG</span>
            </div>
            <div className="text-3xl font-bold text-foreground">{dungeonCompleted}</div>
            <div className="text-xs text-muted-foreground mt-1">учнів завершили роботу</div>
          </Card>

          <Card className="bg-card/50 border-border/70 p-5">
            <div className="flex items-center justify-between text-muted-foreground mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Cyber + Space</span>
              <span className="text-xs font-mono text-cyan-400">🕶️ 🪐</span>
            </div>
            <div className="text-3xl font-bold text-foreground">{bouncerCompleted + roverCompleted}</div>
            <div className="text-xs text-muted-foreground mt-1">завершених завдань</div>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Пошук за ім'ям або email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-card/50 border-border text-xs"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <Button
              variant={statusFilter === 'all' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setStatusFilter('all')}
              className="text-xs h-8"
            >
              Всі учні
            </Button>
            <Button
              variant={statusFilter === 'completed' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setStatusFilter('completed')}
              className="text-xs h-8"
            >
              Тільки хто здав
            </Button>
            <Button
              variant={statusFilter === 'in_progress' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setStatusFilter('in_progress')}
              className="text-xs h-8"
            >
              В процесі
            </Button>
          </div>
        </div>

        {/* Main Students Table */}
        <Card className="bg-card/50 border-border/70 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border/60 bg-muted/30 text-muted-foreground font-semibold">
                  <th className="py-3 px-4">Учень</th>
                  <th className="py-3 px-4">Кристали</th>
                  <th className="py-3 px-4">⚔️ Dungeon Quest</th>
                  <th className="py-3 px-4">🕶️ Cyber Bouncer</th>
                  <th className="py-3 px-4">🪐 Space Rover</th>
                  <th className="py-3 px-4 text-right">Дії</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 font-mono">
                {filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground font-sans">
                      {isReportsLoading
                        ? 'Завантаження списку учнів...'
                        : 'Учнів за вашим фільтром не знайдено.'}
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((student) => {
                    const dq = student.quests['dungeon-quest'];
                    const cb = student.quests['cyber-bouncer'];
                    const sr = student.quests['space-rover'];

                    return (
                      <tr key={student.userId} className="hover:bg-muted/20 transition-colors">
                        {/* Student Name & Avatar */}
                        <td className="py-3 px-4 font-sans">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={
                                student.avatar ||
                                `https://api.dicebear.com/7.x/bottts/svg?seed=${student.email}`
                              }
                              alt={student.name}
                              className="w-8 h-8 rounded-full bg-muted border border-border shrink-0"
                            />
                            <div>
                              <div className="font-semibold text-foreground text-xs">{student.name}</div>
                              <div className="text-[11px] text-muted-foreground">{student.email}</div>
                            </div>
                          </div>
                        </td>

                        {/* Crystals */}
                        <td className="py-3 px-4">
                          <span className="text-amber-400 font-bold">{student.crystals}</span>
                        </td>

                        {/* Quest 1 */}
                        <td className="py-3 px-4 font-sans">
                          {dq ? (
                            dq.isCompleted ? (
                              <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-[10px] gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Здано (100%)
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-amber-400 border-amber-500/30 text-[10px]">
                                {dq.passedTests} / {dq.totalTests} тестів
                              </Badge>
                            )
                          ) : (
                            <span className="text-muted-foreground text-[11px]">—</span>
                          )}
                        </td>

                        {/* Quest 2 */}
                        <td className="py-3 px-4 font-sans">
                          {cb ? (
                            cb.isCompleted ? (
                              <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-[10px] gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Здано (100%)
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-amber-400 border-amber-500/30 text-[10px]">
                                {cb.passedTests} / {cb.totalTests} тестів
                              </Badge>
                            )
                          ) : (
                            <span className="text-muted-foreground text-[11px]">—</span>
                          )}
                        </td>

                        {/* Quest 3 */}
                        <td className="py-3 px-4 font-sans">
                          {sr ? (
                            sr.isCompleted ? (
                              <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-[10px] gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Здано (100%)
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-amber-400 border-amber-500/30 text-[10px]">
                                {sr.passedTests} / {sr.totalTests} тестів
                              </Badge>
                            )
                          ) : (
                            <span className="text-muted-foreground text-[11px]">—</span>
                          )}
                        </td>

                        {/* Actions: Code Viewer */}
                        <td className="py-3 px-4 text-right font-sans">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setInspectedStudent(student);
                              // pick first quest that has code
                              const activeSlug =
                                Object.keys(student.quests).find((k) => student.quests[k].code) ||
                                'dungeon-quest';
                              setInspectedQuestSlug(activeSlug);
                            }}
                            className="text-xs h-7 gap-1 hover:text-amber-400"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Переглянути код
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Code Inspection Modal */}
      {inspectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="max-w-3xl w-full bg-[#0d121f] border-border shadow-2xl relative max-h-[85vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border/60 bg-muted/20">
              <div className="flex items-center gap-3">
                <FileCode className="w-5 h-5 text-amber-400" />
                <div>
                  <div className="text-sm font-bold text-foreground">
                    Код учня: {inspectedStudent.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{inspectedStudent.email}</div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setInspectedStudent(null)}
                className="w-8 h-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Select Quest in Modal */}
            <div className="px-4 py-2 bg-muted/10 border-b border-border/50 flex gap-2">
              {QUESTS.map((q) => {
                const questData = inspectedStudent.quests[q.slug];
                const isSelected = inspectedQuestSlug === q.slug;
                return (
                  <button
                    key={q.slug}
                    onClick={() => setInspectedQuestSlug(q.slug)}
                    className={`px-3 py-1 text-xs rounded-md font-medium transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {q.title}{' '}
                    {questData?.isCompleted
                      ? '✅'
                      : questData
                      ? `(${questData.passedTests}/${questData.totalTests})`
                      : '⚪'}
                  </button>
                );
              })}
            </div>

            {/* Code Body */}
            <div className="p-4 overflow-y-auto flex-1 font-mono text-xs">
              {inspectedStudent.quests[inspectedQuestSlug]?.code ? (
                <div className="space-y-2">
                  <div className="text-[11px] text-muted-foreground flex justify-between">
                    <span>
                      Останнє оновлення:{' '}
                      {new Date(
                        inspectedStudent.quests[inspectedQuestSlug].updatedAt
                      ).toLocaleString('uk-UA')}
                    </span>
                    <span className="text-emerald-400 font-semibold">
                      Пройдено тестів:{' '}
                      {inspectedStudent.quests[inspectedQuestSlug].passedTests} /{' '}
                      {inspectedStudent.quests[inspectedQuestSlug].totalTests}
                    </span>
                  </div>
                  <pre className="p-4 rounded-xl bg-black/70 border border-border/60 text-slate-200 overflow-x-auto whitespace-pre font-mono leading-relaxed">
                    {inspectedStudent.quests[inspectedQuestSlug].code}
                  </pre>
                </div>
              ) : (
                <div className="py-12 text-center text-muted-foreground font-sans">
                  Цей учень ще не запускав перевірку для обраного квесту.
                </div>
              )}
            </div>

            <div className="p-3 bg-muted/20 border-t border-border/50 flex justify-end">
              <Button size="sm" onClick={() => setInspectedStudent(null)}>
                Закрити
              </Button>
            </div>
          </Card>
        </div>
      )}
    </HubLayout>
  );
}
