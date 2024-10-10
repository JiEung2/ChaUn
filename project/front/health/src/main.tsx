import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/global.scss';
import { worker } from './mocks/browser';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

// 개발 환경에서만 MSW를 활성화하는 함수
async function initMSW() {
  if (import.meta.env.VITE_APP_STATE === 'development') {
    console.log('개발 환경에서 MSW를 활성화합니다.');

    try {
      // 서비스 워커가 설정 완료될 때까지 대기
      await worker.start({
        serviceWorker: {
          url: '/mockServiceWorker.js', // 정확한 경로 명시
        },
        onUnhandledRequest: 'bypass',
      });
      console.log('MSW가 성공적으로 활성화되었습니다.');
    } catch (error) {
      console.error('MSW 활성화 중 에러가 발생했습니다:', error);
    }
  }
}

// 프로덕션 환경에서 서비스 워커를 등록하는 함수
function registerServiceWorker() {
  if (import.meta.env.VITE_APP_STATE === 'production' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js', { type: 'module' })
        .then((registration) => {
          console.log('서비스 워커가 다음과 같은 scope에서 등록되었습니다: ', registration.scope);
        })
        .catch((error) => {
          console.error('서비스 워커 등록에 실패했습니다:', error);
        });
    });
  }
}

// MSW 설정 및 서비스 워커 등록 후 애플리케이션 시작
async function startApp() {
  // 개발 환경이면 MSW 활성화를 먼저 기다린 후에 애플리케이션 렌더링
  await initMSW();

  // 프로덕션 환경에서는 서비스 워커를 등록
  registerServiceWorker();

  // React 애플리케이션 렌더링
  const rootElement = document.getElementById('root');
  if (rootElement) {
    createRoot(rootElement).render(
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}
        <App />
      </QueryClientProvider>
    );
  } else {
    console.error('React 애플리케이션을 렌더링할 DOM 요소를 찾을 수 없습니다.');
  }
}

startApp();
