    // Import Workbox from a CDN (or use a local copy)
    importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

    // Precaching essential assets (e.g., your HTML, CSS, and JS)
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

    // Cache static assets like CSS, JS, and fonts
    workbox.routing.registerRoute(
    ({ request }) => request.destination === 'style' || request.destination === 'script' || request.destination === 'font',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'static-resources',
        plugins: [
        new workbox.expiration.ExpirationPlugin({
            maxEntries: 50, // Maximum number of files to cache
            maxAgeSeconds: 30 * 24 * 60 * 60, // Cache files for 30 days
        }),
        ],
    })
    );

    // Cache images with a NetworkFirst strategy
    workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image',
    new workbox.strategies.NetworkFirst({
        cacheName: 'image-cache',
        plugins: [
        new workbox.expiration.ExpirationPlugin({
            maxEntries: 60, // Maximum number of images to cache
            maxAgeSeconds: 30 * 24 * 60 * 60, // Cache images for 30 days
        }),
        ],
    })
    );

    // Caching API responses for articles
    workbox.routing.registerRoute(
    ({ url }) => url.pathname.startsWith('/api/articles'),  // Assuming your Medium clone fetches articles from /api/articles
    new workbox.strategies.NetworkFirst({
        cacheName: 'articles-cache',
        plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
            statuses: [0, 200],  // Cache only responses with these status codes
        }),
        new workbox.expiration.ExpirationPlugin({
            maxEntries: 100,  // Max number of articles to cache
            maxAgeSeconds: 7 * 24 * 60 * 60,  // Cache articles for 7 days
        }),
        ],
    })
    );

    // Offline fallback for navigation requests (HTML pages)
    workbox.routing.registerRoute(
    ({ request }) => request.mode === 'navigate',
    new workbox.strategies.NetworkFirst({
        cacheName: 'pages-cache',
        plugins: [
        new workbox.expiration.ExpirationPlugin({
            maxEntries: 20, // Cache up to 20 pages
            maxAgeSeconds: 7 * 24 * 60 * 60, // Cache pages for 7 days
        }),
        ],
    })
    );

    // Event listener for controlling the service worker
    self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
    });
