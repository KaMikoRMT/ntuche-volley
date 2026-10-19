/* Service Worker：讓網址版可以離線開啟。
   - 程式本體（index.html 等）：網路優先（有網路就拿最新版，約 2.5 秒沒回應就用快取），離線用快取。
   - 匯出用的函式庫（cdnjs 的 html2canvas、jsPDF）：用過一次就存起來，之後離線也能匯出。
   改了 index.html 之後，不需要改這裡的版本；只有 SHELL 清單變了才要把 VERSION 加一。 */
const VERSION = 'ntuche-volley-v1';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
    e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
    e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
function networkFirst(req, fallbackKey) {
    return new Promise(resolve => {
        let settled = false;
        const useCache = () => caches.match(req).then(r => r || caches.match(fallbackKey)).then(r => { if (!settled) { settled = true; resolve(r || Response.error()); } });
        const timer = setTimeout(useCache, 2500);
        fetch(req).then(res => {
            clearTimeout(timer);
            if (res && res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
            if (!settled) { settled = true; resolve(res); }
        }).catch(() => { clearTimeout(timer); useCache(); });
    });
}
function cacheFirst(req) {
    return caches.match(req).then(hit => hit || fetch(req).then(res => {
        if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
        return res;
    }));
}
self.addEventListener('fetch', e => {
    const req = e.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);
    if (url.hostname === 'cdnjs.cloudflare.com') { e.respondWith(cacheFirst(req)); return; }
    if (url.origin !== self.location.origin) return;
    e.respondWith(networkFirst(req, './index.html'));
});
