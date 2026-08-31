'use client';

import React from 'react';
import { CalloutBlock } from '@/types';
import { Lightbulb, AlertTriangle, Info, BookMarked, GraduationCap } from 'lucide-react';

interface CalloutCardProps {
  callout: CalloutBlock;
}

const calloutConfig = {
  tip: {
    icon: <Lightbulb className="h-4 w-4" />,
    label: '💡 Pro Tip',
    containerClass: 'border-amber-200 dark:border-amber-800/60 bg-amber-50/60 dark:bg-amber-950/20',
    labelClass: 'text-amber-800 dark:text-amber-300',
    titleClass: 'text-amber-900 dark:text-amber-200',
    bodyClass: 'text-amber-900 dark:text-amber-100',
  },
  warning: {
    icon: <AlertTriangle className="h-4 w-4" />,
    label: '⚠️ Common Mistake',
    containerClass: 'border-rose-200 dark:border-rose-800/60 bg-rose-50/60 dark:bg-rose-950/20',
    labelClass: 'text-rose-700 dark:text-rose-400',
    titleClass: 'text-rose-900 dark:text-rose-200',
    bodyClass: 'text-rose-900 dark:text-rose-100',
  },
  important: {
    icon: <Info className="h-4 w-4" />,
    label: '📌 Important',
    containerClass: 'border-sky-200 dark:border-sky-800/60 bg-sky-50/60 dark:bg-sky-950/20',
    labelClass: 'text-sky-700 dark:text-cyan-400',
    titleClass: 'text-sky-900 dark:text-cyan-100',
    bodyClass: 'text-sky-900 dark:text-sky-100',
  },
  example: {
    icon: <BookMarked className="h-4 w-4" />,
    label: '🌍 Real World Example',
    containerClass: 'border-violet-200 dark:border-violet-800/60 bg-violet-50/60 dark:bg-violet-950/20',
    labelClass: 'text-violet-700 dark:text-violet-400',
    titleClass: 'text-violet-900 dark:text-violet-200',
    bodyClass: 'text-violet-900 dark:text-violet-100',
  },
  definition: {
    icon: <GraduationCap className="h-4 w-4" />,
    label: '📖 Definition',
    containerClass: 'border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/60 dark:bg-emerald-950/20',
    labelClass: 'text-emerald-700 dark:text-emerald-400',
    titleClass: 'text-emerald-900 dark:text-emerald-200',
    bodyClass: 'text-emerald-900 dark:text-emerald-100',
  },
};

export default function CalloutCard({ callout }: CalloutCardProps) {
  const config = calloutConfig[callout.type];

  return (
    <div className={`rounded-xl border p-4 space-y-2 ${config.containerClass}`}>
      <div className="flex items-center gap-2">
        <span className={config.labelClass}>{config.icon}</span>
        <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${config.labelClass}`}>
          {config.label}
        </span>
      </div>
      {callout.title && (
        <h4 className={`text-sm font-bold ${config.titleClass}`}>
          {callout.title}
        </h4>
      )}
      <p className={`text-xs sm:text-sm leading-relaxed ${config.bodyClass}`}>
        {callout.body}
      </p>
    </div>
  );
}
