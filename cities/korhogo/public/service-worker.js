/**
 * Service Worker for Akwaba Korhogo PWA
 * Provides offline functionality and caching
 */

const CACHE_NAME = 'akwaba-korhogo-v1';
const RUNTIME_CACHE = 'akwaba-korhogo-runtime';

// Resources to cache on install
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/businesses.html',
  '/events.html',
  '/about.html',
  '/core/css/base.css',
  '/core/css/layout.css',
  '/core/css/components.css',
  '/css/korhogo-theme.css',
  '/core/js/utils.js',
  '/core/js/responsive-manager.js',
  '/core/js/firebase-manager.js',
  '/core/js/business-directory.js',
  '/js/config.js',
  '/manifest.json',
  '/assets/images/logo.png',
  '/assets/images/placeholder.jpg',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-512x512.png'
];

// Install event - cache resources
self.addEventListener('install', event => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching precache resources');
        return cache.addAll(PRECACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return cacheName.startsWith('akwaba-korhogo-') &&
                     cacheName !== CACHE_NAME &&
                     cacheName !== RUNTIME_CACHE;
            })
            .map(cacheName => {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Skip Firebase and external API requests
  if (event.request.url.includes('firebasestorage.googleapis.com') ||
      event.request.url.includes('firestore.googleapis.com') ||
      event.request.url.includes('googleapis.com')) {
    return;
  }

  // Handle different request types
  if (event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            // Return cached version and update in background
            updateCache(event.request);
            return cachedResponse;
          }

          // Not in cache, fetch from network
          return fetch(event.request)
            .then(response => {
              // Don't cache non-successful responses
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // Cache successful responses
              const responseToCache = response.clone();
              caches.open(RUNTIME_CACHE)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });

              return response;
            })
            .catch(() => {
              // Network failed, show offline page
              if (event.request.mode === 'navigate') {
                return caches.match('/offline.html');
              }

              // Return placeholder image for failed image requests
              if (event.request.destination === 'image') {
                return caches.match('/assets/images/placeholder.jpg');
              }
            });
        })
    );
  }
});

// Background sync for updating cache
function updateCache(request) {
  fetch(request)
    .then(response => {
      if (response && response.status === 200) {
        caches.open(RUNTIME_CACHE)
          .then(cache => cache.put(request, response));
      }
    })
    .catch(() => {
      // Silently fail - we're already serving cached version
    });
}

// Handle messages from clients
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => caches.delete(cacheName))
        );
      })
    );
  }
});

// Background sync (for offline actions)
self.addEventListener('sync', event => {
  console.log('[Service Worker] Background sync:', event.tag);

  if (event.tag === 'sync-favorites') {
    event.waitUntil(syncFavorites());
  }

  if (event.tag === 'sync-reviews') {
    event.waitUntil(syncReviews());
  }
});

// Push notifications
self.addEventListener('push', event => {
  console.log('[Service Worker] Push received');

  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Akwaba Korhogo';
  const options = {
    body: data.body || 'Nouvelle notification',
    icon: '/assets/icons/icon-192x192.png',
    badge: '/assets/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/',
      dateOfArrival: Date.now()
    },
    actions: [
      {
        action: 'open',
        title: 'Ouvrir',
        icon: '/assets/icons/action-open.png'
      },
      {
        action: 'close',
        title: 'Fermer',
        icon: '/assets/icons/action-close.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification click
self.addEventListener('notificationclick', event => {
  console.log('[Service Worker] Notification click:', event.action);

  event.notification.close();

  if (event.action === 'open') {
    const url = event.notification.data.url || '/';
    event.waitUntil(
      clients.openWindow(url)
    );
  }
});

// Sync helpers
async function syncFavorites() {
  // Sync offline favorites when back online
  console.log('[Service Worker] Syncing favorites');
  // Implementation here
}

async function syncReviews() {
  // Sync offline reviews when back online
  console.log('[Service Worker] Syncing reviews');
  // Implementation here
}
