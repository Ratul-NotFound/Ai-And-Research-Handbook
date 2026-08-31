'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Bot, 
  Sigma, 
  GraduationCap, 
  Boxes, 
  MessageSquareText, 
  Cpu, 
  BookOpen, 
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { 
  ModernAiCardBackdrop, 
  MathematicsCardBackdrop, 
  CsResearchCardBackdrop, 
  MachineLearningCardBackdrop, 
  NlpCardBackdrop, 
  DeepLearningCardBackdrop 
} from './CardBackdrops';

export interface Book3DProps {
  id: string;
  volumeLabel: string;
  romanNumeral: string;
  series: string;
  title: string;
  subtitle: string;
  category: string;
  chapterCount: number;
  readTime: string;
  description: string;
  pathUrl: string;
  startUrl: string;
  coverGrad: string;
  spineGrad: string;
  foilColor: string;
  accentBadge: string;
  btnGrad: string;
  featuredChapters: { num: string; title: string }[];
}

export default function Book3DCover({
  id,
  volumeLabel,
  romanNumeral,
  series,
  title,
  subtitle,
  category,
  chapterCount,
  readTime,
  description,
  pathUrl,
  startUrl,
  coverGrad,
  spineGrad,
  foilColor,
  accentBadge,
  btnGrad,
  featuredChapters,
}: Book3DProps) {
  return (
    <div className="group relative flex flex-col justify-between [perspective:1400px]">
      
      {/* 3D BOOK CASING */}
      <div 
        className="relative flex rounded-r-2xl rounded-l-sm overflow-hidden transition-all duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(-8deg)_rotateX(4deg)_translateY(-8px)_scale(1.01)]"
        style={{
          boxShadow: `
            8px 12px 28px -4px rgba(0, 0, 0, 0.35),
            4px 6px 12px -2px rgba(0, 0, 0, 0.2),
            inset 1px 1px 2px rgba(255, 255, 255, 0.15)
          `,
        }}
      >
        {/* 1. PHYSICAL 3D BOOK SPINE (LEFT BINDING) */}
        <div 
          className={`w-10 sm:w-11 shrink-0 flex flex-col items-center justify-between py-5 border-r border-black/30 dark:border-black/50 ${spineGrad} shadow-[inset_-4px_0_8px_rgba(0,0,0,0.4)] relative z-20`}
        >
          {/* Top Spine Seal */}
          <div className="flex flex-col items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            <span className="font-mono text-[8px] font-black uppercase tracking-widest text-white/70 [writing-mode:vertical-lr] rotate-180">
              RESEARCH
            </span>
          </div>

          {/* Center Spine Embossed Volume Title */}
          <div className="my-auto py-3 flex flex-col items-center gap-2">
            <span className="font-mono text-xs font-black uppercase tracking-widest text-white [writing-mode:vertical-lr] rotate-180">
              {volumeLabel}
            </span>
          </div>

          {/* Spine Ribbon Marker */}
          <div className="w-3 h-5 bg-amber-400/90 rounded-b-xs shadow-xs" />
        </div>

        {/* 2. RIGHT-SIDE 3D STACKED PAPER PAGES EFFECT */}
        <div 
          className="absolute -right-2.5 top-2 bottom-2 w-2.5 rounded-r-xs z-0 pointer-events-none opacity-90 hidden sm:block"
          style={{
            background: 'repeating-linear-gradient(to right, #f8fafc, #f8fafc 1px, #e2e8f0 1.5px, #94a3b8 2px)',
            boxShadow: 'inset 1px 0 2px rgba(0,0,0,0.3), 3px 0 4px rgba(0,0,0,0.15)',
          }}
        />

        {/* 3. MAIN HARDCOVER FRONT BOARD */}
        <div className={`relative flex-1 flex flex-col justify-between p-6 sm:p-7 ${coverGrad} text-white overflow-hidden z-10 border-l border-white/10`}>
          
          {/* Subtle Dynamic Geometric Backdrop Plate */}
          {id === 'modern-ai-agents' && <ModernAiCardBackdrop />}
          {id === 'nlp-llms' && <NlpCardBackdrop />}
          {id === 'deep-learning' && <DeepLearningCardBackdrop />}
          {id === 'classical-ml' && <MachineLearningCardBackdrop />}
          {id === 'cs-research' && <CsResearchCardBackdrop />}
          {id === 'mathematics' && <MathematicsCardBackdrop />}

          {/* Left Book Hinge Crease Shadow */}
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black/40 to-transparent pointer-events-none z-20" />

          {/* Content Wrapper */}
          <div className="relative z-10 space-y-4">
            
            {/* Publisher Monograph Header */}
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-amber-400" />
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/70">
                  {series}
                </span>
              </div>
              <span className={`font-mono text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${accentBadge}`}>
                {romanNumeral}
              </span>
            </div>

            {/* Book Title & Subtitle Plate */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-2">
                <span className={`font-mono text-xs font-black uppercase tracking-wider ${foilColor}`}>
                  {category}
                </span>
                <span className="text-white/40">•</span>
                <span className="font-mono text-[11px] font-semibold text-white/70">
                  {chapterCount} Chapters
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug drop-shadow-md">
                {title}
              </h3>

              <p className="text-xs font-medium text-white/80 leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Embedded Table of Contents Preview */}
            <div className="rounded-xl border border-white/15 bg-black/30 backdrop-blur-xs p-3 space-y-2 shadow-inner">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/60">
                  Core Chapters Index
                </span>
                <span className="text-[10px] font-mono font-bold text-amber-300">
                  ~{readTime}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-white/90">
                {featuredChapters.map((ch, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold text-white/50 shrink-0">
                      §{ch.num}
                    </span>
                    <span className="truncate leading-tight text-[11px] font-medium">
                      {ch.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Book Bottom Action Strip */}
          <div className="relative z-10 pt-4 mt-5 border-t border-white/15 flex items-center justify-between gap-3">
            <Link
              href={pathUrl}
              className="inline-flex items-center gap-1 text-xs font-bold text-white/80 hover:text-white transition-colors"
            >
              <span>View Full Syllabus</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>

            <Link
              href={startUrl}
              className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold shadow-lg transition-all hover:scale-105 active:scale-95 ${btnGrad}`}
              title="Open Textbook"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Read Textbook</span>
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
