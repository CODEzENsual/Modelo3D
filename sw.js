const CACHE_NAME = 'v3d-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/base.css',
  './css/components.css',
  './css/layout.css',
  './css/responsive.css',
  './css/variables.css',
  './js/main.js',
  './js/config.js',
  './js/controls.js',
  './js/interactions.js',
  './js/theme.js',
  './js/viewer.js',
  './assets/blue_miyu.glb'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
