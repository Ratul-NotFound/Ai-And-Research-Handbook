'use client';

import { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export default function PwaRegister() {
  const [isOffline, setIsOffline] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    // In DEVELOPMENT mode: unregister any service worker to prevent Turbopack HMR chunk caching bugs
    if (process.env.NODE_ENV === 'development') {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
      if ('caches' in window) {
        caches.keys().then((keys) => {
          keys.forEach((key) => caches.delete(key));
        });
      }
      return;
    }

    // In PRODUCTION mode: register the service worker for offline PWA reading
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.warn('ServiceWorker registration failed: ', err);
      });
    });

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (!navigator.onLine) {
      setIsOffline(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-xl border border-amber-500/40 bg-zinc-900/95 px-3 py-2 text-xs font-semibold text-amber-300 shadow-xl backdrop-blur-md">
      <WifiOff className="h-4 w-4 text-amber-400" />
      <span>Offline Mode Active • Reading from Cache</span>
    </div>
  );
}
