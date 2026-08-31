'use client';

import React from 'react';
import { PaperCitation } from '@/types';
import { FileText, ExternalLink } from 'lucide-react';

interface PaperCardProps {
  paper: PaperCitation;
}

export default function PaperCard({ paper }: PaperCardProps) {
  return (
    <a
      href={paper.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3.5 transition-all hover:border-amber-400 dark:hover:border-amber-500/40 shadow-xs"
    >
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
          <FileText className="h-3.5 w-3.5 text-amber-500 shrink-0" />
          <span>{paper.title}</span>
          <ExternalLink className="h-3 w-3 text-slate-400 group-hover:text-amber-500 transition-colors shrink-0" />
        </h4>
        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 shrink-0">
          {paper.year}
        </span>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
        {paper.authors}
      </p>

      {paper.significance && (
        <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 bg-amber-50/60 dark:bg-amber-950/20 p-2 rounded border border-amber-200/60 dark:border-amber-900/40 italic">
          💡 <strong>Significance:</strong> {paper.significance}
        </p>
      )}
    </a>
  );
}
