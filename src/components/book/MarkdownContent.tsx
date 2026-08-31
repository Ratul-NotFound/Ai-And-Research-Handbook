'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

interface MarkdownContentProps {
  content: string;
}

/**
 * Robust Math & Inline Text Renderer
 * Parses:
 * - $$ ... $$ display math (KaTeX)
 * - $ ... $ inline math (KaTeX)
 * - `code` (inline monospace)
 * - **bold** (strong)
 * - *italic* (em)
 */
export function RenderInlineText({ text }: { text: string }) {
  if (!text) return null;

  // Tokenize string for math ($$...$$, $...$), code (`...`), bold (**...**), italic (*...*)
  // Note: match $$ first before $, and avoid empty matches
  const tokenRegex = /(\$\$[\s\S]+?\$\$|\$(?:\\\$|[^\$\n])+\$|`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g;
  const parts = text.split(tokenRegex);

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;

        // Display math ($$ ... $$)
        if (part.startsWith('$$') && part.endsWith('$$') && part.length >= 4) {
          const rawMath = part.slice(2, -2).trim();
          try {
            const html = katex.renderToString(rawMath, {
              displayMode: true,
              throwOnError: false,
            });
            return (
              <span
                key={i}
                className="block my-2 overflow-x-auto py-1.5 px-2 text-center text-slate-900 dark:text-slate-100"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          } catch {
            return (
              <span key={i} className="block my-2 text-center font-mono text-xs text-rose-500">
                {rawMath}
              </span>
            );
          }
        }

        // Inline math ($ ... $)
        if (part.startsWith('$') && part.endsWith('$') && part.length >= 3) {
          const rawMath = part.slice(1, -1).trim();
          try {
            const html = katex.renderToString(rawMath, {
              displayMode: false,
              throwOnError: false,
            });
            return (
              <span
                key={i}
                className="inline-math px-0.5 font-serif text-slate-950 dark:text-slate-100"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          } catch {
            return (
              <span key={i} className="font-mono text-xs text-sky-700 dark:text-cyan-300">
                {rawMath}
              </span>
            );
          }
        }

        // Inline code (`...`)
        if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
          return (
            <code
              key={i}
              className="rounded-md bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 font-mono text-[11px] sm:text-xs text-sky-700 dark:text-cyan-300 font-semibold border border-slate-200/80 dark:border-slate-700/60"
            >
              {part.slice(1, -1)}
            </code>
          );
        }

        // Bold (**...**)
        if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
          return (
            <strong key={i} className="font-bold text-slate-950 dark:text-white">
              <RenderInlineText text={part.slice(2, -2)} />
            </strong>
          );
        }

        // Italic (*...*)
        if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
          return (
            <em key={i} className="italic text-slate-700 dark:text-slate-300">
              {part.slice(1, -1)}
            </em>
          );
        }

        // Plain text
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
}

/**
 * Split table cells safely without breaking on `|` characters inside LaTeX math ($...$) or code (`...`)
 */
function splitTableCells(rowStr: string): string[] {
  let protectedStr = '';
  let inMath = false;
  let inCode = false;

  for (let j = 0; j < rowStr.length; j++) {
    const ch = rowStr[j];
    if (ch === '`') inCode = !inCode;
    if (ch === '$' && !inCode) inMath = !inMath;

    if (ch === '|' && (inMath || inCode)) {
      protectedStr += '__MATH_PIPE__';
    } else {
      protectedStr += ch;
    }
  }

  return protectedStr
    .split('|')
    .slice(1, -1)
    .map((c) => c.replaceAll('__MATH_PIPE__', '|').trim());
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  // ── Table renderer ──────────────────────────────────────────────────────────
  const renderTable = (tableLines: string[], key: number | string) => {
    const dataLines = tableLines.filter((l) => {
      const t = l.trim();
      return t.startsWith('|') && t.endsWith('|') && !t.match(/^\|[\s\-:|]+\|$/);
    });
    if (dataLines.length < 1) return null;

    const headerCells = splitTableCells(dataLines[0]);
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
                    <RenderInlineText text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {bodyRows.map((rowStr, rIdx) => {
                const cells = splitTableCells(rowStr);
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
                        <RenderInlineText text={cell} />
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
  const normalized = content
    .replace(/\|\s*\|/g, '|\n|')
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

    // 1. STANDALONE DISPLAY MATH BLOCK ($$ ... $$)
    if (trimmed.startsWith('$$')) {
      const mathLines: string[] = [];
      if (trimmed.endsWith('$$') && trimmed.length > 2) {
        mathLines.push(trimmed.slice(2, -2).trim());
        i++;
      } else {
        mathLines.push(trimmed.slice(2));
        i++;
        while (i < lines.length && !lines[i].trim().endsWith('$$')) {
          mathLines.push(lines[i]);
          i++;
        }
        if (i < lines.length && lines[i].trim().endsWith('$$')) {
          mathLines.push(lines[i].trim().slice(0, -2));
          i++;
        }
      }
      const rawMath = mathLines.join('\n').trim();
      try {
        const html = katex.renderToString(rawMath, {
          displayMode: true,
          throwOnError: false,
        });
        elements.push(
          <div
            key={key++}
            className="my-4 overflow-x-auto py-3 px-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center shadow-2xs font-serif text-slate-900 dark:text-slate-100"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } catch {
        elements.push(
          <div key={key++} className="my-4 font-mono text-xs text-rose-500 text-center">
            {rawMath}
          </div>
        );
      }
      continue;
    }

    // 2. TABLE — collect consecutive lines that start and end with |
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

    // 3. H2 (## heading)
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2
          key={key++}
          className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight mt-8 mb-3"
        >
          <RenderInlineText text={trimmed.slice(3)} />
        </h2>
      );
      i++;
      continue;
    }

    // 4. H3 (### heading)
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3
          key={key++}
          className="text-base sm:text-lg font-bold text-slate-950 dark:text-white mt-6 mb-2 flex items-center gap-2"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-cyan-400 shrink-0" />
          <RenderInlineText text={trimmed.slice(4)} />
        </h3>
      );
      i++;
      continue;
    }

    // 5. H4 (#### heading)
    if (trimmed.startsWith('#### ')) {
      elements.push(
        <h4
          key={key++}
          className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 mt-4 mb-1.5"
        >
          <RenderInlineText text={trimmed.slice(5)} />
        </h4>
      );
      i++;
      continue;
    }

    // 6. BLOCKQUOTE (> text)
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
              <RenderInlineText text={ql} />
            </p>
          ))}
        </div>
      );
      continue;
    }

    // 7. NUMBERED LIST
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
                <RenderInlineText text={item} />
              </span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // 8. CHECKBOX LIST (- [x] or - [ ])
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
                <RenderInlineText text={item.text} />
              </span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 9. BULLET LIST (- item or * item)
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
              <span className="flex-1 leading-relaxed">
                <RenderInlineText text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // 10. PARAGRAPH — collect consecutive non-special lines
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].trim().startsWith('|') &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('>') &&
      !lines[i].trim().startsWith('$$') &&
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
          <RenderInlineText text={paraLines.join(' ')} />
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
