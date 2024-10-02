import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import toast from 'react-hot-toast';

// Firebase 구성
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

/**
 * Messaging 초기화
 * 사용자에게 알림 권한을 요청하고, FCM 토큰을 반환한다.
 */
const messaging = getMessaging(app);

/**
 * 수신 메시지 처리 함수
 * FCM 메시지를 수신하면 알림을 표시한다.
 */
const handleForegroundMessages = () => {
  onMessage(messaging, (payload: any) => {
    if (!payload.data) return;
    toast.dismiss();
    toast.success(payload.data.body);
  });
};

/**
 * FCM 토큰을 가져오는 함수
 * 사용자에게 알림 권한을 요청하고, FCM 토큰을 반환한다.
 */
const getFcmToken = async () => {
  // 세션 스토리지에 FCM 토큰이 있는지 확인
  const existingToken = sessionStorage.getItem('fcmToken');
  if (existingToken) {
    return existingToken; // 이미 토큰이 있는 경우, 해당 토큰을 반환
  }

  try {
    // 알림 권한 요청
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      // FCM 토큰 가져오기
      const currentToken = await getToken(messaging, {
        vapidKey:
          'BHwpLNL8I7G3uVXMnYxMZWiopgbTh5k0bC-HRQPEVXj6mz7cPrjcNpgEhwDf08bq99wJF7CQA3DRa16ZbBHwpLNL8I7G3uVXMnYxMZWiopgbTh5k0bC-HRQPEVXj6mz7cPrjcNpgEhwDf08bq99wJF7CQA3DRa16Zb', // VAPID 키
      });

      if (currentToken) {
        // 토큰을 세션 스토리지에 저장
        sessionStorage.setItem('fcmToken', currentToken);
        return currentToken;
      } else {
        console.warn('FCM 토큰을 가져올 수 없습니다. 권한이 없거나 문제가 발생했습니다.');
        return null;
      }
    } else {
      console.log('Notification permission denied.');
      return null;
    }
  } catch (error) {
    console.error('FCM 토큰을 가져오는 중 오류 발생:', error);
    return null;
  }
};

export { getFcmToken, handleForegroundMessages, messaging };
