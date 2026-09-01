'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function HeroBackgroundPattern() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0"
    >
      {/* 1. SEAMLESS INFINITE FULL-WIDTH GRID LATTICE */}
      <div 
        className="absolute -inset-10 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px, 0)`
        }}
      >
        <svg
          className="w-full h-full opacity-[0.45] dark:opacity-[0.25]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            {/* Fine Dotted Graph Matrix */}
            <pattern id="fullFineGrid" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="14" cy="14" r="0.9" fill="currentColor" className="text-slate-400 dark:text-slate-500" />
            </pattern>

            {/* Major Drafting Grid Lines */}
            <pattern id="fullMajorGrid" width="140" height="140" patternUnits="userSpaceOnUse">
              <rect width="140" height="140" fill="url(#fullFineGrid)" />
              <path d="M 140 0 L 0 0 0 140" fill="none" stroke="currentColor" strokeWidth="0.75" className="text-slate-300/80 dark:text-slate-700/60" />
            </pattern>
          </defs>

          {/* Infinite Full-Width Surface */}
          <rect width="100%" height="100%" fill="url(#fullMajorGrid)" />

          {/* Mathematical Manifold Curves (Fluid & Infinite) */}
          <g className="text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor">
            <path d="M 0 340 Q 500 200, 1000 380 T 2000 280 T 3000 360" strokeWidth="1" strokeDasharray="6 4" opacity="0.6" />
            <path d="M 0 410 Q 500 270, 1000 450 T 2000 350 T 3000 430" strokeWidth="1.2" opacity="0.75" />
            <path d="M 0 480 Q 500 340, 1000 520 T 2000 420 T 3000 500" strokeWidth="1.5" opacity="0.9" />
            <path d="M 0 550 Q 500 410, 1000 590 T 2000 490 T 3000 570" strokeWidth="1.2" opacity="0.75" />
          </g>

          {/* Precision Corner Crosshairs & Metrics */}
          <g className="text-slate-400 dark:text-slate-500 font-mono text-[10px]" fill="currentColor" opacity="0.65">
            <text x="3%" y="10%">⊞ ISO-SURFACE: L(θ) = E[ℓ(f(x; θ), y)]</text>
            <text x="97%" y="10%" textAnchor="end">HESSIAN: ∇²L(θ) ≻ 0</text>
            <text x="3%" y="90%">RIEMANNIAN METRIC: g_ij(θ)</text>
            <text x="97%" y="90%" textAnchor="end">NATURAL GRADIENT: F^-1 ∇L</text>
          </g>
        </svg>
      </div>

      {/* 2. SEAMLESS TOP & BOTTOM FADES (Zero vertical borders or cropping) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-[#0b0f19] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/30 dark:from-[#0b0f19]/30 dark:via-transparent dark:to-[#0b0f19]/30 pointer-events-none" />
    </div>
  );
}
