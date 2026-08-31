'use client';

import React, { useState, useMemo } from 'react';
import { Sparkles, Sliders, Layers, RefreshCw } from 'lucide-react';

const PRESET_SENTENCES = [
  'The animal did not cross the street because it was too tired',
  'Transformers compute query key dot products with softmax scaling',
  'Residual connections allow gradient flow through deep networks'
];

export default function AttentionVisualizer() {
  const [selectedText, setSelectedText] = useState(PRESET_SENTENCES[0]);
  const [temperature, setTemperature] = useState<number>(1.0);
  const [activeHead, setActiveHead] = useState<number>(1);
  const [hoveredTokenIndex, setHoveredTokenIndex] = useState<number | null>(null);

  const tokens = useMemo(() => {
    return selectedText.split(' ').filter(Boolean);
  }, [selectedText]);

  // Generate deterministic synthetic attention weights based on token relationships and active head
  const attentionMatrix = useMemo(() => {
    const n = tokens.length;
    const matrix: number[][] = [];

    for (let i = 0; i < n; i++) {
      const row: number[] = [];
      const tokenI = tokens[i].toLowerCase();

      for (let j = 0; j < n; j++) {
        const tokenJ = tokens[j].toLowerCase();
        let rawScore = 0;

        // Head 1: Coreference & Semantic Association (e.g. "it" attends strongly to "animal")
        if (activeHead === 1) {
          if (tokenI === 'it' && tokenJ === 'animal') rawScore = 4.2;
          else if (tokenI === 'tired' && tokenJ === 'animal') rawScore = 3.5;
          else if (tokenI === 'transformers' && (tokenJ === 'query' || tokenJ === 'softmax')) rawScore = 3.8;
          else if (tokenI === 'residual' && tokenJ === 'gradient') rawScore = 4.0;
          else if (i === j) rawScore = 1.8;
          else rawScore = Math.sin(i * 1.5 + j * 2.1) * 0.8;
        }
        // Head 2: Positional Proximity (Local context window)
        else if (activeHead === 2) {
          const dist = Math.abs(i - j);
          rawScore = Math.max(0, 4 - dist * 1.1) + (i === j ? 1.5 : 0);
        }
        // Head 3: Syntactic Head (Verb/Noun alignments)
        else {
          if ((i === 0 && j === 1) || (j === 0 && i === 1)) rawScore = 3.2;
          else if (tokenJ.length > 5 && tokenI.length > 5) rawScore = 2.8;
          else if (i === j) rawScore = 1.2;
          else rawScore = Math.cos(i * 0.9 + j * 1.4) * 0.9;
        }

        // Apply Temperature
        const scaledScore = rawScore / Math.max(0.1, temperature);
        row.push(scaledScore);
      }

      // Softmax normalization
      const maxVal = Math.max(...row);
      const expRow = row.map(v => Math.exp(v - maxVal));
      const sumExp = expRow.reduce((a, b) => a + b, 0);
      matrix.push(expRow.map(v => v / sumExp));
    }

    return matrix;
  }, [tokens, activeHead, temperature]);

  return (
    <div className="my-6 rounded-2xl border border-pink-500/30 bg-gradient-to-b from-zinc-900/90 via-zinc-950/95 to-black p-4 sm:p-6 backdrop-blur-xl shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Interactive Multi-Head Self-Attention Matrix
            </h4>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time interactive computation of Softmax(Q · Kᵀ / (√dₖ · T))
          </p>
        </div>

        {/* Head Selector */}
        <div className="flex items-center gap-1.5 rounded-xl bg-zinc-900/80 p-1 border border-white/10">
          <Layers className="h-3.5 w-3.5 text-zinc-400 ml-1.5" />
          <span className="text-[11px] text-zinc-400 mr-1">Head:</span>
          {[1, 2, 3].map(head => (
            <button
              key={head}
              onClick={() => setActiveHead(head)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                activeHead === head
                  ? 'bg-pink-500 text-white shadow-md shadow-pink-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Head {head} {head === 1 ? '(Coreference)' : head === 2 ? '(Local)' : '(Syntactic)'}
            </button>
          ))}
        </div>
      </div>

      {/* Preset Selector & Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        <div className="md:col-span-2">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Select Sample Input Sequence:
          </label>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_SENTENCES.map((sentence, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedText(sentence)}
                className={`text-xs px-2.5 py-1.5 rounded-lg border text-left transition-all ${
                  selectedText === sentence
                    ? 'border-pink-500/60 bg-pink-500/10 text-pink-300 font-medium'
                    : 'border-white/10 bg-white/[0.02] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]'
                }`}
              >
                "{sentence.slice(0, 32)}..."
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-zinc-400 flex items-center gap-1">
              <Sliders className="h-3 w-3 text-pink-400" />
              Softmax Temp ($T$):
            </span>
            <span className="font-mono text-pink-300 font-bold">{temperature.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="3.0"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
          <div className="flex justify-between text-[10px] text-zinc-500 mt-1">
            <span>0.2 (Sharp/Argmax)</span>
            <span>1.0 (Standard)</span>
            <span>3.0 (Uniform)</span>
          </div>
        </div>
      </div>

      {/* Interactive Heatmap Matrix */}
      <div className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-zinc-950 p-4 scrollbar-thin scrollbar-thumb-zinc-700">
        <div className="min-w-[420px]">
          {/* Query Header Tokens */}
          <div className="flex items-center pb-2 pl-24">
            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400 mr-2">Keys ($K$) ➔</span>
          </div>

          <div className="grid gap-1">
            {/* Top key tokens row */}
            <div className="flex items-center">
              <div className="w-24 text-[10px] font-bold text-zinc-400 uppercase text-right pr-3">
                Queries ($Q$)
              </div>
              <div className="flex gap-1">
                {tokens.map((token, j) => (
                  <div
                    key={j}
                    className={`w-9 text-center text-[10px] font-mono truncate transition-colors ${
                      hoveredTokenIndex === j ? 'text-pink-300 font-bold' : 'text-zinc-400'
                    }`}
                    title={token}
                  >
                    {token.slice(0, 4)}
                  </div>
                ))}
              </div>
            </div>

            {/* Matrix rows */}
            {tokens.map((qToken, i) => (
              <div key={i} className="flex items-center">
                <div
                  className={`w-24 text-right pr-3 text-xs font-mono truncate transition-colors ${
                    hoveredTokenIndex === i ? 'text-pink-300 font-bold' : 'text-zinc-300'
                  }`}
                  title={qToken}
                  onMouseEnter={() => setHoveredTokenIndex(i)}
                  onMouseLeave={() => setHoveredTokenIndex(null)}
                >
                  {qToken}
                </div>

                <div className="flex gap-1">
                  {tokens.map((kToken, j) => {
                    const weight = attentionMatrix[i]?.[j] ?? 0;
                    const opacity = Math.min(1, Math.max(0.08, weight));
                    const isFocus = hoveredTokenIndex === i || hoveredTokenIndex === j;

                    return (
                      <div
                        key={j}
                        onMouseEnter={() => setHoveredTokenIndex(i)}
                        onMouseLeave={() => setHoveredTokenIndex(null)}
                        className={`group relative h-9 w-9 rounded flex items-center justify-center text-[10px] font-mono font-medium transition-all duration-150 cursor-pointer ${
                          isFocus ? 'ring-1 ring-pink-400 scale-105' : ''
                        }`}
                        style={{
                          backgroundColor: `rgba(236, 72, 153, ${opacity})`,
                          color: weight > 0.35 ? '#ffffff' : '#a1a1aa'
                        }}
                      >
                        {(weight * 100).toFixed(0)}%
                        
                        {/* Tooltip */}
                        <div className="pointer-events-none absolute bottom-full mb-2 hidden z-30 w-44 rounded-lg border border-pink-500/40 bg-zinc-900/95 p-2 text-left shadow-xl backdrop-blur-md group-hover:block">
                          <p className="text-[10px] text-zinc-400 font-sans">
                            <span className="font-bold text-white">"{qToken}"</span> attends to <span className="font-bold text-pink-300">"{kToken}"</span>:
                          </p>
                          <p className="text-xs font-mono font-bold text-pink-400 mt-0.5">
                            {(weight * 100).toFixed(2)}% probability
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Educational Insight */}
      <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20 p-3 text-xs text-zinc-300">
        <RefreshCw className="h-4 w-4 text-pink-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-pink-300">Observation: </span>
          {activeHead === 1
            ? 'Head 1 demonstrates coreference resolution: notice how pronoun "it" assigns >50% attention mass back to the antecedent noun "animal".'
            : activeHead === 2
            ? 'Head 2 exhibits strict local diagonal banding: tokens focus predominantly on immediate predecessor and successor words.'
            : 'Head 3 distributes attention across long-range structural syntax boundaries.'}
        </div>
      </div>
    </div>
  );
}
