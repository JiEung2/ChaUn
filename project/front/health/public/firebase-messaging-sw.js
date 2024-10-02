// importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js');

// self.addEventListener('install', (_) => {
//   self.skipWaiting();
// });

// self.addEventListener('activate', (_) => {
//   console.log('fcm service worker가 실행되었습니다.');
// });

// const config = {
//   apiKey: 'AIzaSyDevxneNic0RRElDsYDwt0GLGtTJIhttjo',
//   authDomain: 'ssafy-c106.firebaseapp.com',
//   projectId: 'ssafy-c106',
//   storageBucket: 'ssafy-c106.appspot.com',
//   messagingSenderId: '642150988562',
//   appId: '1:642150988562:web:d0a7a1be33256b114b11cb',
// };

// firebase.initializeApp(config);

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   const notificationTitle = payload.data.title;
//   const notificationOptions = {
//     body: payload.data.body,
//     icon: payload.data.image,
//     data: {
//       url: payload.data.url, // 알림 클릭시 이동할 URL
//     },
//   };
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// // 알림 클릭 이벤트 처리
// self.addEventListener('notificationclick', (event) => {
//   event.notification.close(); // 알림 닫기
//   // 알림에서 설정한 URL로 이동
//   const clickActionUrl = event.notification.data.url;
//   if (clickActionUrl) {
//     event.waitUntil(clients.openWindow(clickActionUrl));
//   }
// });

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getMessaging, onBackgroundMessage } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDevxneNic0RRElDsYDwt0GLGtTJIhttjo',
  authDomain: 'ssafy-c106.firebaseapp.com',
  projectId: 'ssafy-c106',
  storageBucket: 'ssafy-c106.appspot.com',
  messagingSenderId: '642150988562',
  appId: '1:642150988562:web:d0a7a1be33256b114b11cb',
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// 백그라운드 메시지 처리
onBackgroundMessage(messaging, (payload) => {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.image,
    data: {
      url: payload.data.url,
    },
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 알림 클릭 이벤트 처리
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const clickActionUrl = event.notification.data.url;
  if (clickActionUrl) {
    event.waitUntil(clients.openWindow(clickActionUrl));
  }
});
