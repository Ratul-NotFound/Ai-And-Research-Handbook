'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Smartphone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-8 text-slate-500 dark:text-slate-400 text-xs transition-colors">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-sky-600 dark:text-cyan-400" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">AI Research Handbook</span>
          <span>• First-Principles Digital Book</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <Smartphone className="h-3.5 w-3.5" />
            Offline Ready (PWA)
          </span>
          <Link href="/cheatsheet" className="hover:text-sky-600 dark:hover:text-cyan-400 transition-colors">
            Cheatsheets
          </Link>
        </div>
      </div>
    </footer>
  );
}
