'use client';

import React from 'react';
import { TradeoffComparison } from '@/types';
import { CheckCircle2, XCircle, ArrowRightLeft, HelpCircle } from 'lucide-react';

interface TradeoffMatrixProps {
  tradeoffs: TradeoffComparison[];
  title?: string;
}

export default function TradeoffMatrix({ tradeoffs, title = 'Architectural Trade-offs ("Why This vs. Why Not Other")' }: TradeoffMatrixProps) {
  if (!tradeoffs || tradeoffs.length === 0) return null;

  return (
    <div className="my-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-cyan-400 border border-sky-200 dark:border-sky-800/60">
          <ArrowRightLeft className="h-3.5 w-3.5" />
        </span>
        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h4>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tradeoffs.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 sm:p-5 shadow-xs transition-colors"
          >
            {/* Header Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2.5 mb-3">
              <span className="text-xs font-bold text-sky-700 dark:text-cyan-400 uppercase tracking-wider">
                {item.feature}
              </span>
              <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:text-slate-400">
                Decision Context
              </span>
            </div>

            {/* Comparison Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Current Approach (Why This) */}
              <div className="rounded-lg border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/70 dark:bg-emerald-950/20 p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Recommended Approach
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-zinc-100 font-mono">
                  {item.currentApproach}
                </p>
                <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed">
                  <strong className="text-emerald-800 dark:text-emerald-300 font-semibold">Why this:</strong> {item.whyThis}
                </p>
              </div>

              {/* Alternative Approach (Why Not Other) */}
              <div className="rounded-lg border border-rose-200 dark:border-rose-900/60 bg-rose-50/70 dark:bg-rose-950/20 p-3.5 space-y-2">
                <div className="flex items-center gap-1.5 text-rose-800 dark:text-rose-400">
                  <XCircle className="h-4 w-4 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Alternative / Legacy
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-800 dark:text-zinc-300 font-mono">
                  {item.alternativeApproach}
                </p>
                <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed">
                  <strong className="text-rose-800 dark:text-rose-300 font-semibold">Why not other:</strong> {item.whyNotOther}
                </p>
              </div>
            </div>

            {/* When to use footer */}
            <div className="mt-3 flex items-start gap-1.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 px-3 py-2 text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800/60">
              <HelpCircle className="h-3.5 w-3.5 text-sky-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-800 dark:text-slate-200">When to use:</strong> {item.whenToUse}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
