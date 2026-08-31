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
  Smartphone,
  Search,
  BookMarked,
  GraduationCap,
  Boxes,
  Cpu,
  Flame,
  Sigma,
  Eye,
  MessageSquareText,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';

interface DomainCard {
  id: string;
  title: string;
  badge: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  targetSlug: string;
  chaptersCount: number;
  keyTopics: string[];
}

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // The 7 Master Domains of the Handbook
  const domainCards: DomainCard[] = [
    {
      id: 'research-methodology',
      title: 'CS Research Methodology',
      badge: 'Core Framework',
      description: 'The definitive scientific guide to research design, literature review, data pipelines, model training, error mitigation, result analysis & decision trees for CS students.',
      icon: <GraduationCap className="h-6 w-6 text-sky-600 dark:text-cyan-400" />,
      accentColor: 'border-sky-300 dark:border-sky-800/80 hover:border-sky-500 bg-sky-50/40 dark:bg-sky-950/20',
      targetSlug: 'what-is-research-methodology',
      chaptersCount: 18,
      keyTopics: [
        'Research Types & Snowballing Search',
        'Data Collection, Preprocessing & DVC',
        'Model Selection & 7-Step Training Protocol',
        'Error Diagnosis (Bias, Variance, Leakage)',
        'Domain Metric Evaluation & Significance',
        'CS Decision Tree & Submission Checklist'
      ]
    },
    {
      id: 'classical-ml',
      title: 'Classical Machine Learning',
      badge: 'Statistical Learning',
      description: 'From convex linear and logistic models to L1/L2 regularization duality, Support Vector Machines, XGBoost/LightGBM tree ensembles, and UMAP manifold learning.',
      icon: <Boxes className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />,
      accentColor: 'border-emerald-300 dark:border-emerald-800/80 hover:border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20',
      targetSlug: 'supervised-linear-logistic-regression',
      chaptersCount: 5,
      keyTopics: [
        'OLS Normal Equation & Logistic Sigmoid',
        'L1 Lasso vs L2 Ridge Geometric Duality',
        'SVM Maximum Margin & RBF Kernel Trick',
        'XGBoost 2nd-Order Taylor Expansion & GOSS',
        'PCA SVD vs t-SNE & UMAP Manifolds'
      ]
    },
    {
      id: 'deep-learning',
      title: 'Deep Learning Core & Scaling',
      badge: 'Neural Architectures',
      description: 'Universal approximation dynamics, SwiGLU gated activations, RMSNorm variance stabilization, Muon matrix orthogonalization optimizer, and Chinchilla compute scaling laws.',
      icon: <Cpu className="h-6 w-6 text-violet-600 dark:text-violet-400" />,
      accentColor: 'border-violet-300 dark:border-violet-800/80 hover:border-violet-500 bg-violet-50/40 dark:bg-violet-950/20',
      targetSlug: 'neural-foundations-universal-approximation',
      chaptersCount: 5,
      keyTopics: [
        'Universal Approximation & Backprop Graphs',
        'Activations: Sigmoid, ReLU, GELU & SwiGLU',
        'He/Xavier Initialization & RMSNorm',
        'AdamW vs Muon Newton-Schulz Optimizer',
        'Chinchilla Scaling ($D \\approx 20N$) & VRAM Budget'
      ]
    },
    {
      id: 'nlp-llms',
      title: 'Natural Language Processing & LLMs',
      badge: 'Language & Reasoning',
      description: 'Byte-Pair Encoding, Scaled Dot-Product Attention, RoPE, KV Caching, FlashAttention-2/3, LoRA/QLoRA parameter-efficient adaptation, DPO alignment, and DeepSeek-R1 reasoning.',
      icon: <MessageSquareText className="h-6 w-6 text-pink-600 dark:text-pink-400" />,
      accentColor: 'border-pink-300 dark:border-pink-800/80 hover:border-pink-500 bg-pink-50/40 dark:bg-pink-950/20',
      targetSlug: 'tokenization-embeddings-subwords',
      chaptersCount: 6,
      keyTopics: [
        'BPE Subword Tokenization & Embeddings',
        'Multi-Head Attention & Rotary Embeddings (RoPE)',
        'KV Caching, GQA & FlashAttention SRAM Tiling',
        'LoRA & QLoRA 4-bit NormalFloat Fine-Tuning',
        'Direct Preference Optimization (DPO) & GRPO',
        'Hybrid BM25 RAG & Autonomous ReAct Agents'
      ]
    },
    {
      id: 'computer-vision',
      title: 'Computer Vision & Generative AI',
      badge: 'Visual Representations',
      description: 'Spatial 2D convolutions, ResNet identity skip mappings, ConvNeXt modernization, YOLO real-time detection, Vision Transformers (ViT), DINOv2 visual features, and Diffusion Flow Matching.',
      icon: <Eye className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />,
      accentColor: 'border-cyan-300 dark:border-cyan-800/80 hover:border-cyan-500 bg-cyan-50/40 dark:bg-cyan-950/20',
      targetSlug: 'convolutional-foundations-receptive-fields',
      chaptersCount: 5,
      keyTopics: [
        'Convolutions & Effective Receptive Fields',
        'ResNet Identity Skip Highways & ConvNeXt',
        'Object Detection: YOLO, DETR & U-Net',
        'Vision Transformers (ViT), DINOv2 & CLIP',
        'Denoising Diffusion (DDPM) & Flow Matching'
      ]
    },
    {
      id: 'reinforcement-learning',
      title: 'Reinforcement Learning & Decision Frontiers',
      badge: 'Sequential Decision Making',
      description: 'Markov Decision Processes, Bellman Optimality contraction mapping, Deep Q-Networks (DQN), Proximal Policy Optimization (PPO clipped surrogate), and GRPO in reasoning LLMs.',
      icon: <Flame className="h-6 w-6 text-amber-600 dark:text-amber-400" />,
      accentColor: 'border-amber-300 dark:border-amber-800/80 hover:border-amber-500 bg-amber-50/40 dark:bg-amber-950/20',
      targetSlug: 'mdp-formalism-value-functions',
      chaptersCount: 4,
      keyTopics: [
        'MDP 5-Tuples & Bellman Optimality Equation',
        'Q-Learning, Deep Q-Networks & Double DQN',
        'Policy Gradient Theorem & PPO Clipping',
        'Group Relative Policy Optimization (GRPO)'
      ]
    },
    {
      id: 'mathematical-foundations',
      title: 'Mathematical & Theoretical Foundations',
      badge: 'Rigorous Foundations',
      description: 'High-dimensional vector spaces, SVD low-rank decompositions, Vector-Jacobian Products (VJPs), non-convex saddle point escape, Maximum Likelihood, and Shannon Entropy.',
      icon: <Sigma className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      accentColor: 'border-blue-300 dark:border-blue-800/80 hover:border-blue-500 bg-blue-50/40 dark:bg-blue-950/20',
      targetSlug: 'vector-spaces-matrix-geometry',
      chaptersCount: 6,
      keyTopics: [
        'Vector Spaces, Latent Projections & Cosine Sim',
        'Singular Value Decomposition (SVD) & Eckart-Young',
        'Reverse-Mode AutoDiff (VJPs) vs Forward (JVPs)',
        'Hessian Curvature & Saddle Point Escapes',
        'MLE Gaussian Derivation & Bayesian MAP',
        'Shannon Entropy, Cross-Entropy & KL Divergence'
      ]
    }
  ];

  return (
    <div className="flex min-h-[100dvh] flex-col bg-white dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 transition-colors">
      {/* Minimalist Navbar with Theme Toggle */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onToggleSidebar={() => setMobileDrawerOpen(true)}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      />

      {/* Global Command Palette */}
      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <main className="mx-auto flex-1 w-full max-w-6xl py-10 sm:py-14 px-4 sm:px-6 space-y-12">
        {/* HERO SECTION */}
        <section className="border-b border-slate-200 dark:border-slate-800 pb-10 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 px-3 py-1 text-xs font-mono text-sky-700 dark:text-cyan-400">
            <BookMarked className="h-4 w-4" />
            <span>Open Access CS Research & AI Master Handbook</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-950 dark:text-white leading-tight">
            Research Methodology & AI Master Handbook
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            A comprehensive, first-principles digital book and reference handbook. Choose a domain below to begin studying with focused, topic-scoped navigation:
          </p>

          {/* Quick Bar Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2.5 text-xs font-medium transition-colors"
            >
              <Search className="h-4 w-4 text-sky-600 dark:text-cyan-400" />
              <span>Search All Concepts (⌘K)</span>
            </button>

            <Link
              href="/cheatsheet"
              className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2.5 text-xs font-medium transition-colors"
            >
              <Compass className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              <span>Master Cheatsheets</span>
            </Link>

            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 sm:ml-auto">
              <Smartphone className="h-4 w-4" />
              <span>100% Offline PWA Ready</span>
            </div>
          </div>
        </section>

        {/* DOMAIN CARDS GRID: 1 SINGLE CARD / BUTTON PER MAJOR DOMAIN */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-sky-600 dark:text-cyan-400 block">
                Domain Catalog
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Select a Research Domain to Study
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-mono hidden sm:inline">
              7 Core Domains • 49 In-Depth Chapters
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {domainCards.map((domain, index) => {
              const isFirst = index === 0;

              return (
                <div
                  key={domain.id}
                  className={`group relative flex flex-col justify-between rounded-2xl border p-6 shadow-xs transition-all duration-200 ${
                    domain.accentColor
                  } ${isFirst ? 'md:col-span-2 border-sky-400 dark:border-sky-700 bg-sky-50/50 dark:bg-sky-950/30' : ''}`}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                          {domain.icon}
                        </span>
                        <div>
                          <span className="rounded bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 text-[10px] font-mono font-bold uppercase text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            {domain.badge}
                          </span>
                          <h3 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white mt-1 group-hover:text-sky-600 dark:group-hover:text-cyan-400 transition-colors">
                            {domain.title}
                          </h3>
                        </div>
                      </div>

                      <span className="rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 px-2.5 py-1 text-xs font-mono text-slate-500 dark:text-slate-400">
                        {domain.chaptersCount} chapters
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {domain.description}
                    </p>

                    {/* Key Topics Tags */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                        Included Topics:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {domain.keyTopics.map((topic, tIdx) => (
                          <div key={tIdx} className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-cyan-400 shrink-0" />
                            <span className="truncate">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Single Dedicated CTA Button for the Domain */}
                  <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
                    <Link
                      href={`/book/${domain.targetSlug}`}
                      className="flex w-full items-center justify-between rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-sky-600 dark:hover:bg-sky-400 dark:hover:text-white px-5 py-3 text-xs sm:text-sm font-bold transition-all shadow-xs"
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        <span>Open {domain.title}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs opacity-80 hidden sm:inline">Start Reading</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
