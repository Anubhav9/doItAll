
//Service Worker File implemented using Workbox
console.log("Hello from Service Worker");
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');
workbox.routing.registerRoute(
    /\.(?:html|css|js)$/,
    new workbox.strategies.StaleWhileRevalidate(
        {
            "cacheName":"complete_webpage",
            plugins:[
                new workbox.expiration.ExpirationPlugin({
                    maxEntries:1000,
                    maxAgeSecond:3600
                })
            ]
        }
    )
);