'use client';

import React, { useState, useMemo } from 'react';
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
  Table,
  Calculator,
  Sigma,
  Bot,
  GraduationCap,
  Sparkles,
  Copy,
  Check,
  Zap,
  HardDrive
} from 'lucide-react';

export default function CheatsheetPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'vram-calc' | 'complexity' | 'optimizers' | 'math' | 'llm-mechanics' | 'research'>('vram-calc');

  // Interactive VRAM Calculator States
  const [modelParams, setModelParams] = useState<number>(7); // In Billions
  const [quantBits, setQuantBits] = useState<number>(16); // 16, 8, 4
  const [contextLength, setContextLength] = useState<number>(8192); // Tokens
  const [batchSize, setBatchSize] = useState<number>(1);
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  // Live Calculator Computations
  const vramCalculations = useMemo(() => {
    // Model Weights VRAM (GB) = Params * (Bits / 8) / 1e9 * (1000/1024)^3 approx in GiB
    const bytesPerParam = quantBits / 8;
    const weightsGb = (modelParams * 1e9 * bytesPerParam) / (1024 * 1024 * 1024);

    // KV Cache VRAM estimation: 2 * B * S * L * H_kv * d_k * bytes
    // Typical 7B: L=32, H_kv=8 (GQA), d_k=128 => 2 * 1 * S * 32 * 8 * 128 * 2 bytes
    // Rule of thumb for GQA: ~0.5 to 1 MB per token for 7B-70B
    const kvCacheBytesPerToken = (modelParams >= 65 ? 2.5 : modelParams >= 25 ? 1.5 : 0.75) * 1024 * 1024; // Bytes
    const kvCacheGb = (batchSize * contextLength * kvCacheBytesPerToken) / (1024 * 1024 * 1024);

    // Activation overhead and CUDA runtime buffer (~1.5GB to 3GB)
    const runtimeOverheadGb = 1.8;

    const totalVramGb = weightsGb + kvCacheGb + runtimeOverheadGb;

    let recommendedGpu = '1x RTX 4090 (24 GB) or Apple M3/M4 (32GB+)';
    if (totalVramGb > 160) {
      recommendedGpu = '4x to 8x A100/H100 (80 GB SXM)';
    } else if (totalVramGb > 80) {
      recommendedGpu = '2x A100/H100 (80 GB PCIe / SXM)';
    } else if (totalVramGb > 48) {
      recommendedGpu = '1x A100 (80 GB) or 2x RTX 4090 (24 GB NVLink/PCIe)';
    } else if (totalVramGb > 24) {
      recommendedGpu = '2x RTX 3090/4090 (24 GB) or 1x RTX 6000 Ada (48 GB)';
    } else if (totalVramGb > 12) {
      recommendedGpu = '1x RTX 3090 / RTX 4090 (24 GB)';
    } else if (totalVramGb > 8) {
      recommendedGpu = '1x RTX 4070 Ti / 4080 (16 GB)';
    } else {
      recommendedGpu = '1x RTX 3060 / 4060 (12 GB)';
    }

    return {
      weightsGb: weightsGb.toFixed(2),
      kvCacheGb: kvCacheGb.toFixed(2),
      runtimeOverheadGb: runtimeOverheadGb.toFixed(1),
      totalVramGb: totalVramGb.toFixed(2),
      recommendedGpu
    };
  }, [modelParams, quantBits, contextLength, batchSize]);

  const copyLatex = (latex: string, id: string) => {
    navigator.clipboard.writeText(latex);
    setCopiedFormula(id);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

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

      <main className="mx-auto flex-1 w-full max-w-6xl py-8 sm:py-12 px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* HEADER */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-6 sm:p-8 shadow-xs">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-3"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Bookshelf</span>
          </Link>

          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20">
              <Compass className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                AI Researcher's Master Cheatsheet
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
                First-principles formulas, architectural Big-O matrices, live VRAM calculators, and empirical protocols.
              </p>
            </div>
          </div>
        </div>

        {/* TAB NAVIGATION PILLS */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          {[
            { id: 'vram-calc', label: 'VRAM & GPU Calculator', icon: <Calculator className="h-4 w-4" /> },
            { id: 'complexity', label: 'Big-O Complexity Matrix', icon: <Cpu className="h-4 w-4" /> },
            { id: 'optimizers', label: 'Optimizers & Loss Math', icon: <Flame className="h-4 w-4" /> },
            { id: 'math', label: 'Matrix Calculus & SVD', icon: <Sigma className="h-4 w-4" /> },
            { id: 'llm-mechanics', label: 'LLM Internals (RoPE, GQA, LoRA)', icon: <Bot className="h-4 w-4" /> },
            { id: 'research', label: 'CS Research Protocols', icon: <GraduationCap className="h-4 w-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: LIVE VRAM & GPU CALCULATOR */}
        {activeTab === 'vram-calc' && (
          <section className="space-y-6 animate-in fade-in duration-200">
            <div className="rounded-2xl border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/30 dark:bg-indigo-950/20 p-6 sm:p-7 shadow-xs space-y-6">
              
              <div className="flex items-center justify-between border-b border-indigo-200/60 dark:border-indigo-900/60 pb-3">
                <div className="flex items-center gap-2.5">
                  <Calculator className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <h2 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white">
                    Interactive LLM Inference VRAM Estimator
                  </h2>
                </div>
                <span className="font-mono text-[11px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/60 px-2.5 py-0.5 rounded-full">
                  Real-Time GPU Hardware Planner
                </span>
              </div>

              {/* Controls Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                {/* 1. Model Parameters */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Model Size (Parameters): <span className="font-mono text-indigo-600 dark:text-indigo-400 font-black">{modelParams}B</span>
                  </label>
                  <div className="flex gap-1.5 flex-wrap">
                    {[3, 7, 14, 32, 70].map((size) => (
                      <button
                        key={size}
                        onClick={() => setModelParams(size)}
                        className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg border transition-colors ${
                          modelParams === size
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {size}B
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Precision & Quantization */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Precision / Quant: <span className="font-mono text-indigo-600 dark:text-indigo-400 font-black">{quantBits === 16 ? 'FP16 / BF16' : quantBits === 8 ? 'INT8' : 'INT4 (AWQ/GPTQ)'}</span>
                  </label>
                  <div className="flex gap-1.5">
                    {[
                      { bits: 16, label: '16-bit' },
                      { bits: 8, label: '8-bit' },
                      { bits: 4, label: '4-bit' },
                    ].map((q) => (
                      <button
                        key={q.bits}
                        onClick={() => setQuantBits(q.bits)}
                        className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg border transition-colors ${
                          quantBits === q.bits
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {q.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Context Length */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Context Length: <span className="font-mono text-indigo-600 dark:text-indigo-400 font-black">{contextLength.toLocaleString()} tokens</span>
                  </label>
                  <div className="flex gap-1.5 flex-wrap">
                    {[2048, 8192, 32768, 128000].map((tokens) => (
                      <button
                        key={tokens}
                        onClick={() => setContextLength(tokens)}
                        className={`px-2 py-1 text-[11px] font-mono font-bold rounded-lg border transition-colors ${
                          contextLength === tokens
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {tokens >= 1000 ? `${tokens / 1000}k` : tokens}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Batch Size */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    Concurrent Batch: <span className="font-mono text-indigo-600 dark:text-indigo-400 font-black">{batchSize}</span>
                  </label>
                  <div className="flex gap-1.5">
                    {[1, 4, 8, 16].map((b) => (
                      <button
                        key={b}
                        onClick={() => setBatchSize(b)}
                        className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg border transition-colors ${
                          batchSize === b
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {b}x
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* VRAM Breakdown Display */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 space-y-1">
                  <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 block">1. Model Weights</span>
                  <div className="text-lg font-mono font-black text-slate-950 dark:text-white">
                    {vramCalculations.weightsGb} <span className="text-xs text-slate-500">GB</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                    {quantBits}-bit parameter memory
                  </span>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 space-y-1">
                  <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 block">2. KV Cache VRAM</span>
                  <div className="text-lg font-mono font-black text-amber-600 dark:text-amber-400">
                    {vramCalculations.kvCacheGb} <span className="text-xs text-slate-500">GB</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                    {contextLength.toLocaleString()} tokens × {batchSize} batch
                  </span>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 space-y-1">
                  <span className="text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 block">3. CUDA Overhead</span>
                  <div className="text-lg font-mono font-black text-slate-700 dark:text-slate-300">
                    {vramCalculations.runtimeOverheadGb} <span className="text-xs text-slate-500">GB</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                    Context buffer & activations
                  </span>
                </div>

                <div className="rounded-xl border border-indigo-300 dark:border-indigo-800 bg-indigo-600/10 dark:bg-indigo-950/50 p-3.5 space-y-1">
                  <span className="text-[11px] font-mono uppercase font-bold text-indigo-700 dark:text-indigo-300 block">Total VRAM Required</span>
                  <div className="text-xl font-mono font-black text-indigo-600 dark:text-indigo-400">
                    {vramCalculations.totalVramGb} <span className="text-xs">GB</span>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 block">
                    Minimum GPU VRAM
                  </span>
                </div>
              </div>

              {/* Hardware Recommendation */}
              <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/40 p-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <HardDrive className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-emerald-800 dark:text-emerald-300 block">
                      Recommended Hardware Configuration:
                    </span>
                    <strong className="text-xs sm:text-sm font-bold text-emerald-950 dark:text-emerald-200">
                      {vramCalculations.recommendedGpu}
                    </strong>
                  </div>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* TAB 2: BIG-O COMPLEXITY MATRIX */}
        {activeTab === 'complexity' && (
          <section className="space-y-6 animate-in fade-in duration-200">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <h2 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white">
                    Deep Learning Architecture Computational Complexity
                  </h2>
                </div>
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                  N = Seq Length, d = Hidden Dim, H, W = Image Grid
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                  <thead className="bg-slate-50 dark:bg-slate-950 font-mono text-[11px] text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3">Architecture</th>
                      <th className="p-3">Training FLOPs</th>
                      <th className="p-3">Memory Complexity</th>
                      <th className="p-3">Inference Step Cost</th>
                      <th className="p-3">Inductive Bias</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-bold font-mono text-slate-950 dark:text-white">Standard Attention (MHA)</td>
                      <td className="p-3 font-mono text-rose-600 dark:text-rose-400">O(N² · d)</td>
                      <td className="p-3 font-mono text-rose-600 dark:text-rose-400">O(N² + N d)</td>
                      <td className="p-3 font-mono text-amber-600 dark:text-amber-400">O(N · d) (KV Cache)</td>
                      <td className="p-3 text-slate-500 dark:text-slate-400">Minimal (Global tokens)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-bold font-mono text-indigo-600 dark:text-indigo-400">FlashAttention-2 / 3</td>
                      <td className="p-3 font-mono text-indigo-600 dark:text-indigo-400">O(N² · d) (SRAM Tiled)</td>
                      <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">O(N · d) (IO Aware)</td>
                      <td className="p-3 font-mono text-amber-600 dark:text-amber-400">O(N · d)</td>
                      <td className="p-3 text-slate-500 dark:text-slate-400">Exact math, zero HBM IO</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-bold font-mono text-emerald-600 dark:text-emerald-400">Mamba / SSM (State Space)</td>
                      <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">O(N · d)</td>
                      <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400">O(N · d)</td>
                      <td className="p-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">O(1) Recurrent</td>
                      <td className="p-3 text-slate-500 dark:text-slate-400">Selective time-invariance</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-bold font-mono text-slate-800 dark:text-slate-200">CNN / ConvNeXt</td>
                      <td className="p-3 font-mono text-slate-600 dark:text-slate-400">O(H W C² K²)</td>
                      <td className="p-3 font-mono text-slate-600 dark:text-slate-400">O(H W C)</td>
                      <td className="p-3 font-mono text-slate-600 dark:text-slate-400">O(H W C² K²)</td>
                      <td className="p-3 text-slate-500 dark:text-slate-400">Translation equivariance</td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-bold font-mono text-slate-800 dark:text-slate-200">Vision Transformer (ViT)</td>
                      <td className="p-3 font-mono text-amber-600 dark:text-amber-400">O((HW/P²)² · d)</td>
                      <td className="p-3 font-mono text-amber-600 dark:text-amber-400">O((HW/P²)²)</td>
                      <td className="p-3 font-mono text-slate-600 dark:text-slate-400">O((HW/P²) d)</td>
                      <td className="p-3 text-slate-500 dark:text-slate-400">Patch self-attention</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* TAB 3: OPTIMIZERS & LOSS FUNCTIONS */}
        {activeTab === 'optimizers' && (
          <section className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* AdamW */}
              <div className="rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-white dark:bg-slate-900/60 p-5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-950 dark:text-white font-mono text-sm">AdamW (Decoupled Weight Decay)</h3>
                  <span className="rounded bg-indigo-100 dark:bg-indigo-950 px-2 py-0.5 text-[10px] font-mono font-bold text-indigo-700 dark:text-indigo-300">
                    8 bytes/param state
                  </span>
                </div>
                <MathFormula
                  latex="\theta_t = \theta_{t-1} - \eta \left( \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon} + \lambda \theta_{t-1} \right)"
                  description="Decoupled weight decay update rule."
                />
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Industry default for foundation LLMs. Separates L2 penalty from gradient magnitude to avoid exploding updates in small-gradient coordinates.
                </p>
              </div>

              {/* Muon */}
              <div className="rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-white dark:bg-slate-900/60 p-5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-950 dark:text-white font-mono text-sm">Muon (Momentum Orthogonalization)</h3>
                  <span className="rounded bg-purple-100 dark:bg-purple-950 px-2 py-0.5 text-[10px] font-mono font-bold text-purple-700 dark:text-purple-300">
                    SOTA Frontier Pretraining
                  </span>
                </div>
                <MathFormula
                  latex="O_t = \text{NewtonSchulz5}(M_t), \quad W_t = W_{t-1} - \eta O_t"
                  description="Matrix polar decomposition projection."
                />
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Replaces coordinate-wise step sizes with spectral matrix orthogonalization. Speeds up pretraining convergence by up to 2x (used in Moonshot & DeepSeek research).
                </p>
              </div>

              {/* DPO Loss */}
              <div className="rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-white dark:bg-slate-900/60 p-5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-950 dark:text-white font-mono text-sm">DPO (Direct Preference Optimization)</h3>
                  <span className="rounded bg-rose-100 dark:bg-rose-950 px-2 py-0.5 text-[10px] font-mono font-bold text-rose-700 dark:text-rose-300">
                    Alignment Loss
                  </span>
                </div>
                <MathFormula
                  latex="\mathcal{L}_{\text{DPO}} = -\mathbb{E}\left[ \log \sigma \left( \beta \log \frac{\pi_\theta(y_w|x)}{\pi_{\text{ref}}(y_w|x)} - \beta \log \frac{\pi_\theta(y_l|x)}{\pi_{\text{ref}}(y_l|x)} \right) \right]"
                  description="Implicit reward derivation directly from policy logits."
                />
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Eliminates the separate reward model in RLHF; directly optimizes the policy network on chosen vs rejected pairs.
                </p>
              </div>

              {/* Label Smoothed Cross Entropy */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-950 dark:text-white font-mono text-sm">Cross-Entropy + Label Smoothing</h3>
                  <span className="rounded bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-mono text-slate-700 dark:text-slate-300">
                    Calibration Standard
                  </span>
                </div>
                <MathFormula
                  latex="\mathcal{L}_{LS} = -(1-\epsilon)\log p(y) - \frac{\epsilon}{K}\sum_{k=1}^K \log p(k)"
                  description="Prevents overconfident logit saturation."
                />
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Smooths 1-hot targets with uniform probability $\epsilon/K$, preventing logit margin explosion and improving generalization.
                </p>
              </div>

            </div>
          </section>
        )}

        {/* TAB 4: MATRIX CALCULUS & SVD */}
        {activeTab === 'math' && (
          <section className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* SVD */}
              <div className="rounded-2xl border border-blue-200 dark:border-blue-900/60 bg-white dark:bg-slate-900/60 p-5 space-y-2.5">
                <h3 className="font-bold text-slate-950 dark:text-white font-mono text-sm">Singular Value Decomposition (SVD)</h3>
                <MathFormula
                  latex="A = U \Sigma V^T = \sum_{i=1}^r \sigma_i u_i v_i^T"
                  description="Exact low-rank factor decomposition."
                />
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Forms the mathematical backbone of PCA, token embeddings rank reduction, LoRA matrix initialization, and spectral norm clipping.
                </p>
              </div>

              {/* Matrix Gradient Identities */}
              <div className="rounded-2xl border border-sky-200 dark:border-sky-900/60 bg-white dark:bg-slate-900/60 p-5 space-y-2.5">
                <h3 className="font-bold text-slate-950 dark:text-white font-mono text-sm">Essential Matrix Calculus Identities</h3>
                <MathFormula
                  latex="\frac{\partial (x^T A x)}{\partial x} = (A + A^T)x, \quad \frac{\partial \text{Tr}(A B)}{\partial A} = B^T"
                  description="Quadratic forms and matrix trace gradients."
                />
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Fundamental derivatives used in backpropagation proofs, linear regression OLS derivation, and covariance optimization.
                </p>
              </div>

              {/* KL Divergence */}
              <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-white dark:bg-slate-900/60 p-5 space-y-2.5">
                <h3 className="font-bold text-slate-950 dark:text-white font-mono text-sm">Kullback-Leibler (KL) Divergence</h3>
                <MathFormula
                  latex="D_{\text{KL}}(P \parallel Q) = \sum_{x} P(x) \log \frac{P(x)}{Q(x)} = \mathbb{E}_{x \sim P}[\log P(x) - \log Q(x)]"
                  description="Information relative entropy metric."
                />
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Asymmetric measure of information loss when approximating true distribution $P$ with model distribution $Q$. Non-negative via Jensen's inequality.
                </p>
              </div>

              {/* Multivariate Normal PDF */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5">
                <h3 className="font-bold text-slate-950 dark:text-white font-mono text-sm">Multivariate Gaussian Distribution</h3>
                <MathFormula
                  latex="p(x) = \frac{1}{(2\pi)^{d/2}|\Sigma|^{1/2}} \exp\left( -\frac{1}{2}(x-\mu)^T \Sigma^{-1}(x-\mu) \right)"
                  description="Gaussian density with covariance matrix Σ."
                />
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Core density foundation for VAE reparameterization trick, diffusion forward noise transitions, and Gaussian Processes.
                </p>
              </div>

            </div>
          </section>
        )}

        {/* TAB 5: LLM INTERNALS (RoPE, GQA, LoRA) */}
        {activeTab === 'llm-mechanics' && (
          <section className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* RoPE */}
              <div className="rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-white dark:bg-slate-900/60 p-5 space-y-2.5">
                <h3 className="font-bold text-slate-950 dark:text-white font-mono text-sm">Rotary Positional Embedding (RoPE)</h3>
                <MathFormula
                  latex="\mathbf{R}_{\Theta, m}^d = \text{diag}\left( \begin{pmatrix} \cos m\theta_1 & -\sin m\theta_1 \\ \sin m\theta_1 & \cos m\theta_1 \end{pmatrix}, \dots \right)"
                  description="Complex 2D rotation of query & key tokens."
                />
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Incorporates relative token positions directly into self-attention via orthogonal 2D subspace rotations, preserving inner product decay over distance.
                </p>
              </div>

              {/* LoRA */}
              <div className="rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-white dark:bg-slate-900/60 p-5 space-y-2.5">
                <h3 className="font-bold text-slate-950 dark:text-white font-mono text-sm">LoRA (Low-Rank Adaptation)</h3>
                <MathFormula
                  latex="W' = W_0 + \Delta W = W_0 + \frac{\alpha}{r} (B \cdot A), \quad A \in \mathbb{R}^{r \times d_{in}}, B \in \mathbb{R}^{d_{out} \times r}"
                  description="Rank r parameter efficient fine-tuning."
                />
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Freezes base weights $W_0$ and trains low-rank matrices $A$ (Gaussian init) and $B$ (zero init). Reduces trainable parameters by &gt;99%.
                </p>
              </div>

              {/* GQA */}
              <div className="rounded-2xl border border-amber-200 dark:border-amber-900/60 bg-white dark:bg-slate-900/60 p-5 space-y-2.5">
                <h3 className="font-bold text-slate-950 dark:text-white font-mono text-sm">Grouped-Query Attention (GQA)</h3>
                <MathFormula
                  latex="\text{Ratio} = \frac{H_Q}{H_{KV}}, \quad \text{KV-Memory Reduction} = \frac{1}{\text{Ratio}}"
                  description="Multiple query heads share single KV head."
                />
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Reduces KV cache memory by 4x to 8x vs Multi-Head Attention (MHA) while maintaining 99% of MHA performance during generation.
                </p>
              </div>

              {/* KV-Cache Exact Formula */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-2.5">
                <h3 className="font-bold text-slate-950 dark:text-white font-mono text-sm">KV-Cache Memory Equation</h3>
                <MathFormula
                  latex="\text{Bytes} = 2 \times B \times S \times L \times H_{KV} \times d_k \times \text{BytesPerElement}"
                  description="B=Batch, S=Context, L=Layers, H_KV=KV Heads, d_k=Head Dim."
                />
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Factor of 2 accounts for storing both Key and Value tensors. In FP16, BytesPerElement = 2.
                </p>
              </div>

            </div>
          </section>
        )}

        {/* TAB 6: CS RESEARCH PROTOCOLS */}
        {activeTab === 'research' && (
          <section className="space-y-6 animate-in fade-in duration-200">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 sm:p-7 shadow-xs space-y-5">
              
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  Empirical Research Protocols & Error Taxonomy
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-1.5 bg-slate-50/50 dark:bg-slate-950/50">
                  <span className="text-[10px] font-mono font-bold uppercase text-purple-600 dark:text-purple-400 block">Protocol 1</span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">5-Step Leak-Free Split</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    Always fit scalers, tokenizers, and imputation strictly on Train fold before transforming Val/Test.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-1.5 bg-slate-50/50 dark:bg-slate-950/50">
                  <span className="text-[10px] font-mono font-bold uppercase text-blue-600 dark:text-blue-400 block">Protocol 2</span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">5-Stage Snowballing</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    Identify seed papers $\to$ Forward citations $\to$ Backward references $\to$ Synthesize novelty delta.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 space-y-1.5 bg-slate-50/50 dark:bg-slate-950/50">
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400 block">Protocol 3</span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">McNemar's Significance Test</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    Use chi-squared significance testing to prove classifier improvement is statistically significant (p &lt; 0.05).
                  </p>
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
