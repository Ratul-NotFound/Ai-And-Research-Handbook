'use client';

import React, { useState, useMemo } from 'react';
import { Sliders, Activity, ShieldAlert, CheckCircle2, RefreshCw } from 'lucide-react';

export default function ConfusionMatrixVisualizer() {
  // Positive prevalence in synthetic cohort of 1000 patients/cases
  const total = 1000;
  const actualPositives = 100; // 10% disease / fraud prevalence
  const actualNegatives = 900;

  // Threshold slider (0.00 to 1.00)
  const [threshold, setThreshold] = useState(0.50);

  // Compute TP, FP, TN, FN dynamically based on threshold and realistic score distributions
  // Positive cases score ~ Beta(6, 2), Negative cases score ~ Beta(2, 6)
  const { tp, fp, fn, tn, precision, recall, f1, specificity, accuracy } = useMemo(() => {
    // Sigmoid model score distribution approximations:
    // P(score > t | positive) = 1 / (1 + (t / (1 - t))^1.8)
    const t = Math.max(0.01, Math.min(0.99, threshold));
    
    // Fraction of positives exceeding threshold
    const tpr = 1 / (1 + Math.pow(t / (1 - t), 1.8));
    // Fraction of negatives exceeding threshold (false alarm rate)
    const fpr = 1 / (1 + Math.pow(t / (1 - t), 4.5));

    const tpCount = Math.round(actualPositives * tpr);
    const fnCount = actualPositives - tpCount;
    const fpCount = Math.round(actualNegatives * fpr);
    const tnCount = actualNegatives - fpCount;

    const prec = tpCount + fpCount > 0 ? (tpCount / (tpCount + fpCount)) * 100 : 100;
    const rec = actualPositives > 0 ? (tpCount / actualPositives) * 100 : 0;
    const spec = actualNegatives > 0 ? (tnCount / actualNegatives) * 100 : 100;
    const acc = ((tpCount + tnCount) / total) * 100;
    const f1Score = (prec + rec) > 0 ? (2 * (prec * rec)) / (prec + rec) : 0;

    return {
      tp: tpCount,
      fp: fpCount,
      fn: fnCount,
      tn: tnCount,
      precision: prec,
      recall: rec,
      f1: f1Score,
      specificity: spec,
      accuracy: acc,
    };
  }, [threshold]);

  return (
    <div className="my-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-xs space-y-6">
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/80">
              <Activity className="h-4 w-4" />
            </span>
            <h4 className="text-sm font-black text-slate-950 dark:text-white tracking-tight">
              Interactive Confusion Matrix & Threshold Explorer
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Drag the decision threshold slider below to watch True Positives, False Alarms, Precision, and Recall change dynamically in real-time.
          </p>
        </div>

        <button
          onClick={() => setThreshold(0.50)}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 px-2.5 py-1 text-[11px] font-mono text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <RefreshCw className="h-3 w-3" />
          <span>Reset (0.50)</span>
        </button>
      </div>

      {/* Interactive Threshold Slider */}
      <div className="rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Sliders className="h-3.5 w-3.5 text-sky-500" />
            Classification Decision Threshold ($\tau$):
          </span>
          <span className="font-mono text-xs font-black text-sky-600 dark:text-cyan-400 bg-sky-50 dark:bg-sky-950/80 px-2.5 py-0.5 rounded-md border border-sky-200 dark:border-sky-800">
            {threshold.toFixed(2)}
          </span>
        </div>

        <input
          type="range"
          min="0.05"
          max="0.95"
          step="0.01"
          value={threshold}
          onChange={(e) => setThreshold(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-600"
        />

        <div className="flex justify-between text-[10px] font-mono text-slate-400">
          <span>0.05 (High Recall / More Alarms)</span>
          <span>0.50 (Standard)</span>
          <span>0.95 (High Precision / Zero Alarms)</span>
        </div>
      </div>

      {/* 2x2 Grid + Derived Metrics Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* The 2x2 Matrix Table (7 cols) */}
        <div className="md:col-span-7 space-y-3">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            2×2 Confusion Matrix (Cohort = 1,000 samples)
          </span>

          <div className="grid grid-cols-2 gap-3">
            {/* True Positive (TP) */}
            <div className="rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/30 p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-black uppercase text-emerald-700 dark:text-emerald-400">
                  True Positive (TP)
                </span>
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="text-2xl font-black text-emerald-950 dark:text-emerald-200 font-mono">
                {tp}
              </p>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 leading-tight">
                Actual cancer correctly detected
              </p>
            </div>

            {/* False Positive (FP) */}
            <div className="rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50/70 dark:bg-amber-950/30 p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-black uppercase text-amber-700 dark:text-amber-400">
                  False Positive (FP)
                </span>
                <span className="text-xs">⚠️</span>
              </div>
              <p className="text-2xl font-black text-amber-950 dark:text-amber-200 font-mono">
                {fp}
              </p>
              <p className="text-[11px] text-amber-700 dark:text-amber-400 leading-tight">
                False alarm on healthy patient
              </p>
            </div>

            {/* False Negative (FN) */}
            <div className="rounded-xl border border-rose-300 dark:border-rose-800 bg-rose-50/70 dark:bg-rose-950/30 p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-black uppercase text-rose-700 dark:text-rose-400">
                  False Negative (FN)
                </span>
                <ShieldAlert className="h-4 w-4 text-rose-600 dark:text-rose-400" />
              </div>
              <p className="text-2xl font-black text-rose-950 dark:text-rose-200 font-mono">
                {fn}
              </p>
              <p className="text-[11px] text-rose-700 dark:text-rose-400 leading-tight">
                Missed cancer (Catastrophic)
              </p>
            </div>

            {/* True Negative (TN) */}
            <div className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 p-3.5 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-black uppercase text-slate-600 dark:text-slate-400">
                  True Negative (TN)
                </span>
                <span className="text-xs">🛡️</span>
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                {tn}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                Healthy patient confirmed negative
              </p>
            </div>
          </div>
        </div>

        {/* Real-Time Calculated Metrics (5 cols) */}
        <div className="md:col-span-5 space-y-3">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
            Derived Real-Time Metrics
          </span>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-4 space-y-3">
            {/* Recall */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Recall (Sensitivity): <span className="font-mono text-[10px] font-normal text-slate-400">TP/(TP+FN)</span>
                </span>
                <span className="font-mono font-black text-emerald-600 dark:text-emerald-400">
                  {recall.toFixed(1)}%
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full transition-all duration-150" style={{ width: `${recall}%` }} />
              </div>
            </div>

            {/* Precision */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Precision (PPV): <span className="font-mono text-[10px] font-normal text-slate-400">TP/(TP+FP)</span>
                </span>
                <span className="font-mono font-black text-sky-600 dark:text-cyan-400">
                  {precision.toFixed(1)}%
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-sky-500 rounded-full transition-all duration-150" style={{ width: `${precision}%` }} />
              </div>
            </div>

            {/* F1 Score */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  F1-Score: <span className="font-mono text-[10px] font-normal text-slate-400">Harmonic Mean</span>
                </span>
                <span className="font-mono font-black text-violet-600 dark:text-violet-400">
                  {f1.toFixed(1)}%
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div className="h-full bg-violet-500 rounded-full transition-all duration-150" style={{ width: `${f1}%` }} />
              </div>
            </div>

            {/* Raw Accuracy */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
              <span className="text-slate-500 dark:text-slate-400">
                Raw Accuracy (Deceptive):
              </span>
              <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                {accuracy.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Insight Banner */}
      <div className="rounded-xl border border-sky-200 dark:border-sky-900 bg-sky-50/60 dark:bg-sky-950/30 p-3.5 text-xs leading-relaxed text-sky-900 dark:text-sky-200">
        <strong className="font-bold">Key Principle:</strong> Lowering threshold $\tau$ catches more diseased patients (Recall $\uparrow$), but triggers more false alarms (Precision $\downarrow$). Raising threshold $\tau$ ensures alarms are high-confidence (Precision $\uparrow$), but risks fatal missed cases (Recall $\downarrow$).
      </div>
    </div>
  );
}
