'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Activity } from 'lucide-react';

type LandscapeType = 'ravine' | 'saddle' | 'local_minima';
type OptimizerType = 'sgd' | 'momentum' | 'adamw' | 'muon';

interface OptimizerState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  m_x: number;
  m_y: number;
  v_x: number;
  v_y: number;
  path: [number, number][];
  color: string;
  name: string;
}

export default function LossLandscapeExplorer() {
  const [landscape, setLandscape] = useState<LandscapeType>('ravine');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [stepCount, setStepCount] = useState<number>(0);
  const [learningRate, setLearningRate] = useState<number>(0.08);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize optimizer states
  const [optimizers, setOptimizers] = useState<Record<OptimizerType, OptimizerState>>({
    sgd: { x: -1.8, y: 1.6, vx: 0, vy: 0, m_x: 0, m_y: 0, v_x: 0, v_y: 0, path: [[-1.8, 1.6]], color: '#ef4444', name: 'SGD' },
    momentum: { x: -1.8, y: 1.6, vx: 0, vy: 0, m_x: 0, m_y: 0, v_x: 0, v_y: 0, path: [[-1.8, 1.6]], color: '#f59e0b', name: 'SGD + Momentum' },
    adamw: { x: -1.8, y: 1.6, vx: 0, vy: 0, m_x: 0, m_y: 0, v_x: 0, v_y: 0, path: [[-1.8, 1.6]], color: '#06b6d4', name: 'AdamW' },
    muon: { x: -1.8, y: 1.6, vx: 0, vy: 0, m_x: 0, m_y: 0, v_x: 0, v_y: 0, path: [[-1.8, 1.6]], color: '#8b5cf6', name: 'Muon (Orthogonal)' },
  });

  // Loss function and gradients
  const computeGradient = (x: number, y: number, type: LandscapeType): [number, number] => {
    if (type === 'ravine') {
      // Ill-conditioned anisotropic quadratic: f(x, y) = 0.1 * x^2 + 2.0 * y^2
      return [0.2 * x, 4.0 * y];
    } else if (type === 'saddle') {
      // Saddle Point: f(x, y) = x^2 - y^2 + 0.1 * x^4
      return [2 * x + 0.4 * Math.pow(x, 3), -2 * y];
    } else {
      // Rastrigin-like Noisy Local Minima
      const gx = 2 * x + 4 * Math.PI * Math.sin(2 * Math.PI * x);
      const gy = 2 * y + 4 * Math.PI * Math.sin(2 * Math.PI * y);
      return [gx * 0.4, gy * 0.4];
    }
  };

  const resetSimulation = () => {
    setIsPlaying(false);
    setStepCount(0);
    const startX = -1.8;
    const startY = landscape === 'saddle' ? 0.05 : 1.6;

    setOptimizers({
      sgd: { x: startX, y: startY, vx: 0, vy: 0, m_x: 0, m_y: 0, v_x: 0, v_y: 0, path: [[startX, startY]], color: '#ef4444', name: 'SGD' },
      momentum: { x: startX, y: startY, vx: 0, vy: 0, m_x: 0, m_y: 0, v_x: 0, v_y: 0, path: [[startX, startY]], color: '#f59e0b', name: 'SGD + Momentum' },
      adamw: { x: startX, y: startY, vx: 0, vy: 0, m_x: 0, m_y: 0, v_x: 0, v_y: 0, path: [[startX, startY]], color: '#06b6d4', name: 'AdamW' },
      muon: { x: startX, y: startY, vx: 0, vy: 0, m_x: 0, m_y: 0, v_x: 0, v_y: 0, path: [[startX, startY]], color: '#8b5cf6', name: 'Muon (Orthogonal)' },
    });
  };

  // Step simulation forward
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setStepCount(prev => {
        if (prev > 120) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });

      setOptimizers(prev => {
        const next = { ...prev };
        const lr = learningRate;

        // SGD
        const [gxSgd, gySgd] = computeGradient(next.sgd.x, next.sgd.y, landscape);
        next.sgd.x -= lr * gxSgd;
        next.sgd.y -= lr * gySgd;
        next.sgd.path.push([next.sgd.x, next.sgd.y]);

        // Momentum
        const [gxMom, gyMom] = computeGradient(next.momentum.x, next.momentum.y, landscape);
        next.momentum.vx = 0.9 * next.momentum.vx - lr * gxMom;
        next.momentum.vy = 0.9 * next.momentum.vy - lr * gyMom;
        next.momentum.x += next.momentum.vx;
        next.momentum.y += next.momentum.vy;
        next.momentum.path.push([next.momentum.x, next.momentum.y]);

        // AdamW
        const [gxAdam, gyAdam] = computeGradient(next.adamw.x, next.adamw.y, landscape);
        const beta1 = 0.9, beta2 = 0.999, eps = 1e-8;
        next.adamw.m_x = beta1 * next.adamw.m_x + (1 - beta1) * gxAdam;
        next.adamw.m_y = beta1 * next.adamw.m_y + (1 - beta1) * gyAdam;
        next.adamw.v_x = beta2 * next.adamw.v_x + (1 - beta2) * (gxAdam * gxAdam);
        next.adamw.v_y = beta2 * next.adamw.v_y + (1 - beta2) * (gyAdam * gyAdam);
        const mHatX = next.adamw.m_x / (1 - Math.pow(beta1, Math.max(1, stepCount + 1)));
        const mHatY = next.adamw.m_y / (1 - Math.pow(beta1, Math.max(1, stepCount + 1)));
        const vHatX = next.adamw.v_x / (1 - Math.pow(beta2, Math.max(1, stepCount + 1)));
        const vHatY = next.adamw.v_y / (1 - Math.pow(beta2, Math.max(1, stepCount + 1)));
        next.adamw.x -= (lr * mHatX) / (Math.sqrt(vHatX) + eps) + 0.01 * lr * next.adamw.x;
        next.adamw.y -= (lr * mHatY) / (Math.sqrt(vHatY) + eps) + 0.01 * lr * next.adamw.y;
        next.adamw.path.push([next.adamw.x, next.adamw.y]);

        // Muon (Normalized Momentum Direction)
        const [gxMuon, gyMuon] = computeGradient(next.muon.x, next.muon.y, landscape);
        next.muon.m_x = 0.95 * next.muon.m_x + gxMuon;
        next.muon.m_y = 0.95 * next.muon.m_y + gyMuon;
        const norm = Math.sqrt(next.muon.m_x * next.muon.m_x + next.muon.m_y * next.muon.m_y) + 1e-8;
        next.muon.x -= lr * 1.5 * (next.muon.m_x / norm);
        next.muon.y -= lr * 1.5 * (next.muon.m_y / norm);
        next.muon.path.push([next.muon.x, next.muon.y]);

        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [isPlaying, landscape, learningRate, stepCount]);

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Coordinate conversion
    const toScreen = (x: number, y: number): [number, number] => {
      const sx = ((x + 2.5) / 5) * w;
      const sy = ((-y + 2.5) / 5) * h;
      return [sx, sy];
    };

    // Draw Background & Contours
    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 0, w, h);

    // Draw contour levels
    for (let r = 0.3; r < 3.5; r += 0.4) {
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 + r * 0.03})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let theta = 0; theta <= Math.PI * 2; theta += 0.1) {
        let x = r * Math.cos(theta);
        let y = (r * Math.sin(theta)) / (landscape === 'ravine' ? 2.5 : 1);
        if (landscape === 'saddle') {
          x = (r + 0.2) * Math.cos(theta);
          y = (r - 0.2) * Math.sin(theta);
        }
        const [sx, sy] = toScreen(x, y);
        if (theta === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      }
      ctx.closePath();
      ctx.stroke();
    }

    // Draw Axis lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    const [origX, origY] = toScreen(0, 0);
    ctx.moveTo(0, origY);
    ctx.lineTo(w, origY);
    ctx.moveTo(origX, 0);
    ctx.lineTo(origX, h);
    ctx.stroke();

    // Draw Optimizer Paths
    Object.values(optimizers).forEach(opt => {
      if (opt.path.length < 2) return;
      ctx.strokeStyle = opt.color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      opt.path.forEach(([px, py], i) => {
        const [sx, sy] = toScreen(px, py);
        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      });
      ctx.stroke();

      // Draw Head Particle
      const lastPoint = opt.path[opt.path.length - 1];
      const [hx, hy] = toScreen(lastPoint[0], lastPoint[1]);
      ctx.fillStyle = opt.color;
      ctx.shadowColor = opt.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(hx, hy, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }, [optimizers, landscape]);

  return (
    <div className="my-6 rounded-2xl border border-violet-500/30 bg-gradient-to-b from-zinc-900/90 via-zinc-950/95 to-black p-4 sm:p-6 backdrop-blur-xl shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-500/20 text-violet-400 border border-violet-500/30">
              <Activity className="h-3.5 w-3.5" />
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Interactive Loss Surface & Optimizer Dynamics
            </h4>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Simulate how modern optimizers navigate anisotropic ravines, ill-conditioned curvatures, and saddle points.
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all shadow-md ${
              isPlaying
                ? 'bg-amber-500 text-black shadow-amber-500/20'
                : 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-violet-500/25 hover:opacity-90'
            }`}
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Simulate Trajectory'}</span>
          </button>

          <button
            onClick={resetSimulation}
            className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-2 text-zinc-300 hover:bg-white/10 hover:text-white"
            title="Reset Simulation"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Landscape Type Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 my-4">
        <div className="flex items-center gap-1.5 bg-zinc-900/90 p-1 rounded-xl border border-white/10">
          <span className="text-[11px] text-zinc-400 ml-2 mr-1">Loss Surface:</span>
          {(['ravine', 'saddle', 'local_minima'] as LandscapeType[]).map((type) => (
            <button
              key={type}
              onClick={() => {
                setLandscape(type);
                resetSimulation();
              }}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold capitalize transition-all ${
                landscape === type
                  ? 'bg-violet-500 text-white shadow-sm shadow-violet-500/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {type.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-zinc-400">Step: <strong className="text-violet-300 font-mono">{stepCount}</strong>/120</span>
        </div>
      </div>

      {/* Canvas & Legend */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3 overflow-hidden rounded-xl border border-white/10 bg-black flex items-center justify-center p-2">
          <canvas
            ref={canvasRef}
            width={520}
            height={320}
            className="w-full max-w-[520px] h-auto aspect-[520/320]"
          />
        </div>

        {/* Optimizer Comparison Status */}
        <div className="flex flex-col justify-between gap-2 rounded-xl border border-white/10 bg-zinc-900/60 p-3.5">
          <div className="space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
              Active Optimizers:
            </span>
            {Object.entries(optimizers).map(([key, opt]) => (
              <div key={key} className="flex items-center justify-between border-b border-white/[0.04] pb-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: opt.color }} />
                  <span className="font-semibold text-zinc-200">{opt.name}</span>
                </div>
                <span className="font-mono text-[10px] text-zinc-400">
                  d: {Math.sqrt(opt.x * opt.x + opt.y * opt.y).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-2 text-[11px] text-zinc-400 border-t border-white/[0.08] pt-2 italic">
            💡 <strong>Observation:</strong> Notice how <strong>SGD</strong> bounces back and forth across steep ravine walls, while <strong>AdamW</strong> and <strong>Muon</strong> adaptively dampen perpendicular oscillations to race down the valley!
          </div>
        </div>
      </div>
    </div>
  );
}
