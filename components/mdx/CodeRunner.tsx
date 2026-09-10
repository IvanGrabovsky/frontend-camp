'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Terminal, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeRunnerProps {
  initialCode?: string;
  title?: string;
  description?: string;
  autoRun?: boolean;
}

export function CodeRunner({
  initialCode = '// Напишіть ваш JavaScript код тут\nconsole.log("Привіт, Frontend Camp!");',
  title = 'Інтерактивна пісочниця',
  description,
  autoRun = false,
}: CodeRunnerProps) {
  const [code, setCode] = useState(initialCode.trim());
  const [logs, setLogs] = useState<{ type: 'log' | 'error' | 'warn' | 'info'; text: string }[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const runCode = () => {
    setIsRunning(true);
    setHasRun(true);
    const capturedLogs: { type: 'log' | 'error' | 'warn' | 'info'; text: string }[] = [];

    const customConsole = {
      log: (...args: unknown[]) => {
        capturedLogs.push({
          type: 'log',
          text: args.map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' '),
        });
      },
      error: (...args: unknown[]) => {
        capturedLogs.push({
          type: 'error',
          text: args.map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' '),
        });
      },
      warn: (...args: unknown[]) => {
        capturedLogs.push({
          type: 'warn',
          text: args.map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' '),
        });
      },
      info: (...args: unknown[]) => {
        capturedLogs.push({
          type: 'info',
          text: args.map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a))).join(' '),
        });
      },
    };

    try {
      // Execute in isolated function context with intercepted console
      const runFn = new Function('console', code);
      runFn(customConsole);
      if (capturedLogs.length === 0) {
        capturedLogs.push({
          type: 'info',
          text: '(Код виконався успішно без виводу в консоль)',
        });
      }
    } catch (err: unknown) {
      capturedLogs.push({
        type: 'error',
        text: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
      });
    }

    setLogs(capturedLogs);
    setIsRunning(false);
  };

  const handleReset = () => {
    setCode(initialCode.trim());
    setLogs([]);
    setHasRun(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (autoRun) {
      runCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="my-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md shadow-lg overflow-hidden transition-all hover:shadow-xl not-prose">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-muted/50 border-b border-border/60">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-primary" /> {title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Скопіювати код"
            className="p-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors flex items-center gap-1 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Скопійовано' : 'Копіювати'}</span>
          </button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleReset}
            className="h-7 text-xs gap-1 text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Скинути</span>
          </Button>
          <Button
            size="sm"
            onClick={runCode}
            disabled={isRunning}
            className="h-7 text-xs gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm transition-transform active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Запустити
          </Button>
        </div>
      </div>

      {description && (
        <div className="px-4 py-2 text-xs sm:text-sm text-muted-foreground bg-muted/20 border-b border-border/40">
          {description}
        </div>
      )}

      {/* Editor area */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          rows={Math.min(Math.max(code.split('\n').length + 1, 4), 16)}
          spellCheck={false}
          className="w-full font-mono text-xs sm:text-sm p-4 bg-background/80 text-foreground border-0 focus:outline-none focus:ring-1 focus:ring-primary/40 resize-y leading-relaxed"
          placeholder="Введіть код..."
        />
      </div>

      {/* Console Output Area */}
      {hasRun && (
        <div className="border-t border-border/60 bg-zinc-950 text-zinc-100 p-4 font-mono text-xs sm:text-sm">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-2 border-b border-zinc-800 pb-1.5">
            <span className="flex items-center gap-1.5 font-sans font-semibold">
              <Terminal className="w-3.5 h-3.5 text-primary" /> Результат виконання (Console):
            </span>
            <span className="text-[10px] text-zinc-500">{logs.length} повідомлень</span>
          </div>

          <div className="space-y-1.5 max-h-60 overflow-y-auto">
            {logs.map((log, index) => (
              <div
                key={index}
                className={`flex items-start gap-2 rounded px-2 py-1.5 whitespace-pre-wrap ${
                  log.type === 'error'
                    ? 'bg-red-950/50 text-red-300 border border-red-900/50'
                    : log.type === 'warn'
                    ? 'bg-amber-950/50 text-amber-300 border border-amber-900/50'
                    : log.type === 'info'
                    ? 'text-zinc-400 italic'
                    : 'text-emerald-300'
                }`}
              >
                {log.type === 'error' ? (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                ) : log.type === 'warn' ? (
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                ) : log.type === 'info' ? (
                  <span className="text-zinc-500 select-none">ℹ</span>
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                )}
                <span className="flex-1 font-mono">{log.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
