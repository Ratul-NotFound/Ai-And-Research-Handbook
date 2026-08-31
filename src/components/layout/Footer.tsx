'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  ArrowUp,
  Globe,
  ExternalLink,
  Code2,
  Search,
  Sparkles,
  Smartphone
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070b14] text-slate-600 dark:text-slate-400 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Summary */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 font-bold text-slate-950 dark:text-white">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-xs">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="text-sm font-black tracking-tight">
                AI Research Handbook
              </span>
            </Link>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              An open-access digital library of 6 comprehensive AI textbooks covering foundational math to autonomous agents.
            </p>
            <div className="pt-1 flex items-center gap-2 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
              <Smartphone className="h-3.5 w-3.5" />
              <span>Offline Ready (PWA)</span>
            </div>
          </div>

          {/* Col 2: Textbooks Directory */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-950 dark:text-white">
              Curriculum Books
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/topic/modern-ai-agents" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Vol 01: Modern AI & Agents
                </Link>
              </li>
              <li>
                <Link href="/topic/mathematics" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Vol 02: Math Foundations
                </Link>
              </li>
              <li>
                <Link href="/topic/research-methodology" className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors">
                  Vol 03: CS Research
                </Link>
              </li>
              <li>
                <Link href="/topic/classical-ml" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Vol 04: Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/topic/nlp-llms" className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors">
                  Vol 05: NLP & LLMs
                </Link>
              </li>
              <li>
                <Link href="/topic/deep-learning" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Vol 06: Deep Learning
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Tools */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-950 dark:text-white">
              Resources
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/cheatsheet" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Master Cheatsheets
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    const evt = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
                    window.dispatchEvent(evt);
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1 text-left"
                >
                  <Search className="h-3 w-3" />
                  <span>Global Search (⌘K)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new CustomEvent('open-pwa-install'));
                    }
                  }}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
                >
                  Install PWA App
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Creator & Author */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-950 dark:text-white">
              Creator
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-slate-700 dark:text-slate-300 font-semibold">
                Mahmud Hasan Ratul
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                Full-Stack Developer & AI Automation Engineer
              </p>
              <div className="pt-1 flex flex-col gap-1.5">
                <a
                  href="https://ratul-dev.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>ratul-dev.vercel.app</span>
                  <ExternalLink className="h-2.5 w-2.5 opacity-70" />
                </a>
                <a
                  href="https://github.com/Ratul-NotFound"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  <Code2 className="h-3.5 w-3.5" />
                  <span>GitHub: @Ratul-NotFound</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Clean Copyright & Back to Top */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div>
            <span>© {new Date().getFullYear()} AI Research Handbook. Created by <a href="https://ratul-dev.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Mahmud Hasan Ratul</a>.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>Back to top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
