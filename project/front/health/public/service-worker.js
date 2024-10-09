// import { initializeApp } from 'firebase/app';
// import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// import toast from 'react-hot-toast';

// const firebaseConfig = {
//   apiKey: 'AIzaSyDevxneNic0RRElDsYDwt0GLGtTJIhttjo',
//   authDomain: 'ssafy-c106.firebaseapp.com',
//   projectId: 'ssafy-c106',
//   storageBucket: 'ssafy-c106.appspot.com',
//   messagingSenderId: '642150988562',
//   appId: '1:642150988562:web:d0a7a1be33256b114b11cb',
// };

// // Firebase 초기화
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// // Service Worker 등록
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', async () => {
//     try {
//       const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
//       messaging.useServiceWorker(registration);
//       console.log('ServiceWorker registration successful with scope: ', registration.scope);
//     } catch (err) {
//       console.log('ServiceWorker registration failed: ', err);
//     }
//   });
// }

// // 알림 권한 요청 및 토큰 발급
// async function requestPermission() {
//   console.log('권한 요청 중...');

//   const permission = await Notification.requestPermission();
//   if (permission === 'denied') {
//     console.log('알림 권한 허용 안됨');
//     return;
//   }

//   console.log('알림 권한이 허용됨');

//   const token = await getToken(messaging, {
//     vapidKey:
//       'BHwpLNL8I7G3uVXMnYxMZWiopgbTh5k0bC-HRQPEVXj6mz7cPrjcNpgEhwDf08bq99wJF7CQA3DRa16ZbBHwpLNL8I7G3uVXMnYxMZWiopgbTh5k0bC-HRQPEVXj6mz7cPrjcNpgEhwDf08bq99wJF7CQA3DRa16Zb',
//   });

//   if (token) console.log('token: ', token);
//   else console.log('Can not get Token');

//   // 알림 수신 처리
//   onMessage(messaging, (payload) => {
//     console.log('메시지가 도착했습니다.', payload);
//     // ...
//   });
// }

// requestPermission();

// glb 파일 캐싱 코드
const CACHE_NAME = 'app-cache-v1';
const FILES_TO_CACHE = [
  'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_animation/B5standingPants.glb',
  // 필요한 파일들을 여기에 추가
];

self.addEventListener('install', (event) => {
  // 설치 중 서비스 워커가 캐시를 미리 로드
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache and caching files');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  // 새로운 서비스 워커 바로 활성화
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Old cache deleted:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // 활성화되자마자 컨트롤을 바로 넘김
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // 쿼리 파라미터가 다른 요청을 처리할 때 사용
  const requestUrl = new URL(event.request.url);
  requestUrl.search = ''; // 쿼리 파라미터 제거하여 캐시 일관성 유지

  event.respondWith(
    caches.match(requestUrl.toString()).then((cachedResponse) => {
      if (cachedResponse) {
        console.log('Serving cached file:', event.request.url);
        return cachedResponse;
      }

      // 캐시에 없을 경우 네트워크에서 파일을 가져옴
      return fetch(event.request).then((networkResponse) => {
        // 응답을 캐시에 저장
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});
