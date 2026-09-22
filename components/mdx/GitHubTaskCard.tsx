'use client';

import React, { useState } from 'react';
import { 
  GitBranch, 
  GitPullRequest, 
  CheckCircle2, 
  Terminal, 
  FileCode2, 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  HelpCircle, 
  ShieldCheck, 
  Play,
  ListTodo
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TaskFile {
  name: string;
  description: string;
  starterCode?: string;
}

interface GitHubTaskCardProps {
  title: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  testRunner?: string;
  repoTemplate?: string;
  description: string;
  criteria?: string | string[];
  files?: TaskFile[] | string;
  testFileCode?: string;
  testFileName?: string;
  workflowYaml?: string;
  tips?: string | string[];
}

export function GitHubTaskCard({
  title,
  difficulty = 'easy',
  testRunner = 'Vitest & GitHub Actions',
  repoTemplate = 'https://github.com/frontend-camp/starter-template',
  description,
  criteria,
  files,
  testFileCode,
  testFileName = 'task.test.js',
  workflowYaml,
  tips,
}: GitHubTaskCardProps) {
  // Parse criteria list
  let parsedCriteria: string[] = [];
  if (Array.isArray(criteria)) {
    parsedCriteria = criteria;
  } else if (typeof criteria === 'string') {
    parsedCriteria = criteria
      .split('\n')
      .map((c) => c.replace(/^[-*•\d.]+\s*/, '').trim())
      .filter(Boolean);
  }

  // Parse files
  let parsedFiles: TaskFile[] = [];
  if (Array.isArray(files)) {
    parsedFiles = files;
  } else if (typeof files === 'string') {
    parsedFiles = files
      .split('\n')
      .filter(Boolean)
      .map((line) => {
        const [name, ...rest] = line.split(':');
        return {
          name: name.trim(),
          description: rest.join(':').trim() || 'Файл розвʼязку завдання',
        };
      });
  }

  // Parse tips
  let parsedTips: string[] = [];
  if (Array.isArray(tips)) {
    parsedTips = tips;
  } else if (typeof tips === 'string') {
    parsedTips = tips.split('\n').filter(Boolean);
  }

  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const totalCriteria = parsedCriteria.length;
  const completedCriteria = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = totalCriteria > 0 ? Math.round((completedCriteria / totalCriteria) * 100) : 0;

  const difficultyColors = {
    easy: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    hard: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
  };

  return (
    <div className="my-10 rounded-2xl border border-border/80 bg-gradient-to-b from-card to-card/60 backdrop-blur-md shadow-lg overflow-hidden not-prose">
      {/* Header Banner */}
      <div className="border-b border-border/70 p-5 sm:p-6 bg-muted/30">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 flex items-center justify-center font-bold shadow-sm">
              <GitPullRequest className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Практичне завдання на GitHub
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="outline" className={`text-xs uppercase font-mono px-2.5 py-0.5 ${difficultyColors[difficulty]}`}>
              {difficulty}
            </Badge>
            <Badge variant="secondary" className="text-xs font-mono flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" /> {testRunner}
            </Badge>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight mb-2">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {/* Main Content Area with Tabs */}
      <div className="p-5 sm:p-6">
        <Tabs defaultValue="workflow" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6 bg-muted/60 p-1 rounded-xl">
            <TabsTrigger value="workflow" className="rounded-lg text-xs sm:text-sm font-semibold gap-1.5">
              <Terminal className="w-4 h-4" /> Воркфлоу здачі
            </TabsTrigger>
            <TabsTrigger value="checklist" className="rounded-lg text-xs sm:text-sm font-semibold gap-1.5">
              <ListTodo className="w-4 h-4" /> Критерії ({completedCriteria}/{totalCriteria})
            </TabsTrigger>
            <TabsTrigger value="tests" className="rounded-lg text-xs sm:text-sm font-semibold gap-1.5">
              <FileCode2 className="w-4 h-4" /> Автотести (CI)
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: Step-by-Step GitHub Workflow */}
          <TabsContent value="workflow" className="space-y-4 focus-visible:outline-none">
            <div className="space-y-4 text-sm">
              {/* Step 1 */}
              <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-mono">1</span>
                    Створіть репозиторій або форкніть шаблон
                  </div>
                  {repoTemplate && (
                    <a
                      href={repoTemplate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline inline-flex items-center gap-1 font-medium"
                    >
                      Відкрити шаблон на GitHub <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <div className="relative group bg-zinc-950 dark:bg-black/90 p-3 rounded-lg font-mono text-xs text-zinc-200 border border-zinc-800">
                  <code>git clone {repoTemplate || 'https://github.com/your-username/my-task.git'}<br/>cd my-task<br/>npm install</code>
                  <button
                    onClick={() => copyToClipboard(`git clone ${repoTemplate}\ncd my-task\nnpm install`, 'step1')}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-all opacity-0 group-hover:opacity-100"
                    title="Скопіювати команду"
                  >
                    {copiedKey === 'step1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-2.5">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-mono">2</span>
                  Реалізуйте необхідні файли у проекті
                </div>
                {parsedFiles.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {parsedFiles.map((file, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-muted/40 border border-border/60 text-xs">
                        <div className="font-mono font-semibold text-primary mb-0.5">📄 {file.name}</div>
                        <div className="text-muted-foreground">{file.description}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-2.5">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-mono">3</span>
                  Запустіть локальну перевірку автотестів
                </div>
                <p className="text-xs text-muted-foreground">
                  Перед відправкою на GitHub запустіть локальні тести, щоб переконатися, що всі тест-кейси успішно проходять:
                </p>
                <div className="relative group bg-zinc-950 dark:bg-black/90 p-3 rounded-lg font-mono text-xs text-zinc-200 border border-zinc-800">
                  <code>npm test</code>
                  <button
                    onClick={() => copyToClipboard('npm test', 'step3')}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-all opacity-0 group-hover:opacity-100"
                    title="Скопіювати команду"
                  >
                    {copiedKey === 'step3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-2.5">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-mono">4</span>
                  Зробіть комміт та відправте код на GitHub
                </div>
                <div className="relative group bg-zinc-950 dark:bg-black/90 p-3 rounded-lg font-mono text-xs text-zinc-200 border border-zinc-800">
                  <code>git add .<br/>git commit -m "feat: complete solution according to requirements"<br/>git push origin main</code>
                  <button
                    onClick={() => copyToClipboard('git add .\ngit commit -m "feat: complete solution according to requirements"\ngit push origin main', 'step4')}
                    className="absolute top-2 right-2 p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-all opacity-0 group-hover:opacity-100"
                    title="Скопіювати команду"
                  >
                    {copiedKey === 'step4' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  У вкладці <strong>Actions</strong> вашого GitHub-репозиторію автоматично запуститься CI пайплайн. Зелена галочка ✅ підтверджує успішне виконання завдання!
                </p>
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: Interactive Criteria Checklist */}
          <TabsContent value="checklist" className="space-y-4 focus-visible:outline-none">
            {/* Progress Bar */}
            <div className="p-4 rounded-xl border border-border/60 bg-muted/30">
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span>Прогрес виконання завдання</span>
                <span className="text-primary font-mono">{completedCriteria} з {totalCriteria} ({progressPercent}%)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-emerald-500 transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-2">
              {parsedCriteria.map((item, idx) => {
                const isDone = Boolean(checkedItems[idx]);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleCheck(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                      isDone
                        ? 'border-emerald-500/40 bg-emerald-500/10 text-foreground shadow-sm'
                        : 'border-border/70 hover:border-primary/50 bg-card/40 text-foreground'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                        isDone ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-muted-foreground/40'
                      }`}>
                        {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                    <span className={`text-xs sm:text-sm leading-relaxed ${isDone ? 'line-through text-muted-foreground' : ''}`}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>

            {parsedTips.length > 0 && (
              <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 space-y-1.5">
                <div className="font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Корисні поради розробнику:
                </div>
                <ul className="space-y-1 list-disc list-inside">
                  {parsedTips.map((tip, idx) => (
                    <li key={idx} className="leading-relaxed">{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>

          {/* TAB 3: Test Code & CI Workflow */}
          <TabsContent value="tests" className="space-y-4 focus-visible:outline-none">
            <div className="text-xs text-muted-foreground">
              Цей автотест перевірятиме ваш розвʼязок автоматично при кожному `git push` на GitHub:
            </div>

            {testFileCode && (
              <div className="relative group bg-zinc-950 dark:bg-black/95 p-4 rounded-xl font-mono text-xs text-zinc-200 border border-zinc-800 overflow-x-auto">
                <div className="text-[11px] text-zinc-400 font-semibold mb-2 pb-2 border-b border-zinc-800 flex items-center justify-between">
                  <span>🧪 {testFileName}</span>
                  <button
                    onClick={() => copyToClipboard(testFileCode, 'testCode')}
                    className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-all flex items-center gap-1 text-[10px]"
                  >
                    {copiedKey === 'testCode' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    Скопіювати тест
                  </button>
                </div>
                <pre className="text-zinc-200 leading-relaxed font-mono whitespace-pre">{testFileCode}</pre>
              </div>
            )}

            {workflowYaml ? (
              <div className="relative group bg-zinc-950 dark:bg-black/95 p-4 rounded-xl font-mono text-xs text-zinc-200 border border-zinc-800 overflow-x-auto">
                <div className="text-[11px] text-zinc-400 font-semibold mb-2 pb-2 border-b border-zinc-800 flex items-center justify-between">
                  <span>⚙️ .github/workflows/autotests.yml</span>
                  <button
                    onClick={() => copyToClipboard(workflowYaml, 'workflowYaml')}
                    className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-all flex items-center gap-1 text-[10px]"
                  >
                    {copiedKey === 'workflowYaml' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    Скопіювати workflow
                  </button>
                </div>
                <pre className="text-zinc-200 leading-relaxed font-mono whitespace-pre">{workflowYaml}</pre>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60 text-xs text-muted-foreground flex items-center justify-between">
                <span>Пайплайн GitHub Actions уже налаштований у шаблоні репозиторію.</span>
                <Badge variant="outline" className="font-mono text-[10px]">CI: Passing ✅</Badge>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
