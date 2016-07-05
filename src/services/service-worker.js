const { name, version } = self.__wpo;
const cacheName = `${name}:${version}:api`;

function isApiCall(url) {
	return url.indexOf(process.env.API_ENDPOINT) >= 0;
}

function fetchAndCache(request) {
	console.log('[SW]: Fetching & caching:', request.url);
	return fetch(request).then(response => {
		caches.open(cacheName, response).then(cache => cache.put(request, response));
		return response.clone();
	});
}

function match(request) {
	return caches.match(request).then(response => {
		if (response) return response.clone();
		return fetchAndCache(request);
	});
}

self.addEventListener('fetch', event => {
	if (!isApiCall(event.request.url)) return true;

	event.respondWith(match(event.request));
});
