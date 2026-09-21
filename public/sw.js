// Bol Marathi Service Worker — cache-first static, network-first HTML, stale-while-revalidate images
const BASE = '/learn-marathi/';
const CACHE_STATIC = 'bol-static-v1';
const CACHE_IMAGES = 'bol-images-v1';
const CACHE_PAGES = 'bol-pages-v1';

const STATIC_ASSETS = [
  BASE,
  BASE + '_astro/Base.*.css',
  BASE + '_astro/Base.*.js',
  BASE + 'og/og-default.png',
  BASE + 'favicon.svg',
  BASE + 'manifest.webmanifest',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIC).then((cache) => {
      // Cache known static assets (non-pattern ones)
      return cache.addAll([
        BASE,
        BASE + 'manifest.webmanifest',
        BASE + 'favicon.svg',
        BASE + 'og/og-default.png',
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => ![CACHE_STATIC, CACHE_IMAGES, CACHE_PAGES].includes(k))
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

function isStaticAsset(url) {
  return url.pathname.startsWith(BASE + '_astro/') ||
         url.pathname.endsWith('.css') ||
         url.pathname.endsWith('.js') ||
         url.pathname.endsWith('.woff2') ||
         url.pathname.endsWith('.svg');
}

function isImageAsset(url) {
  return url.pathname.startsWith(BASE + 'og/') ||
         url.pathname.match(/\.(png|jpg|jpeg|webp|avif|gif)$/i);
}

function isNavigationRequest(request) {
  return request.mode === 'navigate' ||
         (request.method === 'GET' && request.headers.get('accept')?.includes('text/html'));
}

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) return;

  // Static assets (CSS, JS, fonts) — cache first
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_STATIC).then((c) => c.put(event.request, copy));
          }
          return response;
        });
      })
    );
    return;
  }

  // Images — stale-while-revalidate
  if (isImageAsset(url)) {
    event.respondWith(
      caches.open(CACHE_IMAGES).then(async (cache) => {
        const cached = await cache.match(event.request);
        const fetchPromise = fetch(event.request).then((response) => {
          if (response.ok) cache.put(event.request, response.clone());
          return response;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }

  // Navigation (HTML pages) — network first, fallback to cache
  if (isNavigationRequest(event.request)) {
    event.respondWith(
      fetch(event.request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_PAGES).then((c) => c.put(event.request, copy));
        }
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  // Default: network only
  event.respondWith(fetch(event.request));
});

// Handle messages from clients (e.g., skip waiting)
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});