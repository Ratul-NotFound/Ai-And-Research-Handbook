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
  Zap,
  BookMarked,
  ChevronDown,
  ChevronRight,
  Compass,
  CheckCircle2,
  Boxes,
  Eye,
  Flame,
  MessageSquareText,
  Layers
} from 'lucide-react';

interface BookSidebarProps {
  currentModuleId?: string;
  onCloseMobile?: () => void;
  onOpenSearch?: () => void;
}

// 7 Master Dedicated Curriculum Domains
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
      id: 'cs-research',
      name: 'CS Research Methodology',
      shortName: 'CS Research',
      badge: 'Methodology',
      icon: <GraduationCap className="h-4 w-4 text-sky-500" />,
      moduleIds: ['research-methodology', 'data-cs-research', 'models-training', 'error-reduction', 'result-analysis', 'decision-framework'],
    },
    {
      id: 'classical-ml',
      name: 'Classical Machine Learning',
      shortName: 'Machine Learning',
      badge: 'Statistical ML',
      icon: <Boxes className="h-4 w-4 text-emerald-500" />,
      moduleIds: ['classical-ml'],
    },
    {
      id: 'deep-learning',
      name: 'Deep Learning Core & Scaling',
      shortName: 'Deep Learning',
      badge: 'Neural Core',
      icon: <Cpu className="h-4 w-4 text-violet-500" />,
      moduleIds: ['deep-learning'],
    },
    {
      id: 'nlp-llms',
      name: 'NLP & Large Language Models',
      shortName: 'NLP & LLMs',
      badge: 'Generative AI',
      icon: <MessageSquareText className="h-4 w-4 text-pink-500" />,
      moduleIds: ['nlp-llms'],
    },
    {
      id: 'computer-vision',
      name: 'Computer Vision & Generative AI',
      shortName: 'Vision & Diffusion',
      badge: 'Spatial Vision',
      icon: <Eye className="h-4 w-4 text-cyan-500" />,
      moduleIds: ['computer-vision'],
    },
    {
      id: 'reinforcement-learning',
      name: 'Reinforcement Learning & Agents',
      shortName: 'RL & Decision',
      badge: 'Decision SOTA',
      icon: <Flame className="h-4 w-4 text-amber-500" />,
      moduleIds: ['reinforcement-learning'],
    },
    {
      id: 'mathematics',
      name: 'Mathematical Foundations',
      shortName: 'Math for AI',
      badge: 'Rigorous Math',
      icon: <Sigma className="h-4 w-4 text-blue-500" />,
      moduleIds: ['linear-algebra', 'calculus-optimization', 'probability-statistics'],
    },
  ], []);

  // 1. Identify active domain based on currentModuleId or current chapter pathname
  const detectActiveDomain = (): string => {
    // Check by currentModuleId first
    if (currentModuleId) {
      const match = domainList.find((d) => d.moduleIds.includes(currentModuleId));
      if (match) return match.id;
    }

    // Check by active chapter in pathname
    for (const d of domainList) {
      const hasChapter = AI_CURRICULUM
        .filter((m) => d.moduleIds.includes(m.id))
        .some((m) => m.chapters.some((ch) => pathname === `/book/${ch.slug}`));
      if (hasChapter) return d.id;
    }

    return 'cs-research';
  };

  const [activeDomainId, setActiveDomainId] = useState<string>(detectActiveDomain);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Sync active domain whenever currentModuleId or pathname changes
  useEffect(() => {
    setActiveDomainId(detectActiveDomain());
  }, [currentModuleId, pathname]);

  const currentDomain = domainList.find((d) => d.id === activeDomainId) || domainList[0];

  // Get modules strictly belonging to the active domain
  const domainModules: Module[] = useMemo(() => {
    return AI_CURRICULUM.filter((m) => currentDomain.moduleIds.includes(m.id));
  }, [currentDomain]);

  const totalChapters = domainModules.reduce((acc, m) => acc + m.chapters.length, 0);

  // 2. Collapsible state for modules (if domain has multiple modules)
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    domainModules.forEach((mod) => {
      initial[mod.id] = true; // Default expanded within domain
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
            Active Domain Scope
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
              <span className="text-[9px] font-mono font-bold uppercase text-sky-600 dark:text-cyan-400 block leading-tight">
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
          <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-1.5 shadow-xl space-y-1">
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
                      ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-cyan-300 font-bold'
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

      {/* 2. ACTIVE DOMAIN HEADER & CHAPTER SUMMARY */}
      <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 p-3 shadow-2xs flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
            Domain Focus
          </span>
          <p className="text-xs font-bold text-slate-900 dark:text-white">
            {domainModules.length} {domainModules.length === 1 ? 'Topic' : 'Topics'} • {totalChapters} Chapters
          </p>
        </div>
        <Link
          href={`/topic/${currentDomain.id}`}
          className="text-[11px] font-mono font-bold text-sky-600 dark:text-cyan-400 hover:underline"
        >
          Overview →
        </Link>
      </div>

      {/* 3. QUICK SEARCH BUTTON */}
      <button
        onClick={onOpenSearch}
        className="flex w-full items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 px-3 py-2 text-xs text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Search className="h-3.5 w-3.5 text-slate-400" />
          <span>Search this domain...</span>
        </div>
        <kbd className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[9px] font-mono text-slate-500">
          ⌘K
        </kbd>
      </button>

      {/* 4. ISOLATED TOPICS & CHAPTERS LIST (Strictly for this domain only!) */}
      <div className="space-y-3 pt-1 pb-10">
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

              {/* Chapters Sub-List */}
              {isExpanded && (
                <div className={`space-y-1.5 ${hasMultipleModules ? 'px-2 pb-2.5 pt-1 border-t border-slate-100 dark:border-slate-800/60' : ''}`}>
                  {module.chapters.map((chapter, cIdx) => {
                    const isActive = pathname === `/book/${chapter.slug}`;

                    return (
                      <Link
                        key={chapter.id}
                        href={`/book/${chapter.slug}`}
                        onClick={onCloseMobile}
                        className={`group relative flex items-center justify-between rounded-xl px-3 py-2.5 text-xs transition-all ${
                          isActive
                            ? 'bg-sky-600 dark:bg-cyan-600 text-white font-bold shadow-xs'
                            : 'border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-950 dark:hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          <span
                            className={`font-mono text-[10px] font-bold shrink-0 ${
                              isActive ? 'text-sky-100' : 'text-slate-400'
                            }`}
                          >
                            {module.number}.{cIdx + 1}
                          </span>
                          <span className="truncate leading-tight">
                            {chapter.title.replace(/^[\d.]+\s*/, '')}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {chapter.badge && !isActive && (
                            <span className="hidden sm:inline rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[8px] font-mono text-slate-500">
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
