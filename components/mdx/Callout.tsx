import React from 'react';
import { Info, AlertTriangle, CheckCircle2, Lightbulb, Flame } from 'lucide-react';

interface CalloutProps {
  type?: 'tip' | 'warning' | 'info' | 'success' | 'pro';
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const styles = {
    info: {
      border: 'border-blue-500/40 dark:border-blue-500/30',
      bg: 'bg-blue-500/10 dark:bg-blue-950/30',
      text: 'text-blue-900 dark:text-blue-100',
      titleColor: 'text-blue-700 dark:text-blue-300',
      icon: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
      defaultTitle: 'Зверніть увагу',
    },
    tip: {
      border: 'border-amber-500/40 dark:border-amber-500/30',
      bg: 'bg-amber-500/10 dark:bg-amber-950/30',
      text: 'text-amber-900 dark:text-amber-100',
      titleColor: 'text-amber-700 dark:text-amber-300',
      icon: <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />,
      defaultTitle: 'Порада розробнику',
    },
    warning: {
      border: 'border-rose-500/40 dark:border-rose-500/30',
      bg: 'bg-rose-500/10 dark:bg-rose-950/30',
      text: 'text-rose-900 dark:text-rose-100',
      titleColor: 'text-rose-700 dark:text-rose-300',
      icon: <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />,
      defaultTitle: 'Обережно / Важливо',
    },
    success: {
      border: 'border-emerald-500/40 dark:border-emerald-500/30',
      bg: 'bg-emerald-500/10 dark:bg-emerald-950/30',
      text: 'text-emerald-900 dark:text-emerald-100',
      titleColor: 'text-emerald-700 dark:text-emerald-300',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
      defaultTitle: 'Best Practice',
    },
    pro: {
      border: 'border-purple-500/40 dark:border-purple-500/30',
      bg: 'bg-purple-500/10 dark:bg-purple-950/30',
      text: 'text-purple-900 dark:text-purple-100',
      titleColor: 'text-purple-700 dark:text-purple-300',
      icon: <Flame className="w-5 h-5 text-purple-500 shrink-0" />,
      defaultTitle: 'Senior / Pro Insight',
    },
  }[type];

  return (
    <aside
      className={`my-6 rounded-2xl border p-4 sm:p-5 backdrop-blur-md ${styles.border} ${styles.bg} ${styles.text} not-prose shadow-sm`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{styles.icon}</div>
        <div className="flex-1 space-y-1">
          <div className={`font-semibold text-sm sm:text-base ${styles.titleColor}`}>
            {title || styles.defaultTitle}
          </div>
          <div className="text-xs sm:text-sm leading-relaxed opacity-90">{children}</div>
        </div>
      </div>
    </aside>
  );
}
