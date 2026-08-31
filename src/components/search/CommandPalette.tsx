'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import { AI_CURRICULUM } from '@/data/curriculum';
import { Search, X, BookOpen, Sigma, Code2, CornerDownLeft } from 'lucide-react';

interface SearchIndexItem {
  id: string;
  title: string;
  subtitle?: string;
  type: 'chapter' | 'formula' | 'tradeoff' | 'paper';
  chapterSlug: string;
  chapterTitle: string;
  moduleTitle: string;
  snippet: string;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filterType, setFilterType] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  const searchData: SearchIndexItem[] = useMemo(() => {
    const items: SearchIndexItem[] = [];

    AI_CURRICULUM.forEach((mod) => {
      mod.chapters.forEach((ch) => {
        items.push({
          id: ch.id,
          title: ch.title,
          subtitle: ch.overview,
          type: 'chapter',
          chapterSlug: ch.slug,
          chapterTitle: ch.title,
          moduleTitle: mod.title,
          snippet: ch.overview,
        });

        ch.sections.forEach((sec) => {
          items.push({
            id: sec.id,
            title: sec.title,
            subtitle: sec.subtitle,
            type: 'chapter',
            chapterSlug: ch.slug,
            chapterTitle: ch.title,
            moduleTitle: mod.title,
            snippet: sec.content.slice(0, 160),
          });

          sec.equations?.forEach((eq, eqIdx) => {
            items.push({
              id: `${sec.id}-eq-${eqIdx}`,
              title: `Formula: ${eq.description}`,
              subtitle: eq.latex,
              type: 'formula',
              chapterSlug: ch.slug,
              chapterTitle: ch.title,
              moduleTitle: mod.title,
              snippet: eq.latex,
            });
          });

          sec.tradeoffs?.forEach((tr, trIdx) => {
            items.push({
              id: `${sec.id}-tr-${trIdx}`,
              title: `Trade-off: ${tr.feature}`,
              subtitle: `${tr.currentApproach} vs ${tr.alternativeApproach}`,
              type: 'tradeoff',
              chapterSlug: ch.slug,
              chapterTitle: ch.title,
              moduleTitle: mod.title,
              snippet: tr.whyThis,
            });
          });

          sec.recommendedPapers?.forEach((p, pIdx) => {
            items.push({
              id: `${sec.id}-paper-${pIdx}`,
              title: `Paper: ${p.title} (${p.year})`,
              subtitle: p.authors,
              type: 'paper',
              chapterSlug: ch.slug,
              chapterTitle: ch.title,
              moduleTitle: mod.title,
              snippet: p.significance,
            });
          });
        });
      });
    });

    return items;
  }, []);

  const fuse = useMemo(() => {
    return new Fuse(searchData, {
      keys: ['title', 'subtitle', 'snippet', 'chapterTitle', 'moduleTitle'],
      threshold: 0.35,
      ignoreLocation: true,
    });
  }, [searchData]);

  const results = useMemo(() => {
    let list = query.trim()
      ? fuse.search(query).map((res) => res.item)
      : searchData.slice(0, 10);

    if (filterType !== 'all') {
      list = list.filter((item) => item.type === filterType);
    }

    return list.slice(0, 12);
  }, [query, filterType, fuse, searchData]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          onClose();
        }
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        const selected = results[selectedIndex];
        router.push(`/book/${selected.chapterSlug}`);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, router, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-3 sm:p-6 md:pt-20 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 px-4 py-3 bg-slate-50 dark:bg-slate-950">
          <Search className="h-4 w-4 text-sky-600 dark:text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search topics, formulas, algorithms, or papers..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1">
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block rounded bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-600 dark:text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 px-4 py-2 text-xs overflow-x-auto">
          <span className="text-[11px] text-slate-500 mr-1">Filter:</span>
          {[
            { id: 'all', label: 'All' },
            { id: 'chapter', label: 'Chapters' },
            { id: 'formula', label: 'Formulas' },
            { id: 'tradeoff', label: 'Trade-offs' },
            { id: 'paper', label: 'Papers' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`rounded-md px-2 py-0.5 text-xs transition-colors ${
                filterType === f.id
                  ? 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-cyan-300 font-semibold border border-sky-200 dark:border-sky-800'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[55vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="py-10 text-center text-slate-400">
              <p className="text-sm">No research topics found matching "{query}"</p>
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    router.push(`/book/${item.chapterSlug}`);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`group flex items-start gap-3 rounded-lg p-2.5 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {item.type === 'formula' ? (
                      <Sigma className="h-3.5 w-3.5 text-sky-600 dark:text-cyan-400" />
                    ) : item.type === 'tradeoff' ? (
                      <Code2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <BookOpen className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
                    )}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-semibold truncate group-hover:text-sky-600 dark:group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-400 uppercase shrink-0">
                        {item.type}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {item.subtitle || item.snippet}
                    </p>

                    <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400">
                      <span>{item.moduleTitle}</span>
                      <span>•</span>
                      <span className="text-sky-600 dark:text-cyan-400">{item.chapterTitle}</span>
                    </div>
                  </div>

                  {isSelected && (
                    <CornerDownLeft className="h-3.5 w-3.5 text-sky-600 dark:text-cyan-400 shrink-0 self-center hidden sm:block" />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
