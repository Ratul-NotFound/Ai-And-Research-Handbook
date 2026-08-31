'use client';

import React from 'react';
import { StepByStep } from '@/types';
import { ArrowRight } from 'lucide-react';

interface StepByStepGuideProps {
  steps: StepByStep[];
  title?: string;
}

export default function StepByStepGuide({ steps, title }: StepByStepGuideProps) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="my-4 space-y-3">
      {title && (
        <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="h-1 w-5 rounded-full bg-sky-500 inline-block" />
          {title}
        </h4>
      )}
      <ol className="relative space-y-0">
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;
          return (
            <li key={idx} className="relative flex gap-4">
              {/* Vertical connector line */}
              {!isLast && (
                <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800" />
              )}

              {/* Step number circle */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-mono text-xs font-black shadow-xs z-10">
                {step.stepNumber}
              </div>

              {/* Step content */}
              <div className={`flex-1 pb-6 ${isLast ? 'pb-0' : ''}`}>
                <h5 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h5>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {step.description}
                </p>
                {step.example && (
                  <div className="mt-2 rounded-lg border border-violet-200 dark:border-violet-800/50 bg-violet-50/60 dark:bg-violet-950/20 p-2.5 text-xs text-violet-900 dark:text-violet-200">
                    <span className="font-bold text-[10px] uppercase font-mono tracking-wider text-violet-600 dark:text-violet-400 block mb-1">Example</span>
                    {step.example}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
