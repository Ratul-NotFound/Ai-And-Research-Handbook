const CACHE_NAME = 'ai-handbook-pwa-v3';

const STATIC_PRECACHE = [
  '/',
  '/cheatsheet',
  '/manifest.json',
  '/icon.svg',
  'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
];

// Install Event: Pre-cache core shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_PRECACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event: Cleanup stale caches & take control immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch Event: Offline-first stale-while-revalidate strategy
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Ignore non-http requests (chrome-extension, blob, data)
  if (!url.protocol.startsWith('http')) return;

  // Stale-While-Revalidate Strategy for all navigation and resource requests
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (
            networkResponse &&
            networkResponse.status === 200 &&
            (networkResponse.type === 'basic' || networkResponse.type === 'cors')
          ) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            }).catch(() => {});
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and request is an HTML page navigation, fallback to root page or cached route
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match(event.request).then((res) => res || caches.match('/'));
          }
        });

      // Return cached version immediately if available, otherwise wait for network
      return cachedResponse || fetchPromise;
    })
  );
});
