'use client';

import React from 'react';
import { Chapter, Module } from '@/types';
import ChapterHeader from './ChapterHeader';
import SectionRenderer from './SectionRenderer';
import ChapterNavigation from './ChapterNavigation';
import ReadingProgressBar from './ReadingProgressBar';
import MentalModelCard from './MentalModelCard';
import KeyQuestionsTable from './KeyQuestionsTable';
import RealWorldApplicationsTable from './RealWorldApplicationsTable';

interface ChapterReaderProps {
  chapter: Chapter;
  module: Module;
  prevChapter: Chapter | null;
  nextChapter: Chapter | null;
}

export default function ChapterReader({
  chapter,
  module,
  prevChapter,
  nextChapter,
}: ChapterReaderProps) {
  return (
    <div className="space-y-10">
      {/* Top Reading Progress Indicator */}
      <ReadingProgressBar />

      {/* 1. Scholarly Chapter Header (Title, badges, prerequisites, lead-in) */}
      <ChapterHeader chapter={chapter} module={module} />

      {/* 2. Real-Life Analogy / Mental Model Flow Card (AlgoFlow Style) */}
      {chapter.analogy && (
        <MentalModelCard analogy={chapter.analogy} />
      )}

      {/* 3. Key Questions & First Principles Q&A Table (AlgoFlow Style) */}
      {chapter.keyQuestions && chapter.keyQuestions.length > 0 && (
        <KeyQuestionsTable
          title={`Why Was ${chapter.title.replace(/^\d+\.\d+\s*/, '')} Created & How It Changed CS`}
          questions={chapter.keyQuestions}
        />
      )}

      {/* 4. Real-World Applications Table (AlgoFlow Style) */}
      {chapter.realWorldUses && chapter.realWorldUses.length > 0 && (
        <RealWorldApplicationsTable
          title={`Where This Powers the Real World Today`}
          applications={chapter.realWorldUses}
        />
      )}

      {/* 5. Structured Sections (Markdown, KaTeX, Tables, Tradeoffs, Code, Takeaways, Papers) */}
      <div className="space-y-14 pt-4 border-t border-slate-200 dark:border-slate-800">
        {chapter.sections.map((section, sIdx) => (
          <SectionRenderer
            key={section.id}
            section={section}
            sectionNumber={sIdx + 1}
          />
        ))}
      </div>

      {/* 6. Chapter Navigation (Previous & Next pagination) */}
      <ChapterNavigation
        prevChapter={prevChapter}
        nextChapter={nextChapter}
      />
    </div>
  );
}
