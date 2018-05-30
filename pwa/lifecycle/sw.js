/**
 * install event 在 sw.js 被执行时立即被触发
 * 另外每一个 worker 只会执行一次 install
 * 但是如果修改 worker 脚本，会被当成是一个新的 worker，脚本会重新运行并再次执行install
 */
self.addEventListener('install', event => {
  console.log('V1 installing…');

  // cache a cat SVG
  event.waitUntil(
    caches.open('static-v1').then(cache => cache.add('/cat.svg'))
  );
});

self.addEventListener('activate', () => {
  // clients.claim()
  console.log('V1 now ready to handle fetches!');
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // serve the cat SVG from the cache if the request is
  // same-origin and the path is '/dog.svg'
  if (url.origin == location.origin && url.pathname == '/dog.svg') {
    event.respondWith(caches.match('/cat.svg'));
  }
});