'use client';

import React from 'react';

export default function TextStrokeReveal() {
  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none py-2">
      <style jsx>{`
        @keyframes strokeDrawLeft {
          0% {
            stroke-dasharray: 2000;
            stroke-dashoffset: 2000;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            stroke-dasharray: 2000;
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        @keyframes fillWipeLeftToRight {
          0% {
            width: 0px;
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          100% {
            width: 1700px;
            opacity: 1;
          }
        }

        .svg-stroke-line-1 {
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          animation: strokeDrawLeft 1.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }

        .svg-stroke-line-2 {
          stroke-dasharray: 2000;
          stroke-dashoffset: 2000;
          animation: strokeDrawLeft 1.8s cubic-bezier(0.25, 1, 0.5, 1) 0.3s forwards;
        }

        .svg-clip-wipe {
          width: 0px;
          animation: fillWipeLeftToRight 2.2s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards;
        }
      `}</style>

      {/* BIGGER SVG STROKE-DRAWING ANIMATION + LEFT-TO-RIGHT COMPLETE FILL REVEAL */}
      <div className="w-full max-w-6xl mx-auto flex justify-center overflow-visible px-2">
        <svg
          viewBox="0 0 1600 270"
          className="w-full h-auto max-h-[220px] sm:max-h-[300px] lg:max-h-[350px] overflow-visible select-none"
          preserveAspectRatio="xMidYMid meet"
          aria-label="First-Principles Artificial Intelligence & Research Handbook"
          role="img"
        >
          <defs>
            {/* WIDE CLIP PATH EXPANDING FROM LEFT TO RIGHT OVER ENTIRE 1600PX VIEWBOX */}
            <clipPath id="svgFillClipPath">
              <rect
                x="0"
                y="0"
                height="270"
                className="svg-clip-wipe"
              />
            </clipPath>
          </defs>

          {/* 1. FIRST: SVG BORDER STROKE PATH DRAWING (BIGGER 80PX FONT) */}
          <text
            x="800"
            y="105"
            textAnchor="middle"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="svg-stroke-line-1 font-black tracking-tight text-slate-950 dark:text-white"
            style={{
              fontSize: '80px',
              fontWeight: 900,
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-2px',
            }}
          >
            First-Principles Artificial Intelligence
          </text>

          <text
            x="800"
            y="215"
            textAnchor="middle"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="svg-stroke-line-2 font-black tracking-tight text-slate-950 dark:text-white"
            style={{
              fontSize: '80px',
              fontWeight: 900,
              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-2px',
            }}
          >
            &amp; Research Handbook
          </text>

          {/* 2. SECOND: SOLID FILL REVEAL WIPING FROM LEFT TO RIGHT */}
          <g clipPath="url(#svgFillClipPath)">
            <text
              x="800"
              y="105"
              textAnchor="middle"
              stroke="none"
              className="font-black tracking-tight fill-slate-950 dark:fill-white"
              style={{
                fontSize: '80px',
                fontWeight: 900,
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                letterSpacing: '-2px',
              }}
            >
              First-Principles Artificial Intelligence
            </text>

            <text
              x="800"
              y="215"
              textAnchor="middle"
              stroke="none"
              className="font-black tracking-tight fill-slate-950 dark:fill-white"
              style={{
                fontSize: '80px',
                fontWeight: 900,
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                letterSpacing: '-2px',
              }}
            >
              &amp; Research Handbook
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
