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

const CACHE_NAME = 'app-cache-v1';
const FILES_TO_CACHE = [
  // 바지 포함 전체
  'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_animation/B5standingPants.glb',
  'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_animation/B5dancingPants.glb',
  'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_animation/B5entryPants.glb',
  // 마이페이지 관련 파일들
  'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_animation/B5dancing.glb',
  'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_animation/B5waving.glb',
  //운동 관련 파일들
  'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_animation/B5standing.glb',
  'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_animation/B5entry.glb',
  'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_animation/B5sitting.glb',
  'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_animation/B5running.glb',
  // 필요한 파일들을 여기에 추가
];

self.addEventListener('install', (event) => {
  self.skipWaiting(); // 서비스 워커 즉시 활성화
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
  return self.clients.claim(); // 활성화 후 즉시 컨트롤을 넘김
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  if (
    url.origin === `https://j11c106.p.ssafy.io/oauth2/authorization/google` ||
    url.origin === `https://j11c106.p.ssafy.io/oauth2/authorization/kakao`
  ) {
    // 소셜 로그인과 관련된 요청은 캐싱하지 않고 네트워크로만 처리
    // return fetch(event.request);
    return;
  }
  // 'chrome-extension://' 스킴을 가진 요청 필터링
  if (requestUrl.protocol === 'chrome-extension:') {
    return; // 해당 요청은 캐시하지 않음
  }

  // PATCH, POST, PUT 등의 비-GET 요청은 캐시하지 않음
  if (event.request.method !== 'GET') {
    return; // GET 요청만 캐시에 저장 가능
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log('Serving cached file:', event.request.url);
        return cachedResponse;
      }

      // 캐시에 없을 경우 네트워크에서 파일을 가져옴
      return fetch(event.request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone()).catch((error) => {
              console.error('Failed to cache the network response:', error);
            });
            return networkResponse;
          });
        })
        .catch((error) => {
          console.error('Error during cache match or fetch:', error);
        });
    })
  );
});

// 메시지를 받아서 캐싱을 실행하는 로직
self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'cache-files') {
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        FILES_TO_CACHE.map((url) => {
          return fetch(url)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Failed to fetch ${url}`);
              }
              return cache.put(url, response);
            })
            .catch((error) => {
              console.error(`Failed to cache ${url}:`, error);
            });
        })
      );
    });
  }
});
