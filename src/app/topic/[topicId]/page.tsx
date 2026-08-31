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
  MessageSquareText 
} from 'lucide-react';

interface PageProps {
  params: Promise<{ topicId: string }>;
}

const getModuleIcon = (iconName: string) => {
  switch (iconName) {
    case 'GraduationCap': return <GraduationCap className="h-6 w-6 text-sky-600 dark:text-cyan-400" />;
    case 'Boxes': return <Boxes className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />;
    case 'Cpu': return <Cpu className="h-6 w-6 text-violet-600 dark:text-violet-400" />;
    case 'Flame': return <Flame className="h-6 w-6 text-amber-600 dark:text-amber-400" />;
    case 'Sigma': return <Sigma className="h-6 w-6 text-blue-600 dark:text-blue-400" />;
    case 'Eye': return <Eye className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />;
    case 'MessageSquareText': return <MessageSquareText className="h-6 w-6 text-pink-600 dark:text-pink-400" />;
    default: return <BookOpen className="h-6 w-6 text-sky-600 dark:text-cyan-400" />;
  }
};

export default function TopicOverviewPage({ params }: PageProps) {
  const resolvedParams = use(params);

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Group Research Methodology modules together if topicId is 'research-methodology'
  const matchedModules: Module[] = useMemo(() => {
    const id = resolvedParams.topicId;

    if (id === 'research-methodology' || id === 'cs-research') {
      return AI_CURRICULUM.slice(0, 6);
    }
    if (id === 'mathematics' || id === 'math-foundations') {
      return AI_CURRICULUM.slice(11);
    }

    const single = AI_CURRICULUM.find(m => m.id === id);
    return single ? [single] : [];
  }, [resolvedParams.topicId]);

  if (matchedModules.length === 0) {
    notFound();
  }

  const primaryModule = matchedModules[0];

  return (
    <div className="flex min-h-[100dvh] flex-col bg-white dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 transition-colors">
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

      {/* Main Full-Width Layout with Sidebar Pinned to Left */}
      <div className="flex w-full flex-1 min-h-0">
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-72 lg:w-80 shrink-0 overflow-y-auto border-r border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-[#0b0f19]/70 backdrop-blur-xs py-6 px-4 lg:px-5 lg:block">
          <Sidebar currentModuleId={primaryModule.id} />
        </aside>

        <main className="flex-1 min-w-0 py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-y-auto space-y-8">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1">
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to All Domains</span>
              </Link>
            </div>

            {/* Domain Header Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
                  {getModuleIcon(primaryModule.iconName)}
                </span>
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-sky-600 dark:text-cyan-400">
                    Domain Overview
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                    {primaryModule.title}
                  </h1>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {primaryModule.subtitle}
              </p>

              <div className="pt-2">
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

            {/* Modules & Chapters List */}
            <div className="space-y-6">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Curriculum Breakdown
              </h2>

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
                      {mod.chapters.map((ch) => (
                        <Link
                          key={ch.id}
                          href={`/book/${ch.slug}`}
                          className="group flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                        >
                          <div className="space-y-1 pr-4">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-cyan-400 transition-colors">
                                {ch.title}
                              </span>
                              <span className="rounded bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-[9px] font-mono text-slate-500">
                                {ch.badge}
                              </span>
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
