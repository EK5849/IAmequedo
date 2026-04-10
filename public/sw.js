const CACHE_NAME = 'unam-simulador-v1';

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Basic assets to cache for offline capabilities
      return cache.addAll([
        '/',
        '/index.html',
        '/favicon.svg'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      // Return cached response if found, else fetch from network
      return response || fetch(e.request);
    })
  );
});
