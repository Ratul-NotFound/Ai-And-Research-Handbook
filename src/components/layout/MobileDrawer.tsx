'use client';

import React, { useEffect } from 'react';
import { X, BookOpen } from 'lucide-react';
import Sidebar from './Sidebar';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentModuleId?: string;
}

export default function MobileDrawer({ isOpen, onClose, currentModuleId }: MobileDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 flex w-[85vw] max-w-xs flex-col bg-white dark:bg-[#0b0f19] border-r border-slate-200 dark:border-slate-800 p-4 shadow-2xl transition-colors">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-2">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-sky-600 dark:text-cyan-400" />
            <span className="text-sm font-bold text-slate-900 dark:text-white">CS Research Handbook</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pb-safe">
          <Sidebar currentModuleId={currentModuleId} onCloseMobile={onClose} />
        </div>
      </div>
    </div>
  );
}
