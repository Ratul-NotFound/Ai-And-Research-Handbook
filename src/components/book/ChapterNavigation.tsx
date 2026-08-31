'use client';

import React from 'react';
import Link from 'next/link';
import { Chapter } from '@/types';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface ChapterNavigationProps {
  prevChapter: Chapter | null;
  nextChapter: Chapter | null;
}

export default function ChapterNavigation({ prevChapter, nextChapter }: ChapterNavigationProps) {
  return (
    <nav className="mt-12 flex items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800 pt-6">
      {prevChapter ? (
        <Link
          href={`/book/${prevChapter.slug}`}
          className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-3 text-xs text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors max-w-[48%]"
        >
          <ArrowLeft className="h-4 w-4 text-sky-600 dark:text-cyan-400 shrink-0" />
          <div className="truncate text-left">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase block">Previous Chapter</span>
            <span className="truncate font-medium">{prevChapter.title}</span>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {nextChapter ? (
        <Link
          href={`/book/${nextChapter.slug}`}
          className="flex items-center justify-end gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-3 text-xs text-slate-700 dark:text-slate-300 hover:border-sky-400 dark:hover:border-cyan-500/40 hover:text-sky-700 dark:hover:text-white transition-colors max-w-[48%] text-right"
        >
          <div className="truncate text-right">
            <span className="text-[10px] text-sky-600 dark:text-cyan-400 uppercase block">Next Chapter</span>
            <span className="truncate font-medium">{nextChapter.title}</span>
          </div>
          <ArrowRight className="h-4 w-4 text-sky-600 dark:text-cyan-400 shrink-0" />
        </Link>
      ) : (
        <Link
          href="/cheatsheet"
          className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-3 text-xs text-sky-600 dark:text-cyan-400 hover:border-sky-400 transition-colors"
        >
          <span>Open Master Cheatsheets</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
