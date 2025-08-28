self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('smileyide-v1').then((cache) => {
            return cache.addAll([
                '/',
                '/login.html',
                '/index.html',
                '/css/style.css',
                '/css/login.css',
                '/js/app.js',
                '/js/editor.js',
                '/js/auth/login.js',
                '/js/auth/register.js',
                '/js/auth/session.js',
                '/js/storage.js',
                '/js/config.js',
                '/js/languages/python.js',
                '/js/languages/html_css_js.js',
                'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.50.0/min/vs/loader.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.50.0/min/vs/editor/editor.main.min.js',
                'https://cdn.jsdelivr.net/pyodide/v0.28.1/full/pyodide.js'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => response || fetch(event.request))
    );
});