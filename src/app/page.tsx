'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import MobileDrawer from '@/components/layout/MobileDrawer';
import Footer from '@/components/layout/Footer';
import CommandPalette from '@/components/search/CommandPalette';
import AuthenticBook, { AuthenticBookProps } from '@/components/home/AuthenticBook';
import { 
  Bot, 
  Sigma, 
  GraduationCap, 
  Boxes, 
  MessageSquareText, 
  Cpu, 
  Search, 
  Compass, 
  Sparkles,
  BookOpen,
  Route,
  Zap,
  CheckCircle2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { 
  ModernAiCardBackdrop, 
  MathematicsCardBackdrop, 
  CsResearchCardBackdrop, 
  MachineLearningCardBackdrop, 
  NlpCardBackdrop, 
  DeepLearningCardBackdrop 
} from '@/components/home/CardBackdrops';

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'agents' | 'math-research' | 'ml-nlp'>('all');

  // 6 Primary Hardbound Textbooks in exact requested order:
  // 1. Modern AI -> 2. Math -> 3. Research Methodology -> 4. ML -> 5. NLP -> 6. Deep Learning
  const allBooks: (AuthenticBookProps & { filterCategory: 'agents' | 'math-research' | 'ml-nlp' })[] = [
    {
      id: 'modern-ai-agents',
      volume: 'VOL. 01',
      romanNumeral: 'VOLUME I',
      publisherSeries: 'AUTONOMOUS SYSTEMS MONOGRAPH',
      title: 'Modern AI & Autonomous Systems',
      subtitle: 'LLMs, Reasoning Engines, MCP & Swarms',
      editionLabel: 'FIRST-PRINCIPLES EDITION',
      chapterCount: 15,
      readTime: '4.5 hrs',
      filterCategory: 'agents',
      coverStyles: {
        coverBg: 'bg-[#1a1c38]',
        clothTexture: 'bg-gradient-to-br from-[#24274c] via-[#1a1c38] to-[#111224]',
        foilColor: 'text-indigo-300 font-bold',
        foilBorder: 'border-indigo-400/30',
        spineColor: 'bg-[#15172e]',
        badgeStyle: 'bg-indigo-900/60 text-indigo-200 border-indigo-500/40',
        emblemBg: 'bg-[#111326]/80',
      },
      emblemSvg: <ModernAiCardBackdrop />,
      pathUrl: '/topic/modern-ai-agents',
      startUrl: '/book/how-modern-llms-work-internals-tokens-kvcache',
      syllabusHighlights: [
        'Autoregressive KV-Caching & Token Logits',
        'Reasoning Models (o1, o3, DeepSeek-R1)',
        'Model Context Protocol (MCP) Standards',
        'Multi-Agent Swarms & LangGraph Teams',
      ]
    },
    {
      id: 'mathematics',
      volume: 'VOL. 02',
      romanNumeral: 'VOLUME II',
      publisherSeries: 'MATHEMATICAL FOUNDATIONS',
      title: 'Mathematical Foundations for AI',
      subtitle: 'Vector Spaces, SVD, Gradients & Entropy',
      editionLabel: 'RIGOROUS PROOFS EDITION',
      chapterCount: 11,
      readTime: '3.5 hrs',
      filterCategory: 'math-research',
      coverStyles: {
        coverBg: 'bg-[#0f2438]',
        clothTexture: 'bg-gradient-to-br from-[#163654] via-[#0f2438] to-[#0a1724]',
        foilColor: 'text-sky-300 font-bold',
        foilBorder: 'border-sky-400/30',
        spineColor: 'bg-[#0b1c2c]',
        badgeStyle: 'bg-sky-900/60 text-sky-200 border-sky-500/40',
        emblemBg: 'bg-[#081522]/80',
      },
      emblemSvg: <MathematicsCardBackdrop />,
      pathUrl: '/topic/mathematics',
      startUrl: '/book/vector-spaces-matrix-geometry',
      syllabusHighlights: [
        'Vector Spaces, Linear Maps & SVD',
        'Multivariate Gradients & Hessians',
        'Probability Theory & Maximum Likelihood',
        'Information Theory & KL Divergence',
      ]
    },
    {
      id: 'cs-research',
      volume: 'VOL. 03',
      romanNumeral: 'VOLUME III',
      publisherSeries: 'RESEARCH METHODOLOGY',
      title: 'CS Research Methodology',
      subtitle: 'Formulation, Snowballing & Paper Writing',
      editionLabel: 'SCIENTIFIC FRAMEWORK',
      chapterCount: 18,
      readTime: '5.0 hrs',
      filterCategory: 'math-research',
      coverStyles: {
        coverBg: 'bg-[#18262f]',
        clothTexture: 'bg-gradient-to-br from-[#233744] via-[#18262f] to-[#0e181e]',
        foilColor: 'text-cyan-300 font-bold',
        foilBorder: 'border-cyan-400/30',
        spineColor: 'bg-[#121d24]',
        badgeStyle: 'bg-cyan-900/60 text-cyan-200 border-cyan-500/40',
        emblemBg: 'bg-[#0b1318]/80',
      },
      emblemSvg: <CsResearchCardBackdrop />,
      pathUrl: '/topic/research-methodology',
      startUrl: '/book/what-is-research-methodology',
      syllabusHighlights: [
        '5-Stage Snowballing Literature Discovery',
        '5-Step Leak-Free Data Preprocessing',
        'Model Selection & Training Protocol',
        'Error Taxonomy (Bias, Variance, Shift)',
      ]
    },
    {
      id: 'classical-ml',
      volume: 'VOL. 04',
      romanNumeral: 'VOLUME IV',
      publisherSeries: 'STATISTICAL MACHINE LEARNING',
      title: 'Machine Learning: Complete Book',
      subtitle: 'Convex Optim, Trees, SVMs & Optuna',
      editionLabel: 'ALGORITHMIC WORKFLOWS',
      chapterCount: 15,
      readTime: '4.5 hrs',
      filterCategory: 'ml-nlp',
      coverStyles: {
        coverBg: 'bg-[#0f2c22]',
        clothTexture: 'bg-gradient-to-br from-[#163f31] via-[#0f2c22] to-[#091c16]',
        foilColor: 'text-emerald-300 font-bold',
        foilBorder: 'border-emerald-400/30',
        spineColor: 'bg-[#0c241c]',
        badgeStyle: 'bg-emerald-900/60 text-emerald-200 border-emerald-500/40',
        emblemBg: 'bg-[#071711]/80',
      },
      emblemSvg: <MachineLearningCardBackdrop />,
      pathUrl: '/topic/classical-ml',
      startUrl: '/book/what-is-machine-learning-foundations',
      syllabusHighlights: [
        'ML Paradigm Shift & 9-Phase Lifecycle',
        'Linear/Logistic Worked Proof Calculations',
        'Random Forest, XGBoost & LightGBM',
        'Bayesian Search & Optuna Tuning',
      ]
    },
    {
      id: 'nlp-llms',
      volume: 'VOL. 05',
      romanNumeral: 'VOLUME V',
      publisherSeries: 'COMPUTATIONAL LINGUISTICS',
      title: 'Natural Language Processing & LLMs',
      subtitle: 'Tokenization, Self-Attention & LoRA',
      editionLabel: 'TRANSFORMER MONOGRAPH',
      chapterCount: 15,
      readTime: '4.5 hrs',
      filterCategory: 'ml-nlp',
      coverStyles: {
        coverBg: 'bg-[#33111b]',
        clothTexture: 'bg-gradient-to-br from-[#4a1a28] via-[#33111b] to-[#220a11]',
        foilColor: 'text-rose-300 font-bold',
        foilBorder: 'border-rose-400/30',
        spineColor: 'bg-[#290d15]',
        badgeStyle: 'bg-rose-900/60 text-rose-200 border-rose-500/40',
        emblemBg: 'bg-[#1a070d]/80',
      },
      emblemSvg: <NlpCardBackdrop />,
      pathUrl: '/topic/nlp-llms',
      startUrl: '/book/foundations-of-nlp-linguistic-hierarchy',
      syllabusHighlights: [
        'Linguistic Hierarchy & BPE Tokenization',
        'Embeddings: Word2Vec, GloVe & FastText',
        'Self-Attention Math & Transformers',
        'PEFT Tuning: LoRA, QLoRA & DPO',
      ]
    },
    {
      id: 'deep-learning',
      volume: 'VOL. 06',
      romanNumeral: 'VOLUME VI',
      publisherSeries: 'NEURAL NETWORKS & DEEP LEARNING',
      title: 'Deep Learning: Neurons to SOTA',
      subtitle: 'Perceptrons, CNNs, ResNets & Diffusion',
      editionLabel: 'NEURAL ARCHITECTURES',
      chapterCount: 15,
      readTime: '4.5 hrs',
      filterCategory: 'ml-nlp',
      coverStyles: {
        coverBg: 'bg-[#28133b]',
        clothTexture: 'bg-gradient-to-br from-[#3b1c56] via-[#28133b] to-[#1a0c27]',
        foilColor: 'text-violet-300 font-bold',
        foilBorder: 'border-violet-400/30',
        spineColor: 'bg-[#200f30]',
        badgeStyle: 'bg-violet-900/60 text-violet-200 border-violet-500/40',
        emblemBg: 'bg-[#150920]/80',
      },
      emblemSvg: <DeepLearningCardBackdrop />,
      pathUrl: '/topic/deep-learning',
      startUrl: '/book/the-perceptron-artificial-neuron',
      syllabusHighlights: [
        'The Perceptron & Activation Zoo',
        'Backpropagation Chain Rule & AdamW',
        'CNNs, ResNet Skip Connections & YOLO',
        'Generative Modeling: Diffusion Models',
      ]
    }
  ];

  const filteredBooks = useMemo(() => {
    if (selectedCategory === 'all') return allBooks;
    return allBooks.filter((b) => b.filterCategory === selectedCategory);
  }, [selectedCategory, allBooks]);

  return (
    <div suppressHydrationWarning className="flex min-h-[100dvh] flex-col bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onToggleSidebar={() => setMobileDrawerOpen(true)}
      />

      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      />

      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Main Container */}
      <main suppressHydrationWarning className="mx-auto flex-1 w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
        
        {/* HERO SECTION */}
        <section suppressHydrationWarning className="text-center space-y-4 max-w-3xl mx-auto pt-2">
          
          <div suppressHydrationWarning className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-1 text-xs font-semibold shadow-2xs">
            <Sparkles className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Open-Access Library • 6 Hardbound Textbooks • 89 Chapters
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
            The Living Artificial Intelligence & CS Research Handbook
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            A comprehensive digital library of first-principles AI textbooks. Engineered for researchers, software engineers, and graduate scholars with mathematical proofs, workflow decision trees, and interactive visualizers.
          </p>

          <div suppressHydrationWarning className="pt-1 flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-2.5 text-xs font-bold shadow-xs hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span>Search Library (⌘K)</span>
            </button>

            <Link
              href="/cheatsheet"
              className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-2xs"
            >
              <Compass className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span>Master Cheatsheet</span>
            </Link>
          </div>
        </section>

        {/* CURRICULUM HIGHLIGHTS STRIP */}
        <section suppressHydrationWarning className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-5xl mx-auto">
          <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-3.5 shadow-2xs">
            <span className="font-mono text-[10px] font-bold uppercase text-purple-600 dark:text-purple-400 block mb-1">Vol I • Frontier AI</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white block">LLMs & Agent Swarms</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">o1, MCP, LangGraph</span>
          </div>
          <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-3.5 shadow-2xs">
            <span className="font-mono text-[10px] font-bold uppercase text-blue-600 dark:text-blue-400 block mb-1">Vol II • Mathematics</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white block">Vectors & Gradients</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">SVD, Hessians, Entropy</span>
          </div>
          <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-3.5 shadow-2xs">
            <span className="font-mono text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 block mb-1">Vol IV • Machine Learning</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white block">Statistical Learning</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">XGBoost, SVM, Optuna</span>
          </div>
          <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-3.5 shadow-2xs">
            <span className="font-mono text-[10px] font-bold uppercase text-rose-600 dark:text-rose-400 block mb-1">Vol V • NLP & LLMs</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white block">Transformers & LoRA</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Attention, DPO, RAG</span>
          </div>
        </section>

        {/* 6 HARDBOUND BOOKS (Digital Shelf Grid with Filter Tabs) */}
        <section suppressHydrationWarning className="space-y-6">
          
          {/* Header & Filter Controls */}
          <div suppressHydrationWarning className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block">
                Curriculum Bookshelf
              </span>
              <h2 className="text-xl font-bold text-slate-950 dark:text-white tracking-tight">
                Textbook Volumes Directory
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${selectedCategory === 'all' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                All Volumes (6)
              </button>
              <button
                onClick={() => setSelectedCategory('agents')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${selectedCategory === 'agents' ? 'bg-purple-600 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Frontier AI & Agents
              </button>
              <button
                onClick={() => setSelectedCategory('math-research')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${selectedCategory === 'math-research' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                Math & Research
              </button>
              <button
                onClick={() => setSelectedCategory('ml-nlp')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${selectedCategory === 'ml-nlp' ? 'bg-emerald-600 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                ML, NLP & Deep Learning
              </button>
            </div>
          </div>

          {/* Clean 3x2 Grid */}
          <div suppressHydrationWarning className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {filteredBooks.map((book) => (
              <AuthenticBook key={book.id} {...book} />
            ))}
          </div>
        </section>

        {/* STRUCTURED RECOMMENDED LEARNING PATHS */}
        <section suppressHydrationWarning className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block">
              Curated Study Sequences
            </span>
            <h2 className="text-xl font-bold text-slate-950 dark:text-white tracking-tight">
              Recommended Learning Tracks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Track 1 */}
            <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-4 space-y-2.5 shadow-2xs">
              <div className="flex items-center gap-2">
                <Route className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">The Autonomous Agent Engineer</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                For engineers building production agents with MCP, function calling, tool use, and multi-agent coordination.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-mono font-semibold text-purple-600 dark:text-purple-400">
                <span>Vol 01: Modern AI</span>
                <span>→</span>
                <span>Vol 05: NLP & LLMs</span>
              </div>
            </div>

            {/* Track 2 */}
            <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-4 space-y-2.5 shadow-2xs">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">The AI Research Scientist</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                For researchers formulating scientific hypotheses, rigorous literature snowballing, and proofs.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-mono font-semibold text-blue-600 dark:text-blue-400">
                <span>Vol 02: Math</span>
                <span>→</span>
                <span>Vol 03: CS Research</span>
                <span>→</span>
                <span>Vol 06: DL</span>
              </div>
            </div>

            {/* Track 3 */}
            <div className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/40 p-4 space-y-2.5 shadow-2xs">
              <div className="flex items-center gap-2">
                <Boxes className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">The Applied ML Practitioner</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                From data preprocessing, regression, and gradient boosting to neural networks and hyperparameter tuning.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                <span>Vol 02: Math</span>
                <span>→</span>
                <span>Vol 04: Classical ML</span>
                <span>→</span>
                <span>Vol 06: DL</span>
              </div>
            </div>
          </div>
        </section>

        {/* AUTHOR & PLATFORM ARCHITECT CONTRIBUTION SPOTLIGHT */}
        <section suppressHydrationWarning className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 dark:from-slate-900/80 dark:via-[#0c101d] dark:to-indigo-950/40 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white font-mono text-xl font-black shadow-md shadow-indigo-500/20">
                R
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                    Mahmud Hasan Ratul
                  </h3>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 dark:border dark:border-indigo-800 px-2 py-0.5 rounded-full">
                    Author & Platform Architect
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
                  Full-Stack Developer & AI Automation Engineer specializing in High-Performance Web Systems, Autonomous Agent Workflows (MCP, LangGraph), and Scalable Cloud Architectures.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://ratul-dev.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-5 py-2.5 text-xs font-bold shadow-xs hover:bg-indigo-600 dark:hover:bg-indigo-100 transition-all hover:scale-105"
              >
                <span>View Creator Portfolio</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>

              <a
                href="https://github.com/Ratul-NotFound"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-2xs"
              >
                <span>GitHub</span>
              </a>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
