const CACHE = "landInventory-cache";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./css/bootstrap.min.css",
  "./css/main.css",
  "./icons/icon-72x72.png",
  "./icons/icon-96x96.png",
  "./icons/icon-128x128.png",
  "./icons/icon-144x144.png",
  "./icons/icon-152x152.png",
  "./icons/icon-192x192.png",
  "./icons/icon-384x384.png",
  "./icons/icon-512x512.png",
  "./js/index.js",
  "./js/bootstrap.min.js",
  "./js/components/about.js",
  "./js/components/baseView.js",
  "./js/components/data.js",
  "./js/components/filters.js",
  "./js/components/home.js",
  "./js/components/map.js",
  "./js/components/navbar.js",
  "./js/components/pwa.js",
  "./js/components/router.js",
  "./js/util/data.js",
  "./js/util/icons.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async function () {
      const cache = await caches.open(CACHE);
      await cache.addAll(FILES_TO_CACHE);
    })()
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async function () {
      const cache = await caches.open(CACHE);
      const cachedResponse = await cache.match(event.request);
      const networkResponsePromise = fetch(event.request);

      event.waitUntil(
        (async function () {
          const networkResponse = await networkResponsePromise;
          await cache.put(event.request, networkResponse.clone());
        })()
      );

      // Returned the cached response if we have one, otherwise return the network response.
      return cachedResponse || networkResponsePromise;
    })()
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

const refresh = (response) => {
  return self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage(
        JSON.stringify({
          type: "refresh",
          url: response.url,
          eTag: response.headers.get("ETag"),
        })
      );
    });
  });
};
