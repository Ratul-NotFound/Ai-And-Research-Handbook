'use client';

import React from 'react';

interface MarkdownContentProps {
  content: string;
}

/**
 * Super-robust Markdown Parser supporting:
 * - Markdown tables (| col | col |) with auto-normalization of inline table breaks
 * - Headings (##, ###, ####)
 * - Bold (**text**), Italic (*text*), Inline code (`code`)
 * - Blockquotes (> text)
 * - Numbered lists (1. item) with custom numbered badges
 * - Bullet lists (- item or * item)
 * - Checkboxes (- [x] / - [ ])
 * - Paragraphs with clean spacing
 */
export default function MarkdownContent({ content }: MarkdownContentProps) {
  // ── Inline styler ──────────────────────────────────────────────────────────
  const renderInline = (text: string): React.ReactNode => {
    // Split by code blocks first
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('`') && part.endsWith('`'))
        return (
          <code
            key={i}
            className="rounded-md bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 font-mono text-[11px] sm:text-xs text-sky-700 dark:text-cyan-300 font-semibold border border-slate-200/80 dark:border-slate-700/60"
          >
            {part.slice(1, -1)}
          </code>
        );
      if (part.startsWith('**') && part.endsWith('**'))
        return (
          <strong key={i} className="font-bold text-slate-950 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      if (part.startsWith('*') && part.endsWith('*'))
        return (
          <em key={i} className="italic text-slate-700 dark:text-slate-300">
            {part.slice(1, -1)}
          </em>
        );
      return part;
    });
  };

  // ── Table renderer ──────────────────────────────────────────────────────────
  const renderTable = (tableLines: string[], key: number | string) => {
    const dataLines = tableLines.filter((l) => {
      const t = l.trim();
      return t.startsWith('|') && t.endsWith('|') && !t.match(/^\|[\s\-:|]+\|$/);
    });
    if (dataLines.length < 1) return null;

    const headerCells = dataLines[0]
      .split('|')
      .slice(1, -1)
      .map((h) => h.trim());
    const bodyRows = dataLines.slice(1);

    return (
      <div
        key={key}
        className="my-5 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-xs"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-800 dark:text-slate-200 divide-y divide-slate-200 dark:border-slate-800">
            <thead className="bg-slate-50 dark:bg-slate-950/80">
              <tr>
                {headerCells.map((h, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-3 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 border-r last:border-r-0 border-slate-200 dark:border-slate-800"
                  >
                    {renderInline(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {bodyRows.map((rowStr, rIdx) => {
                const cells = rowStr
                  .split('|')
                  .slice(1, -1)
                  .map((c) => c.trim());
                return (
                  <tr
                    key={rIdx}
                    className={
                      rIdx % 2 === 0
                        ? 'bg-white dark:bg-slate-900/20 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors'
                        : 'bg-slate-50/50 dark:bg-slate-800/20 hover:bg-slate-100/60 dark:hover:bg-slate-800/50 transition-colors'
                    }
                  >
                    {cells.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className="px-4 py-3 leading-relaxed border-r last:border-r-0 border-slate-100 dark:border-slate-800/60 align-top"
                      >
                        {renderInline(cell)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // ── Pre-process content to normalize accidental single-line tables ─────────
  let normalized = content
    // Replace double pipes || with newlines
    .replace(/\|\s*\|/g, '|\n|')
    // If a line starts with text followed by : | col |, split into two lines
    .replace(/^([^|\n]+:\s*)(\|.+)$/gm, '$1\n\n$2');

  const lines = normalized.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines
    if (trimmed === '') {
      i++;
      continue;
    }

    // 1. TABLE — collect consecutive lines that start and end with |
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines: string[] = [];
      while (
        i < lines.length &&
        lines[i].trim().startsWith('|') &&
        lines[i].trim().endsWith('|')
      ) {
        tableLines.push(lines[i]);
        i++;
      }
      elements.push(renderTable(tableLines, key++));
      continue;
    }

    // 2. H2 (## heading)
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2
          key={key++}
          className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight mt-8 mb-3"
        >
          {renderInline(trimmed.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    // 3. H3 (### heading)
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3
          key={key++}
          className="text-base sm:text-lg font-bold text-slate-950 dark:text-white mt-6 mb-2 flex items-center gap-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-cyan-400 shrink-0" />
          {renderInline(trimmed.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    // 4. H4 (#### heading)
    if (trimmed.startsWith('#### ')) {
      elements.push(
        <h4
          key={key++}
          className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 mt-4 mb-1.5"
        >
          {renderInline(trimmed.slice(5))}
        </h4>
      );
      i++;
      continue;
    }

    // 5. BLOCKQUOTE (> text)
    if (trimmed.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      elements.push(
        <div
          key={key++}
          className="my-4 rounded-xl border-l-4 border-sky-500 dark:border-cyan-500 bg-sky-50/60 dark:bg-sky-950/20 p-4 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
        >
          {quoteLines.map((ql, qi) => (
            <p key={qi} className="leading-relaxed">
              {renderInline(ql)}
            </p>
          ))}
        </div>
      );
      continue;
    }

    // 6. NUMBERED LIST
    if (/^\d+\.\s/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s/.test(lines[i])) {
        listItems.push(lines[i].trim().replace(/^\d+\.\s*/, ''));
        i++;
      }
      elements.push(
        <ol key={key++} className="my-3 space-y-2.5 pl-1">
          {listItems.map((item, iIdx) => (
            <li
              key={iIdx}
              className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-950 font-mono text-[11px] font-bold text-sky-700 dark:text-cyan-300 border border-sky-200 dark:border-sky-800/80 mt-0.5">
                {iIdx + 1}
              </span>
              <span className="flex-1 leading-relaxed pt-0.5">
                {renderInline(item)}
              </span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // 7. CHECKBOX LIST (- [x] or - [ ])
    if (/^-\s\[.\]/.test(trimmed)) {
      const checkItems: { checked: boolean; text: string }[] = [];
      while (i < lines.length && /^\s*-\s\[.\]/.test(lines[i])) {
        const checked = lines[i].includes('[x]') || lines[i].includes('[X]');
        const text = lines[i].trim().replace(/^-\s\[.\]\s*/, '');
        checkItems.push({ checked, text });
        i++;
      }
      elements.push(
        <ul key={key++} className="my-3 space-y-2 pl-1">
          {checkItems.map((item, iIdx) => (
            <li
              key={iIdx}
              className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
            >
              <span
                className={`h-4 w-4 rounded shrink-0 mt-0.5 flex items-center justify-center border text-xs font-bold ${
                  item.checked
                    ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-400 text-emerald-600 dark:text-emerald-400'
                    : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-transparent'
                }`}
              >
                {item.checked ? '✓' : ''}
              </span>
              <span className="flex-1 leading-relaxed">
                {renderInline(item.text)}
              </span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 8. BULLET LIST (- item or * item)
    if (/^[-*•]\s/.test(trimmed)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\s*[-*•]\s/.test(lines[i])) {
        listItems.push(lines[i].trim().replace(/^[-*•]\s*/, ''));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-3 space-y-2 pl-1">
          {listItems.map((item, iIdx) => (
            <li
              key={iIdx}
              className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-cyan-400 shrink-0 mt-2" />
              <span className="flex-1 leading-relaxed">{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 9. PARAGRAPH — collect consecutive non-special lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trim().startsWith('|') &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('>') &&
      !/^\s*\d+\.\s/.test(lines[i]) &&
      !/^\s*[-*•]\s/.test(lines[i]) &&
      !/^\s*-\s\[.\]/.test(lines[i])
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    if (paraLines.length > 0) {
      elements.push(
        <p
          key={key++}
          className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 my-2"
        >
          {renderInline(paraLines.join(' '))}
        </p>
      );
    }
  }

  return (
    <div className="space-y-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
      {elements}
    </div>
  );
}
