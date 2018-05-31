const CACHE_KEY = 'static-v2'
const expectedCaches = [CACHE_KEY];

self.addEventListener('install', event => {

  self.skipWaiting(); // 跳过等待旧 service worker 失效，直接应用新的 service worker

  event.waitUntil(
    caches.open(CACHE_KEY).then(cache => cache.add('/horse.svg'))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.map(key => {
          if (!expectedCaches.includes(key)) {
            return caches.delete(key);
          }
        })
      ))
      .then(() => {
        console.log('V2 now ready to handle fetches!');
      })
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (url.origin === location.origin && url.pathname === '/dog.svg') {
    event.respondWith(caches.match('/horse.svg'));
  }
});