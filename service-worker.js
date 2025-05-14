const CACHE_NAME = "attendance-cache-v404";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/profile.jpeg",
  "/manifest.json"
];

// 🛠️ تثبيت السرفيس ووركر
self.addEventListener("install", event => {
  self.skipWaiting(); // ✨ ضروري يدخل الخدمة فورًا
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// 🛠️ تفعيل السرفيس ووركر ومسح الكاش القديم
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// ✨ استقبال الرسائل من الصفحة (للسماح بالتحديث الفوري)
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// 🛠️ التعامل مع الطلبات
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // ❌ لا تكاشي طلبات Supabase أو غير GET
  if (url.hostname.includes("supabase.co") || event.request.method !== "GET") {
    return;
  }

  // ✅ كاش للملفات الثابتة
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then(networkResponse => {
        return caches.open(CACHE_NAME).then(cache => {
          if (networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
      }).catch(() => {
        return caches.match('/index.html');
      });
    })
  );
});
