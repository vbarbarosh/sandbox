/* Makes the sandbox's pages cross-origin isolated where their server sends no such headers (GitHub Pages): every
   same-origin response gets COOP same-origin and COEP credentialless, which BrowserPod needs to run Node.js.
   credentialless, not require-corp: a snippet's pictures and scripts from other sites still load, without cookies.
   Requests to other origins are left to the browser, which applies the page's policy to them itself */

self.addEventListener('install', function () {
    self.skipWaiting();
});

self.addEventListener('activate', function (event) {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function (event) {
    const request = event.request;
    if ((request.method !== 'GET') || (new URL(request.url).origin !== self.location.origin)) {
        return;
    }
    event.respondWith(fetch_isolated(request));
});

async function fetch_isolated(request)
{
    const response = await fetch(request);
    if ((response.status === 0) || (response.type === 'opaqueredirect')) {
        return response;
    }
    const headers = new Headers(response.headers);
    headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    headers.set('Cross-Origin-Embedder-Policy', 'credentialless');
    return new Response(response.body, {status: response.status, statusText: response.statusText, headers});
}
