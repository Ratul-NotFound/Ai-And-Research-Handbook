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
  Bookmark,
  ChevronRight
} from 'lucide-react';

export interface AuthenticBookProps {
  id: string;
  volume: string;
  romanNumeral: string;
  publisherSeries: string;
  title: string;
  subtitle: string;
  editionLabel: string;
  chapterCount: number;
  readTime: string;
  coverStyles: {
    coverBg: string;
    clothTexture: string;
    foilColor: string;
    foilBorder: string;
    spineColor: string;
    badgeStyle: string;
    emblemBg: string;
  };
  emblemSvg: React.ReactNode;
  pathUrl: string;
  startUrl: string;
  syllabusHighlights: string[];
}

export default function AuthenticBook({
  id,
  volume,
  romanNumeral,
  publisherSeries,
  title,
  subtitle,
  editionLabel,
  chapterCount,
  readTime,
  coverStyles,
  emblemSvg,
  pathUrl,
  startUrl,
  syllabusHighlights,
}: AuthenticBookProps) {
  return (
    <div className="flex flex-col items-center w-full max-w-[340px]">
      
      {/* 1. PHYSICAL HARDBOUND BOOK CASING */}
      <Link 
        href={startUrl}
        className={`group relative w-full aspect-[1/1.44] flex rounded-r-xl rounded-l-xs overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer ${coverStyles.coverBg}`}
        style={{
          boxShadow: `
            4px 6px 0px rgba(15, 23, 42, 0.08),
            8px 12px 20px -2px rgba(15, 23, 42, 0.22),
            inset 0 1px 1px rgba(255, 255, 255, 0.2)
          `,
        }}
      >
        
        {/* PHYSICAL LEFT BOOK SPINE (Cloth Spine with Gold/Silver Embossing) */}
        <div 
          className={`w-6 sm:w-7 shrink-0 flex flex-col items-center justify-between py-5 border-r border-black/30 ${coverStyles.spineColor} shadow-[inset_-3px_0_6px_rgba(0,0,0,0.35)] relative z-20`}
        >
          {/* Top Spine Seal */}
          <div className="w-1.5 h-1.5 rounded-full bg-white/60" />

          {/* Vertical Spine Title */}
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/80 [writing-mode:vertical-lr] rotate-180 my-auto py-2">
            {volume} • AI HANDBOOK
          </span>

          {/* Bottom Spine Ribbon */}
          <Bookmark className="h-3 w-3 text-white/70" />
        </div>

        {/* PHYSICAL RIGHT-EDGE PAPER STACK RIDGE */}
        <div 
          className="absolute -right-2 top-2 bottom-2 w-2 rounded-r-xs z-0 pointer-events-none opacity-80 hidden sm:block"
          style={{
            background: 'repeating-linear-gradient(to right, #fdfefe, #fdfefe 1px, #e2e8f0 1.5px, #94a3b8 2px)',
            boxShadow: 'inset 1px 0 2px rgba(0,0,0,0.25)',
          }}
        />

        {/* MAIN HARDBOUND COVER FRONT BOARD */}
        <div className={`relative flex-1 flex flex-col justify-between p-5 sm:p-6 ${coverStyles.clothTexture} text-white z-10 overflow-hidden`}>
          
          {/* Top-to-Bottom Natural Light Reflection */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-black/[0.2] pointer-events-none" />

          {/* Left Hinge Crease Shadow */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/35 to-transparent pointer-events-none" />

          {/* TOP PUBLISHER MONOGRAPH SEAL */}
          <div className="relative z-10 border-b border-white/20 pb-2.5 flex items-center justify-between">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/80">
              {publisherSeries}
            </span>
            <span className={`font-mono text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${coverStyles.badgeStyle}`}>
              {romanNumeral}
            </span>
          </div>

          {/* CENTER DEBOSSED FOIL PLATE & TITLE */}
          <div className="relative z-10 my-auto py-2 space-y-2.5">
            
            {/* Subject Volume Header */}
            <div className="flex items-center gap-2">
              <span className={`font-mono text-[10px] font-black uppercase tracking-wider ${coverStyles.foilColor}`}>
                {volume}
              </span>
              <span className="text-white/30">•</span>
              <span className="font-mono text-[10px] font-semibold text-white/70">
                {chapterCount} Chapters
              </span>
            </div>

            {/* Book Title */}
            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug drop-shadow-sm">
              {title}
            </h3>

            {/* Subtitle */}
            <p className="text-xs font-medium text-white/75 leading-tight">
              {subtitle}
            </p>

            {/* Embossed Subject Emblem Graphic Frame */}
            <div className={`my-2 w-full h-20 rounded-lg border ${coverStyles.foilBorder} ${coverStyles.emblemBg} flex items-center justify-center p-2 shadow-inner overflow-hidden relative`}>
              {emblemSvg}
            </div>

            {/* Key Curriculum Bullet Points */}
            <div className="space-y-1 text-[10px] font-mono text-white/80 pt-0.5">
              {syllabusHighlights.slice(0, 2).map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 truncate">
                  <span className="text-white/40">§</span>
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>

          </div>

          {/* BOTTOM COVER FOOTER (Edition Seal & Reading Time) */}
          <div className="relative z-10 pt-2.5 border-t border-white/20 flex items-center justify-between text-[10px] font-mono">
            <span className="font-bold text-white/70 uppercase">
              {editionLabel}
            </span>
            <span className="text-white/90 font-semibold">
              ⏱️ {readTime}
            </span>
          </div>

        </div>

      </Link>

      {/* 2. SUBTLE ACTION STRIP BELOW BOOK */}
      <div className="w-full flex items-center justify-between px-2 pt-3 text-xs font-semibold">
        <Link
          href={pathUrl}
          className="text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors inline-flex items-center gap-1"
        >
          <span>Full Syllabus</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          href={startUrl}
          className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1.5"
        >
          <BookOpen className="h-3.5 w-3.5" />
          <span>Read Online</span>
        </Link>
      </div>

    </div>
  );
}
