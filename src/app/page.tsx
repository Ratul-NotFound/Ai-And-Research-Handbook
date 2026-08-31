'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import MobileDrawer from '@/components/layout/MobileDrawer';
import Footer from '@/components/layout/Footer';
import CommandPalette from '@/components/search/CommandPalette';
import { 
  BookOpen, 
  ArrowRight, 
  Compass, 
  Search, 
  GraduationCap,
  Boxes,
  Cpu,
  Flame,
  Sigma,
  Eye,
  MessageSquareText,
  Zap,
  Sparkles,
  Layers,
  ChevronRight,
  Target,
  CheckCircle2
} from 'lucide-react';

interface MasterPath {
  id: string;
  title: string;
  badge: string;
  topicCount: number;
  chapterCount: number;
  description: string;
  icon: React.ReactNode;
  accentBorder: string;
  accentBg: string;
  badgeBg: string;
  pathUrl: string;
  startChapterUrl: string;
  highlights: string[];
}

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // 3 Primary Separated Curriculum Pillars
  const masterPaths: MasterPath[] = [
    {
      id: 'cs-research',
      title: 'CS Research Methodology',
      badge: 'Scientific Method',
      topicCount: 6,
      chapterCount: 18,
      description: 'The definitive end-to-end framework for research question formulation, snowballing literature search, data collection & DVC provenance, leak-free training protocols, metric evaluation, and pre-submission conference verification.',
      icon: <GraduationCap className="h-7 w-7 text-sky-600 dark:text-cyan-400" />,
      accentBorder: 'border-sky-200 dark:border-sky-800/80 hover:border-sky-500',
      accentBg: 'bg-sky-50/30 dark:bg-sky-950/20',
      badgeBg: 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-cyan-300 border-sky-200 dark:border-sky-800',
      pathUrl: '/topic/research-methodology',
      startChapterUrl: '/book/what-is-research-methodology',
      highlights: [
        '5-Stage Systematic Snowballing Literature Search',
        'Data Modality & 5-Step Leak-Free Preprocessing',
        'Master Model Selection & 7-Step Training Protocol',
        'Error Taxonomy (Bias, Variance, Leakage, Shift)',
        'Domain Evaluation Metrics & Statistical Significance',
        'End-to-End Decision Tree & Pre-Submission Checklist'
      ]
    },
    {
      id: 'classical-ml',
      title: 'Machine Learning (The Complete Book)',
      badge: '15 In-Depth Chapters',
      topicCount: 1,
      chapterCount: 15,
      description: 'From first-principles foundations, data preprocessing, and convex optimization to tree ensembles (XGBoost/LightGBM/CatBoost), SVM kernels, deep neural networks, CNNs, recommendation systems, time-series forecasting, and Optuna hyperparameter tuning.',
      icon: <Boxes className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />,
      accentBorder: 'border-emerald-200 dark:border-emerald-800/80 hover:border-emerald-500',
      accentBg: 'bg-emerald-50/30 dark:bg-emerald-950/20',
      badgeBg: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      pathUrl: '/topic/classical-ml',
      startChapterUrl: '/book/what-is-machine-learning-foundations',
      highlights: [
        'ML Paradigm Shift (Data + Answers = Rules) & 9-Phase Lifecycle',
        'Data Preprocessing, Outliers, RobustScaler & Leak-Free Splits',
        'Linear/Logistic Regression & House Pricing Worked Calculation',
        'Random Forest & Gradient Boosting (XGBoost, LightGBM, CatBoost)',
        'Neural Networks, Backprop Chain Rule & CNN Vision Architectures',
        'PCA, Recommender Systems (NDCG), Time Series & Optuna Tuning'
      ]
    },
    {
      id: 'mathematics',
      title: 'Mathematical Foundations for AI',
      badge: 'Rigorous Math',
      topicCount: 3,
      chapterCount: 11,
      description: 'High-dimensional vector spaces, SVD low-rank matrix approximations, Vector-Jacobian Products (VJPs), non-convex optimization loss landscapes, Maximum Likelihood Estimation, and Information Theory.',
      icon: <Sigma className="h-7 w-7 text-blue-600 dark:text-blue-400" />,
      accentBorder: 'border-blue-200 dark:border-blue-800/80 hover:border-blue-500',
      accentBg: 'bg-blue-50/30 dark:bg-blue-950/20',
      badgeBg: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      pathUrl: '/topic/mathematics',
      startChapterUrl: '/book/vector-spaces-matrix-geometry',
      highlights: [
        'Vector Spaces, Basis Transformations & SVD Decompositions',
        'Multivariate Gradients, Hessians & Taylor Approximations',
        'Probability Distributions, Maximum Likelihood & Bayes Rule',
        'Information Theory: Entropy, Cross-Entropy & KL Divergence'
      ]
    }
  ];

  return (
    <div suppressHydrationWarning className="flex min-h-[100dvh] flex-col bg-white dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 transition-colors">
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onToggleSidebar={() => setMobileDrawerOpen(true)}
      />

      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      />

      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Main Content Area */}
      <main className="mx-auto flex-1 w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
        
        {/* HERO BANNER */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-3.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-sky-500" />
            <span>First-Principles Computer Science & AI Handbook</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            The Living Artificial Intelligence & CS Research Handbook
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            A comprehensive, offline-first curriculum designed for researchers, graduate students, and engineers. Every chapter features interactive visualizers, step-by-step decision trees, and mathematical rigor.
          </p>

          <div className="pt-2 flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 text-xs font-bold shadow-xs hover:bg-sky-600 dark:hover:bg-cyan-300 transition-colors"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Search Handbook (⌘K)</span>
            </button>

            <Link
              href="/cheatsheet"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-5 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Compass className="h-3.5 w-3.5 text-violet-500" />
              <span>Master Cheatsheet</span>
            </Link>
          </div>
        </section>

        {/* 3 PRIMARY CURRICULUM PATHS (Separated Domain Portals) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-sky-600 dark:text-cyan-400 block">
                Separated Curriculum Portals
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                Choose Your Research Path
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              14 Topics • 54 Chapters
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {masterPaths.map((path) => (
              <div
                key={path.id}
                className={`group flex flex-col justify-between rounded-2xl border p-6 sm:p-7 shadow-xs transition-all duration-200 ${path.accentBorder} ${path.accentBg}`}
              >
                <div className="space-y-4">
                  {/* Top Badge & Topic Count */}
                  <div className="flex items-center justify-between">
                    <span className={`rounded-md border px-2 py-0.5 text-[10px] font-mono font-bold uppercase ${path.badgeBg}`}>
                      {path.badge}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold">
                      {path.topicCount} Topics • {path.chapterCount} Ch
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="space-y-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
                      {path.icon}
                    </div>
                    <h3 className="text-xl font-black text-slate-950 dark:text-white tracking-tight leading-snug">
                      {path.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {path.description}
                  </p>

                  {/* Key Highlights Checklist */}
                  <div className="pt-2 space-y-2 border-t border-slate-200/60 dark:border-slate-800/60">
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
                      Core Syllabus Highlights:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {path.highlights.slice(0, 4).map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 mt-6 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-2">
                  <Link
                    href={path.pathUrl}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 text-xs font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-2xs"
                  >
                    <span>View Full Path Roadmap</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>

                  <Link
                    href={path.startChapterUrl}
                    className="inline-flex items-center justify-center gap-1 rounded-xl bg-slate-900 dark:bg-white px-3.5 py-2.5 text-xs font-bold text-white dark:text-slate-900 shadow-2xs hover:bg-sky-600 dark:hover:bg-cyan-300 transition-colors shrink-0"
                    title="Start Chapter 1"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Start</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
