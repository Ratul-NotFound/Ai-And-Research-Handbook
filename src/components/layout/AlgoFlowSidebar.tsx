'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  ChevronDown,
  ChevronRight,
  Boxes,
  Eye,
  Flame,
  MessageSquareText,
  Bot
} from 'lucide-react';

interface BookSidebarProps {
  currentModuleId?: string;
  onCloseMobile?: () => void;
  onOpenSearch?: () => void;
}

interface DomainDefinition {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  icon: React.ReactNode;
  moduleIds: string[];
}

export default function BookSidebar({
  currentModuleId,
  onCloseMobile,
  onOpenSearch
}: BookSidebarProps) {
  const pathname = usePathname();

  const domainList: DomainDefinition[] = useMemo(() => [
    {
      id: 'modern-ai-agents',
      name: 'Modern AI & Autonomous Smart Systems',
      shortName: 'Modern AI & MCP',
      badge: '15 Chapters',
      icon: <Bot className="h-4 w-4 text-purple-500" />,
      moduleIds: ['modern-ai-agents'],
    },
    {
      id: 'mathematics',
      name: 'Mathematical Foundations for AI',
      shortName: 'Math for AI',
      badge: '3 Topics • 11 Ch',
      icon: <Sigma className="h-4 w-4 text-indigo-500" />,
      moduleIds: ['linear-algebra', 'calculus-optimization', 'probability-statistics'],
    },
    {
      id: 'cs-research',
      name: 'CS Research Methodology',
      shortName: 'CS Research',
      badge: '6 Topics • 18 Ch',
      icon: <GraduationCap className="h-4 w-4 text-sky-500" />,
      moduleIds: ['research-methodology', 'data-cs-research', 'models-training', 'error-reduction', 'result-analysis', 'decision-framework'],
    },
    {
      id: 'classical-ml',
      name: 'Machine Learning (The Complete Book)',
      shortName: 'Machine Learning',
      badge: '15 Chapters',
      icon: <Boxes className="h-4 w-4 text-emerald-500" />,
      moduleIds: ['classical-ml'],
    },
    {
      id: 'nlp-llms',
      name: 'Natural Language Processing & LLMs',
      shortName: 'NLP & LLMs',
      badge: '15 Chapters',
      icon: <MessageSquareText className="h-4 w-4 text-pink-500" />,
      moduleIds: ['nlp-llms'],
    },
    {
      id: 'deep-learning',
      name: 'Deep Learning (Neurons to Transformers)',
      shortName: 'Deep Learning',
      badge: '15 Chapters',
      icon: <Cpu className="h-4 w-4 text-violet-500" />,
      moduleIds: ['deep-learning'],
    },
    {
      id: 'computer-vision',
      name: 'Computer Vision & Generative AI',
      shortName: 'Vision & Diffusion',
      badge: '5 Chapters',
      icon: <Eye className="h-4 w-4 text-cyan-500" />,
      moduleIds: ['computer-vision'],
    },
    {
      id: 'reinforcement-learning',
      name: 'Reinforcement Learning & Agents',
      shortName: 'RL & Decision',
      badge: '4 Chapters',
      icon: <Flame className="h-4 w-4 text-amber-500" />,
      moduleIds: ['reinforcement-learning'],
    },
  ], []);

  // 1. Detect active domain based on currentModuleId or pathname
  const detectActiveDomain = (): string => {
    if (currentModuleId) {
      const match = domainList.find((d) => d.moduleIds.includes(currentModuleId));
      if (match) return match.id;
    }

    for (const d of domainList) {
      const hasChapter = AI_CURRICULUM
        .filter((m) => d.moduleIds.includes(m.id))
        .some((m) => m.chapters.some((ch) => pathname === `/book/${ch.slug}`));
      if (hasChapter) return d.id;
    }

    return 'classical-ml';
  };

  const [activeDomainId, setActiveDomainId] = useState<string>(detectActiveDomain);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setActiveDomainId(detectActiveDomain());
  }, [currentModuleId, pathname]);

  const currentDomain = domainList.find((d) => d.id === activeDomainId) || domainList[0];

  // Get modules strictly belonging to the active domain ONLY
  const domainModules: Module[] = useMemo(() => {
    return AI_CURRICULUM.filter((m) => currentDomain.moduleIds.includes(m.id));
  }, [currentDomain]);

  const totalChapters = domainModules.reduce((acc, m) => acc + m.chapters.length, 0);

  // Accordion state
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    domainModules.forEach((mod) => {
      initial[mod.id] = true;
    });
    return initial;
  });

  useEffect(() => {
    const updated: Record<string, boolean> = {};
    domainModules.forEach((mod) => {
      updated[mod.id] = true;
    });
    setExpandedModules(updated);
  }, [activeDomainId]);

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  return (
    <aside className="w-full flex flex-col space-y-3.5 text-slate-800 dark:text-slate-200 select-none">
      
      {/* 1. SEPARATED DOMAIN SELECTOR DROPDOWN */}
      <div className="relative space-y-1">
        <div className="flex items-center justify-between px-1 mb-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Active Book Scope
          </span>
          <Link
            href="/"
            className="text-[10px] font-mono text-sky-600 dark:text-cyan-400 hover:underline"
          >
            All Portals →
          </Link>
        </div>

        {/* Selected Domain Dropdown Button */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors text-left"
        >
          <div className="flex items-center gap-2.5 min-w-0 pr-1">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
              {currentDomain.icon}
            </span>
            <div className="min-w-0">
              <span className="text-[9px] font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400 block leading-tight">
                {currentDomain.badge}
              </span>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate leading-tight">
                {currentDomain.name}
              </h3>
            </div>
          </div>
          <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu Options */}
        {dropdownOpen && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-1.5 shadow-xl space-y-1 max-h-80 overflow-y-auto">
            {domainList.map((d) => {
              const isSelected = d.id === activeDomainId;
              const dModules = AI_CURRICULUM.filter((m) => d.moduleIds.includes(m.id));
              const chCount = dModules.reduce((acc, m) => acc + m.chapters.length, 0);

              return (
                <button
                  key={d.id}
                  onClick={() => {
                    setActiveDomainId(d.id);
                    setDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-colors text-left ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="shrink-0">{d.icon}</span>
                    <span className="truncate">{d.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-1">
                    {chCount} ch
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. ACTIVE BOOK HEADER SUMMARY */}
      <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-3 shadow-2xs flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
            Table of Contents
          </span>
          <p className="text-xs font-bold text-slate-900 dark:text-white">
            {totalChapters} Chapters Total
          </p>
        </div>
        <Link
          href={`/topic/${currentDomain.id}`}
          className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          Book Overview →
        </Link>
      </div>

      {/* 3. QUICK SEARCH BUTTON */}
      <button
        onClick={onOpenSearch}
        className="flex w-full items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 px-3 py-2 text-xs text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Search className="h-3.5 w-3.5 text-slate-400" />
          <span className="truncate">Search {currentDomain.shortName}...</span>
        </div>
        <kbd className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[9px] font-mono text-slate-500">
          ⌘K
        </kbd>
      </button>

      {/* 4. ISOLATED CHAPTERS LIST (Strictly for this book only!) */}
      <div className="space-y-2 pt-1 pb-10">
        {domainModules.map((module) => {
          const isExpanded = expandedModules[module.id] !== false;
          const hasMultipleModules = domainModules.length > 1;

          return (
            <div
              key={module.id}
              className={`rounded-xl border transition-all ${
                hasMultipleModules
                  ? 'border-slate-200/80 dark:border-slate-800 bg-white/40 dark:bg-slate-900/30'
                  : 'border-transparent bg-transparent'
              }`}
            >
              {/* Module Header (only if multiple modules in domain) */}
              {hasMultipleModules && (
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex items-center justify-between p-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-[10px] font-bold text-slate-600 dark:text-slate-400">
                      T{module.number}
                    </span>
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-200 truncate leading-tight">
                      {module.title}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[9px] font-mono text-slate-400">
                      {module.chapters.length}
                    </span>
                    {isExpanded ? (
                      <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                    )}
                  </div>
                </button>
              )}

              {/* Chapters List */}
              {isExpanded && (
                <div className={`space-y-1.5 ${hasMultipleModules ? 'px-2 pb-2.5 pt-1 border-t border-slate-100 dark:border-slate-800/60' : ''}`}>
                  {module.chapters.map((chapter, chIdx) => {
                    const isActive = pathname === `/book/${chapter.slug}`;
                    
                    // Strip verbose "Chapter X:" prefix to give maximum horizontal space to the real title
                    const match = chapter.title.match(/^(?:Chapter\s+)?(\d+(?:\.\d+)?)(?:[:\s—–-]+)\s*(.+)$/i);
                    const num = match ? match[1] : `${chIdx + 1}`;
                    const name = match ? match[2].trim() : chapter.title.replace(/^Chapter\s+/i, '').trim();

                    return (
                      <Link
                        key={chapter.id}
                        href={`/book/${chapter.slug}`}
                        onClick={onCloseMobile}
                        title={chapter.title}
                        className={`group relative flex items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-xs transition-all ${
                          isActive
                            ? 'bg-emerald-600 dark:bg-emerald-600 text-white font-bold shadow-xs'
                            : 'border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-950 dark:hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <span
                            className={`flex h-5 min-w-[20px] px-1 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-bold ${
                              isActive
                                ? 'bg-emerald-700 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            {num}
                          </span>
                          <span className="truncate leading-tight font-medium">
                            {name}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0 ml-1">
                          <span
                            className={`text-[9px] font-mono flex items-center gap-0.5 ${
                              isActive ? 'text-emerald-100' : 'text-slate-400'
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
