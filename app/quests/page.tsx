'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { HubLayout } from '@/components/HubLayout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QUESTS, Quest, QuestTestCase } from '@/data/quests';
import { useAuth } from '@/lib/auth/AuthContext';
import { saveQuestProgress, getSavedQuestProgress } from '@/lib/quests/progress';
import {
  analyzeStudentCode,
  runAntiCheatRandomTests,
  CodeAnalysisReport,
} from '@/lib/quests/analyzer';
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  CheckCircle2,
  XCircle,
  Trophy,
  Sparkles,
  HelpCircle,
  ExternalLink,
  GitBranch,
  Sword,
  Sliders,
  Terminal,
  Code2,
  Lock,
  LogIn,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

interface TestResult {
  id: string;
  title: string;
  passed: boolean;
  actual: any;
  expected: any;
  error?: string;
  line?: number | null;
}

interface ErrorDetails {
  line: number | null;
  message: string;
}

export default function QuestsPage() {
  const { user, isAuthenticated, isLoading, addCrystals, openAuthModal } = useAuth();
  const [selectedQuestSlug, setSelectedQuestSlug] = useState<string>(QUESTS[0].slug);
  const currentQuest = QUESTS.find((q) => q.slug === selectedQuestSlug) || QUESTS[0];

  const [code, setCode] = useState<string>(currentQuest.starterCode);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [hasRun, setHasRun] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorDetails, setErrorDetails] = useState<ErrorDetails | null>(null);
  const [activeLeftTab, setActiveLeftTab] = useState<'tasks' | 'simulator'>('tasks');
  const [activeRightTab, setActiveRightTab] = useState<'tests' | 'analysis'>('tests');
  const [codeAnalysis, setCodeAnalysis] = useState<CodeAnalysisReport | null>(null);
  const [antiCheatResult, setAntiCheatResult] = useState<{ passed: boolean; message: string } | null>(null);
  const [showVictoryModal, setShowVictoryModal] = useState(false);
  const [claimedReward, setClaimedReward] = useState(false);

  // Simulator state for Dungeon Quest
  const [simTrap, setSimTrap] = useState(true);
  const [simKey, setSimKey] = useState(false);
  const [simLockpick, setSimLockpick] = useState(65);
  const [simAttack, setSimAttack] = useState(50);
  const [simWeapon, setSimWeapon] = useState('sword');
  const [simCrit, setSimCrit] = useState(false);
  const [simHp, setSimHp] = useState(80);
  const [simChestResult, setSimChestResult] = useState<string | null>(null);
  const [simDmgResult, setSimDmgResult] = useState<string | null>(null);
  const [simHpResult, setSimHpResult] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  // Synchronized scrolling between textarea and line numbers gutter
  const handleTextareaScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  // Jump to specific line in editor
  const jumpToLine = (lineNum: number) => {
    if (!textareaRef.current) return;
    const lines = code.split('\n');
    let charIndex = 0;
    for (let i = 0; i < lineNum - 1 && i < lines.length; i++) {
      charIndex += lines[i].length + 1;
    }
    textareaRef.current.focus();
    const lineEnd = charIndex + (lines[lineNum - 1]?.length || 0);
    textareaRef.current.setSelectionRange(charIndex, lineEnd);
    const lineHeight = 24;
    textareaRef.current.scrollTop = Math.max(0, (lineNum - 4) * lineHeight);
  };

  // Load saved progress or default code on quest change
  useEffect(() => {
    if (user) {
      const saved = getSavedQuestProgress(user.id, currentQuest.slug);
      if (saved && saved.code) {
        setCode(saved.code);
        return;
      }
    }
    setCode(currentQuest.starterCode);
    setTestResults([]);
    setHasRun(false);
    setErrorDetails(null);
    setShowVictoryModal(false);
  }, [currentQuest.slug, user]);

  // Handle Tab key in code editor
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetCode = () => {
    if (confirm('Скинути код до початкового шаблону завдання?')) {
      setCode(currentQuest.starterCode);
      setTestResults([]);
      setHasRun(false);
      setErrorDetails(null);
    }
  };

  // Advanced Error Parser (finds exact line number of syntax & runtime errors)
  const parseErrorWithLine = (err: any, rawCode: string): ErrorDetails => {
    const rawMessage = err?.message || String(err);
    const lines = rawCode.split('\n');

    // 1. Try extracting line from stack trace
    if (err?.stack) {
      const stackLines = err.stack.split('\n');
      for (const s of stackLines) {
        const match = s.match(/(?:student-code\.js|quest-code\.js|<anonymous>|eval)[\s\S]*?:(\d+):(\d+)/i);
        if (match && match[1]) {
          const lineNum = parseInt(match[1], 10);
          if (lineNum >= 1 && lineNum <= lines.length + 5) {
            return {
              line: Math.min(lineNum, lines.length),
              message: rawMessage,
            };
          }
        }
      }
    }

    // 2. If it's a SyntaxError, incrementally locate offending line
    const isSyntax =
      err instanceof SyntaxError ||
      rawMessage.toLowerCase().includes('syntax') ||
      rawMessage.toLowerCase().includes('unexpected');

    if (isSyntax) {
      for (let i = 1; i <= lines.length; i++) {
        const slice = lines
          .slice(0, i)
          .join('\n')
          .replace(/export\s+default\s+/g, '')
          .replace(/export\s+function\s+/g, 'function ')
          .replace(/export\s+const\s+/g, 'const ')
          .replace(/export\s+let\s+/g, 'let ')
          .replace(/export\s+var\s+/g, 'var ');

        try {
          new Function(slice);
        } catch (subErr: any) {
          const subMsg = subErr.message || '';
          if (
            !subMsg.includes('Unexpected end of input') &&
            !subMsg.includes('missing }') &&
            !subMsg.includes('missing )') &&
            !subMsg.includes("Unexpected token ')'")
          ) {
            return { line: i, message: subMsg || rawMessage };
          }
        }
      }
      return { line: lines.length, message: rawMessage };
    }

    return { line: null, message: rawMessage };
  };

  // Run tests inside browser
  const runTests = async () => {
    setErrorDetails(null);
    setHasRun(true);

    try {
      const cleaned = code
        .replace(/export\s+default\s+/g, '')
        .replace(/export\s+function\s+/g, 'function ')
        .replace(/export\s+const\s+/g, 'const ')
        .replace(/export\s+let\s+/g, 'let ')
        .replace(/export\s+var\s+/g, 'var ');

      const wrappedCode = `${cleaned}
const result = {};
if (typeof canOpenChest !== 'undefined') result.canOpenChest = canOpenChest;
if (typeof calculateDamage !== 'undefined') result.calculateDamage = calculateDamage;
if (typeof getHeroStatus !== 'undefined') result.getHeroStatus = getHeroStatus;
if (typeof canEnter !== 'undefined') result.canEnter = canEnter;
if (typeof calculateTicketPrice !== 'undefined') result.calculateTicketPrice = calculateTicketPrice;
if (typeof getAccessZone !== 'undefined') result.getAccessZone = getAccessZone;
if (typeof checkRadiationSafety !== 'undefined') result.checkRadiationSafety = checkRadiationSafety;
if (typeof canStartExpedition !== 'undefined') result.canStartExpedition = canStartExpedition;
if (typeof calculateTripFuel !== 'undefined') result.calculateTripFuel = calculateTripFuel;
return result;
//# sourceURL=student-code.js`;

      let fns: any;
      try {
        const runner = new Function(wrappedCode);
        fns = runner();
      } catch (compileErr: any) {
        const parsed = parseErrorWithLine(compileErr, code);
        setErrorDetails(parsed);
        setTestResults([]);
        return;
      }

      // Execute each test case
      const results: TestResult[] = currentQuest.testCases.map((tc) => {
        try {
          const outcome = tc.run(fns);
          return {
            id: tc.id,
            title: tc.title,
            passed: outcome.passed,
            actual: outcome.actual,
            expected: outcome.expected,
          };
        } catch (err: any) {
          const parsed = parseErrorWithLine(err, code);
          return {
            id: tc.id,
            title: tc.title,
            passed: false,
            actual: 'Error',
            expected: 'Expected output',
            error: parsed.message,
            line: parsed.line,
          };
        }
      });

      setTestResults(results);

      // Run static code quality analysis
      const analysis = analyzeStudentCode(code, currentQuest.slug);
      setCodeAnalysis(analysis);

      // Run randomized anti-cheat tests
      const antiCheat = runAntiCheatRandomTests(fns, currentQuest.slug);
      setAntiCheatResult(antiCheat);

      const passedCount = results.filter((r) => r.passed).length;
      const isCompleted = passedCount === currentQuest.testCases.length && analysis.passedAll && antiCheat.passed;

      if (isCompleted) {
        setShowVictoryModal(true);
        if (user && !claimedReward) {
          addCrystals(currentQuest.crystalsReward);
          setClaimedReward(true);
        }
      }

      // Save student progress
      if (user) {
        await saveQuestProgress(
          user,
          currentQuest.slug,
          code,
          passedCount,
          currentQuest.testCases.length,
          isCompleted,
          analysis.score,
          antiCheat.passed
        );
      }
    } catch (err: any) {
      const parsed = parseErrorWithLine(err, code);
      setErrorDetails(parsed);
      setTestResults([]);
    }
  };

  // Run Simulator actions
  const runSimulatorChest = () => {
    try {
      const cleaned = code.replace(/export\s+/g, '');
      const runner = new Function(`${cleaned}; return typeof canOpenChest !== 'undefined' ? canOpenChest : null;`);
      const fn = runner();
      if (!fn) throw new Error('Функцію canOpenChest не знайдено');
      const res = fn(simKey, simLockpick, simTrap);
      setSimChestResult(res ? '🟢 Скриню успішно відкрито!' : '🔴 Скриня заблокована / пастка!');
    } catch (e: any) {
      setSimChestResult('Помилка: ' + e.message);
    }
  };

  const runSimulatorDmg = () => {
    try {
      const cleaned = code.replace(/export\s+/g, '');
      const runner = new Function(`${cleaned}; return typeof calculateDamage !== 'undefined' ? calculateDamage : null;`);
      const fn = runner();
      if (!fn) throw new Error('Функцію calculateDamage не знайдено');
      const res = fn(simAttack, simWeapon, simCrit);
      setSimDmgResult(`Шкода: ${res} HP`);
    } catch (e: any) {
      setSimDmgResult('Помилка: ' + e.message);
    }
  };

  const runSimulatorHp = () => {
    try {
      const cleaned = code.replace(/export\s+/g, '');
      const runner = new Function(`${cleaned}; return typeof getHeroStatus !== 'undefined' ? getHeroStatus : null;`);
      const fn = runner();
      if (!fn) throw new Error('Функцію getHeroStatus не знайдено');
      const res = fn(simHp, 100);
      setSimHpResult(`Статус: "${res}"`);
    } catch (e: any) {
      setSimHpResult('Помилка: ' + e.message);
    }
  };

  const totalTests = currentQuest.testCases.length;
  const passedTests = testResults.filter((r) => r.passed).length;
  const progressPercent = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;
  const codeLines = code.split('\n');

  if (isLoading) {
    return (
      <HubLayout
        breadcrumb={[
          { label: 'Курс', href: '/' },
          { label: 'Практичні Квести' },
        ]}
      >
        <div className="py-16 animate-pulse space-y-6 max-w-5xl mx-auto">
          <div className="h-28 rounded-2xl bg-muted/50" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-24 rounded-xl bg-muted/40" />
            <div className="h-24 rounded-xl bg-muted/40" />
            <div className="h-24 rounded-xl bg-muted/40" />
          </div>
          <div className="h-96 rounded-2xl bg-muted/30" />
        </div>
      </HubLayout>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <HubLayout
        breadcrumb={[
          { label: 'Курс', href: '/' },
          { label: 'Практичні Квести' },
        ]}
      >
        <div className="max-w-4xl mx-auto py-8 sm:py-14 space-y-10">
          {/* Main Locked Card */}
          <Card className="bg-card border-border/80 shadow-2xl backdrop-blur relative overflow-hidden text-center p-8 sm:p-12">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-primary to-emerald-500" />

            <div className="w-20 h-20 rounded-3xl bg-amber-500/15 text-amber-500 dark:text-amber-400 flex items-center justify-center mx-auto mb-5 border border-amber-500/30 shadow-lg shadow-amber-500/10">
              <Lock className="w-10 h-10" />
            </div>

            <Badge className="mb-4 bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30 px-3 py-1 text-xs font-semibold">
              🔒 Доступ закрито для неавторизованих користувачів
            </Badge>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-foreground">
              Квести доступні лише для учнів курсу
            </h1>

            <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
              Цей розділ містить практичні завдання з JavaScript для 11 класу, онлайн-редактор коду, систему автотестів та інтерактивні симулятори. Щоб писати код, проходити перевірки та фіксувати результати у табелі викладача — увійдіть або зареєструйтесь.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <Button
                onClick={() => openAuthModal('login')}
                size="lg"
                className="w-full sm:w-auto h-12 px-8 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 gap-2"
              >
                <LogIn className="w-4 h-4" /> Увійти в акаунт
              </Button>
              <Button
                onClick={() => openAuthModal('register')}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-12 px-8 font-semibold border-border hover:bg-muted gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-500" /> Зареєструватися (11 клас)
              </Button>
            </div>
          </Card>

          {/* Locked Quests Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <span>Список практичних завдань</span>
                <Badge variant="outline" className="text-xs">
                  {QUESTS.length} квести
                </Badge>
              </h2>
              <span className="text-xs text-muted-foreground font-mono">Авторизуйтесь для запуску коду</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {QUESTS.map((q) => (
                <Card
                  key={q.slug}
                  className="bg-card/60 border-border/70 p-5 relative overflow-hidden hover:border-border transition-all opacity-95 group shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-[10px] font-mono border-amber-500/40 text-amber-700 dark:text-amber-400 bg-amber-500/10 gap-1 font-semibold">
                      <Lock className="w-3 h-3" /> Заблоковано
                    </Badge>
                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                      +{q.crystalsReward} 💎
                    </span>
                  </div>

                  <h3 className="font-bold text-base mb-1 text-foreground group-hover:text-primary transition-colors">
                    {q.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
                    {q.subtitle}
                  </p>

                  <div className="pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span className="capitalize">{q.difficulty}</span>
                    <button
                      onClick={() => openAuthModal('login')}
                      className="text-primary hover:underline font-semibold flex items-center gap-1"
                    >
                      Відкрити <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="p-6 rounded-2xl bg-muted/40 border border-border/60 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="space-y-1">
              <div className="font-bold text-foreground flex items-center gap-1.5">
                ⚡ Редактор онлайн
              </div>
              <p className="text-muted-foreground">Зручне написання коду з номерами рядків та підказками помилок.</p>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-foreground flex items-center gap-1.5">
                🧪 Автотести Vitest
              </div>
              <p className="text-muted-foreground">Миттєва перевірка правильності розвʼязку прямо в браузері.</p>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-foreground flex items-center gap-1.5">
                🛡️ Розумний лінтер
              </div>
              <p className="text-muted-foreground">Аналіз синтаксису, змінних та захист від підбору значень.</p>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-foreground flex items-center gap-1.5">
                📊 Журнал викладача
              </div>
              <p className="text-muted-foreground">Ваші результати одразу надходять вчителю для оцінювання.</p>
            </div>
          </div>
        </div>
      </HubLayout>
    );
  }

  return (
    <HubLayout
      breadcrumb={[
        { label: 'Курс', href: '/' },
        { label: 'Практичні Квести' },
      ]}
    >
      <div className="space-y-6">
        {/* Quest Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/60">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
              <span>⚔️</span>
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-300 dark:from-amber-400 dark:via-orange-400 dark:to-amber-200 bg-clip-text text-transparent">
                Інтерактивна Арена Квестів
              </span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Практичні завдання з JavaScript для 11 класів із миттєвою автоперевіркою та нагородами.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-xs gap-1.5"
            >
              <a
                href={`https://github.com/IvanGrabovsky/${currentQuest.slug}`}
                target="_blank"
                rel="noreferrer"
              >
                <GitBranch className="w-3.5 h-3.5" />
                Форкнути на GitHub
                <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
              </a>
            </Button>
          </div>
        </div>

        {/* Quests switcher buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {QUESTS.map((q) => {
            const isSelected = q.slug === selectedQuestSlug;
            return (
              <button
                key={q.slug}
                onClick={() => setSelectedQuestSlug(q.slug)}
                className={`text-left p-4 rounded-xl border transition-all relative overflow-hidden ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500/50 shadow-md shadow-amber-500/10'
                    : 'bg-card/40 border-border/60 hover:bg-card/80 hover:border-border'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-amber-500/20 to-transparent pointer-events-none rounded-bl-full" />
                )}
                <div className="flex items-center justify-between mb-1.5">
                  <Badge variant="outline" className="text-[11px] font-semibold border-amber-500/40 text-amber-500 dark:text-amber-400">
                    {q.badge}
                  </Badge>
                  <span className="text-xs font-semibold text-amber-500 dark:text-amber-300/90 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> +{q.crystalsReward} XP
                  </span>
                </div>
                <div className="font-bold text-base text-foreground mb-0.5">{q.title}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">{q.subtitle}</div>
              </button>
            );
          })}
        </div>

        {/* Progress Banner */}
        <Card className="bg-card/60 border-border/70 backdrop-blur shadow-sm">
          <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-500 dark:text-amber-400 flex items-center justify-center shrink-0 font-bold text-lg">
                {hasRun ? (passedTests === totalTests ? '🎉' : '🧪') : '⚡'}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold flex items-center gap-2">
                  <span>Прогрес виконання:</span>
                  <span className="text-amber-500 dark:text-amber-400 font-bold">
                    {passedTests} з {totalTests} тестів пройдено
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {hasRun
                    ? passedTests === totalTests
                      ? 'Всі тести пройдено! Роботу можна здавати.'
                      : `Залишилося виправити: ${totalTests - passedTests} тест(ів)`
                    : 'Натисніть "Запустити перевірку", щоб перевірити ваш код.'}
                </div>
              </div>
            </div>

            <div className="w-full sm:w-64 flex items-center gap-3">
              <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-foreground w-10 text-right">
                {progressPercent}%
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Main Quest Workspace: Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Tasks / Lore / Simulator (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="bg-card/60 border-border/70 shadow-sm">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tabs
                      value={activeLeftTab}
                      onValueChange={(v) => setActiveLeftTab(v as any)}
                    >
                      <TabsList className="h-8">
                        <TabsTrigger value="tasks" className="text-xs">
                          📋 Завдання
                        </TabsTrigger>
                        <TabsTrigger value="simulator" className="text-xs">
                          🎮 Симулятор
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {currentQuest.tasks.length} функцій
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-4 pt-2">
                {activeLeftTab === 'tasks' ? (
                  <div className="space-y-4">
                    {/* Story Box */}
                    <div className="p-3.5 rounded-lg bg-muted/40 border border-border/50 text-xs text-muted-foreground leading-relaxed">
                      <strong className="text-foreground block mb-1">📜 Передісторія:</strong>
                      {currentQuest.story}
                    </div>

                    {/* Tasks List */}
                    <div className="space-y-3">
                      {currentQuest.tasks.map((task) => (
                        <div
                          key={task.id}
                          className="p-3 rounded-lg border border-border/60 bg-background/60 hover:border-border transition-colors shadow-sm"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-xs text-foreground">
                              {task.name}
                            </span>
                          </div>
                          <code className="text-[11px] text-amber-600 dark:text-amber-400 font-mono block mb-1.5 bg-muted/50 px-2 py-0.5 rounded border border-border/40">
                            {task.functionName}
                          </code>
                          <p className="text-xs text-muted-foreground mb-2">
                            {task.description}
                          </p>

                          <ul className="text-[11px] text-muted-foreground space-y-1 list-disc list-inside mb-2">
                            {task.rules.map((r, rIdx) => (
                              <li key={rIdx} className="leading-tight">
                                {r}
                              </li>
                            ))}
                          </ul>

                          <div className="p-2 rounded bg-muted/70 dark:bg-black/40 border border-border/60 font-mono text-[10px] text-emerald-600 dark:text-emerald-400 whitespace-pre">
                            {task.example}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Interactive Simulator Tab */
                  <div className="space-y-4 text-xs">
                    <p className="text-muted-foreground text-xs">
                      Клікайте та перевіряйте, як працює ваш код у живих сценаріях:
                    </p>

                    {/* Chest Sim */}
                    <div className="p-3 rounded-lg border border-border/60 bg-background/50 space-y-2">
                      <div className="font-semibold text-foreground flex justify-between">
                        <span>🗝️ Скриня (canOpenChest)</span>
                      </div>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span>Пастка знешкоджена:</span>
                        <input
                          type="checkbox"
                          checked={simTrap}
                          onChange={(e) => setSimTrap(e.target.checked)}
                          className="w-4 h-4 accent-amber-500"
                        />
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span>Магічний ключ:</span>
                        <input
                          type="checkbox"
                          checked={simKey}
                          onChange={(e) => setSimKey(e.target.checked)}
                          className="w-4 h-4 accent-amber-500"
                        />
                      </label>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] text-muted-foreground">
                          <span>Рівень злому:</span>
                          <span className="font-mono font-bold text-foreground">{simLockpick}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={simLockpick}
                          onChange={(e) => setSimLockpick(parseInt(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={runSimulatorChest}
                        className="w-full text-xs h-7 mt-1"
                      >
                        Спробувати відкрити
                      </Button>
                      {simChestResult && (
                        <div className="p-1.5 rounded bg-muted/60 dark:bg-black/40 font-mono text-[11px] text-center border border-border/50">
                          {simChestResult}
                        </div>
                      )}
                    </div>

                    {/* Damage Sim */}
                    <div className="p-3 rounded-lg border border-border/60 bg-background/50 space-y-2">
                      <div className="font-semibold text-foreground">⚔️ Шкода (calculateDamage)</div>
                      <div className="flex items-center justify-between gap-2">
                        <span>Сила атаки:</span>
                        <input
                          type="number"
                          value={simAttack}
                          onChange={(e) => setSimAttack(parseInt(e.target.value) || 0)}
                          className="w-16 bg-background border border-border rounded px-2 py-0.5 text-right font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        {['sword', 'bow', 'staff', 'fist'].map((w) => (
                          <button
                            key={w}
                            onClick={() => setSimWeapon(w)}
                            className={`py-1 text-[10px] font-semibold rounded border ${
                              simWeapon === w
                                ? 'bg-amber-500/20 border-amber-500 text-amber-600 dark:text-amber-300'
                                : 'bg-muted/40 border-border/50 text-muted-foreground'
                            }`}
                          >
                            {w === 'sword' ? '🗡️ Меч' : w === 'bow' ? '🏹 Лук' : w === 'staff' ? '🔮 Посох' : '👊 Інше'}
                          </button>
                        ))}
                      </div>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span>Критичний удар:</span>
                        <input
                          type="checkbox"
                          checked={simCrit}
                          onChange={(e) => setSimCrit(e.target.checked)}
                          className="w-4 h-4 accent-amber-500"
                        />
                      </label>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={runSimulatorDmg}
                        className="w-full text-xs h-7 mt-1"
                      >
                        Вдарити ворога
                      </Button>
                      {simDmgResult && (
                        <div className="p-1.5 rounded bg-muted/60 dark:bg-black/40 font-mono text-[11px] text-center border border-border/50 text-amber-600 dark:text-amber-400">
                          {simDmgResult}
                        </div>
                      )}
                    </div>

                    {/* HP Sim */}
                    <div className="p-3 rounded-lg border border-border/60 bg-background/50 space-y-2">
                      <div className="font-semibold text-foreground flex justify-between">
                        <span>❤️ Здоров'я (getHeroStatus)</span>
                        <span className="font-mono text-amber-500 dark:text-amber-400">{simHp} HP</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={simHp}
                        onChange={(e) => setSimHp(parseInt(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={runSimulatorHp}
                        className="w-full text-xs h-7 mt-1"
                      >
                        Перевірити статус
                      </Button>
                      {simHpResult && (
                        <div className="p-1.5 rounded bg-muted/60 dark:bg-black/40 font-mono text-[11px] text-center border border-border/50 text-emerald-600 dark:text-emerald-400 font-semibold">
                          {simHpResult}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Code Editor & Auto-Test Results (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <Card className="bg-card border-border/70 overflow-hidden shadow-md">
              {/* Editor Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-muted/50 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <span className="text-xs font-mono font-semibold text-foreground">
                    src/quest.js
                  </span>
                  <span className="text-[11px] text-muted-foreground font-mono">
                    ({codeLines.length} рядків)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyCode}
                    className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                    title="Скопіювати код"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetCode}
                    className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                    title="Скинути до шаблону"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={runTests}
                    className="h-7 px-3 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white gap-1.5 shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Запустити перевірку
                  </Button>
                </div>
              </div>

              {/* Editor Container with Synchronized Line Numbers */}
              <div className="relative flex min-h-[380px] bg-[#0d121f] text-slate-100 font-mono text-xs sm:text-sm">
                {/* Line Numbers Gutter */}
                <div
                  ref={gutterRef}
                  className="w-12 select-none py-4 text-right pr-3 font-mono text-xs sm:text-sm text-slate-500 bg-[#070b14] border-r border-slate-800/80 overflow-hidden shrink-0"
                  style={{ lineHeight: '24px' }}
                >
                  {codeLines.map((_, i) => {
                    const lineNum = i + 1;
                    const isError = errorDetails?.line === lineNum;
                    return (
                      <div
                        key={i}
                        onClick={() => jumpToLine(lineNum)}
                        className={`cursor-pointer transition-colors ${
                          isError
                            ? 'text-red-400 font-bold bg-red-500/25 px-1 rounded -mr-1'
                            : 'hover:text-slate-300'
                        }`}
                        title={isError ? `Помилка в рядку #${lineNum}` : `Рядок #${lineNum}`}
                      >
                        {lineNum}
                      </div>
                    );
                  })}
                </div>

                {/* Code Textarea */}
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    if (errorDetails) setErrorDetails(null);
                  }}
                  onScroll={handleTextareaScroll}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  className="flex-1 w-full bg-transparent text-slate-100 font-mono text-xs sm:text-sm p-4 outline-none resize-none border-none selection:bg-amber-500/30 overflow-y-auto"
                  style={{ lineHeight: '24px', tabSize: 2 }}
                />
              </div>
            </Card>

            {/* Error Line Banner (High Contrast & Clear) */}
            {errorDetails && (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border-2 border-red-500/50 text-red-900 dark:text-red-200 text-xs sm:text-sm shadow-md animate-in fade-in duration-200">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold flex items-center gap-2">
                        <span>Помилка виконання</span>
                        {errorDetails.line && (
                          <Badge className="bg-red-600 text-white font-mono text-xs px-2 py-0.5">
                            Рядок #{errorDetails.line}
                          </Badge>
                        )}
                      </div>
                      <div className="font-mono text-xs mt-1 text-red-800 dark:text-red-300 bg-red-100/70 dark:bg-black/40 p-2 rounded-lg border border-red-300/60 dark:border-red-800/60">
                        {errorDetails.message}
                      </div>
                    </div>
                  </div>

                  {errorDetails.line && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => jumpToLine(errorDetails.line!)}
                      className="shrink-0 text-xs h-7 border-red-400/60 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40 gap-1 font-semibold"
                    >
                      Перейти <ArrowRight className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Tabbed Results Card: Auto-tests & Static Code Quality Analysis */}
            <Card className="bg-card border-border/70 shadow-sm overflow-hidden">
              <CardHeader className="p-3 pb-2 border-b border-border/50">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 p-1 bg-muted/60 dark:bg-black/30 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setActiveRightTab('tests')}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                        activeRightTab === 'tests'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Terminal className="w-3.5 h-3.5 text-sky-500" />
                      <span>Автотести</span>
                      {hasRun && (
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-1.5 py-0 font-mono font-bold ${
                            passedTests === totalTests
                              ? 'border-emerald-500/50 text-emerald-700 dark:text-emerald-300 bg-emerald-500/15'
                              : 'border-amber-500/50 text-amber-700 dark:text-amber-300 bg-amber-500/15'
                          }`}
                        >
                          {passedTests}/{totalTests}
                        </Badge>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveRightTab('analysis')}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                        activeRightTab === 'analysis'
                          ? 'bg-background text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Аналіз коду (Лінтер)</span>
                      {hasRun && codeAnalysis && (
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-1.5 py-0 font-mono font-bold ${
                            codeAnalysis.passedAll && (!antiCheatResult || antiCheatResult.passed)
                              ? 'border-emerald-500/50 text-emerald-700 dark:text-emerald-300 bg-emerald-500/15'
                              : 'border-amber-500/50 text-amber-700 dark:text-amber-300 bg-amber-500/15'
                          }`}
                        >
                          {codeAnalysis.score}%
                        </Badge>
                      )}
                    </button>
                  </div>

                  {hasRun && (
                    <div className="text-[11px] font-mono">
                      {passedTests === totalTests && codeAnalysis?.passedAll && (!antiCheatResult || antiCheatResult.passed) ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Всі критерії виконано!
                        </span>
                      ) : (
                        <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5" /> Зверніть увагу на зауваження
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-4 pt-3">
                {!hasRun ? (
                  <div className="text-center py-8 text-xs text-muted-foreground">
                    Натисніть зелену кнопку <strong>"Запустити перевірку"</strong> вище, щоб прогнати тести та отримати ревʼю коду.
                  </div>
                ) : activeRightTab === 'tests' ? (
                  /* TAB 1: UNIT TESTS */
                  <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                    {testResults.map((tr) => (
                      <div
                        key={tr.id}
                        className={`p-3 rounded-xl border text-xs transition-colors shadow-sm ${
                          tr.passed
                            ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/40'
                            : 'bg-red-50/80 dark:bg-red-950/25 border-red-300 dark:border-red-800/50'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          {tr.passed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div
                              className={`font-semibold text-xs sm:text-sm ${
                                tr.passed
                                  ? 'text-emerald-900 dark:text-emerald-200'
                                  : 'text-red-900 dark:text-red-200'
                              }`}
                            >
                              {tr.title}
                            </div>

                            {/* Passed status badge */}
                            {tr.passed && (
                              <div className="mt-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-mono font-medium">
                                ✓ Результат співпав: {JSON.stringify(tr.actual)}
                              </div>
                            )}

                            {/* High-Contrast Diff for Failed Test */}
                            {!tr.passed && (
                              <div className="mt-2 p-2.5 rounded-lg bg-white dark:bg-black/60 border border-slate-200 dark:border-white/10 font-mono text-[11px] space-y-1.5 shadow-sm">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-800/60">
                                    Очікувалось
                                  </span>
                                  <span className="font-semibold text-emerald-700 dark:text-emerald-300">
                                    {JSON.stringify(tr.expected)}
                                  </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border border-red-300/60 dark:border-red-800/60">
                                    Отримано
                                  </span>
                                  <span className="font-semibold text-red-700 dark:text-red-300">
                                    {tr.error ? `Помилка: ${tr.error}` : JSON.stringify(tr.actual)}
                                  </span>
                                </div>

                                {tr.line && (
                                  <div className="text-amber-800 dark:text-amber-300 text-[11px] pt-1 border-t border-border/50 flex items-center justify-between">
                                    <span>
                                      📍 Помилка сталася у рядку <strong>#{tr.line}</strong>
                                    </span>
                                    <button
                                      onClick={() => jumpToLine(tr.line!)}
                                      className="underline hover:text-foreground text-[10px] font-sans"
                                    >
                                      Перейти до рядка
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* TAB 2: STATIC CODE ANALYSIS & ANTI-CHEAT */
                  <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                    {/* Overall Summary Card */}
                    <div className="p-3.5 rounded-xl bg-muted/40 dark:bg-black/30 border border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-semibold text-foreground flex items-center gap-2">
                          <span>Загальна якість та валідність коду:</span>
                          <Badge
                            className={`font-mono text-xs font-bold ${
                              (codeAnalysis?.score || 0) >= 90
                                ? 'bg-emerald-600 text-white'
                                : (codeAnalysis?.score || 0) >= 60
                                ? 'bg-amber-600 text-white'
                                : 'bg-red-600 text-white'
                            }`}
                          >
                            {codeAnalysis?.score || 0} / 100 балів
                          </Badge>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Перевірка структури синтаксису, використання розгалужень та відсутність хардкоду.
                        </p>
                      </div>

                      {antiCheatResult && (
                        <div
                          className={`text-xs px-3 py-1.5 rounded-lg border font-semibold flex items-center gap-1.5 shrink-0 ${
                            antiCheatResult.passed
                              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                              : 'bg-red-500/15 border-red-500/30 text-red-700 dark:text-red-300'
                          }`}
                        >
                          {antiCheatResult.passed ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Динамічний тест: ОК</span>
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-3.5 h-3.5" />
                              <span>Підозра на хардкод!</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Anti-cheat detail warning if failed */}
                    {antiCheatResult && !antiCheatResult.passed && (
                      <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-xs text-amber-900 dark:text-amber-200">
                        <div className="font-bold flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                          Результат рандомізованої перевірки:
                        </div>
                        <p className="mt-1 text-[11px]">{antiCheatResult.message}</p>
                      </div>
                    )}

                    {/* Rules Checklist */}
                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-foreground px-1">
                        Критерії оцінювання коду (AST & Syntax Rules):
                      </div>

                      {codeAnalysis?.rules.map((rule) => (
                        <div
                          key={rule.id}
                          className={`p-3 rounded-xl border text-xs transition-colors ${
                            rule.passed
                              ? 'bg-card/70 border-border/70 text-card-foreground'
                              : 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/40 text-foreground'
                          }`}
                        >
                          <div className="flex items-start gap-2.5">
                            {rule.passed ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-semibold text-xs">{rule.label}</span>
                                <Badge
                                  variant="outline"
                                  className={`text-[10px] px-1.5 py-0 ${
                                    rule.passed
                                      ? 'border-emerald-500/40 text-emerald-700 dark:text-emerald-300 bg-emerald-500/10'
                                      : 'border-amber-500/40 text-amber-700 dark:text-amber-300 bg-amber-500/10'
                                  }`}
                                >
                                  {rule.passed ? 'Виконано' : 'Увага'}
                                </Badge>
                              </div>

                              <p className="text-[11px] text-muted-foreground mt-1">
                                {rule.message}
                              </p>

                              {!rule.passed && rule.recommendation && (
                                <div className="mt-2 p-2 rounded-lg bg-amber-100/60 dark:bg-black/40 border border-amber-300/50 dark:border-amber-800/40 text-[11px] text-amber-900 dark:text-amber-200">
                                  💡 <strong>Підказка:</strong> {rule.recommendation}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Victory Celebration Modal */}
      {showVictoryModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="max-w-lg w-full bg-card border-emerald-500/50 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-200" />
            <CardHeader className="text-center pb-2 pt-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3 text-3xl shadow-lg shadow-emerald-500/10">
                🎉
              </div>
              <CardTitle className="text-2xl font-extrabold text-foreground">
                Квест успішно виконано!
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Всі {totalTests} автотестів пройшли на 100%, перевірку на хардкод пройдено!
              </p>
            </CardHeader>

            <CardContent className="space-y-4 pt-2">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                <span className="font-semibold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  Винагорода за квест
                </span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                  +{currentQuest.crystalsReward} Кристалів
                </span>
              </div>

              <div className="text-xs text-muted-foreground space-y-2">
                <p className="font-semibold text-foreground">Як здати роботу вчителю:</p>
                <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed">
                  <li>Ваш результат і код уже автоматично збережено та передано в панель викладача!</li>
                  <li>Якщо ви працюєте через GitHub Classroom, збережіть код у файл <code>src/quest.js</code>.</li>
                  <li>Запушіть зміни на GitHub, щоб отримати зелену галочку в репозиторії:</li>
                </ol>
                <div className="p-2.5 rounded bg-muted dark:bg-black/60 border border-border/60 font-mono text-[11px] text-amber-600 dark:text-amber-300 select-all">
                  git add . && git commit -m "feat: complete quest" && git push origin main
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                  onClick={() => setShowVictoryModal(false)}
                >
                  Чудово, продовжити!
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </HubLayout>
  );
}
