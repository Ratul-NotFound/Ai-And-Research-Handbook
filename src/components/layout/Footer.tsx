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
  Cpu,
  Globe,
  ExternalLink,
  Code2,
  MessageSquareText,
  Boxes
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
          
          {/* Col 1 & 2: Brand, Identity, Creator & Mission */}
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
              An open-access digital masterclass covering foundation LLMs, autonomous agent swarms, vector retrieval, deep learning architectures, and CS research methodology from mathematical first principles.
            </p>

            {/* AUTHOR / CREATOR SPOTLIGHT CARD */}
            <div className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/50 space-y-2 max-w-md shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white font-mono text-xs font-bold shadow-xs">
                    R
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-950 dark:text-white block leading-tight">
                      Mahmud Hasan Ratul
                    </span>
                    <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-medium">
                      Author & Platform Architect
                    </span>
                  </div>
                </div>

                <a
                  href="https://ratul-dev.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline bg-white dark:bg-slate-800 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 shadow-2xs"
                >
                  <Globe className="h-3 w-3" />
                  <span>Portfolio</span>
                  <ExternalLink className="h-2.5 w-2.5 ml-0.5 opacity-70" />
                </a>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                Full-Stack Developer & AI Automation Engineer specializing in High-Performance Web Systems, Autonomous Agent Workflows & Scalable Architectures.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
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
                  <span>Vol 01: Modern AI & Agents</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/topic/nlp-llms"
                  className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors flex items-center gap-1.5"
                >
                  <MessageSquareText className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                  <span>Vol 05: NLP & LLMs</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/topic/deep-learning"
                  className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors flex items-center gap-1.5"
                >
                  <Cpu className="h-3.5 w-3.5 text-violet-500 shrink-0" />
                  <span>Vol 06: Deep Learning</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/book/model-context-protocol-mcp-architecture"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors block text-[11px] text-slate-500 dark:text-slate-400 pl-5"
                >
                  • Model Context Protocol (MCP)
                </Link>
              </li>
              <li>
                <Link
                  href="/book/reasoning-models-o1-o3-deepseek-r1-mechanics"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors block text-[11px] text-slate-500 dark:text-slate-400 pl-5"
                >
                  • Reasoning Models (o1/o3/R1)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Mathematical Foundations & Research */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-950 dark:text-white flex items-center gap-1.5">
              <Sigma className="h-3.5 w-3.5 text-blue-500" />
              Math & Methodology
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/topic/mathematics"
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <Sigma className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                  <span>Vol 02: Math Foundations</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/topic/research-methodology"
                  className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors flex items-center gap-1.5"
                >
                  <GraduationCap className="h-3.5 w-3.5 text-sky-500 shrink-0" />
                  <span>Vol 03: CS Research</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/topic/classical-ml"
                  className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <Boxes className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>Vol 04: Classical ML</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/book/vector-spaces-matrix-geometry"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors block text-[11px] text-slate-500 dark:text-slate-400 pl-5"
                >
                  • SVD & Vector Spaces
                </Link>
              </li>
              <li>
                <Link
                  href="/book/what-is-research-methodology"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors block text-[11px] text-slate-500 dark:text-slate-400 pl-5"
                >
                  • Snowballing Search Method
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Platform & Author Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-950 dark:text-white flex items-center gap-1.5">
              <FileCode className="h-3.5 w-3.5 text-indigo-500" />
              Creator & Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://ratul-dev.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200"
                >
                  <Globe className="h-3.5 w-3.5 text-indigo-500" />
                  <span>Ratul's Portfolio</span>
                  <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Ratul-NotFound"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Code2 className="h-3.5 w-3.5 text-slate-400" />
                  <span>GitHub: @Ratul-NotFound</span>
                </a>
              </li>
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
                  <span>Global Search (⌘K)</span>
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Back to Top */}
      <div className="border-t border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-[#050810] py-4 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} AI & Research Handbook. Authored & Architected by <a href="https://ratul-dev.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Mahmud Hasan Ratul</a>.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-slate-400 dark:text-slate-500">
              Open-Access First-Principles Monograph
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
