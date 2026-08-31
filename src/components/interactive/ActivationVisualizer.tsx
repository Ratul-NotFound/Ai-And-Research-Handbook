'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Sparkles } from 'lucide-react';

type ActivationKey = 'gelu' | 'swish' | 'relu' | 'leaky_relu' | 'sigmoid' | 'tanh';

interface ActivationMeta {
  name: string;
  formula: string;
  usedIn: string;
  derivativeFormula: string;
  fn: (x: number) => number;
  dfn: (x: number) => number;
  color: string;
}

const ACTIVATIONS: Record<ActivationKey, ActivationMeta> = {
  gelu: {
    name: 'GELU (Gaussian Error Linear Unit)',
    formula: 'x \\cdot \\Phi(x) \\approx 0.5x(1 + \\tanh(\\sqrt{2/\\pi}(x + 0.044715x^3)))',
    usedIn: 'BERT, GPT-2, GPT-3, ViT',
    derivativeFormula: '\\Phi(x) + x \\cdot \\phi(x)',
    fn: (x) => 0.5 * x * (1 + Math.tanh(Math.sqrt(2 / Math.PI) * (x + 0.044715 * Math.pow(x, 3)))),
    dfn: (x) => {
      const c = Math.sqrt(2 / Math.PI);
      const inner = c * (x + 0.044715 * Math.pow(x, 3));
      const tanhVal = Math.tanh(inner);
      const sech2 = 1 - tanhVal * tanhVal;
      const dInner = c * (1 + 3 * 0.044715 * x * x);
      return 0.5 * (1 + tanhVal) + 0.5 * x * sech2 * dInner;
    },
    color: '#8b5cf6',
  },
  swish: {
    name: 'Swish / SiLU (SwiGLU component)',
    formula: 'x \\cdot \\sigma(\\beta x) = \\frac{x}{1 + e^{-\\beta x}}',
    usedIn: 'LLaMA 1/2/3, Mistral, Gemma, Claude',
    derivativeFormula: '\\beta \\cdot \\text{SiLU}(x) + \\sigma(\\beta x)(1 - \\beta \\cdot \\text{SiLU}(x))',
    fn: (x) => x / (1 + Math.exp(-x)),
    dfn: (x) => {
      const sig = 1 / (1 + Math.exp(-x));
      return sig + x * sig * (1 - sig);
    },
    color: '#ec4899',
  },
  relu: {
    name: 'ReLU (Rectified Linear Unit)',
    formula: '\\max(0, x)',
    usedIn: 'AlexNet, ResNet, Classic CNNs',
    derivativeFormula: '1 \\text{ if } x > 0 \\text{ else } 0',
    fn: (x) => Math.max(0, x),
    dfn: (x) => (x > 0 ? 1 : 0),
    color: '#06b6d4',
  },
  leaky_relu: {
    name: 'Leaky ReLU',
    formula: '\\max(\\alpha x, x) \\quad (\\alpha = 0.1)',
    usedIn: 'GAN Discriminators, YOLOv4',
    derivativeFormula: '1 \\text{ if } x > 0 \\text{ else } 0.1',
    fn: (x) => (x > 0 ? x : 0.1 * x),
    dfn: (x) => (x > 0 ? 1 : 0.1),
    color: '#10b981',
  },
  sigmoid: {
    name: 'Sigmoid',
    formula: '\\frac{1}{1 + e^{-x}}',
    usedIn: 'Binary Classification, Attention Gates',
    derivativeFormula: '\\sigma(x)(1 - \\sigma(x))',
    fn: (x) => 1 / (1 + Math.exp(-x)),
    dfn: (x) => {
      const s = 1 / (1 + Math.exp(-x));
      return s * (1 - s);
    },
    color: '#f59e0b',
  },
  tanh: {
    name: 'Hyperbolic Tangent (Tanh)',
    formula: '\\frac{e^x - e^{-x}}{e^x + e^{-x}}',
    usedIn: 'LSTMs, RNN Hidden States',
    derivativeFormula: '1 - \\tanh^2(x)',
    fn: (x) => Math.tanh(x),
    dfn: (x) => 1 - Math.pow(Math.tanh(x), 2),
    color: '#3b82f6',
  },
};

