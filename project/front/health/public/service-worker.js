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
