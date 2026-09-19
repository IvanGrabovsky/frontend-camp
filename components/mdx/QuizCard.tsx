'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, Sparkles, RotateCcw, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuizOption {
  text: string;
  label?: string;
  title?: string;
  value?: string;
  isCorrect?: boolean;
  explanation?: string;
}

interface QuizCardProps {
  question?: string;
  title?: string;
  options?: any;
  answers?: any;
  choices?: any;
  items?: any;
  correctIndex?: number | string;
  correctAnswer?: number | string;
  explanation?: string;
  theoryUrl?: string;
  theoryTitle?: string;
  children?: React.ReactNode;
}

function renderFormattedText(text: string) {
  if (!text) return null;
  const regex = /\[(.*?)\]\((.*?)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const [_, linkText, url] = match;
    parts.push(
      <a
        key={match.index}
        href={url}
        target={url.startsWith('http') ? '_blank' : undefined}
        rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="font-semibold text-primary underline underline-offset-4 hover:opacity-80 transition-opacity"
      >
        {linkText} ↗
      </a>
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export function QuizCard({
  question,
  title,
  options,
  answers,
  choices,
  items,
  correctIndex = 0,
  correctAnswer,
  explanation,
  theoryUrl,
  theoryTitle,
  children,
}: QuizCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const displayQuestion = question || title || 'Запитання для самоперевірки';
  const targetCorrectIndex = Number(correctIndex ?? correctAnswer ?? 0);

  // Parse options from any possible prop format / RSC serialization / children
  const rawInput = options ?? answers ?? choices ?? items;
  let parsedList: any[] = [];

  if (rawInput) {
    if (Array.isArray(rawInput)) {
      parsedList = rawInput;
    } else if (typeof rawInput === 'object' && rawInput !== null) {
      parsedList = Object.values(rawInput);
    } else if (typeof rawInput === 'string') {
      const trimmed = rawInput.trim();
      if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
        try {
          const parsed = JSON.parse(trimmed);
          parsedList = Array.isArray(parsed) ? parsed : Object.values(parsed);
        } catch {
          parsedList = trimmed.split('\n').filter(Boolean);
        }
      } else if (trimmed.includes('|')) {
        parsedList = trimmed.split('|').map((s) => s.trim()).filter(Boolean);
      } else if (trimmed.includes('\n')) {
        parsedList = trimmed.split('\n').map((s) => s.trim()).filter(Boolean);
      } else {
        parsedList = trimmed.split(',').map((s) => s.trim()).filter(Boolean);
      }
    }
  }

  // Fallback: extract options from React children if options prop was not provided
  if (parsedList.length === 0 && children) {
    const extractFromChildren = (node: any) => {
      if (!node) return;
      if (typeof node === 'string' || typeof node === 'number') {
        const str = String(node).trim();
        if (str && str !== '\n') parsedList.push(str);
        return;
      }
      if (Array.isArray(node)) {
        node.forEach(extractFromChildren);
        return;
      }
      if (node.props) {
        if (node.type === 'li') {
          let text = '';
          const getLiText = (c: any) => {
            if (typeof c === 'string' || typeof c === 'number') text += c;
            else if (Array.isArray(c)) c.forEach(getLiText);
            else if (c && c.props && c.props.children) getLiText(c.props.children);
          };
          getLiText(node.props.children);
          if (text.trim()) parsedList.push(text.trim());
        } else if (node.props.children) {
          extractFromChildren(node.props.children);
        }
      }
    };
    extractFromChildren(children);
  }

  // Normalize all option entries
  const normalizedOptions = parsedList.map((opt, idx) => {
    if (typeof opt === 'string' || typeof opt === 'number' || typeof opt === 'boolean') {
      return {
        text: String(opt),
        isCorrect: idx === targetCorrectIndex,
        explanation: idx === targetCorrectIndex ? explanation : undefined,
      };
    }

    if (opt && typeof opt === 'object') {
      const text = opt.text || opt.label || opt.title || opt.value || opt.content || JSON.stringify(opt);
      const isOptionCorrect =
        typeof opt.isCorrect === 'boolean'
          ? opt.isCorrect
          : idx === targetCorrectIndex;

      return {
        text: String(text),
        isCorrect: isOptionCorrect,
        explanation: opt.explanation || (isOptionCorrect ? explanation : undefined),
      };
    }

    return {
      text: String(opt),
      isCorrect: idx === targetCorrectIndex,
      explanation: idx === targetCorrectIndex ? explanation : undefined,
    };
  });

  const handleSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedIndex(index);
    setShowWarning(false);
  };

  const handleCheck = () => {
    if (selectedIndex === null) {
      setShowWarning(true);
      return;
    }
    setIsSubmitted(true);
    setShowWarning(false);
  };

  const handleRetry = () => {
    setSelectedIndex(null);
    setIsSubmitted(false);
    setShowWarning(false);
  };

  const isSelectedCorrect =
    selectedIndex !== null && Boolean(normalizedOptions[selectedIndex]?.isCorrect);

  const activeExplanation =
    (selectedIndex !== null && normalizedOptions[selectedIndex]?.explanation) || explanation;

  return (
    <div className="my-8 rounded-2xl border border-border/80 bg-card/75 backdrop-blur-md p-5 sm:p-6 shadow-md transition-all hover:shadow-lg not-prose">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
          <HelpCircle className="w-3.5 h-3.5" /> Бліц-перевірка знань
        </span>
        {selectedIndex !== null && !isSubmitted && (
          <span className="text-xs font-medium text-muted-foreground animate-fadeIn">
            Обрано варіант {String.fromCharCode(65 + selectedIndex)}
          </span>
        )}
      </div>

      {/* Question */}
      <h3 className="text-base sm:text-lg font-bold text-foreground mb-4 leading-snug">
        {displayQuestion}
      </h3>

      {/* Warning if user clicks Check without selecting */}
      {showWarning && (
        <div className="mb-4 p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs sm:text-sm flex items-center gap-2 animate-bounce-short">
          <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
          <span>Будь ласка, спочатку оберіть один із варіантів відповіді нижче 👇</span>
        </div>
      )}

      {/* Options */}
      <div className="space-y-2.5 mb-5">
        {normalizedOptions.map((opt, idx) => {
          const isChosen = selectedIndex === idx;
          let optStyle =
            'border-border/70 hover:border-primary/50 hover:bg-muted/50 bg-card/50 text-foreground';

          if (isSubmitted) {
            if (opt.isCorrect) {
              optStyle =
                'border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-semibold ring-1 ring-emerald-500/40 shadow-sm';
            } else if (isChosen && !opt.isCorrect) {
              optStyle =
                'border-red-500 bg-red-500/15 text-red-700 dark:text-red-300 font-medium ring-1 ring-red-500/40 shadow-sm';
            } else {
              optStyle = 'border-border/30 opacity-40 bg-transparent text-muted-foreground';
            }
          } else if (isChosen) {
            optStyle =
              'border-primary bg-primary/15 ring-2 ring-primary/40 font-semibold text-foreground shadow-sm';
          } else if (showWarning) {
            optStyle = 'border-amber-500/40 hover:border-amber-500 bg-card/70 text-foreground';
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(idx)}
              disabled={isSubmitted}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 text-sm cursor-pointer ${optStyle}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-mono font-semibold shrink-0 transition-all ${
                    isChosen
                      ? 'border-primary bg-primary text-primary-foreground shadow-sm scale-105'
                      : 'border-border bg-background text-foreground'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-snug break-words">{opt.text}</span>
              </div>

              <div className="shrink-0 flex items-center pl-2">
                {isSubmitted && opt.isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 animate-scaleIn" />
                )}
                {isSubmitted && isChosen && !opt.isCorrect && (
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 animate-scaleIn" />
                )}
                {!isSubmitted && (
                  <span
                    className={`w-4 h-4 rounded-full border transition-all flex items-center justify-center ${
                      isChosen
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground/30'
                    }`}
                  >
                    {isChosen && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        {!isSubmitted ? (
          <Button
            size="sm"
            onClick={handleCheck}
            className={`font-semibold text-xs sm:text-sm px-5 py-2.5 h-auto rounded-xl shadow-md transition-all cursor-pointer ${
              selectedIndex !== null
                ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/25 hover:scale-[1.02]'
                : 'bg-primary/80 hover:bg-primary text-primary-foreground'
            }`}
          >
            Перевірити відповідь
          </Button>
        ) : (
          <div className="w-full flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold">
              {isSelectedCorrect ? (
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Чудово! Правильна відповідь.
                </span>
              ) : (
                <span className="text-red-600 dark:text-red-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> Не зовсім так. Ознайомтеся з поясненням нижче.
                </span>
              )}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleRetry}
              className="text-xs font-semibold flex items-center gap-1.5 rounded-xl cursor-pointer hover:bg-muted/80"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Спробувати знову
            </Button>
          </div>
        )}
      </div>

      {/* Explanation Reveal with Theory Links */}
      {isSubmitted && (activeExplanation || theoryUrl) && (
        <div className="mt-4 p-4 rounded-xl bg-muted/60 border border-border/80 text-xs sm:text-sm text-muted-foreground leading-relaxed animate-fadeIn space-y-2">
          {activeExplanation && (
            <div>
              <strong className="text-foreground block mb-1">💡 Детальне пояснення:</strong>
              <div className="text-foreground/90">{renderFormattedText(activeExplanation)}</div>
            </div>
          )}

          {theoryUrl && (
            <div className="pt-2 border-t border-border/50 flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Не впевнені в темі?</span>
              <a
                href={theoryUrl}
                target={theoryUrl.startsWith('http') ? '_blank' : undefined}
                rel={theoryUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-xs font-semibold text-primary underline underline-offset-4 hover:opacity-80 transition-opacity inline-flex items-center gap-1"
              >
                📖 {theoryTitle || 'Перейти до матеріалів уроку'} →
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

