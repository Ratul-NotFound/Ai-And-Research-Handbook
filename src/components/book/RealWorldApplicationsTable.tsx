'use client';

import React from 'react';
import { RealWorldUse } from '@/types';
import { RenderInlineText } from './MarkdownContent';

interface RealWorldApplicationsTableProps {
  title?: string;
  applications?: RealWorldUse[];
}

export default function RealWorldApplicationsTable({
  title = 'Where This Powers the Real World Today',
  applications = []
}: RealWorldApplicationsTableProps) {
  if (!applications || applications.length === 0) return null;

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs transition-colors">
      {/* Card Header with Chart Emoji */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 px-5 py-3.5">
        <span className="text-base">📊</span>
        <h3 className="text-xs sm:text-sm font-black text-slate-950 dark:text-white tracking-tight">
          <RenderInlineText text={title} />
        </h3>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm text-slate-800 dark:text-slate-200 divide-y divide-slate-100 dark:divide-slate-800">
          <thead className="bg-slate-50/40 dark:bg-slate-950/40 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="w-1/3 min-w-[160px] px-5 py-3 border-r border-slate-100 dark:border-slate-800">
                Industry & Application
              </th>
              <th className="w-2/3 px-5 py-3">
                How It Powers It Behind the Scenes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 bg-white dark:bg-slate-900/20">
            {applications.map((item, idx) => (
              <tr
                key={idx}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
              >
                <td className="px-5 py-3.5 font-bold text-slate-950 dark:text-white border-r border-slate-100 dark:border-slate-800 leading-snug">
                  <RenderInlineText text={item.industry || item.domain || ''} />
                </td>
                <td className="px-5 py-3.5 text-slate-700 dark:text-slate-300 leading-relaxed">
                  <RenderInlineText text={item.description || item.application || ''} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