export default function ActivationVisualizer() {
  const [selectedKey, setSelectedKey] = useState<ActivationKey>('gelu');
  const [showDerivative, setShowDerivative] = useState<boolean>(true);
  const [probeX, setProbeX] = useState<number>(1.2);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const active = ACTIVATIONS[selectedKey];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Coordinate space [-4 to 4] on X, [-2 to 3] on Y
    const toScreen = (x: number, y: number): [number, number] => {
      const sx = ((x + 4) / 8) * w;
      const sy = ((3 - y) / 5) * h;
      return [sx, sy];
    };

    // Background
    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 0, w, h);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = -4; x <= 4; x += 1) {
      const [sx] = toScreen(x, 0);
      ctx.beginPath();
      ctx.moveTo(sx, 0);
      ctx.lineTo(sx, h);
      ctx.stroke();
    }
    for (let y = -2; y <= 3; y += 1) {
      const [, sy] = toScreen(0, y);
      ctx.beginPath();
      ctx.moveTo(0, sy);
      ctx.lineTo(w, sy);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1.5;
    const [origX, origY] = toScreen(0, 0);
    ctx.beginPath();
    ctx.moveTo(0, origY);
    ctx.lineTo(w, origY);
    ctx.moveTo(origX, 0);
    ctx.lineTo(origX, h);
    ctx.stroke();

    // Plot Function f(x)
    ctx.strokeStyle = active.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let px = -4; px <= 4; px += 0.05) {
      const py = active.fn(px);
      const [sx, sy] = toScreen(px, py);
      if (px === -4) ctx.moveTo(sx, sy);
      else ctx.lineTo(sx, sy);
    }
    ctx.stroke();

    // Plot Derivative f'(x) if enabled
    if (showDerivative) {
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      for (let px = -4; px <= 4; px += 0.05) {
        const pdy = active.dfn(px);
        const [sx, sy] = toScreen(px, pdy);
        if (px === -4) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Draw Probe Point
    const probeY = active.fn(probeX);
    const [pScreenX, pScreenY] = toScreen(probeX, probeY);
    ctx.fillStyle = active.color;
    ctx.shadowColor = active.color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(pScreenX, pScreenY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }, [selectedKey, showDerivative, probeX, active]);

  return (
    <div className="my-6 rounded-2xl border border-violet-500/30 bg-gradient-to-b from-zinc-900/90 via-zinc-950/95 to-black p-4 sm:p-6 backdrop-blur-xl shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-500/20 text-violet-400 border border-violet-500/30">
              <LineChart className="h-3.5 w-3.5" />
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Interactive Activation & Derivative Inspector
            </h4>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Compare non-linear activation curves and inspect their first-derivative gradient flows.
          </p>
        </div>

        <button
          onClick={() => setShowDerivative(!showDerivative)}
          className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
            showDerivative
              ? 'border-violet-500/50 bg-violet-500/20 text-violet-300'
              : 'border-white/10 bg-white/[0.03] text-zinc-400'
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>{showDerivative ? 'Derivative: ON' : 'Derivative: OFF'}</span>
        </button>
      </div>

      {/* Function Selector Tabs */}
      <div className="flex flex-wrap gap-1.5 my-4">
        {(Object.keys(ACTIVATIONS) as ActivationKey[]).map((key) => {
          const item = ACTIVATIONS[key];
          return (
            <button
              key={key}
              onClick={() => setSelectedKey(key)}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedKey === key
                  ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-md shadow-violet-500/25'
                  : 'border border-white/10 bg-white/[0.02] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.06]'
              }`}
            >
              {key.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* Canvas & Interactive Probe */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2 overflow-hidden rounded-xl border border-white/10 bg-black p-3 flex flex-col items-center">
          <canvas
            ref={canvasRef}
            width={480}
            height={280}
            className="w-full max-w-[480px] h-auto aspect-[480/280]"
          />
          <div className="w-full mt-3 flex items-center justify-between text-xs px-2 text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-5 rounded-full" style={{ backgroundColor: active.color }} />
              $f(x)$ Function
            </span>
            {showDerivative && (
              <span className="flex items-center gap-1.5">
                <span className="h-0.5 w-5 border-t-2 border-dashed border-white" />
                $f'(x)$ Gradient Flow
              </span>
            )}
          </div>
        </div>

        {/* Live Mathematical Inspector Card */}
        <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-zinc-900/60 p-4">
          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-violet-400">
                Selected Function
              </span>
              <h5 className="text-sm font-bold text-white mt-0.5">{active.name}</h5>
              <span className="inline-block rounded-md bg-white/[0.06] px-2 py-0.5 text-[10px] font-mono text-zinc-300 mt-1">
                Used in: {active.usedIn}
              </span>
            </div>

            {/* Probe Slider */}
            <div className="rounded-lg border border-white/[0.08] bg-black/40 p-2.5">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-zinc-400">Input Value ($x$):</span>
                <span className="font-mono text-violet-300 font-bold">{probeX.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-3.5"
                max="3.5"
                step="0.05"
                value={probeX}
                onChange={(e) => setProbeX(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-violet-500"
              />
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-white/[0.06] text-xs">
                <div>
                  <span className="text-[10px] text-zinc-400 block">Output $f(x)$:</span>
                  <span className="font-mono font-bold text-white">{active.fn(probeX).toFixed(3)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block">Gradient $f'(x)$:</span>
                  <span className="font-mono font-bold text-emerald-400">{active.dfn(probeX).toFixed(3)}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-zinc-400 mt-3 pt-2 border-t border-white/[0.08] italic">
            💡 Notice how GELU and Swish avoid complete gradient death at $x &lt; 0$ with smooth probabilistic curvature.
          </p>
        </div>
      </div>
    </div>
  );
}
