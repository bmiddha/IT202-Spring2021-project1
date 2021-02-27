const CACHE = "cache-update-and-refresh";
const HTML_COMPONENTS_TO_CACHE = [
  "navbar",
  "home",
  "data",
  "map",
  "about",
];
const COMPONENTS_TO_CACHE = ["router", "pwa", "form"];
const UTIL_TO_CACHE = ["data", "icons", "loadComponent"];

const FILES_TO_CACHE = [
  "./index.html",
  "./",
  "./js/index.js",
  "./js/bootstrap.min.js",
  "./css/bootstrap.min.css",
  "./css/main.css",
  "./icons/icon-192x192.png",
  "./icons/icon-256x256.png",
  "./icons/icon-384x384.png",
  "./icons/icon-512x512.png",
  ...UTIL_TO_CACHE.map((util) => `$./js/util/${util}`),
  ...[...COMPONENTS_TO_CACHE, ...HTML_COMPONENTS_TO_CACHE].map(
    (component) => `./js/components/${component}/${component}.js`
  ),
  ...HTML_COMPONENTS_TO_CACHE.map(
    (component) => `./js/components/${component}/${component}.html`
  ),
];

// On install, cache some resource.
self.addEventListener("install", function (evt) {
  console.log("The service worker is being installed.");
  // Open a cache and use `addAll()` with an array of assets to add all of them
  // to the cache. Ask the service worker to keep installing until the
  // returning promise resolves.
  evt.waitUntil(
    caches.open(CACHE).then(function (cache) {
      cache.addAll(FILES_TO_CACHE);
    })
  );
});

// On fetch, use cache but update the entry with the latest contents
// from the server.
self.addEventListener("fetch", function (evt) {
  console.log("The service worker is serving the asset.");
  // You can use `respondWith()` to answer ASAP...
  evt.respondWith(fromCache(evt.request));
  // ...and `waitUntil()` to prevent the worker to be killed until
  // the cache is updated.
  evt.waitUntil(
    update(evt.request)
      // Finally, send a message to the client to inform it about the
      // resource is up to date.
      .then(refresh)
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Open the cache where the assets were stored and search for the requested
// resource. Notice that in case of no matching, the promise still resolves
// but it does with `undefined` as value.
async function fromCache(request) {
  const cache = await caches.open(CACHE);
  return await cache.match(request);
}

// Update consists in opening the cache, performing a network request and
// storing the new response data.
async function update(request) {
  const cache = await caches.open(CACHE);
  const response = await fetch(request);
  await cache.put(request, response.clone());
  return response;
}

// Sends a message to the clients.
function refresh(response) {
  return self.clients.matchAll().then(function (clients) {
    clients.forEach(function (client) {
      // Encode which resource has been updated. By including the
      // [ETag](https://en.wikipedia.org/wiki/HTTP_ETag) the client can
      // check if the content has changed.
      var message = {
        type: "refresh",
        url: response.url,
        // Notice not all servers return the ETag header. If this is not
        // provided you should use other cache headers or rely on your own
        // means to check if the content has changed.
        eTag: response.headers.get("ETag"),
      };
      // Tell the client about the update.
      client.postMessage(JSON.stringify(message));
    });
  });
}
