'use client';

import React from 'react';
import { RealLifeAnalogy } from '@/types';
import { RenderInlineText } from './MarkdownContent';
import { 
  FileText, 
  Sparkles, 
  Cpu, 
  CheckCircle2, 
  Cog, 
  Layers, 
  Box, 
  Rocket, 
  ArrowRight,
  Database,
  Search,
  Filter
} from 'lucide-react';

interface MentalModelCardProps {
  analogy: RealLifeAnalogy;
}

const getStepIcon = (iconName?: string, index?: number, total?: number) => {
  if (index === (total ? total - 1 : 0)) {
    return <Rocket className="h-5 w-5 text-emerald-500 animate-bounce" />;
  }
  switch (iconName) {
    case 'database': return <Database className="h-5 w-5 text-sky-500" />;
    case 'search': return <Search className="h-5 w-5 text-amber-500" />;
    case 'filter': return <Filter className="h-5 w-5 text-violet-500" />;
    case 'cpu': return <Cpu className="h-5 w-5 text-indigo-500" />;
    case 'cog': return <Cog className="h-5 w-5 text-cyan-500" />;
    case 'layers': return <Layers className="h-5 w-5 text-pink-500" />;
    default: return <Box className="h-5 w-5 text-sky-500" />;
  }
};

export default function MentalModelCard({ analogy }: MentalModelCardProps) {
  if (!analogy) return null;

  return (
    <div className="my-6 rounded-2xl border border-sky-200/80 dark:border-sky-900/60 bg-sky-50/40 dark:bg-sky-950/20 p-5 sm:p-6 shadow-xs transition-colors">
      {/* Header with Emoji */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-base">🛝</span>
        <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-sky-700 dark:text-cyan-400">
          REAL-LIFE ANALOGY: {analogy.title}
        </span>
      </div>

      {/* Analogy Story Text */}
      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <RenderInlineText text={analogy.explanation} />
      </p>

      {/* Horizontal Pipeline Steps */}
      {analogy.steps && analogy.steps.length > 0 && (
        <div className="mt-6 pt-5 border-t border-sky-200/60 dark:border-sky-900/50">
          <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {analogy.steps.map((step, idx) => {
              const isLast = idx === analogy.steps!.length - 1;
              const connector = analogy.connectors?.[idx];

              return (
                <React.Fragment key={idx}>
                  {/* Step Card */}
                  <div
                    className={`flex flex-col items-center justify-between text-center rounded-xl p-3.5 min-w-[130px] flex-1 transition-all ${
                      isLast
                        ? 'border-2 border-emerald-400 dark:border-emerald-500 bg-white dark:bg-slate-900 shadow-sm ring-2 ring-emerald-400/20'
                        : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-2xs'
                    }`}
                  >
                    <div className="mb-2">
                      {getStepIcon(step.iconName, idx, analogy.steps!.length)}
                    </div>

                    <span className="text-[10px] font-mono text-slate-400 uppercase">
                      {step.badge || `Step ${step.number}`}
                    </span>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                      <RenderInlineText text={step.title} />
                    </h4>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-tight line-clamp-2">
                      <RenderInlineText text={step.subtitle} />
                    </p>
                  </div>

                  {/* Connector Badge / Arrow */}
                  {!isLast && (
                    <div className="flex flex-col items-center justify-center shrink-0 px-1 text-slate-400 dark:text-slate-500">
                      {connector ? (
                        <div className="flex flex-col items-center gap-1">
                          <Cog className="h-3.5 w-3.5 animate-spin text-sky-500 dark:text-cyan-400" />
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-cyan-400 bg-sky-100 dark:bg-sky-950 px-1.5 py-0.5 rounded border border-sky-200 dark:border-sky-800">
                            <RenderInlineText text={connector} />
                          </span>
                        </div>
                      ) : (
                        <ArrowRight className="h-4 w-4 text-sky-500" />
                      )}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
