'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export interface DecisionNode {
  id: string;
  question: string;
  answer?: string;           // leaf node
  yes?: DecisionNode;
  no?: DecisionNode;
  badge?: string;
}

interface DecisionNodeRendererProps {
  node: DecisionNode;
  depth?: number;
}

function DecisionNodeRenderer({ node, depth = 0 }: DecisionNodeRendererProps) {
  const [expanded, setExpanded] = useState(depth < 2);
  const isLeaf = !node.yes && !node.no;

  if (isLeaf) {
    return (
      <div className="ml-4 mt-1 rounded-lg border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/60 dark:bg-emerald-950/20 px-3 py-2">
        {node.badge && (
          <span className="inline-block mb-1 rounded text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
            {node.badge}
          </span>
        )}
        <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">{node.question}</p>
        {node.answer && <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5 leading-relaxed">{node.answer}</p>}
      </div>
    );
  }

  return (
    <div className={`${depth > 0 ? 'ml-4 mt-1' : ''}`}>
      {/* Decision diamond */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center gap-2 rounded-lg border border-sky-200 dark:border-sky-800/60 bg-sky-50/60 dark:bg-sky-950/20 px-3 py-2 text-left hover:bg-sky-100/60 dark:hover:bg-sky-900/20 transition-colors"
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-sky-500 text-white">
          {expanded
            ? <ChevronDown className="h-3.5 w-3.5" />
            : <ChevronRight className="h-3.5 w-3.5" />}
        </span>
        <span className="text-[11px] font-mono font-bold uppercase text-sky-600 dark:text-cyan-400 mr-1">?</span>
        <p className="text-xs font-bold text-sky-900 dark:text-sky-100 flex-1">{node.question}</p>
        {node.badge && (
          <span className="rounded text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300">
            {node.badge}
          </span>
        )}
      </button>

      {expanded && (
        <div className="mt-1 ml-3 space-y-1 border-l-2 border-slate-200 dark:border-slate-700 pl-3">
          {node.yes && (
            <div>
              <span className="inline-block text-[10px] font-mono font-bold uppercase text-emerald-600 dark:text-emerald-400 mb-0.5">✓ YES</span>
              <DecisionNodeRenderer node={node.yes} depth={depth + 1} />
            </div>
          )}
          {node.no && (
            <div>
              <span className="inline-block text-[10px] font-mono font-bold uppercase text-rose-600 dark:text-rose-400 mb-0.5">✗ NO</span>
              <DecisionNodeRenderer node={node.no} depth={depth + 1} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface DecisionTreeProps {
  title?: string;
  description?: string;
  root: DecisionNode;
}

export default function DecisionTree({ title, description, root }: DecisionTreeProps) {
  return (
    <div className="my-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5 space-y-4">
      {(title || description) && (
        <div className="space-y-1 border-b border-slate-100 dark:border-slate-800 pb-3">
          {title && (
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <span className="text-base">🌳</span>
              {title}
            </h4>
          )}
          {description && <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>}
        </div>
      )}
      <DecisionNodeRenderer node={root} depth={0} />
    </div>
  );
}
