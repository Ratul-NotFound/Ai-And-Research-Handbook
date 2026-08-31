'use client';

import React, { useState, useEffect } from 'react';
import { 
  Download, 
  X, 
  CheckCircle2, 
  BookOpen
} from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

declare global {
  interface Window {
    __PWA_DEFERRED_PROMPT?: BeforeInstallPromptEvent | null;
    triggerPwaInstall?: () => Promise<void>;
  }
}

export default function PwaInstallModal() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  // Directly trigger native installation dialog
  const directInstall = async (promptToUse?: BeforeInstallPromptEvent | null) => {
    const activePrompt = promptToUse || deferredPrompt || window.__PWA_DEFERRED_PROMPT;
    if (!activePrompt) {
      // If browser doesn't have active prompt yet, show instructional popup
      setIsModalOpen(true);
      return;
    }

    try {
      // Directly trigger native OS / Browser App Install prompt
      await activePrompt.prompt();
      const { outcome } = await activePrompt.userChoice;

      if (outcome === 'accepted') {
        setIsInstalled(true);
        setIsModalOpen(false);
        setInstallSuccess(true);
        window.__PWA_DEFERRED_PROMPT = null;
        setDeferredPrompt(null);
      }
    } catch (err) {
      console.warn('Native PWA install prompt error:', err);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Check if already running in standalone PWA mode
    const isStandalone = 
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // 2. Global direct install function accessible anywhere in the app
    window.triggerPwaInstall = () => directInstall();

    // 3. Listen for Android / Chrome / Edge install prompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      window.__PWA_DEFERRED_PROMPT = promptEvent;
      setDeferredPrompt(promptEvent);

      // Check dismissal cooldown
      const lastDismissed = localStorage.getItem('pwa_prompt_dismissed');
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;

      if (!lastDismissed || now - parseInt(lastDismissed, 10) > oneDay) {
        // Show floating install card after 2 seconds
        const timer = setTimeout(() => {
          setIsModalOpen(true);
        }, 2000);
        return () => clearTimeout(timer);
      }
    };

    // 4. App Installed event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsModalOpen(false);
      setInstallSuccess(true);
      window.__PWA_DEFERRED_PROMPT = null;
      localStorage.setItem('pwa_installed', 'true');
      setTimeout(() => setInstallSuccess(false), 5000);
    };

    // 5. Custom open event from Navbar or Footer
    const handleManualOpen = () => {
      if (window.__PWA_DEFERRED_PROMPT || deferredPrompt) {
        directInstall();
      } else {
        setIsModalOpen(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('open-pwa-install', handleManualOpen);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('open-pwa-install', handleManualOpen);
    };
  }, [deferredPrompt]);

  const handleDismiss = () => {
    setIsModalOpen(false);
    localStorage.setItem('pwa_prompt_dismissed', Date.now().toString());
  };

  // Toast for successful install
  if (installSuccess) {
    return (
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2.5 rounded-2xl border border-emerald-500/40 bg-slate-900/95 px-5 py-3 text-xs font-bold text-emerald-300 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-4">
        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
        <span>App successfully installed! You can now open it directly from your home screen.</span>
      </div>
    );
  }

  if (isInstalled || !isModalOpen) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[9999] animate-in fade-in slide-in-from-bottom-5 duration-300">
      
      {/* FLOATING DIRECT INSTALL POPUP */}
      <div 
        className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0f1422]/95 p-5 shadow-2xl backdrop-blur-md text-slate-900 dark:text-white"
        style={{
          boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.4), 0 0 25px rgba(79, 70, 229, 0.15)'
        }}
      >
        
        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close install prompt"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Content Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/30">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-950 dark:text-white leading-tight">
              Install AI Handbook App
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Read 89 chapters with 100% offline access
            </p>
          </div>
        </div>

        {/* Direct Action Buttons */}
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => directInstall()}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white px-4 py-2.5 text-xs font-bold shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Install App Now</span>
          </button>

          <button
            onClick={handleDismiss}
            className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Later
          </button>
        </div>

      </div>
    </div>
  );
}
