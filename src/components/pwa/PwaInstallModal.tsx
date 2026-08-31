'use client';

import React, { useState, useEffect } from 'react';
import { 
  Download, 
  X, 
  Sparkles, 
  Smartphone, 
  WifiOff, 
  CheckCircle2, 
  Share, 
  PlusSquare,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function PwaInstallModal() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

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

    // 2. Check if iOS device
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // 3. Listen for Android / Chrome / Edge install prompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);

      // Check if user dismissed prompt in last 24 hours
      const lastDismissed = localStorage.getItem('pwa_prompt_dismissed');
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;

      if (!lastDismissed || now - parseInt(lastDismissed, 10) > oneDay) {
        // Show install modal automatically after 2.5 seconds
        const timer = setTimeout(() => {
          setIsModalOpen(true);
        }, 2500);
        return () => clearTimeout(timer);
      }
    };

    // 4. Listen for app installed confirmation
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsModalOpen(false);
      setInstallSuccess(true);
      localStorage.setItem('pwa_installed', 'true');
      setTimeout(() => setInstallSuccess(false), 5000);
    };

    // 5. Global listener so Navbar / Footer buttons can open modal anytime
    const handleManualOpen = () => {
      setIsModalOpen(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('open-pwa-install', handleManualOpen);

    // If iOS and not installed and not dismissed, show after 3s
    if (isIosDevice && !isStandalone) {
      const lastDismissed = localStorage.getItem('pwa_prompt_dismissed');
      const now = Date.now();
      if (!lastDismissed || now - parseInt(lastDismissed, 10) > 24 * 60 * 60 * 1000) {
        const timer = setTimeout(() => {
          setIsModalOpen(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('open-pwa-install', handleManualOpen);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      if (isIOS) {
        // iOS handled via instruction UI
        return;
      }
      // If prompt not ready yet, alert or fallback
      alert('To install, tap the (⋮) menu in your browser and select "Install app" or "Add to Home Screen".');
      return;
    }

    // Trigger the native Android / Chrome install dialog
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstalled(true);
      setIsModalOpen(false);
      setInstallSuccess(true);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsModalOpen(false);
    localStorage.setItem('pwa_prompt_dismissed', Date.now().toString());
  };

  // Toast for successful install
  if (installSuccess) {
    return (
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2.5 rounded-2xl border border-emerald-500/40 bg-slate-900/95 px-5 py-3 text-xs font-bold text-emerald-300 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-4">
        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
        <span>App successfully installed! You can now open it from your Home Screen anytime.</span>
      </div>
    );
  }

  if (isInstalled || !isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-300">
      
      {/* MODAL CARD / SHEET */}
      <div 
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1422] p-6 sm:p-7 shadow-2xl text-slate-900 dark:text-white animate-in zoom-in-95 duration-200"
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 40px rgba(79, 70, 229, 0.15)'
        }}
      >
        
        {/* Close / Dismiss Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close install prompt"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Content Header */}
        <div className="space-y-4">
          
          {/* App Icon + Status Badge */}
          <div className="flex items-center gap-3.5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
              <BookOpen className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-full">
                  100% Offline PWA
                </span>
              </div>
              <h3 className="text-lg font-black tracking-tight text-slate-950 dark:text-white pt-0.5">
                Install AI Handbook
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                First-Principles Computer Science & AI Platform
              </p>
            </div>
          </div>

          {/* Key PWA Native Benefits */}
          <div className="rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/60 p-3.5 space-y-2.5">
            <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span><strong>Instant Offline Access</strong>: Read all 89 chapters and mathematical proofs with zero internet.</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
              <span><strong>Native Android / Desktop App</strong>: Full-screen experience with fast home-screen launcher.</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" />
              <span><strong>Zero Storage Waste</strong>: Ultra-compact footprint under 5MB with background updates.</span>
            </div>
          </div>

          {/* iOS Safari Specific Instruction */}
          {isIOS && (
            <div className="rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/80 dark:bg-blue-950/40 p-3 space-y-1.5 text-xs text-blue-900 dark:text-blue-200">
              <div className="font-bold flex items-center gap-1.5">
                <Smartphone className="h-4 w-4 text-blue-500" />
                <span>How to Install on iPhone / iPad:</span>
              </div>
              <ol className="list-decimal pl-4 space-y-1 text-[11px] leading-snug">
                <li>Tap the <strong>Share</strong> button <Share className="inline h-3 w-3 mx-0.5" /> in Safari toolbar.</li>
                <li>Scroll down and tap <strong>Add to Home Screen</strong> <PlusSquare className="inline h-3 w-3 mx-0.5" />.</li>
                <li>Tap <strong>Add</strong> in the top right corner.</li>
              </ol>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
            {!isIOS ? (
              <button
                onClick={handleInstallClick}
                className="w-full flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 text-xs font-bold shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-purple-500 active:scale-98 transition-all cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>Install Native App</span>
              </button>
            ) : (
              <button
                onClick={handleDismiss}
                className="w-full flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 text-white px-5 py-3 text-xs font-bold"
              >
                <span>Got It</span>
              </button>
            )}

            <button
              onClick={handleDismiss}
              className="w-full sm:w-auto px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Not Now
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
