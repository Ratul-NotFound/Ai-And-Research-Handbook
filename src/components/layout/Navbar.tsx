'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Search, Menu, Compass, Download } from 'lucide-react';
import ThemeToggle from '@/components/theme/ThemeToggle';

interface NavbarProps {
  onOpenSearch?: () => void;
  onToggleSidebar?: () => void;
}

export default function Navbar({ onOpenSearch, onToggleSidebar }: NavbarProps) {
  return (
    <header suppressHydrationWarning className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-colors">
      <div suppressHydrationWarning className="flex h-14 w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Mobile TOC Toggle & Title */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 transition-colors hover:bg-slate-200 dark:hover:bg-slate-800 lg:hidden"
              aria-label="Open Table of Contents"
            >
              <Menu className="h-4 w-4" />
            </button>
          )}

          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 dark:bg-slate-800 border border-sky-200 dark:border-slate-700 text-sky-600 dark:text-cyan-400">
              <BookOpen className="h-4 w-4" />
            </span>
            <div>
              <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                AI Research Handbook
              </span>
              <span className="ml-2 hidden rounded bg-sky-100 dark:bg-cyan-950 border border-sky-200 dark:border-cyan-800/60 px-1.5 py-0.5 text-[9px] font-mono font-medium text-sky-700 dark:text-cyan-300 sm:inline">
                Offline Book
              </span>
            </div>
          </Link>
        </div>

        {/* Right: Search, Cheatsheet & Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onOpenSearch && (
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-400 transition-colors hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-zinc-200"
            >
              <Search className="h-3.5 w-3.5 text-sky-500 dark:text-cyan-400" />
              <span className="hidden sm:inline">Search Book</span>
              <kbd className="hidden sm:inline rounded bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-600 dark:text-slate-400">
                ⌘K
              </kbd>
            </button>
          )}

          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                if (window.triggerPwaInstall) {
                  window.triggerPwaInstall();
                } else {
                  window.dispatchEvent(new CustomEvent('open-pwa-install'));
                }
              }
            }}
            className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/80 cursor-pointer shadow-2xs"
            title="Install as native Android / Desktop app"
          >
            <Download className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Install App</span>
          </button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
