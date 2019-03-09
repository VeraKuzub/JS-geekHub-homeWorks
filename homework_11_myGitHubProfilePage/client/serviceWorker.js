// Set a name for the current cache
var cacheName = 'v2';

// Default files to always cache
var cacheFiles = [
 	'./',
    './index.html',
    './style.css',
    './script.js'
    
]

self.addEventListener('install', function(event) {
	console.log("ServiceWorker Installed");

	event.waitUntil(
	caches.open(cacheName).then(function(cache){
		console.log("ServiceWorker Caching cacheFiles");
		return cache.addAll(cacheFiles);
		})
	);
});
	
self.addEventListener('activate', function(event) {
	console.log("ServiceWorker Activated");
	
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(thisCasheName) {
				if (thisCasheName !== cacheName) {

					console.log("ServiceWorker removing cached filed from cache - ", thisCasheName);
					return caches.delete(thisCasheName);
				}
			}));
		})
	);
});
	

self.addEventListener('fetch', function(event) {
	console.log("ServiceWorker Fetching", event.request.url);
	event.respondWith(

		caches.match(event.request).then(function(response){
			
			if (response) {

				console.log("ServiceWorker found in cache", event.request.url, response);
				return response;
			}

			
			var fetchRequest = event.request;

			return fetch(fetchRequest)
			.then(function(response){

				if (!response || response.status !== 200){
					console.log("ServiceWorker no response from fetch");
					return response;
				}

				var responseClone = response.clone();

				caches.open(cacheName).then(function(cache) {

				cache.put(event.request, responseClone);
				console.log("ServiceWorker New Data Cached", event.request.url);
				return response;
				});

			})
			.catch(function(err){
				console.log("ServiceWorker Error Fetching and Caching New Data", err);
			});
		})
	);
});
