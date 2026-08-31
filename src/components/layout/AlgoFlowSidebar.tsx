'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AI_CURRICULUM } from '@/data/curriculum';
import { Module } from '@/types';
import { 
  GraduationCap,
  Cpu,
  Sigma,
  Search,
  Clock,
  BookOpen,
  Zap,
  BookMarked,
  ChevronDown,
  ChevronRight,
  Compass,
  CheckCircle2
} from 'lucide-react';

interface BookSidebarProps {
  currentModuleId?: string;
  onCloseMobile?: () => void;
  onOpenSearch?: () => void;
}

export default function BookSidebar({
  currentModuleId,
  onCloseMobile,
  onOpenSearch
}: BookSidebarProps) {
  const pathname = usePathname();

  // 1. Identify which domain tab the current module belongs to
  const getDomainFromModule = (modId?: string): 'cs-research' | 'ai-core' | 'math' => {
    if (['linear-algebra', 'calculus-optimization', 'probability-statistics'].includes(modId || '')) {
      return 'math';
    }
    if (['classical-ml', 'deep-learning', 'nlp-llms', 'computer-vision', 'reinforcement-learning'].includes(modId || '')) {
      return 'ai-core';
    }
    return 'cs-research';
  };

  const [activeTab, setActiveTab] = useState<'cs-research' | 'ai-core' | 'math'>(() => 
    getDomainFromModule(currentModuleId)
  );

  // Sync tab if currentModuleId changes
  useEffect(() => {
    if (currentModuleId) {
      setActiveTab(getDomainFromModule(currentModuleId));
    }
  }, [currentModuleId]);

  // Filter modules according to active tab
  const getTabModules = (): Module[] => {
    if (activeTab === 'cs-research') return AI_CURRICULUM.slice(0, 6);
    if (activeTab === 'ai-core') return AI_CURRICULUM.slice(6, 11);
    return AI_CURRICULUM.slice(11);
  };

  const modules = getTabModules();
  const totalChapters = modules.reduce((acc, m) => acc + m.chapters.length, 0);

  // 2. Collapsible accordion state for each module
  // By default, open the current module and any module that contains the active chapter
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    AI_CURRICULUM.forEach((mod) => {
      const hasActiveChapter = mod.chapters.some((ch) => pathname === `/book/${ch.slug}`);
      initial[mod.id] = hasActiveChapter || mod.id === currentModuleId;
    });
    // If none are open in active tab, expand the first module
    if (!Object.values(initial).some(Boolean) && modules.length > 0) {
      initial[modules[0].id] = true;
    }
    return initial;
  });

  // Ensure active module is always expanded when pathname changes
  useEffect(() => {
    AI_CURRICULUM.forEach((mod) => {
      const hasActiveChapter = mod.chapters.some((ch) => pathname === `/book/${ch.slug}`);
      if (hasActiveChapter) {
        setExpandedModules((prev) => ({ ...prev, [mod.id]: true }));
      }
    });
  }, [pathname]);

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const tabInfo = {
    'cs-research': {
      title: 'CS Research Methodology',
      badge: 'Scientific Method',
      iconText: 'CS',
      completedText: `${totalChapters} Chapters • 6 Topics`
    },
    'ai-core': {
      title: 'AI & Deep Learning Core',
      badge: 'Neural Architectures',
      iconText: 'AI',
      completedText: `${totalChapters} Chapters • 5 Topics`
    },
    'math': {
      title: 'Mathematical Foundations',
      badge: 'Rigorous Math',
      iconText: '∑',
      completedText: `${totalChapters} Chapters • 3 Topics`
    }
  };

  return (
    <aside className="w-full flex flex-col space-y-4 text-slate-800 dark:text-slate-200 select-none">
      
      {/* 1. DOMAIN SWITCHER TABS (3 Core Pillars) */}
      <div className="space-y-1">
        <div className="flex items-center justify-between px-1 mb-1.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Curriculum Domain
          </span>
          <Link
            href="/"
            className="text-[10px] font-mono text-sky-600 dark:text-cyan-400 hover:underline"
          >
            All 7 Domains →
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200/80 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('cs-research')}
            className={`flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'cs-research'
                ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-cyan-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <Zap className="h-3 w-3 shrink-0" />
            <span className="truncate">Research</span>
          </button>

          <button
            onClick={() => setActiveTab('ai-core')}
            className={`flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'ai-core'
                ? 'bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <Cpu className="h-3 w-3 shrink-0" />
            <span className="truncate">AI Core</span>
          </button>

          <button
            onClick={() => setActiveTab('math')}
            className={`flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'math'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <Sigma className="h-3 w-3 shrink-0" />
            <span className="truncate">Math</span>
          </button>
        </div>
      </div>

      {/* 2. ACTIVE DOMAIN SUMMARY CARD */}
      <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3 shadow-2xs space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold uppercase text-sky-600 dark:text-cyan-400">
            {tabInfo[activeTab].badge}
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            {tabInfo[activeTab].completedText}
          </span>
        </div>
        <h4 className="text-xs font-black text-slate-950 dark:text-white tracking-tight leading-snug">
          {tabInfo[activeTab].title}
        </h4>
      </div>

      {/* 3. QUICK SEARCH BUTTON */}
      <button
        onClick={onOpenSearch}
        className="flex w-full items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-3 py-2 text-xs text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Search className="h-3.5 w-3.5 text-slate-400" />
          <span>Quick search (⌘K)...</span>
        </div>
        <kbd className="rounded bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 text-[9px] font-mono text-slate-500">
          ⌘K
        </kbd>
      </button>

      {/* 4. LOGICAL ACCORDION LIST OF TOPICS & CHAPTERS */}
      <div className="space-y-2 pt-1 pb-10">
        {modules.map((module) => {
          const isExpanded = !!expandedModules[module.id];
          const hasActiveChild = module.chapters.some((ch) => pathname === `/book/${ch.slug}`);

          return (
            <div
              key={module.id}
              className={`rounded-xl border transition-all ${
                hasActiveChild
                  ? 'border-sky-300 dark:border-sky-800/80 bg-sky-50/20 dark:bg-sky-950/10'
                  : 'border-slate-200/70 dark:border-slate-800/70 bg-white/40 dark:bg-slate-900/30'
              }`}
            >
              {/* Module Header (Clickable Accordion Trigger) */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center justify-between p-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-mono font-black ${
                      hasActiveChild
                        ? 'bg-sky-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    T{module.number}
                  </span>
                  <div className="min-w-0">
                    <p className={`text-xs font-bold truncate leading-tight ${
                      hasActiveChild ? 'text-sky-700 dark:text-cyan-300' : 'text-slate-900 dark:text-slate-200'
                    }`}>
                      {module.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[9px] font-mono text-slate-500 dark:text-slate-400">
                    {module.chapters.length}
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Collapsible Chapters Sub-List */}
              {isExpanded && (
                <div className="px-2 pb-2.5 pt-1 space-y-1 border-t border-slate-100 dark:border-slate-800/60">
                  {module.chapters.map((chapter, cIdx) => {
                    const isActive = pathname === `/book/${chapter.slug}`;

                    return (
                      <Link
                        key={chapter.id}
                        href={`/book/${chapter.slug}`}
                        onClick={onCloseMobile}
                        className={`group relative flex items-center justify-between rounded-lg px-2.5 py-2 text-xs transition-all ${
                          isActive
                            ? 'bg-sky-500 dark:bg-sky-600 text-white font-bold shadow-xs'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-950 dark:hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          <span
                            className={`font-mono text-[10px] font-bold shrink-0 ${
                              isActive ? 'text-sky-100' : 'text-slate-400 dark:text-slate-500'
                            }`}
                          >
                            {module.number}.{cIdx + 1}
                          </span>
                          <span className="truncate leading-tight">
                            {chapter.title.replace(/^[\d.]+\s*/, '')}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {chapter.badge && !isActive && (
                            <span className="hidden sm:inline rounded bg-slate-100 dark:bg-slate-800 px-1 py-0.2 text-[8px] font-mono text-slate-400">
                              {chapter.badge}
                            </span>
                          )}
                          <span
                            className={`text-[9px] font-mono flex items-center gap-0.5 ${
                              isActive ? 'text-sky-100' : 'text-slate-400'
                            }`}
                          >
                            <Clock className="h-2.5 w-2.5" />
                            {chapter.estimatedMinutes}m
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
