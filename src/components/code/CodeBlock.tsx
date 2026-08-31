'use client';

import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeBlockProps {
  title: string;
  language: string;
  code: string;
  explanation?: string;
}

export default function CodeBlock({ title, language, code, explanation }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-sm transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-sky-400" />
          <span className="text-xs font-semibold text-slate-200">{title}</span>
          <span className="rounded bg-sky-950 px-2 py-0.5 text-[10px] font-mono font-bold uppercase text-sky-300 border border-sky-800/60">
            {language}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-[11px]">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-[11px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="overflow-x-auto p-4 text-xs font-mono leading-relaxed">
        <pre className="grid grid-cols-[auto_1fr] gap-x-4">
          <span className="select-none text-right text-slate-600 font-mono pr-2 border-r border-slate-800">
            {lines.map((_, i) => (
              <span key={i} className="block">{i + 1}</span>
            ))}
          </span>
          <code className="text-slate-100 overflow-x-auto">
            {lines.map((line, idx) => {
              const isComment = line.trim().startsWith('#');
              const isDef = line.includes('def ') || line.includes('class ') || line.includes('import ');
              return (
                <span
                  key={idx}
                  className={`block whitespace-pre ${
                    isComment ? 'text-slate-500 italic' : isDef ? 'text-sky-300 font-medium' : 'text-slate-200'
                  }`}
                >
                  {line || ' '}
                </span>
              );
            })}
          </code>
        </pre>
      </div>

      {/* Explanation Footer */}
      {explanation && (
        <div className="border-t border-slate-800 bg-slate-950/70 px-4 py-2 text-xs text-slate-400 flex items-start gap-2">
          <span className="font-semibold text-sky-400 shrink-0">Insight:</span>
          <span>{explanation}</span>
        </div>
      )}
    </div>
  );
}
