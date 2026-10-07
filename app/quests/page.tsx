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
} from 'lucide-react';

interface TestResult {
  id: string;
  title: string;
  passed: boolean;
  actual: any;
  expected: any;
  error?: string;
}

export default function QuestsPage() {
  const { user, addCrystals, openAuthModal } = useAuth();
  const [selectedQuestSlug, setSelectedQuestSlug] = useState<string>(QUESTS[0].slug);
  const currentQuest = QUESTS.find((q) => q.slug === selectedQuestSlug) || QUESTS[0];

  const [code, setCode] = useState<string>(currentQuest.starterCode);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [hasRun, setHasRun] = useState(false);
  const [copied, setCopied] = useState(false);
  const [executionError, setExecutionError] = useState<string | null>(null);
  const [activeLeftTab, setActiveLeftTab] = useState<'tasks' | 'simulator'>('tasks');
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
    setExecutionError(null);
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
      setExecutionError(null);
    }
  };

  // Run tests inside browser
  const runTests = async () => {
    setExecutionError(null);
    setHasRun(true);

    try {
      const cleaned = code
        .replace(/export\s+default\s+/g, '')
        .replace(/export\s+function\s+/g, 'function ')
        .replace(/export\s+const\s+/g, 'const ')
        .replace(/export\s+let\s+/g, 'let ')
        .replace(/export\s+var\s+/g, 'var ');

      const runner = new Function(`
        ${cleaned}
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
      `);

      const fns = runner();

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
          return {
            id: tc.id,
            title: tc.title,
            passed: false,
            actual: 'Error',
            expected: 'Expected output',
            error: err.message,
          };
        }
      });

      setTestResults(results);

      const passedCount = results.filter((r) => r.passed).length;
      const isCompleted = passedCount === currentQuest.testCases.length;

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
          isCompleted
        );
      }
    } catch (err: any) {
      setExecutionError(`Помилка синтаксису у коді: ${err.message}`);
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
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
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
                  <Badge variant="outline" className="text-[11px] font-semibold border-amber-500/30 text-amber-400">
                    {q.badge}
                  </Badge>
                  <span className="text-xs font-medium text-amber-300/80 flex items-center gap-1">
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
        <Card className="bg-card/50 border-border/70 backdrop-blur">
          <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0 font-bold">
                {hasRun ? (passedTests === totalTests ? '🎉' : '🧪') : '⚡'}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold flex items-center gap-2">
                  <span>Прогрес виконання:</span>
                  <span className="text-amber-400 font-bold">
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
            <Card className="bg-card/50 border-border/70">
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
                      {currentQuest.tasks.map((task, idx) => (
                        <div
                          key={task.id}
                          className="p-3 rounded-lg border border-border/60 bg-background/50 hover:border-border transition-colors"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-xs text-foreground">
                              {task.name}
                            </span>
                          </div>
                          <code className="text-[11px] text-amber-400 font-mono block mb-1.5 bg-muted/30 px-2 py-0.5 rounded">
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

                          <div className="p-2 rounded bg-black/30 border border-border/40 font-mono text-[10px] text-emerald-400 whitespace-pre">
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
                    <div className="p-3 rounded-lg border border-border/60 bg-background/40 space-y-2">
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
                        <div className="p-1.5 rounded bg-black/40 font-mono text-[11px] text-center border border-border/50">
                          {simChestResult}
                        </div>
                      )}
                    </div>

                    {/* Damage Sim */}
                    <div className="p-3 rounded-lg border border-border/60 bg-background/40 space-y-2">
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
                                ? 'bg-amber-500/20 border-amber-500 text-amber-300'
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
                        <div className="p-1.5 rounded bg-black/40 font-mono text-[11px] text-center border border-border/50 text-amber-400">
                          {simDmgResult}
                        </div>
                      )}
                    </div>

                    {/* HP Sim */}
                    <div className="p-3 rounded-lg border border-border/60 bg-background/40 space-y-2">
                      <div className="font-semibold text-foreground flex justify-between">
                        <span>❤️ Здоров'я (getHeroStatus)</span>
                        <span className="font-mono text-amber-400">{simHp} HP</span>
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
                        <div className="p-1.5 rounded bg-black/40 font-mono text-[11px] text-center border border-border/50 text-emerald-400">
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
            <Card className="bg-card/50 border-border/70 overflow-hidden">
              {/* Editor Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-muted/40 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono font-medium text-foreground">
                    src/quest.js
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
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
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

              {/* Code Textarea */}
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  rows={16}
                  className="w-full bg-[#0b0f19] text-[#e2e8f0] font-mono text-xs sm:text-sm p-4 outline-none resize-y border-none leading-relaxed selection:bg-amber-500/30"
                  style={{ tabSize: 2 }}
                />
              </div>
            </Card>

            {/* Syntax Error Alert */}
            {executionError && (
              <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="font-mono">{executionError}</div>
              </div>
            )}

            {/* Auto-test results */}
            <Card className="bg-card/50 border-border/70">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-muted-foreground" />
                    Результати автотестів Vitest
                  </CardTitle>
                  {hasRun && (
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        passedTests === totalTests
                          ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10'
                          : 'border-amber-500/40 text-amber-400 bg-amber-500/10'
                      }`}
                    >
                      {passedTests} / {totalTests} пройдено
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-4 pt-2">
                {!hasRun ? (
                  <div className="text-center py-8 text-xs text-muted-foreground">
                    Натисніть зелену кнопку <strong>"Запустити перевірку"</strong> вище, щоб прогнати тести.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                    {testResults.map((tr) => (
                      <div
                        key={tr.id}
                        className={`p-2.5 rounded-lg border text-xs transition-colors ${
                          tr.passed
                            ? 'bg-emerald-500/5 border-emerald-500/20'
                            : 'bg-red-500/5 border-red-500/25'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {tr.passed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className={`font-medium ${tr.passed ? 'text-emerald-300' : 'text-red-300'}`}>
                              {tr.title}
                            </div>
                            {!tr.passed && (
                              <div className="mt-1.5 p-2 rounded bg-black/40 font-mono text-[11px] text-muted-foreground space-y-0.5">
                                <div className="text-emerald-400">
                                  Очікувалось: {JSON.stringify(tr.expected)}
                                </div>
                                <div className="text-red-400">
                                  {tr.error ? `Помилка: ${tr.error}` : `Отримано: ${JSON.stringify(tr.actual)}`}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Victory Celebration Modal */}
      {showVictoryModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="max-w-lg w-full bg-[#111726] border-emerald-500/40 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-200" />
            <CardHeader className="text-center pb-2 pt-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 text-3xl shadow-lg shadow-emerald-500/10">
                🎉
              </div>
              <CardTitle className="text-2xl font-extrabold text-foreground">
                Квест успішно виконано!
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                Всі {totalTests} автотестів пройшли на 100%. Ви написали бездоганний код!
              </p>
            </CardHeader>

            <CardContent className="space-y-4 pt-2">
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs">
                <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Винагорода за квест
                </span>
                <span className="font-mono font-bold text-amber-400">
                  +{currentQuest.crystalsReward} Кристалів
                </span>
              </div>

              <div className="text-xs text-muted-foreground space-y-2">
                <p className="font-semibold text-foreground">Як здати роботу вчителю:</p>
                <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed">
                  <li>Ваш результат уже автоматично збережено у вашому профілі!</li>
                  <li>Якщо ви працюєте через GitHub, збережіть код у файл <code>src/quest.js</code>.</li>
                  <li>Запушіть зміни на GitHub, щоб отримати зелену галочку ✅:</li>
                </ol>
                <div className="p-2.5 rounded bg-black/60 border border-border/60 font-mono text-[11px] text-amber-300 select-all">
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
