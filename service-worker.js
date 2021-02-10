let cacheName = 'chunk-to-do.v.1.0.0';
let filesToCache = [
	'./',
	'index.html',
	'src/assets/css/reset.css',
	'src/assets/css/style.css',
	'src/index.js',
	'src/Activity.js',
	'src/util/Validator.js'
];

self.addEventListener('install', e => {
	console.log('[ServiceWorker] Installer');
	e.waitUntil(
		caches.open(cacheName)
			.then(cache => {
				return cache.addAll(filesToCache);
			})
	);
});

self.addEventListener('activate', e => {
	console.log('[ServiceWorker] Activate');
	e.waitUntil(
		caches.keys()
			.then(keyList => {
				return Promise.all(keyList.map(key => {
					if (key !== cacheName) {
						return caches.delete(key);
					}
				}));
			})
	);
});

self.addEventListener('fetch', e => {
	console.log('[ServiceWorker] Fetch', e.request.url);
	e.respondWith(
		caches.match(e.request)
			.then(response => {
				return response || fetch(e.request);
			})
	);
});