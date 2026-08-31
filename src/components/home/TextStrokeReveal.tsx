'use client';

import React from 'react';

export default function TextStrokeReveal() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none">
      <style jsx>{`
        @keyframes strokeDraw {
          0% {
            stroke-dasharray: 1200;
            stroke-dashoffset: 1200;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            stroke-dasharray: 1200;
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        @keyframes fillReveal {
          0% {
            opacity: 0;
          }
          65% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .stroke-line-1 {
          stroke-dasharray: 1200;
          stroke-dashoffset: 1200;
          animation: strokeDraw 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .stroke-line-2 {
          stroke-dasharray: 1200;
          stroke-dashoffset: 1200;
          animation: strokeDraw 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.2s forwards;
        }

        .fill-layer {
          opacity: 0;
          animation: fillReveal 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      {/* SVG STROKE-DRAW FIRST ➔ SOLID FILL REVEAL SECOND */}
      <div className="w-full max-w-4xl mx-auto flex justify-center overflow-visible">
        <svg
          viewBox="0 0 1000 230"
          className="w-full h-auto max-h-[180px] sm:max-h-[220px] overflow-visible select-none"
          preserveAspectRatio="xMidYMid meet"
          aria-label="First-Principles Artificial Intelligence & Research Handbook"
          role="img"
        >
          {/* 1. FIRST: PURE BLACK/WHITE STROKE OUTLINE DRAWING */}
          <text
            x="500"
            y="90"
            textAnchor="middle"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-line-1 font-black tracking-tight text-slate-950 dark:text-white"
            style={{
              fontSize: '62px',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-1.5px',
            }}
          >
            First-Principles Artificial Intelligence
          </text>

          <text
            x="500"
            y="175"
            textAnchor="middle"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-line-2 font-black tracking-tight text-slate-950 dark:text-white"
            style={{
              fontSize: '62px',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-1.5px',
            }}
          >
            &amp; Research Handbook
          </text>

          {/* 2. SECOND: SOLID FILL REVEAL (PURE BLACK IN LIGHT / WHITE IN DARK) */}
          <text
            x="500"
            y="90"
            textAnchor="middle"
            stroke="none"
            className="fill-layer font-black tracking-tight fill-slate-950 dark:fill-white"
            style={{
              fontSize: '62px',
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-1.5px',
            }}
          >
            First-Principles Artificial Intelligence
          </text>

          <text
            x="500"
            y="175"
            textAnchor="middle"
            stroke="none"
            className="fill-layer font-black tracking-tight fill-slate-950 dark:fill-white"
            style={{
              fontSize: '62px',
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
