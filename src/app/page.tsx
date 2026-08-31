'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import MobileDrawer from '@/components/layout/MobileDrawer';
import Footer from '@/components/layout/Footer';
import CommandPalette from '@/components/search/CommandPalette';
import { 
  CsResearchCardBackdrop, 
  MachineLearningCardBackdrop, 
  DeepLearningCardBackdrop,
  NlpCardBackdrop,
  MathematicsCardBackdrop
} from '@/components/home/CardBackdrops';
import { 
  BookOpen, 
  Compass, 
  Search, 
  GraduationCap,
  Boxes,
  Cpu,
  MessageSquareText,
  Sigma,
  Sparkles,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

interface MasterPath {
  id: string;
  title: string;
  badge: string;
  topicCount: number;
  chapterCount: number;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  cardGradient: string;
  borderClass: string;
  badgeClass: string;
  primaryButton: string;
  pathUrl: string;
  startChapterUrl: string;
  highlights: string[];
}

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // 5 Flagship Curriculum Portals (Unified, Clean, Modern Architecture)
  const masterPaths: MasterPath[] = [
    {
      id: 'cs-research',
      title: 'CS Research Methodology',
      badge: 'Scientific Method',
      topicCount: 6,
      chapterCount: 18,
      description: 'The complete end-to-end framework for formulation, snowballing literature search, data collection & DVC provenance, leak-free training protocols, and pre-submission conference verification.',
      icon: <GraduationCap className="h-6 w-6 text-sky-600 dark:text-cyan-400" />,
      iconBg: 'bg-sky-50 dark:bg-sky-950/80 border-sky-200/80 dark:border-sky-800 text-sky-600 dark:text-cyan-400',
      cardGradient: 'from-sky-500/[0.05] via-sky-500/[0.01] to-transparent dark:from-sky-500/[0.08] dark:via-transparent dark:to-transparent',
      borderClass: 'border-slate-200/90 dark:border-slate-800 hover:border-sky-400 dark:hover:border-sky-500/80 hover:shadow-xl hover:shadow-sky-500/[0.06]',
      badgeClass: 'bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-cyan-300 border-sky-200 dark:border-sky-800',
      primaryButton: 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs hover:shadow-md hover:shadow-sky-500/20',
      pathUrl: '/topic/research-methodology',
      startChapterUrl: '/book/what-is-research-methodology',
      highlights: [
        '5-Stage Systematic Snowballing Literature Search',
        'Data Modality & 5-Step Leak-Free Preprocessing',
        'Master Model Selection & 7-Step Training Protocol',
        'Error Taxonomy (Bias, Variance, Leakage, Shift)',
      ]
    },
    {
      id: 'classical-ml',
      title: 'Machine Learning (The Complete Book)',
      badge: '15 In-Depth Chapters',
      topicCount: 1,
      chapterCount: 15,
      description: 'From first-principles foundations, data preprocessing, and convex optimization to tree ensembles (XGBoost/LightGBM/CatBoost), SVM kernels, deep neural networks, CNNs, and Optuna tuning.',
      icon: <Boxes className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200/80 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400',
      cardGradient: 'from-emerald-500/[0.05] via-emerald-500/[0.01] to-transparent dark:from-emerald-500/[0.08] dark:via-transparent dark:to-transparent',
      borderClass: 'border-slate-200/90 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500/80 hover:shadow-xl hover:shadow-emerald-500/[0.06]',
      badgeClass: 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      primaryButton: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs hover:shadow-md hover:shadow-emerald-500/20',
      pathUrl: '/topic/classical-ml',
      startChapterUrl: '/book/what-is-machine-learning-foundations',
      highlights: [
        'ML Paradigm Shift (Data + Answers = Rules) & 9-Phase Lifecycle',
        'Data Preprocessing, Outliers, RobustScaler & Leak-Free Splits',
        'Linear/Logistic Regression & House Pricing Worked Calculation',
        'Random Forest & Gradient Boosting (XGBoost, LightGBM, CatBoost)',
      ]
    },
    {
      id: 'deep-learning',
      title: 'Deep Learning (From Neurons to Transformers)',
      badge: '15 In-Depth Chapters',
      topicCount: 1,
      chapterCount: 15,
      description: 'From artificial neurons, activation functions, and backpropagation to CNNs, ResNet, LSTMs, Self-Attention, Transformers (BERT/GPT), Diffusion Generative models, and TensorRT deployment.',
      icon: <Cpu className="h-6 w-6 text-violet-600 dark:text-violet-400" />,
      iconBg: 'bg-violet-50 dark:bg-violet-950/80 border-violet-200/80 dark:border-violet-800 text-violet-600 dark:text-violet-400',
      cardGradient: 'from-violet-500/[0.05] via-violet-500/[0.01] to-transparent dark:from-violet-500/[0.08] dark:via-transparent dark:to-transparent',
      borderClass: 'border-slate-200/90 dark:border-slate-800 hover:border-violet-400 dark:hover:border-violet-500/80 hover:shadow-xl hover:shadow-violet-500/[0.06]',
      badgeClass: 'bg-violet-50 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800',
      primaryButton: 'bg-violet-600 hover:bg-violet-700 text-white shadow-xs hover:shadow-md hover:shadow-violet-500/20',
      pathUrl: '/topic/deep-learning',
      startChapterUrl: '/book/the-perceptron-artificial-neuron',
      highlights: [
        'The Perceptron, Activation Zoo & Multi-Layer Forward Pass',
        'Backpropagation Chain Rule & Adam/AdamW Optimizers',
        'CNNs, ResNet Skip Connections & YOLO/UNet Architectures',
        'Self-Attention, Transformers (BERT/GPT) & Diffusion SOTA',
      ]
    },
    {
      id: 'nlp-llms',
      title: 'Natural Language Processing & LLMs',
      badge: '15 In-Depth Chapters',
      topicCount: 1,
      chapterCount: 15,
      description: 'From linguistic hierarchies, text preprocessing, and word embeddings (Word2Vec/GloVe) to self-attention, BERT, GPT-4, LoRA fine-tuning, DPO alignment, and RAG vector search.',
      icon: <MessageSquareText className="h-6 w-6 text-pink-600 dark:text-pink-400" />,
      iconBg: 'bg-pink-50 dark:bg-pink-950/80 border-pink-200/80 dark:border-pink-800 text-pink-600 dark:text-pink-400',
      cardGradient: 'from-pink-500/[0.05] via-pink-500/[0.01] to-transparent dark:from-pink-500/[0.08] dark:via-transparent dark:to-transparent',
      borderClass: 'border-slate-200/90 dark:border-slate-800 hover:border-pink-400 dark:hover:border-pink-500/80 hover:shadow-xl hover:shadow-pink-500/[0.06]',
      badgeClass: 'bg-pink-50 dark:bg-pink-950/80 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800',
      primaryButton: 'bg-pink-600 hover:bg-pink-700 text-white shadow-xs hover:shadow-md hover:shadow-pink-500/20',
      pathUrl: '/topic/nlp-llms',
      startChapterUrl: '/book/foundations-of-nlp-linguistic-hierarchy',
      highlights: [
        'Linguistic Hierarchy, Text Preprocessing & BPE Tokenization',
        'TF-IDF, Word2Vec, GloVe & FastText Subword Embeddings',
        'Self-Attention, Transformer Blocks, BERT & GPT-4 LLMs',
        'LoRA Fine-Tuning, DPO Alignment & Vector DB RAG Pipelines',
      ]
    },
    {
      id: 'mathematics',
      title: 'Mathematical Foundations for AI',
      badge: 'Rigorous Math',
      topicCount: 3,
      chapterCount: 11,
      description: 'High-dimensional vector spaces, SVD low-rank matrix approximations, Vector-Jacobian Products (VJPs), non-convex optimization loss landscapes, Maximum Likelihood, and Information Theory.',
      icon: <Sigma className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
      iconBg: 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-200/80 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400',
      cardGradient: 'from-indigo-500/[0.05] via-indigo-500/[0.01] to-transparent dark:from-indigo-500/[0.08] dark:via-transparent dark:to-transparent',
      borderClass: 'border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/80 hover:shadow-xl hover:shadow-indigo-500/[0.06]',
      badgeClass: 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
      primaryButton: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-md hover:shadow-indigo-500/20',
      pathUrl: '/topic/mathematics',
      startChapterUrl: '/book/vector-spaces-matrix-geometry',
      highlights: [
        'Vector Spaces, Basis Transformations & SVD Decompositions',
        'Multivariate Gradients, Hessians & Taylor Approximations',
        'Probability Distributions, Maximum Likelihood & Bayes Rule',
        'Information Theory: Entropy, Cross-Entropy & KL Divergence',
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
      <main suppressHydrationWarning className="mx-auto flex-1 w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
        
        {/* HERO BANNER */}
        <section suppressHydrationWarning className="text-center space-y-4 max-w-3xl mx-auto">
          <div suppressHydrationWarning className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-3.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-sky-500" />
            <span>First-Principles Computer Science & AI Handbook</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            The Living Artificial Intelligence & CS Research Handbook
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            A comprehensive, offline-first curriculum designed for researchers, graduate students, and engineers. Every chapter features interactive visualizers, step-by-step decision trees, and mathematical rigor.
          </p>

          <div suppressHydrationWarning className="pt-2 flex items-center justify-center gap-3 flex-wrap">
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

        {/* 5 PRIMARY CURRICULUM PATHS (Separated Domain Portals) */}
        <section suppressHydrationWarning className="space-y-6">
          <div suppressHydrationWarning className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div suppressHydrationWarning>
              <span className="text-xs font-mono font-bold uppercase text-sky-600 dark:text-cyan-400 block">
                Separated Curriculum Portals
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                Choose Your Research Path
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              12 Topics • 74 Chapters
            </span>
          </div>

          <div suppressHydrationWarning className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {masterPaths.map((path) => (
              <div
                key={path.id}
                suppressHydrationWarning
                className={`group relative overflow-hidden flex flex-col justify-between rounded-2xl border bg-gradient-to-b ${path.cardGradient} bg-white dark:bg-slate-900/90 p-5 sm:p-6 shadow-xs hover:shadow-xl transition-all duration-300 ${path.borderClass}`}
              >
                {/* Topic-Relevant Subtle Integrated Background */}
                {path.id === 'cs-research' && <CsResearchCardBackdrop />}
                {path.id === 'classical-ml' && <MachineLearningCardBackdrop />}
                {path.id === 'deep-learning' && <DeepLearningCardBackdrop />}
                {path.id === 'nlp-llms' && <NlpCardBackdrop />}
                {path.id === 'mathematics' && <MathematicsCardBackdrop />}

                <div className="relative z-10 space-y-4">
                  {/* Top Bar: Icon + Badge + Counts */}
                  <div className="flex items-center justify-between">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl border shadow-2xs group-hover:scale-105 transition-transform ${path.iconBg}`}>
                      {path.icon}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`rounded-md border px-2 py-0.5 text-[9px] font-mono font-bold uppercase ${path.badgeClass}`}>
                        {path.badge}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-semibold bg-slate-100/70 dark:bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-700/60">
                        {path.topicCount} Topics • {path.chapterCount} Ch
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5 pt-1">
                    <h3 className="text-lg font-black text-slate-950 dark:text-white tracking-tight leading-snug">
                      {path.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                      {path.description}
                    </p>
                  </div>

                  {/* Key Highlights Checklist */}
                  <div className="pt-3 space-y-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[9px] font-mono font-bold uppercase text-slate-400 dark:text-slate-500 block tracking-wider">
                      Core Syllabus Highlights:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {path.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="relative z-10 pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                  <Link
                    href={path.pathUrl}
                    className="flex-1 inline-flex items-center justify-center gap-1 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 px-3.5 py-2.5 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-950 dark:hover:text-white transition-colors shadow-2xs"
                  >
                    <span>View Roadmap</span>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                  </Link>

                  <Link
                    href={path.startChapterUrl}
                    className={`inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-bold shadow-xs transition-all shrink-0 ${path.primaryButton}`}
                    title="Start Chapter 1"
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Start Ch 1</span>
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
