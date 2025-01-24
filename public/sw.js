importScripts(
  "/sj/scramjet.wasm.js",
  "/sj/scramjet.shared.js",
  "/sj/scramjet.worker.js"
);
importScripts("/uv/uv.bundle.js");
importScripts("/uv/uv.config.js");
importScripts("/uv/uv.sw.js");
const sj = new ScramjetServiceWorker();
const uv = new UVServiceWorker();

async function handleRequest(event) {
  await sj.loadConfig();
  if (sj.route(event)) {
    return sj.fetch(event);
  } else if (uv.route(event)) {
    return await uv.fetch(event);
  }

  return fetch(event.request);
}
self.addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event));
});
