'use client';

import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

export interface WorkflowNode {
  id: string;
  label: string;
  sublabel?: string;
  badge?: string;
  color?: 'sky' | 'violet' | 'emerald' | 'amber' | 'rose' | 'slate';
}

export interface WorkflowDiagramProps {
  title?: string;
  description?: string;
  nodes: WorkflowNode[];
  direction?: 'horizontal' | 'vertical';
}

const colorMap: Record<string, { bg: string; border: string; badge: string; text: string; number: string }> = {
  sky:     { bg: 'bg-sky-50 dark:bg-sky-950/40',     border: 'border-sky-300 dark:border-sky-700',     badge: 'bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-cyan-300',     text: 'text-sky-900 dark:text-sky-100',     number: 'bg-sky-600 text-white' },
  violet:  { bg: 'bg-violet-50 dark:bg-violet-950/40', border: 'border-violet-300 dark:border-violet-700', badge: 'bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300', text: 'text-violet-900 dark:text-violet-100', number: 'bg-violet-600 text-white' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950/40', border: 'border-emerald-300 dark:border-emerald-700', badge: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300', text: 'text-emerald-900 dark:text-emerald-100', number: 'bg-emerald-600 text-white' },
  amber:   { bg: 'bg-amber-50 dark:bg-amber-950/40',   border: 'border-amber-300 dark:border-amber-700',   badge: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300',   text: 'text-amber-900 dark:text-amber-100',   number: 'bg-amber-600 text-white' },
  rose:    { bg: 'bg-rose-50 dark:bg-rose-950/40',     border: 'border-rose-300 dark:border-rose-700',     badge: 'bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300',     text: 'text-rose-900 dark:text-rose-100',     number: 'bg-rose-600 text-white' },
  slate:   { bg: 'bg-slate-50 dark:bg-slate-900/60',   border: 'border-slate-300 dark:border-slate-700',   badge: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300',   text: 'text-slate-900 dark:text-slate-100',   number: 'bg-slate-600 text-white' },
};

export default function WorkflowDiagram({ title, description, nodes, direction = 'horizontal' }: WorkflowDiagramProps) {
  const isHorizontal = direction === 'horizontal';

  return (
    <div className="my-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-5 space-y-4">
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <div className="flex items-center gap-2">
              <span className="h-1 w-5 rounded-full bg-sky-500" />
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">{title}</h4>
            </div>
          )}
          {description && <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>}
        </div>
      )}

      {/* Horizontal layout */}
      {isHorizontal ? (
        <div className="flex flex-wrap items-start gap-2">
          {nodes.map((node, idx) => {
            const c = colorMap[node.color ?? 'sky'];
            const isLast = idx === nodes.length - 1;
            return (
              <React.Fragment key={node.id}>
                {/* Node card */}
                <div className={`flex-1 min-w-[120px] rounded-xl border p-3 space-y-1.5 ${c.bg} ${c.border}`}>
                  <div className="flex items-center gap-2">
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-black font-mono ${c.number}`}>
                      {idx + 1}
                    </span>
                    {node.badge && (
                      <span className={`rounded text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 ${c.badge}`}>
                        {node.badge}
                      </span>
                    )}
                  </div>
                  <p className={`text-xs font-bold leading-tight ${c.text}`}>{node.label}</p>
                  {node.sublabel && <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">{node.sublabel}</p>}
                </div>

                {/* Arrow connector */}
                {!isLast && (
                  <div className="flex items-center justify-center self-center shrink-0">
                    <ArrowRight className="h-4 w-4 text-slate-400 dark:text-slate-600" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        /* Vertical layout */
        <div className="space-y-2">
          {nodes.map((node, idx) => {
            const c = colorMap[node.color ?? 'sky'];
            const isLast = idx === nodes.length - 1;
            return (
              <div key={node.id} className="relative">
                {/* Vertical connector */}
                {!isLast && (
                  <div className="absolute left-4 top-full h-2 flex justify-center w-8 z-10">
                    <div className="w-0.5 h-full bg-slate-300 dark:bg-slate-700" />
                  </div>
                )}
                <div className={`flex items-start gap-3 rounded-xl border p-3.5 ${c.bg} ${c.border}`}>
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-black font-mono mt-0.5 ${c.number}`}>
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className={`text-sm font-bold leading-tight ${c.text}`}>{node.label}</p>
                      {node.badge && (
                        <span className={`rounded text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 ${c.badge}`}>
                          {node.badge}
                        </span>
                      )}
                    </div>
                    {node.sublabel && <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">{node.sublabel}</p>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
