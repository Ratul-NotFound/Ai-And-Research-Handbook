'use client';

import React, { useState, useMemo, use } from 'react';
import { notFound } from 'next/navigation';
import { AI_CURRICULUM } from '@/data/curriculum';
import { Chapter, Module } from '@/types';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileDrawer from '@/components/layout/MobileDrawer';
import Footer from '@/components/layout/Footer';
import CommandPalette from '@/components/search/CommandPalette';
import ChapterReader from '@/components/book/ChapterReader';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function DynamicChapterPage({ params }: PageProps) {
  const resolvedParams = use(params);

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Find the active chapter, module, and adjacent chapters
  const chapterData = useMemo<{
    chapter: Chapter;
    module: Module;
    prevChapter: Chapter | null;
    nextChapter: Chapter | null;
  } | null>(() => {
    let foundChapter: Chapter | null = null;
    let foundModule: Module | null = null;

    const allChapters: { chapter: Chapter; module: Module }[] = [];
    AI_CURRICULUM.forEach((mod) => {
      mod.chapters.forEach((ch) => {
        allChapters.push({ chapter: ch, module: mod });
        if (ch.slug === resolvedParams.slug) {
          foundChapter = ch;
          foundModule = mod;
        }
      });
    });

    if (!foundChapter || !foundModule) return null;

    const currentIndex = allChapters.findIndex((item) => item.chapter.id === foundChapter!.id);
    const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1].chapter : null;
    const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1].chapter : null;

    return {
      chapter: foundChapter,
      module: foundModule,
      prevChapter,
      nextChapter,
    };
  }, [resolvedParams.slug]);

  if (!chapterData) {
    notFound();
  }

  const { chapter, module, prevChapter, nextChapter } = chapterData;

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#f8fafc] dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 transition-colors">
      {/* Top Full-Width Navbar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onToggleSidebar={() => setMobileDrawerOpen(true)}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        currentModuleId={module.id}
      />

      {/* Search Modal */}
      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Main Full-Width Two-Column Layout (Sidebar pinned to left edge) */}
      <div className="flex w-full flex-1 min-h-0">
        {/* Left Sidebar: Fixed at viewport left edge */}
        <aside className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-72 lg:w-80 shrink-0 overflow-y-auto border-r border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-[#0b0f19]/70 backdrop-blur-xs py-6 px-4 lg:px-5 lg:block scrollbar-thin">
          <Sidebar
            currentModuleId={module.id}
            onOpenSearch={() => setSearchOpen(true)}
          />
        </aside>

        {/* Content Main Area: Occupies full remaining width, centered reading column */}
        <main className="flex-1 min-w-0 py-8 sm:py-10 px-4 sm:px-8 lg:px-12 xl:px-16 overflow-y-auto">
          <div className="mx-auto max-w-4xl">
            <ChapterReader
              chapter={chapter}
              module={module}
              prevChapter={prevChapter}
              nextChapter={nextChapter}
            />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
