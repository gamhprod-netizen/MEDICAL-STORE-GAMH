/* GPrescrit — service worker. Version générée : e54657619a (change à chaque nouvelle version de l'app). */
const VERSION = 'e54657619a', CACHE = 'gprescrit-' + VERSION;
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/maskable-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL))); });
self.addEventListener('activate', e => { e.waitUntil((async () => {
  for (const k of await caches.keys()) if (k.startsWith('gprescrit-') && k !== CACHE) await caches.delete(k);
  await self.clients.claim(); })()); });
self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url); if (u.origin !== location.origin) return;
  if (r.mode === 'navigate') { // page : réseau d'abord (3 s max), repli sur le cache hors ligne
    e.respondWith((async () => {
      try { const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 3000);
        const n = await fetch(r, { signal: ctl.signal }); clearTimeout(t);
        if (n.ok) (await caches.open(CACHE)).put('./index.html', n.clone()); return n;
      } catch (_) { return (await caches.match('./index.html')) || (await caches.match('./')) || Response.error(); } })());
    return; }
  e.respondWith((async () => { // ressources : cache d'abord, puis réseau
    const c = await caches.match(r); if (c) return c;
    try { const n = await fetch(r); if (n.ok) (await caches.open(CACHE)).put(r, n.clone()); return n; } catch (_) { return Response.error(); } })());
});
