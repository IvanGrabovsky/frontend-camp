'use client';

import React, { useState, useEffect, useRef } from 'react';
import { HubLayout } from '@/components/HubLayout';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  PLAYGROUND_DEFAULT_CODE,
  PLAYGROUND_SNIPPETS,
  PlaygroundSnippet,
} from '@/data/playground-snippets';
import {
  Play,
  RotateCcw,
  Trash2,
  Copy,
  Check,
  Code2,
  Terminal as TerminalIcon,
  BookOpen,
  Sparkles,
} from 'lucide-react';

interface LogEntry {
  id: string;
  type: 'log' | 'warn' | 'error' | 'info' | 'return';
  content: string;
  timestamp: string;
}

export default function PlaygroundPage() {
  const [code, setCode] = useState(PLAYGROUND_DEFAULT_CODE);
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>('default');
  const [selectedCategory, setSelectedCategory] = useState<string>('Всі');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'console'>('editor');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const categories = ['Всі', 'Масиви', 'Основи JS', 'Обʼєкти', 'Асинхронність'];

  const filteredSnippets =
    selectedCategory === 'Всі'
      ? PLAYGROUND_SNIPPETS
      : PLAYGROUND_SNIPPETS.filter((s) => s.category === selectedCategory);

  // Format any JS value for console display
  const formatValue = (val: unknown): string => {
    if (typeof val === 'string') return val;
    if (val === undefined) return 'undefined';
    if (val === null) return 'null';
    if (typeof val === 'function') return val.toString();
    try {
      return JSON.stringify(
        val,
        (_k, v) => (typeof v === 'function' ? v.toString() : v),
        2
      );
    } catch {
      return String(val);
    }
  };

  const runCode = () => {
    const outputLogs: LogEntry[] = [];
    const now = () =>
      new Date().toLocaleTimeString('uk-UA', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

    const pushLog = (type: LogEntry['type'], args: unknown[]) => {
      const content = args.map((arg) => formatValue(arg)).join(' ');
      outputLogs.push({
        id: Math.random().toString(36).substring(2, 9),
        type,
        content,
        timestamp: now(),
      });
    };

    // Sandbox execution context
    const customConsole = {
      log: (...args: unknown[]) => pushLog('log', args),
      warn: (...args: unknown[]) => pushLog('warn', args),
      error: (...args: unknown[]) => pushLog('error', args),
      info: (...args: unknown[]) => pushLog('info', args),
      table: (...args: unknown[]) => pushLog('log', args),
    };

    try {
      // Safe execution using Function constructor with isolated console
      const runFn = new Function('console', code);
      const result = runFn(customConsole);

      if (result !== undefined) {
        pushLog('return', ['↳ Повернуто:', result]);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        pushLog('error', [`❌ ${err.name}: ${err.message}`]);
      } else {
        pushLog('error', [`❌ Помилка: ${String(err)}`]);
      }
    }

    setLogs(outputLogs);
    setActiveTab('console');
  };

  const handleSelectSnippet = (snippet: PlaygroundSnippet | null) => {
    if (!snippet) {
      setSelectedSnippetId('default');
      setCode(PLAYGROUND_DEFAULT_CODE);
    } else {
      setSelectedSnippetId(snippet.id);
      setCode(snippet.code);
    }
    setLogs([]);
    if (window.innerWidth < 1024) {
      setActiveTab('editor');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+Enter or Cmd+Enter to execute
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
    }

    // Support Tab indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const updated = code.substring(0, start) + '  ' + code.substring(end);
      setCode(updated);

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClearConsole = () => {
    setLogs([]);
  };

  const handleReset = () => {
    const current = PLAYGROUND_SNIPPETS.find((s) => s.id === selectedSnippetId);
    setCode(current ? current.code : PLAYGROUND_DEFAULT_CODE);
    setLogs([]);
  };

  // Run on mount
  useEffect(() => {
    runCode();
  }, []);

  return (
    <HubLayout
      breadcrumb={[
        { label: 'Курс', href: '/' },
        { label: 'JavaScript', href: '/blocks/javascript-basics/' },
        { label: 'Пісочниця' },
      ]}
    >
      {/* Header */}
      <div className="py-6 md:py-10 border-b border-border/60 mb-6 md:mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              🧪
            </div>
            <Badge variant="outline" className="text-xs uppercase tracking-wider font-semibold">
              Vanilla JavaScript
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:inline-block">
            Натисніть <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px]">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-muted border border-border font-mono text-[10px]">Enter</kbd> для запуску
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
          Інтерактивна пісочниця
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
          Експериментуйте з чистим JavaScript просто у браузері. Оберіть готовий приклад або пишіть свій код з миттєвим виводом у консоль.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sidebar Topics */}
        <aside className="lg:col-span-4 space-y-4">
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" /> Приклади коду
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-1.5 pb-2 border-b border-border/50">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? 'default' : 'ghost'}
                    size="sm"
                    className="h-7 text-xs px-2.5 rounded-full"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              {/* Snippet list */}
              <div className="space-y-1.5 max-h-[420px] overflow-y-auto pr-1">
                <button
                  type="button"
                  onClick={() => handleSelectSnippet(null)}
                  className={`w-full text-left p-3 rounded-lg border transition-all text-xs flex flex-col gap-1 ${
                    selectedSnippetId === 'default'
                      ? 'border-primary bg-primary/5 text-foreground font-semibold shadow-sm'
                      : 'border-border/50 bg-card hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-accent" /> Вільний режим
                    </span>
                    <Badge variant="secondary" className="text-[10px] py-0 px-1.5">
                      За замовчуванням
                    </Badge>
                  </div>
                  <span className="text-[11px] text-muted-foreground font-mono">
                    filter · map · reduce
                  </span>
                </button>

                {filteredSnippets.map((snippet) => (
                  <button
                    key={snippet.id}
                    type="button"
                    onClick={() => handleSelectSnippet(snippet)}
                    className={`w-full text-left p-3 rounded-lg border transition-all text-xs flex flex-col gap-1 ${
                      selectedSnippetId === snippet.id
                        ? 'border-primary bg-primary/5 text-foreground font-semibold shadow-sm'
                        : 'border-border/50 bg-card hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-foreground">
                        {snippet.title}
                      </span>
                      <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                        {snippet.category}
                      </Badge>
                    </div>
                    <span className="text-[11px] text-muted-foreground font-mono truncate">
                      {snippet.methods}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Editor and Console */}
        <main className="lg:col-span-8 space-y-4">
          {/* Mobile switcher tabs */}
          <div className="lg:hidden flex items-center justify-between pb-1">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'editor' | 'console')}>
              <TabsList className="grid grid-cols-2 w-48">
                <TabsTrigger value="editor" className="flex items-center gap-1 text-xs">
                  <Code2 className="w-3.5 h-3.5" /> Код
                </TabsTrigger>
                <TabsTrigger value="console" className="flex items-center gap-1 text-xs">
                  <TerminalIcon className="w-3.5 h-3.5" /> Консоль ({logs.length})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Editor Box */}
            <div className={`space-y-2 ${activeTab === 'console' ? 'hidden lg:block' : 'block'}`}>
              <Card className="border-border shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 bg-muted/60 border-b border-border text-xs">
                  <span className="font-mono text-muted-foreground font-medium flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-primary" /> main.js
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopy}
                      className="h-7 text-xs px-2 gap-1 text-muted-foreground hover:text-foreground"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Скопійовано' : 'Копіювати'}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleReset}
                      className="h-7 text-xs px-2 gap-1 text-muted-foreground hover:text-foreground"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Скинути
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={13}
                    spellCheck={false}
                    className="w-full p-4 font-mono text-sm leading-relaxed bg-background text-foreground resize-y outline-none focus:ring-1 focus:ring-primary/50 transition-all scrollbar-thin"
                    placeholder="// Пишіть JavaScript тут..."
                  />
                </div>

                {/* Toolbar */}
                <div className="flex items-center justify-between p-3 bg-muted/30 border-t border-border">
                  <Button
                    onClick={runCode}
                    size="sm"
                    className="gap-1.5 font-semibold px-4 shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Запустити код
                  </Button>
                  <span className="text-[11px] text-muted-foreground font-mono hidden sm:inline">
                    Підтримує ES6+, Async/Await, Web APIs
                  </span>
                </div>
              </Card>
            </div>

            {/* Console Output */}
            <div className={`space-y-2 ${activeTab === 'editor' ? 'hidden lg:block' : 'block'}`}>
              <Card className="border-border shadow-sm overflow-hidden bg-muted/20">
                <div className="flex items-center justify-between px-4 py-2.5 bg-muted/60 border-b border-border text-xs">
                  <span className="font-mono text-muted-foreground font-medium flex items-center gap-2">
                    <TerminalIcon className="w-4 h-4 text-primary" /> Консоль виводу
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearConsole}
                    className="h-7 text-xs px-2 gap-1 text-muted-foreground hover:text-foreground"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Очистити
                  </Button>
                </div>

                <div className="p-4 font-mono text-xs sm:text-sm min-h-[160px] max-h-[360px] overflow-y-auto space-y-2 bg-background">
                  {logs.length === 0 ? (
                    <div className="text-muted-foreground/60 italic py-6 text-center text-xs">
                      Консоль порожня. Натисніть «Запустити код» або Ctrl+Enter.
                    </div>
                  ) : (
                    logs.map((log) => (
                      <div
                        key={log.id}
                        className={`flex items-start gap-2.5 p-2 rounded border leading-relaxed ${
                          log.type === 'error'
                            ? 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'
                            : log.type === 'warn'
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                            : log.type === 'return'
                            ? 'bg-primary/5 border-primary/20 text-primary font-semibold'
                            : 'bg-muted/40 border-border/50 text-foreground'
                        }`}
                      >
                        <span className="text-[10px] text-muted-foreground/60 select-none pt-0.5">
                          {log.timestamp}
                        </span>
                        <pre className="flex-1 whitespace-pre-wrap font-mono text-xs overflow-x-auto">
                          {log.content}
                        </pre>
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </HubLayout>
  );
}
