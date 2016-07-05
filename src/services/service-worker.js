const API_CACHE = `API`;
const EXTERNAL_CACHE = `EXTERNAL`;

function isApiCall(url) {
	return url.indexOf(process.env.API_ENDPOINT) >= 0;
}

function isExternalResource(url) {
	return url.indexOf(process.env.HOST) < 0;
}

function fetchAndCache(request, cacheName) {
	console.log(`[SW]: Fetching & caching in ${cacheName}:`, request.url);
	return fetch(request).then(response => {
		caches.open(cacheName, response).then(cache => cache.put(request, response));
		return response.clone();
	});
}

function match(request, cacheName) {
	return caches.match(request).then(response => {
		if (response) return response.clone();
		return fetchAndCache(request, cacheName);
	});
}

self.addEventListener('fetch', event => {
	if (isApiCall(event.request.url)) {
		return event.respondWith(match(event.request, API_CACHE));
	}

	if (isExternalResource(event.request.url)) {
		return event.respondWith(match(event.request, EXTERNAL_CACHE));
	}

	return event.respondWith(fetch(event.request));
});
