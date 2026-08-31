'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Bot, 
  Brain, 
  Sparkles, 
  Binary, 
  GraduationCap, 
  Sigma, 
  Smartphone, 
  Search, 
  ArrowUp,
  FileCode,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#070b14] text-slate-600 dark:text-slate-400 transition-colors">
      {/* Upper Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Col 1 & 2: Brand, Identity & Mission (Takes 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-slate-950 dark:text-white block leading-tight">
                  AI Research Handbook
                </span>
                <span className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
                  First-Principles Digital Platform
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
              A masterclass digital encyclopedia covering modern artificial intelligence, foundation LLMs, autonomous agent swarms, vector retrieval, deep learning architectures, and CS research methodology from mathematical first principles.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                <Smartphone className="h-3.5 w-3.5" />
                Offline Ready (PWA)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-purple-200 dark:border-purple-900/60 bg-purple-50 dark:bg-purple-950/40 px-2.5 py-1 text-[11px] font-medium text-purple-700 dark:text-purple-300">
                <Cpu className="h-3.5 w-3.5" />
                Next.js 16 Turbopack
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                <ShieldCheck className="h-3.5 w-3.5 text-sky-500" />
                Zero-Tracking
              </span>
            </div>
          </div>

          {/* Col 3: Core AI & LLM Textbooks */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-950 dark:text-white flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-purple-500" />
              Modern AI & NLP
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/topic/modern-ai-agents"
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1.5"
                >
                  <Bot className="h-3.5 w-3.5 text-purple-500 shrink-0" />
                  <span>Modern AI & Agents (15 Ch)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/topic/nlp-llms"
                  className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors flex items-center gap-1.5"
                >
                  <Brain className="h-3.5 w-3.5 text-pink-500 shrink-0" />
                  <span>NLP & LLMs (15 Ch)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/topic/deep-learning"
                  className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors flex items-center gap-1.5"
                >
                  <Binary className="h-3.5 w-3.5 text-violet-500 shrink-0" />
                  <span>Deep Learning (15 Ch)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Foundations & Research Textbooks */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-950 dark:text-white flex items-center gap-1.5">
              <GraduationCap className="h-3.5 w-3.5 text-emerald-500" />
              Foundations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/topic/machine-learning"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <Cpu className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>Machine Learning (15 Ch)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/topic/research-methodology"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors flex items-center gap-1.5"
                >
                  <GraduationCap className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                  <span>CS Research Methodology (18 Ch)</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/topic/mathematics"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                >
                  <Sigma className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                  <span>Math for AI (11 Ch)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Reference & Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-950 dark:text-white flex items-center gap-1.5">
              <FileCode className="h-3.5 w-3.5 text-amber-500" />
              Quick Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/cheatsheet"
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <span>High-Yield Cheatsheets</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    const evt = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
                    window.dispatchEvent(evt);
                  }}
                  className="hover:text-sky-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-left"
                >
                  <Search className="h-3.5 w-3.5 text-slate-400" />
                  <span>Global Search (⌘K / Ctrl+K)</span>
                </button>
              </li>
              <li>
                <Link
                  href="/"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <span>Platform Portal Home</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Back to Top */}
      <div className="border-t border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-[#050810] py-4 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} AI Research Handbook. Open Knowledge Initiative.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-slate-400 dark:text-slate-500">
              First-principles education for engineers & researchers
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
