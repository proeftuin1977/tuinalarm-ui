// Bewaart de app-bestanden zodat de app snel opent. Verhoog VERSIE na elke wijziging.
const VERSIE = 'tuinalarm-v3';
const BESTANDEN = ['./', 'index.html', 'start-combi.html', 'start-b-groot.html', 'start-b.html', 'startscherm-opties.html', 'ui-voorbeeld.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSIE)
    .then(c => c.addAll(BESTANDEN.map(b => new Request(b, { cache: 'reload' }))))
    .then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(k => Promise.all(k.filter(n => n !== VERSIE).map(n => caches.delete(n))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
