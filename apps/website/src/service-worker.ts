/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

/**
 * Simple service worker for basic caching
 * For advanced caching, consider using Workbox
 */

const CACHE_VERSION = "v1";
const CACHE_NAME = `role-reactor-${CACHE_VERSION}`;
const PRECACHE_ASSETS = ["/", "/manifest.json"];

// Install event - precache assets
self.addEventListener("install", ((event: Event) => {
  (event as InstallEvent).waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
}) as EventListener);

// Activate event - clean old caches
self.addEventListener("activate", ((event: Event) => {
  (event as InstallEvent).waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
  );
  self.clients.claim();
}) as EventListener);

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", ((event: Event) => {
  const fetchEvent = event as FetchEvent;

  // Skip non-GET requests
  if (fetchEvent.request.method !== "GET") return;

  // Skip non-http requests
  if (!fetchEvent.request.url.startsWith("http")) return;

  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((cachedResponse) => {
      const fetchPromise = fetch(fetchEvent.request)
        .then((networkResponse) => {
          if (
            networkResponse?.status === 200 &&
            networkResponse.type === "basic"
          ) {
            const responseToCache = networkResponse.clone();
            caches
              .open(CACHE_NAME)
              .then((cache) => cache.put(fetchEvent.request, responseToCache));
          }
          return networkResponse;
        })
        .catch(() => {
          if (fetchEvent.request.mode === "navigate") {
            return caches.match("/index.html");
          }
          return cachedResponse;
        });

      return cachedResponse ?? fetchPromise;
    })
  );
}) as EventListener);

// Handle messages from clients
self.addEventListener("message", ((event: Event) => {
  const messageEvent = event as ServiceWorkerGlobalScopeEventMap["message"];
  if (messageEvent.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
}) as EventListener);
