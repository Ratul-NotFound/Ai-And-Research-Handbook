'use client';

import React from 'react';

interface TextStrokeRevealProps {
  text?: string;
  className?: string;
}

export default function TextStrokeReveal({ className = '' }: TextStrokeRevealProps) {
  return (
    <div className={`relative w-full flex flex-col items-center justify-center ${className}`}>
      <style jsx>{`
        @keyframes strokeDraw {
          0% {
            stroke-dashoffset: 800;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        @keyframes fillReveal {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .stroke-layer {
          stroke-dasharray: 800;
          stroke-dashoffset: 800;
          animation: strokeDraw 0.9s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        .fill-layer {
          opacity: 0;
          animation: fillReveal 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>

      {/* PURE MONOCHROME SVG STROKE-THEN-FILL RENDERER */}
      <div className="w-full max-w-4xl mx-auto flex justify-center overflow-visible">
        <svg
          viewBox="0 0 1000 210"
          className="w-full h-auto max-h-[160px] sm:max-h-[210px] overflow-visible select-none"
          preserveAspectRatio="xMidYMid meet"
          aria-label="First-Principles Artificial Intelligence & Research Handbook"
          role="img"
        >
          {/* Line 1: OUTLINE STROKE (PURE BLACK IN LIGHT / WHITE IN DARK) */}
          <text
            x="500"
            y="85"
            textAnchor="middle"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-layer font-black tracking-tight text-slate-950 dark:text-white"
            style={{
              fontSize: '60px',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-1.5px',
            }}
          >
            First-Principles Artificial Intelligence
          </text>

          {/* Line 2: OUTLINE STROKE */}
          <text
            x="500"
            y="165"
            textAnchor="middle"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-layer font-black tracking-tight text-slate-950 dark:text-white"
            style={{
              fontSize: '60px',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-1.5px',
              animationDelay: '0.1s',
            }}
          >
            &amp; Research Handbook
          </text>

          {/* Line 1: SOLID FILL REVEAL (PURE BLACK IN LIGHT / WHITE IN DARK) */}
          <text
            x="500"
            y="85"
            textAnchor="middle"
            stroke="none"
            className="fill-layer font-black tracking-tight fill-slate-950 dark:fill-white"
            style={{
              fontSize: '60px',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-1.5px',
            }}
          >
            First-Principles Artificial Intelligence
          </text>

          {/* Line 2: SOLID FILL REVEAL */}
          <text
            x="500"
            y="165"
            textAnchor="middle"
            stroke="none"
            className="fill-layer font-black tracking-tight fill-slate-950 dark:fill-white"
            style={{
              fontSize: '60px',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-1.5px',
            }}
          >
            &amp; Research Handbook
          </text>
        </svg>
      </div>
    </div>
  );
}
