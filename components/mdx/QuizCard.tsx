'use client';

import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuizOption {
  text: string;
  isCorrect?: boolean;
  explanation?: string;
}

interface QuizCardProps {
  question: string;
  options: (string | QuizOption)[];
  correctIndex?: number;
  explanation?: string;
}

export function QuizCard({
  question,
  options = [],
  correctIndex = 0,
  explanation,
}: QuizCardProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Normalize options
  const normalizedOptions: { text: string; isCorrect: boolean; explanation?: string }[] = (options || []).map(
    (opt, idx) => {
      if (typeof opt === 'string') {
        return {
          text: opt,
          isCorrect: idx === correctIndex,
          explanation: idx === correctIndex ? explanation : undefined,
        };
      }
      return {
        text: opt.text,
        isCorrect: opt.isCorrect ?? (idx === correctIndex),
        explanation: opt.explanation || (idx === correctIndex ? explanation : undefined),
      };
    }
  );

  const handleSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedIndex(index);
  };

  const handleCheck = () => {
    if (selectedIndex === null) return;
    setIsSubmitted(true);
  };

  const handleRetry = () => {
    setSelectedIndex(null);
    setIsSubmitted(false);
  };

  const isCorrect = selectedIndex !== null && normalizedOptions[selectedIndex]?.isCorrect;

  return (
    <div className="my-8 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md p-5 sm:p-6 shadow-md transition-all hover:shadow-lg not-prose">
      <div className="flex items-center gap-2 mb-3">
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
          <HelpCircle className="w-3.5 h-3.5" /> Перевір себе
        </span>
      </div>

      <h3 className="text-base sm:text-lg font-bold text-foreground mb-4 leading-snug">
        {question}
      </h3>

      <div className="space-y-2.5 mb-5">
        {normalizedOptions.map((opt, idx) => {
          const isChosen = selectedIndex === idx;
          let optStyle = 'border-border/70 hover:border-primary/50 hover:bg-muted/40 bg-card/40';

          if (isSubmitted) {
            if (opt.isCorrect) {
              optStyle = 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-medium';
            } else if (isChosen && !opt.isCorrect) {
              optStyle = 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-300';
            } else {
              optStyle = 'border-border/40 opacity-50 bg-transparent';
            }
          } else if (isChosen) {
            optStyle = 'border-primary bg-primary/10 ring-1 ring-primary font-medium text-foreground';
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(idx)}
              disabled={isSubmitted}
              className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 text-sm cursor-pointer ${optStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-xs font-mono font-medium shrink-0 bg-background">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt.text}</span>
              </div>
              {isSubmitted && opt.isCorrect && (
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              )}
              {isSubmitted && isChosen && !opt.isCorrect && (
                <XCircle className="w-4 h-4 text-red-500 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        {!isSubmitted ? (
          <Button
            size="sm"
            onClick={handleCheck}
            disabled={selectedIndex === null}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-xs sm:text-sm px-4 shadow-sm"
          >
            Перевірити відповідь
          </Button>
        ) : (
          <div className="w-full flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
              {isCorrect ? (
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Чудово! Правильна відповідь.
                </span>
              ) : (
                <span className="text-red-600 dark:text-red-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4" /> Не зовсім так. Спробуй ще раз!
                </span>
              )}
            </div>
            <Button size="sm" variant="outline" onClick={handleRetry} className="text-xs">
              Спробувати знову
            </Button>
          </div>
        )}
      </div>

      {isSubmitted && (normalizedOptions[selectedIndex || 0]?.explanation || explanation) && (
        <div className="mt-4 p-3 rounded-xl bg-muted/40 border border-border/60 text-xs text-muted-foreground leading-relaxed">
          <strong className="text-foreground">Пояснення:</strong>{' '}
          {normalizedOptions[selectedIndex || 0]?.explanation || explanation}
        </div>
      )}
    </div>
  );
}
