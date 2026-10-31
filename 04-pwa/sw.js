// The service worker keeps a saved copy of the app files, so the app opens even with no internet.
const CACHE_NAME = 'campusconnect-v1';
const FILES_TO_SAVE = [
  './',
  'index.html',
  'css/style.css',
  'js/data.js',
  'js/app.js',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
];

// Runs once when the service worker is first installed: save all the files.
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_SAVE)));
  self.skipWaiting();
});

// Runs when a new version takes over: throw away old saved copies.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) => Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))))
  );
  self.clients.claim();
});

// Runs for every request: use the saved copy first, otherwise go to the internet.
self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((saved) => saved || fetch(event.request)));
});
