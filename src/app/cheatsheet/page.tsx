'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import MobileDrawer from '@/components/layout/MobileDrawer';
import Footer from '@/components/layout/Footer';
import CommandPalette from '@/components/search/CommandPalette';
import MathFormula from '@/components/math/MathFormula';
import { 
  Compass, 
  Cpu, 
  Layers, 
  Flame, 
  Scale, 
  ArrowLeft,
  Table
} from 'lucide-react';

export default function CheatsheetPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'complexity' | 'optimizers' | 'norms' | 'scaling'>('complexity');

  return (
    <div suppressHydrationWarning className="flex min-h-[100dvh] flex-col bg-white dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 transition-colors">
      {/* Navbar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onToggleSidebar={() => setMobileDrawerOpen(true)}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      />

      {/* Command Palette */}
      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <main className="mx-auto flex-1 w-full max-w-6xl py-10 px-4 sm:px-6 space-y-8">
        {/* Header */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-6 sm:p-8 shadow-xs transition-colors">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-cyan-300 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Living Book</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-800/60">
              <Compass className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                AI Researcher's Master Cheatsheet
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                Quick-reference complexity matrices, optimizer formulas, memory rules-of-thumb, and scaling equations.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          {[
            { id: 'complexity', label: 'Big-O Complexity Matrix', icon: <Cpu className="h-4 w-4" /> },
            { id: 'optimizers', label: 'Optimizer Comparison', icon: <Flame className="h-4 w-4" /> },
            { id: 'norms', label: 'Normalization Layers', icon: <Layers className="h-4 w-4" /> },
            { id: 'scaling', label: 'Scaling & VRAM Rules', icon: <Scale className="h-4 w-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-sky-600 dark:bg-sky-700 text-white shadow-xs'
                  : 'border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: COMPLEXITY MATRIX */}
        {activeTab === 'complexity' && (
          <section className="space-y-6 animate-in fade-in">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-5 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Table className="h-5 w-5 text-sky-600 dark:text-cyan-400" />
                Architectural Computational & Memory Complexity
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                N = Sequence Length, d = Model Dimension, H, W = Image Dimensions, C = Channels, K = Kernel Size.
              </p>

              <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <table className="w-full text-left text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                  <thead className="bg-slate-100 dark:bg-slate-950 uppercase font-mono text-[11px] text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3">Architecture</th>
                      <th className="p-3">Time Complexity (FLOPs)</th>
                      <th className="p-3">Memory Complexity (VRAM)</th>
                      <th className="p-3">Inference Step Cost</th>
                      <th className="p-3">Inductive Bias</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-slate-900 dark:text-white font-mono">Standard Transformer</td>
                      <td className="p-3 font-mono text-rose-700 dark:text-rose-300">O(N² · d)</td>
                      <td className="p-3 font-mono text-rose-700 dark:text-rose-300">O(N² + N d)</td>
                      <td className="p-3 font-mono text-amber-700 dark:text-amber-300">O(N · d) (KV Cache)</td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">Minimal (Global attention)</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-slate-900 dark:text-white font-mono">FlashAttention-2</td>
                      <td className="p-3 font-mono text-sky-700 dark:text-cyan-300">O(N² · d) (SRAM tiled)</td>
                      <td className="p-3 font-mono text-emerald-700 dark:text-emerald-300">O(N · d) (IO Bound)</td>
                      <td className="p-3 font-mono text-amber-700 dark:text-amber-300">O(N · d)</td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">Exact math, IO-aware memory</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-slate-900 dark:text-white font-mono">Mamba (State Space SSM)</td>
                      <td className="p-3 font-mono text-emerald-700 dark:text-emerald-300">O(N · d)</td>
                      <td className="p-3 font-mono text-emerald-700 dark:text-emerald-300">O(N · d)</td>
                      <td className="p-3 font-mono text-emerald-700 dark:text-emerald-300">O(1) recurrent state</td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">Time-invariant linear dynamical</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-slate-900 dark:text-white font-mono">CNN / ConvNeXt</td>
                      <td className="p-3 font-mono text-slate-800 dark:text-zinc-200">O(H W C² K²)</td>
                      <td className="p-3 font-mono text-slate-800 dark:text-zinc-200">O(H W C)</td>
                      <td className="p-3 font-mono text-slate-800 dark:text-zinc-200">O(H W C² K²)</td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">Translation equivariance + locality</td>
                    </tr>
                    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-bold text-slate-900 dark:text-white font-mono">Vision Transformer (ViT)</td>
                      <td className="p-3 font-mono text-amber-700 dark:text-amber-300">O((HW/P²)² · d)</td>
                      <td className="p-3 font-mono text-amber-700 dark:text-amber-300">O((HW/P²)²)</td>
                      <td className="p-3 font-mono text-slate-800 dark:text-zinc-200">O((HW/P²) d)</td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">Global patch relationships</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* TAB 2: OPTIMIZERS */}
        {activeTab === 'optimizers' && (
          <section className="space-y-6 animate-in fade-in">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-5 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Flame className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                Modern Deep Learning Optimizers Cheat Sheet
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                Memory states, parameter update rules, and research recommendations.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-sky-200 dark:border-sky-900/60 bg-white dark:bg-slate-900/60 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 dark:text-white font-mono">AdamW (Decoupled Weight Decay)</h3>
                    <span className="rounded bg-sky-100 dark:bg-sky-950 px-2 py-0.5 text-[10px] font-mono text-sky-700 dark:text-cyan-300">
                      Standard Default
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-zinc-300">
                    <strong>VRAM State:</strong> 8 bytes/parameter (first and second moments in FP32).
                  </p>
                  <MathFormula
                    latex="\theta_t = \theta_{t-1} - \eta \left( \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon} + \lambda \theta_{t-1} \right)"
                    description="Decoupled weight decay update rule."
                  />
                  <p className="text-xs text-sky-700 dark:text-cyan-300 italic">
                    💡 <strong>Verdict:</strong> Industry default for foundation LLM pre-training & fine-tuning.
                  </p>
                </div>

                <div className="rounded-xl border border-violet-200 dark:border-violet-900/60 bg-white dark:bg-slate-900/60 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 dark:text-white font-mono">Muon (Matrix Orthogonalization)</h3>
                    <span className="rounded bg-violet-100 dark:bg-violet-950 px-2 py-0.5 text-[10px] font-mono text-violet-700 dark:text-violet-300">
                      SOTA Frontier
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-zinc-300">
                    <strong>VRAM State:</strong> 4 bytes/parameter (momentum matrix).
                  </p>
                  <MathFormula
                    latex="O_t = \text{NewtonSchulz}(M_t), \quad W_t = W_{t-1} - \eta O_t"
                    description="Matrix polar decomposition projection."
                  />
                  <p className="text-xs text-violet-700 dark:text-violet-300 italic">
                    💡 <strong>Verdict:</strong> Replaces coordinate-wise steps with matrix-level orthogonal rotations; yields up to 2x faster pre-training convergence!
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 dark:text-white font-mono">SGD + Nesterov Momentum</h3>
                    <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-700 dark:text-zinc-300">
                      Vision Classic
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-zinc-300">
                    <strong>VRAM State:</strong> 4 bytes/parameter (velocity vector).
                  </p>
                  <MathFormula
                    latex="v_t = \mu v_{t-1} + g(\theta_{t-1} + \mu v_{t-1})"
                    description="Lookahead gradient update."
                  />
                  <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                    💡 <strong>Verdict:</strong> Excels in convolutional image classification (ResNet); struggles with ill-conditioned Transformer attention matrices.
                  </p>
                </div>

                <div className="rounded-xl border border-rose-200 dark:border-rose-900/60 bg-white dark:bg-slate-900/60 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 dark:text-white font-mono">Lion (EvoLved Sign Momentum)</h3>
                    <span className="rounded bg-rose-100 dark:bg-rose-950 px-2 py-0.5 text-[10px] font-mono text-rose-700 dark:text-pink-300">
                      Low VRAM Alternative
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-zinc-300">
                    <strong>VRAM State:</strong> 4 bytes/parameter (first moment only).
                  </p>
                  <MathFormula
                    latex="c_t = \text{sign}(\beta_1 m_{t-1} + (1-\beta_1) g_t)"
                    description="Sign momentum direction."
                  />
                  <p className="text-xs text-rose-700 dark:text-pink-300 italic">
                    💡 <strong>Verdict:</strong> Saves 50% optimizer memory vs AdamW; sensitive to learning rate scheduling.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 3: NORMALIZATION */}
        {activeTab === 'norms' && (
          <section className="space-y-6 animate-in fade-in">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-5 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Layers className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                Normalization Layers: Dimensions & Trade-offs
              </h2>

              <div className="space-y-4">
                <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-white dark:bg-slate-900/60 p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white font-mono text-sm">RMSNorm (Root Mean Square Normalization)</h3>
                  <MathFormula
                    latex="\text{RMSNorm}(x) = \frac{x}{\sqrt{\frac{1}{d}\sum_{i=1}^d x_i^2 + \epsilon}} \odot \gamma"
                    description="Root Mean Square scaling without mean re-centering."
                  />
                  <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-2">
                    ✓ <strong>Why SOTA in LLMs:</strong> Eliminates mean calculation, saving 7–15% kernel execution time with zero loss in validation perplexity. Used in LLaMA 3, Mistral, Gemma, and DeepSeek.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white font-mono text-sm">LayerNorm (Standard)</h3>
                  <MathFormula
                    latex="\text{LN}(x) = \frac{x - \mu}{\sqrt{\sigma^2 + \epsilon}} \odot \gamma + \beta"
                    description="Standard layer normalization across features."
                  />
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                    • Normalizes across feature dimensions independently per sample. Used in original Transformer, BERT, and GPT-2/3.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white font-mono text-sm">BatchNorm (Batch Normalization)</h3>
                  <MathFormula
                    latex="\text{BN}(x) = \frac{x - \mu_B}{\sqrt{\sigma_B^2 + \epsilon}} \odot \gamma + \beta"
                    description="Batch normalization over mini-batch statistics."
                  />
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                    • Normalizes across the batch dimension. Excellent for CNNs, but fails in autoregressive LLMs due to batch size dependency and inference synchronization overhead.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 4: SCALING LAWS & VRAM */}
        {activeTab === 'scaling' && (
          <section className="space-y-6 animate-in fade-in">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-5 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Scale className="h-5 w-5 text-sky-600 dark:text-cyan-400" />
                Compute Scaling Laws & GPU VRAM Rules-of-Thumb
              </h2>

              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">1. Chinchilla Compute-Optimal Frontier</h3>
                  <MathFormula
                    latex="C \approx 6 N D \quad \text{where } D \approx 20 N"
                    description="For optimal loss per compute budget C (FLOPs), training tokens D should scale linearly with model parameters N."
                  />
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">2. Training VRAM Breakdown (Per Parameter in Bytes)</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3 text-xs">
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-950 p-2.5 border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 block">Model Weights</span>
                      <strong className="text-slate-900 dark:text-white font-mono text-sm">2 Bytes (bfloat16)</strong>
                    </div>
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-950 p-2.5 border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 block">Gradients</span>
                      <strong className="text-slate-900 dark:text-white font-mono text-sm">2 Bytes (bfloat16)</strong>
                    </div>
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-950 p-2.5 border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 block">AdamW Optimizer</span>
                      <strong className="text-slate-900 dark:text-white font-mono text-sm">8-12 Bytes (FP32)</strong>
                    </div>
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-950 p-2.5 border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400 block">Total Training</span>
                      <strong className="text-emerald-700 dark:text-emerald-400 font-mono text-sm">~16 Bytes/param</strong>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">3. KV Cache Inference Memory Formula</h3>
                  <MathFormula
                    latex="\text{Memory}_{\text{KV}} = 2 \times B \times S \times L \times H_{\text{KV}} \times d_k \times \text{BytesPerElement}"
                    description="KV Cache memory in bytes where B = Batch Size, S = Context Length, L = Layers, H_KV = Number of KV Heads, d_k = Head Dim."
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
