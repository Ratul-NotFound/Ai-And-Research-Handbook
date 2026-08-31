'use client';

import React from 'react';

export interface ComparisonItem {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface ComparisonColumn {
  title: string;
  subtitle?: string;
  badge?: string;
  color?: 'sky' | 'violet' | 'emerald' | 'amber' | 'rose' | 'slate';
  items: ComparisonItem[];
  verdict?: string;   // e.g. "✓ Best for most cases"
}

interface ComparisonGridProps {
  title?: string;
  columns: ComparisonColumn[];
}

const colorMap = {
  sky:     { header: 'bg-sky-50 dark:bg-sky-950/60 border-sky-200 dark:border-sky-800',     title: 'text-sky-800 dark:text-cyan-300',     badge: 'bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-cyan-400',     verdict: 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-cyan-300 border-sky-200 dark:border-sky-800' },
  violet:  { header: 'bg-violet-50 dark:bg-violet-950/60 border-violet-200 dark:border-violet-800', title: 'text-violet-800 dark:text-violet-300', badge: 'bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-400', verdict: 'bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800' },
  emerald: { header: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800', title: 'text-emerald-800 dark:text-emerald-300', badge: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-400', verdict: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' },
  amber:   { header: 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800',   title: 'text-amber-800 dark:text-amber-300',   badge: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-400',   verdict: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' },
  rose:    { header: 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800',     title: 'text-rose-800 dark:text-rose-300',     badge: 'bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-400',     verdict: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800' },
  slate:   { header: 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700',   title: 'text-slate-800 dark:text-slate-200',   badge: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300',   verdict: 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700' },
};

export default function ComparisonGrid({ title, columns }: ComparisonGridProps) {
  return (
    <div className="my-6 space-y-3">
      {title && (
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-2">
          <span className="text-base">⚖️</span>
          {title}
        </h4>
      )}
      <div className={`grid gap-3 ${columns.length === 2 ? 'sm:grid-cols-2' : columns.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-4'}`}>
        {columns.map((col, idx) => {
          const c = colorMap[col.color ?? 'slate'];
          return (
            <div key={idx} className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900/50">
              {/* Column Header */}
              <div className={`px-4 py-3 border-b ${c.header}`}>
                {col.badge && (
                  <span className={`inline-block mb-1 rounded text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 ${c.badge}`}>
                    {col.badge}
                  </span>
                )}
                <h5 className={`text-sm font-black leading-tight ${c.title}`}>{col.title}</h5>
                {col.subtitle && <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{col.subtitle}</p>}
              </div>

              {/* Items */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {col.items.map((item, iIdx) => (
                  <div key={iIdx} className={`px-4 py-2.5 ${item.highlight ? 'bg-sky-50/50 dark:bg-sky-950/20' : ''}`}>
                    <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{item.label}</p>
                    <p className={`text-xs mt-0.5 leading-snug ${item.highlight ? 'font-semibold text-sky-700 dark:text-cyan-300' : 'text-slate-700 dark:text-slate-300'}`}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Verdict */}
              {col.verdict && (
                <div className={`px-4 py-2.5 border-t text-xs font-semibold ${c.verdict}`}>
                  {col.verdict}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
