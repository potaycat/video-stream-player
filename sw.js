
const cacheName = 'vsp-v1'
const contentToCache = [
    'index.html',
    'assets/icons/icon-72x72.png',
    'assets/icons/icon-96x96.png',
    'assets/icons/icon-128x128.png',
    'assets/icons/icon-144x144.png',
    'assets/icons/icon-152x152.png',
    'assets/icons/icon-192x192.png',
    'assets/icons/icon-384x384.png',
    'assets/icons/icon-512x512.png',
]


self.addEventListener('install', e => {
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName)
        await cache.addAll(contentToCache)
    })())
})

self.addEventListener('fetch', e => {
    e.respondWith((async () => {
        const r = await caches.match(e.request)
        if (r) {
            return r
        }
        const response = await fetch(e.request)
        const cache = await caches.open(cacheName)
        cache.put(e.request, response.clone())
        return response
    })())
})
