'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Bot, 
  Sigma, 
  GraduationCap, 
  Boxes, 
  MessageSquareText, 
  Cpu, 
  BookOpen, 
  Bookmark,
  ChevronRight,
  Sparkles,
  ArrowRight
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
  const router = useRouter();
  const [isOpening, setIsOpening] = useState(false);

  const handleBookClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOpening) return;
    setIsOpening(true);
    // Smooth transition delay before navigation
    setTimeout(() => {
      router.push(startUrl);
    }, 550);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[340px] select-none [perspective:1400px]">
      
      {/* 1. PHYSICAL HARDBOUND BOOK CASING */}
      <div 
        onClick={handleBookClick}
        className={`group relative w-full aspect-[1/1.44] flex rounded-r-xl rounded-l-xs cursor-pointer transition-all duration-300 ${
          isOpening ? 'scale-[1.02] -translate-y-2' : 'hover:-translate-y-2'
        } ${coverStyles.coverBg}`}
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: isOpening
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 35px rgba(99, 102, 241, 0.25)`
            : `4px 6px 0px rgba(15, 23, 42, 0.08), 8px 12px 20px -2px rgba(15, 23, 42, 0.22), inset 0 1px 1px rgba(255, 255, 255, 0.2)`,
        }}
      >
        
        {/* PHYSICAL LEFT BOOK SPINE (Cloth Spine with Gold/Silver Embossing) */}
        <div 
          className={`w-6 sm:w-7 shrink-0 flex flex-col items-center justify-between py-5 border-r border-black/40 ${coverStyles.spineColor} shadow-[inset_-3px_0_6px_rgba(0,0,0,0.4)] relative z-30`}
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

        {/* INNER EXPOSED BOOK PAGES (Revealed when front cover swings open) */}
        <div 
          className="absolute inset-y-0 left-6 sm:left-7 right-0 bg-[#fbf9f4] dark:bg-[#141824] text-slate-800 dark:text-slate-200 p-5 rounded-r-xl z-10 flex flex-col justify-between overflow-hidden shadow-inner border-y border-r border-slate-300 dark:border-slate-800"
          style={{
            backgroundImage: 'radial-gradient(#e2e8f0 0.75px, transparent 0.75px)',
            backgroundSize: '16px 16px',
          }}
        >
          {/* Inner Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center justify-between">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              {romanNumeral} • FIRST CHAPTER
            </span>
            <span className="font-mono text-[9px] text-slate-400">
              Pg. 01
            </span>
          </div>

          {/* Inner Content Preview */}
          <div className="my-auto py-2 space-y-2">
            <span className="font-mono text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
              Monograph Opening...
            </span>
            <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-tight">
              {title}
            </h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-snug line-clamp-3">
              {subtitle}
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 animate-pulse">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Loading Interactive Proofs...</span>
            </div>
          </div>

          {/* Inner Footer */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-2 text-[10px] font-mono text-slate-400 flex items-center justify-between">
            <span>{chapterCount} Chapters</span>
            <span>{readTime}</span>
          </div>
        </div>

        {/* SWINGING HARDBOUND FRONT COVER BOARD */}
        <div 
          className={`absolute inset-y-0 left-6 sm:left-7 right-0 rounded-r-xl flex flex-col justify-between p-5 sm:p-6 ${coverStyles.clothTexture} text-white z-20 overflow-hidden transition-transform duration-500 ease-out`}
          style={{
            transformOrigin: 'left center',
            transform: isOpening ? 'rotateY(-120deg)' : 'rotateY(0deg)',
            backfaceVisibility: 'hidden',
            boxShadow: isOpening ? 'none' : 'inset 0 1px 1px rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* Top-to-Bottom Natural Light Reflection */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-black/[0.2] pointer-events-none" />

          {/* Left Hinge Crease Shadow */}
          <div className="absolute left-0 top-0 bottom-0 w-3.5 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />

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
            <span className="uppercase text-white/70 tracking-wider font-semibold">
              {editionLabel}
            </span>
            <span className="text-white/90 font-bold flex items-center gap-1">
              <span>⏱️ {readTime}</span>
            </span>
          </div>

        </div>

        {/* PHYSICAL RIGHT-EDGE PAPER STACK RIDGE */}
        <div 
          className="absolute -right-2 top-2 bottom-2 w-2 rounded-r-xs z-0 pointer-events-none opacity-80 hidden sm:block"
          style={{
            background: 'repeating-linear-gradient(to right, #fdfefe, #fdfefe 1px, #e2e8f0 1.5px, #94a3b8 2px)',
            boxShadow: 'inset 1px 0 2px rgba(0,0,0,0.25)',
          }}
        />

      </div>

      {/* 2. LOWER CARD CONTROLS (Open Monograph Button & Syllabus Link) */}
      <div className="w-full mt-3.5 flex items-center justify-between gap-2 px-1">
        <Link
          href={pathUrl}
          className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1"
        >
          <span>Full Syllabus</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>

        <button
          onClick={handleBookClick}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer"
        >
          <BookOpen className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>{isOpening ? 'Opening...' : 'Open Book'}</span>
        </button>
      </div>

    </div>
  );
}
