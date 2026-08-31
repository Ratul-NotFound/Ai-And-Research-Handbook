'use client';

import React from 'react';
import Link from 'next/link';
import { Chapter, Module } from '@/types';
import { Clock, BookOpen, ChevronRight, CheckCircle2, Target } from 'lucide-react';

interface ChapterHeaderProps {
  chapter: Chapter;
  module: Module;
}

export default function ChapterHeader({ chapter, module }: ChapterHeaderProps) {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 pb-8 space-y-5">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
        <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Handbook</span>
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-300 dark:text-slate-600" />
        <Link href={`/topic/${module.id}`} className="hover:text-slate-900 dark:hover:text-white transition-colors truncate max-w-[180px]">
          {module.title}
        </Link>
        <ChevronRight className="h-3 w-3 text-slate-300 dark:text-slate-600" />
        <span className="text-sky-600 dark:text-cyan-400 font-semibold truncate max-w-[200px]">
          {chapter.title}
        </span>
      </nav>

      {/* Badges & Metadata Row */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-md bg-sky-50 dark:bg-sky-950/70 px-2.5 py-1 text-[11px] font-mono font-bold uppercase text-sky-700 dark:text-cyan-300 border border-sky-200/80 dark:border-sky-800/80">
          Topic {module.number} · {chapter.badge}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-md bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 text-[11px] font-mono text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          <Clock className="h-3 w-3 text-slate-500" />
          {chapter.estimatedMinutes} min read
        </span>
      </div>

      {/* Chapter Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
        {chapter.title}
      </h1>

      {/* Overview Lead-in */}
      <div className="rounded-xl border-l-4 border-sky-500 dark:border-cyan-400 bg-slate-50/80 dark:bg-slate-900/40 p-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        {chapter.overview}
      </div>

      {/* Learning Goals */}
      {chapter.learningGoals && chapter.learningGoals.length > 0 && (
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            <Target className="h-3.5 w-3.5 text-sky-500" />
            <span>What You'll Learn</span>
          </div>
          <ul className="grid sm:grid-cols-2 gap-1.5">
            {chapter.learningGoals.map((goal, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <span className="mt-0.5 h-4 w-4 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-cyan-400 font-mono text-[10px] font-black flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Prerequisites */}
      {chapter.prerequisites && chapter.prerequisites.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-mono text-[11px] font-bold uppercase text-slate-400 dark:text-slate-500">
            Prerequisites:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {chapter.prerequisites.map((req, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2.5 py-0.5 text-[11px] font-medium text-slate-700 dark:text-slate-300"
              >
                <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                {req}
              </span>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
