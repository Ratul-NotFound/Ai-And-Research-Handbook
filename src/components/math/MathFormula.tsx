'use client';

import React, { useEffect, useRef, useState } from 'react';
import katex from 'katex';
import { Copy, Check } from 'lucide-react';

interface MathFormulaProps {
  latex: string;
  description?: string;
  block?: boolean;
}

export default function MathFormula({ latex, description, block = true }: MathFormulaProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(latex, containerRef.current, {
          displayMode: block,
          throwOnError: false,
        });
      } catch {
        if (containerRef.current) {
          containerRef.current.innerText = latex;
        }
      }
    }
  }, [latex, block]);

  const copyLatex = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(latex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!block) {
    return <span ref={containerRef} className="inline-math px-1 py-0.5 font-mono text-sm text-sky-700 dark:text-cyan-300" />;
  }

  return (
    <div className="group relative my-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 sm:p-5 shadow-xs transition-colors">
      <div className="flex items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800/80 mb-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 dark:text-cyan-400 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-cyan-400"></span>
          Mathematical Formulation
        </span>
        <button
          onClick={copyLatex}
          title="Copy LaTeX formula"
          className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-sky-700 dark:hover:text-cyan-300 transition-colors px-2 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 min-h-[30px] touch-manipulation"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
          <span className="text-[10px] hidden sm:inline">{copied ? 'Copied' : 'Copy LaTeX'}</span>
        </button>
      </div>

      <div className="overflow-x-auto py-2 px-1 text-center scrollbar-thin text-slate-900 dark:text-slate-100">
        <span ref={containerRef} className="katex-display-wrapper" />
      </div>

      {description && (
        <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-400 italic border-l-2 border-sky-400 dark:border-cyan-500/40 pl-3">
          {description}
        </p>
      )}
    </div>
  );
}
