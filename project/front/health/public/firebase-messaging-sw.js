importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js');

self.addEventListener('install', (event) => {
  self.skipWaiting();
  console.log('서비스 워커가 설치되었습니다.');
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
  console.log('서비스 워커가 활성화되었습니다.');
});

const config = {
  apiKey: 'AIzaSyDevxneNic0RRElDsYDwt0GLGtTJIhttjo',
  authDomain: 'ssafy-c106.firebaseapp.com',
  projectId: 'ssafy-c106',
  storageBucket: 'ssafy-c106.appspot.com',
  messagingSenderId: '642150988562',
  appId: '1:642150988562:web:d0a7a1be33256b114b11cb',
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('백그라운드 메시지 수신:', payload);
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.image,
    data: {
      url: payload.data.url, // 알림 클릭시 이동할 URL
    },
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 알림 클릭 이벤트 처리
self.addEventListener('notificationclick', (event) => {
  console.log('알림이 클릭되었습니다.');
  event.notification.close(); // 알림 닫기
  const clickActionUrl = event.notification.data.url;
  if (clickActionUrl) {
    event.waitUntil(clients.openWindow(clickActionUrl));
  }
});
