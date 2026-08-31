'use client';

import React, { useState } from 'react';
import { Target, AlertTriangle, CheckCircle, Flame, RefreshCw } from 'lucide-react';

export default function BiasVarianceVisualizer() {
  const [mode, setMode] = useState<'underfit' | 'optimal' | 'overfit'>('optimal');

  // Synthetic data points (parabolic curve y = 0.5 * (x - 2)^2 + noise)
  const dataPoints = [
    { x: 10, y: 75 },
    { x: 25, y: 45 },
    { x: 40, y: 28 },
    { x: 55, y: 25 },
    { x: 70, y: 38 },
    { x: 85, y: 70 },
  ];

  // Curve paths for SVG visualizer
  const curves = {
    underfit: 'M 5,80 L 95,20', // Rigid straight line
    optimal: 'M 5,85 Q 50,10 95,85', // Smooth parabola
    overfit: 'M 5,85 C 10,75 18,90 25,45 S 35,10 40,28 S 50,40 55,25 S 65,10 70,38 S 80,90 85,70 S 90,80 95,85', // Wild oscillations
  };

  const modeInfo = {
    underfit: {
      title: 'High Bias (Underfitting)',
      badge: 'Degree d=1 Linear',
      color: 'text-amber-600 dark:text-amber-400',
      badgeBg: 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800',
      trainError: '38.4% (High)',
      testError: '41.2% (High)',
      diagnosis: 'Model is too rigid and cannot capture non-linear relationships.',
      fix: 'Increase model depth, add polynomial/interaction terms, or reduce regularization.',
      dartCluster: 'Offset tight cluster (consistently misses the bullseye by a large margin).',
    },
    optimal: {
      title: 'Optimal Tradeoff (Balanced)',
      badge: 'Degree d=3 Polynomial',
      color: 'text-emerald-600 dark:text-emerald-400',
      badgeBg: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800',
      trainError: '4.8% (Low)',
      testError: '5.2% (Low & Generalizable)',
      diagnosis: 'Model learns the underlying data manifold while ignoring random noise.',
      fix: 'Sweet spot reached! Model generalizes reliably to unseen holdout test data.',
      dartCluster: 'Tight cluster right on the bullseye center.',
    },
    overfit: {
      title: 'High Variance (Overfitting)',
      badge: 'Degree d=15 Polynomial',
      color: 'text-rose-600 dark:text-rose-400',
      badgeBg: 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border-rose-300 dark:border-rose-800',
      trainError: '0.0% (Zero Loss)',
      testError: '74.6% (Catastrophic)',
      diagnosis: 'Model memorized training noise points and oscillates wildly between samples.',
      fix: 'Add L2 weight decay, increase Dropout (0.3), add data augmentation, or prune layers.',
      dartCluster: 'Wildly scattered arrows all over the wall due to high sensitivity to sample noise.',
    },
  };

  const current = modeInfo[mode];

  return (
    <div className="my-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/80">
              <Target className="h-4 w-4" />
            </span>
            <h4 className="text-sm font-black text-slate-950 dark:text-white tracking-tight">
              Interactive Bias-Variance Curve & Dartboard Explorer
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click between Underfitting, Optimal, and Overfitting to visually see how model capacity alters decision curves and test error.
          </p>
        </div>

        {/* 3 State Toggle Buttons */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setMode('underfit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'underfit'
                ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Underfitting
          </button>

          <button
            onClick={() => setMode('optimal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'optimal'
                ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Optimal Fit
          </button>

          <button
            onClick={() => setMode('overfit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              mode === 'overfit'
                ? 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Overfitting
          </button>
        </div>
      </div>

      {/* Visual Canvas + Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Interactive SVG Curve Plot (7 cols) */}
        <div className="md:col-span-7 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60 p-4 space-y-2">
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
            <span>Feature Space (x)</span>
            <span className={`px-2 py-0.5 rounded border font-bold ${current.badgeBg}`}>
              {current.badge}
            </span>
          </div>

          <div className="relative aspect-[16/9] w-full bg-white dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Grid Lines */}
              <line x1="0" y1="25" x2="100" y2="25" stroke="currentColor" className="text-slate-100 dark:text-slate-800/40" strokeWidth="0.5" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" className="text-slate-100 dark:text-slate-800/40" strokeWidth="0.5" />
              <line x1="0" y1="75" x2="100" y2="75" stroke="currentColor" className="text-slate-100 dark:text-slate-800/40" strokeWidth="0.5" />

              {/* Fitted Decision Curve */}
              <path
                d={curves[mode]}
                fill="none"
                stroke={mode === 'underfit' ? '#d97706' : mode === 'optimal' ? '#10b981' : '#f43f5e'}
                strokeWidth="2.5"
                className="transition-all duration-300 ease-out"
              />

              {/* Noisy Training Points */}
              {dataPoints.map((pt, i) => (
                <circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r="2.5"
                  className="fill-sky-500 stroke-white dark:stroke-slate-900 stroke-2"
                />
              ))}
            </svg>
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 px-1">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-sky-500 inline-block" /> Training Samples
            </span>
            <span>Fitted Hypothesis (ŷ)</span>
          </div>
        </div>

        {/* Diagnostic Metrics & Fix Playbook (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
              Diagnostic State
            </span>
            <h5 className={`text-base font-black ${current.color}`}>
              {current.title}
            </h5>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-2.5 space-y-0.5">
              <span className="text-[10px] font-mono text-slate-400 block">Train Loss</span>
              <span className="font-mono font-black text-slate-900 dark:text-white">
                {current.trainError}
              </span>
            </div>

            <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-2.5 space-y-0.5">
              <span className="text-[10px] font-mono text-slate-400 block">Val/Test Loss</span>
              <span className={`font-mono font-black ${mode === 'optimal' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {current.testError}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="rounded-lg border border-slate-100 dark:border-slate-800 p-3 bg-white dark:bg-slate-900/40">
              <strong className="font-bold text-slate-900 dark:text-white block mb-0.5">Root Cause:</strong>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {current.diagnosis}
              </p>
            </div>

            <div className="rounded-lg border border-emerald-200 dark:border-emerald-900/60 p-3 bg-emerald-50/50 dark:bg-emerald-950/20">
              <strong className="font-bold text-emerald-900 dark:text-emerald-300 block mb-0.5">Recommended Fix:</strong>
              <p className="text-emerald-800 dark:text-emerald-400 leading-relaxed">
                {current.fix}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
