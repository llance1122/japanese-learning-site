// === Service Worker：離線快取 + 自動更新 ===
// 更新資料後請將 CACHE_VERSION 加一，使用者下次造訪就會自動拉新版。
// 策略：
//  - 靜態檔（HTML / CSS / JS / 圖片）：stale-while-revalidate
//    先回快取（秒開）→ 背景拉新版 → 下次重整就是新版
//  - Supabase API：network only（不能離線改帳號或同步）
//  - 其他第三方（jsdelivr）：cache-first

const CACHE_VERSION = 'v22';
const CACHE_NAME = `jp-learn-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  './',
  './index.html',
  './styles.css',
  './icons/favicon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './manifest.json',
  './js/supabase-config.js',
  './js/auth.js',
  './js/kana.js',
  './js/vocab.js',
  './js/grammar.js',
  './js/grammar-tags.js',
  './js/verb-conjugation.js',
  './js/daily-challenge.js',
  './js/app.js',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      // 用 addAll 但允許部分失敗（個別 fetch 不阻塞整體安裝）
      Promise.all(
        PRECACHE_URLS.map(url =>
          cache.add(url).catch(err => console.warn('[SW] precache fail:', url, err))
        )
      )
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Supabase API / auth：network only（線上才能登入、同步）
  if (url.hostname.endsWith('supabase.co')) {
    return; // 讓瀏覽器原生處理；離線會自然失敗
  }

  // 其他請求：stale-while-revalidate
  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(req).then(cached => {
        const networkFetch = fetch(req).then(response => {
          // 只快取成功的 GET 回應
          if (response && response.ok) {
            cache.put(req, response.clone());
          }
          return response;
        }).catch(() => cached); // 沒網路就用快取
        return cached || networkFetch;
      })
    )
  );
});

// 允許前端用 postMessage('SKIP_WAITING') 立即啟用新版 SW
self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});
