'use client';

import React, { useState, useMemo, use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { AI_CURRICULUM } from '@/data/curriculum';
import { Module } from '@/types';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileDrawer from '@/components/layout/MobileDrawer';
import Footer from '@/components/layout/Footer';
import CommandPalette from '@/components/search/CommandPalette';
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  BookOpen, 
  GraduationCap, 
  Boxes, 
  Cpu, 
  Flame, 
  Sigma, 
  Eye, 
  MessageSquareText,
  Zap,
  Sparkles
} from 'lucide-react';

interface PageProps {
  params: Promise<{ topicId: string }>;
}

const getDomainMeta = (topicId: string) => {
  if (['machine-learning', 'classical-ml', 'ai-core', 'deep-learning', 'nlp-llms', 'computer-vision', 'reinforcement-learning'].includes(topicId)) {
    return {
      title: 'Machine Learning & Deep Learning Core',
      subtitle: 'From Convex Optimization and Tree Ensembles (XGBoost/LightGBM) to Transformers, Vision, and Autonomous Reasoning Agents',
      badge: 'Machine Learning Master Path',
      icon: <Cpu className="h-6 w-6 text-violet-600 dark:text-violet-400" />,
      colorClass: 'border-violet-300 dark:border-violet-800 bg-violet-50/40 dark:bg-violet-950/20',
      moduleId: 'classical-ml',
    };
  }
  if (['mathematics', 'math-foundations', 'linear-algebra', 'calculus-optimization', 'probability-statistics'].includes(topicId)) {
    return {
      title: 'Mathematical Foundations for AI',
      subtitle: 'Linear Algebra, High-Dimensional Vector Spaces, Multivariate Optimization, and Probability Theory',
      badge: 'Mathematical Foundations',
      icon: <Sigma className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      colorClass: 'border-blue-300 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-950/20',
      moduleId: 'linear-algebra',
    };
  }
  return {
    title: 'CS Research Methodology',
    subtitle: 'The 6-Step Scientific Framework for Research Design, Literature Snowballing, Data Collection, Model Training, and Submission Quality',
    badge: 'Research Methodology Path',
    icon: <GraduationCap className="h-6 w-6 text-sky-600 dark:text-cyan-400" />,
    colorClass: 'border-sky-300 dark:border-sky-800 bg-sky-50/40 dark:bg-sky-950/20',
    moduleId: 'cs-research',
  };
};

export default function TopicOverviewPage({ params }: PageProps) {
  const resolvedParams = use(params);

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Group modules into dedicated separated path scopes
  const matchedModules: Module[] = useMemo(() => {
    const id = resolvedParams.topicId;

    if (['machine-learning', 'classical-ml', 'ai-core', 'deep-learning', 'nlp-llms', 'computer-vision', 'reinforcement-learning'].includes(id)) {
      return AI_CURRICULUM.slice(6, 11); // Modules 7, 8, 9, 10, 11
    }
    if (['mathematics', 'math-foundations', 'linear-algebra', 'calculus-optimization', 'probability-statistics'].includes(id)) {
      return AI_CURRICULUM.slice(11); // Modules 12, 13, 14
    }
    return AI_CURRICULUM.slice(0, 6); // Modules 1, 2, 3, 4, 5, 6 (CS Research)
  }, [resolvedParams.topicId]);

  if (matchedModules.length === 0) {
    notFound();
  }

  const meta = getDomainMeta(resolvedParams.topicId);
  const primaryModule = matchedModules[0];
  const totalChapters = matchedModules.reduce((acc, m) => acc + m.chapters.length, 0);

  return (
    <div suppressHydrationWarning className="flex min-h-[100dvh] flex-col bg-white dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 transition-colors">
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onToggleSidebar={() => setMobileDrawerOpen(true)}
      />

      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        currentModuleId={primaryModule.id}
      />

      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Main Full-Width Layout with Separated Sidebar pinned to left */}
      <div className="flex w-full flex-1 min-h-0">
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-72 lg:w-80 shrink-0 overflow-y-auto border-r border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-[#0b0f19]/70 backdrop-blur-xs py-6 px-4 lg:px-5 lg:block">
          <Sidebar currentModuleId={primaryModule.id} />
        </aside>

        <main className="flex-1 min-w-0 py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-y-auto space-y-8">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1">
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to All Curriculum Paths</span>
              </Link>
            </div>

            {/* Separated Domain Header Card */}
            <div className={`rounded-2xl border p-6 sm:p-8 space-y-4 ${meta.colorClass}`}>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
                    {meta.icon}
                  </span>
                  <div>
                    <span className="text-xs font-mono font-bold uppercase text-slate-600 dark:text-slate-300">
                      {meta.badge}
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                      {meta.title}
                    </h1>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 px-2.5 py-1 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                    {matchedModules.length} Topics • {totalChapters} Chapters
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {meta.subtitle}
              </p>

              <div className="pt-2 flex items-center gap-3 flex-wrap">
                <Link
                  href={`/book/${primaryModule.chapters[0].slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-white px-5 py-2.5 text-xs font-bold text-white dark:text-slate-900 shadow-xs hover:bg-sky-600 dark:hover:bg-cyan-300 transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Start First Chapter ({primaryModule.chapters[0].title})</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Separated Topics & Chapters List */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Curriculum Breakdown & Chapter Roadmap
                </h2>
                <span className="text-xs font-mono text-slate-400">
                  {matchedModules.length} Topics Total
                </span>
              </div>

              <div className="space-y-4">
                {matchedModules.map((mod) => (
                  <div
                    key={mod.id}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 overflow-hidden shadow-xs"
                  >
                    <div className="border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-sky-600 dark:text-cyan-400">
                          Topic {mod.number}
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          {mod.title}
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        {mod.chapters.length} chapters
                      </span>
                    </div>

                    <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {mod.chapters.map((ch, cIdx) => (
                        <Link
                          key={ch.id}
                          href={`/book/${ch.slug}`}
                          className="group flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                        >
                          <div className="space-y-1 pr-4 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-slate-400">
                                {mod.number}.{cIdx + 1}
                              </span>
                              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-cyan-400 transition-colors truncate">
                                {ch.title.replace(/^[\d.]+\s*/, '')}
                              </span>
                              {ch.badge && (
                                <span className="hidden sm:inline rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[9px] font-mono text-slate-500">
                                  {ch.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                              {ch.overview}
                            </p>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                              <Clock className="h-3 w-3" />
                              {ch.estimatedMinutes}m
                            </span>
                            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:translate-x-1 group-hover:text-sky-600 dark:group-hover:text-cyan-400 transition-all" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
