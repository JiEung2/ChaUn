import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/global.scss';
import { worker } from './mocks/browser';

// 개발 환경에서만 MSW를 활성화
if (import.meta.env.VITE_APP_STATE === 'development') {
  console.log('개발 환경에서 MSW를 활성화합니다.');
  await worker.start({
    onUnhandledRequest: 'bypass', // 핸들러가 없는 요청은 실제 네트워크 요청을 통과시킴
  });

  // 개발 환경에서 푸쉬 알림을 테스트할 때 아래에 추가하기
}

createRoot(document.getElementById('root')!).render(<App />);

if (import.meta.env.VITE_APP_STATE === 'production') {
  // 서비스 워커 등록 코드 추가
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('서비스 워커가 다음과 같은 scope에서 등록되었습니다: ', registration.scope);
        })
        .catch((error) => {
          console.log('서비스워커 등록에 실패했습니다: ', error);
        });
    });
  }
}
