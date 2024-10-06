// const FIREBASE_VAPID_KEY = import.meta.env.VITE_APP_FIREBASE_VAPID_KEY;
// console.log(FIREBASE_VAPID_KEY);

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
async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      console.log('서비스 워커 등록 시도 중...');
      const firebaseRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log('Firebase Service Worker 등록 성공:', firebaseRegistration.scope);

      // 알림 권한 상태 확인
      if (Notification.permission === 'granted') {
        console.log('알림 권한이 이미 허용됨');

        await retrieveToken(firebaseRegistration);
      } else if (Notification.permission === 'denied') {
        console.log('알림 권한이 거부되었습니다.');
      } else {
        const permission = await Notification.requestPermission();
        console.log('권한 요청 결과:', permission);
        if (permission === 'granted') {
          console.log('알림 권한 허용됨');
          await retrieveToken(firebaseRegistration);
        } else {
          console.log('알림 권한이 거부되었습니다.');
        }
      }
    } catch (error) {
      console.error('Service Worker 등록 실패:', error);
    }
  } else {
    console.warn('Service Worker not supported in this browser');
  }
}

async function retrieveToken(serviceWorkerRegistration) {
  try {
    const currentToken = await messaging.getToken({
      vapidKey: 'BHwpLNL8I7G3uVXMnYxMZWiopgbTh5k0bC-HRQPEVXj6mz7cPrjcNpgEhwDf08bq99wJF7CQA3DRa16Zb5z2Tvs',
      serviceWorkerRegistration: serviceWorkerRegistration,
    });

    if (currentToken) {
      console.log('FCM 토큰:', currentToken);
      if (!sessionStorage.getItem('fcmToken')) {
        sessionStorage.setItem('fcmToken', currentToken);
        console.log('FCM 토큰 발급 성공:', currentToken);
      } else {
        console.log('기존 FCM 토큰이 세션에 저장되어 있습니다.');
      }
    } else {
      console.warn('FCM 토큰을 가져올 수 없습니다.');
    }
  } catch (error) {
    console.error('FCM 토큰을 가져오는 중 오류가 발생했습니다:', error);
  }
}

// 서비스 워커 등록 함수 호출
registerServiceWorker();
