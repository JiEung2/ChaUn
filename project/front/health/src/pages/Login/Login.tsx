import './Login.scss'; // SCSS 파일 임포트
import KakaoButton from '@/components/Button/LoginButton/KakaoButtom';
import GoogleButton from '@/components/Button/LoginButton/Google';
// import startPage from '../../assets/image/startPage.png';

export default function LoginPage() {
  // 페이지 접근 시 캐시 제거
  const clearCache = async () => {
    const cacheNames = await caches.keys();
    cacheNames.forEach(async (cacheName) => {
      await caches.delete(cacheName);
      console.log(`Cache ${cacheName} cleared`);
    });
  };

  // 페이지가 로드될 때 캐시를 제거
  clearCache();

  const moveKakao = () => {
    // 카카오 로그인 페이지로 이동
    console.log('카카오 url: ' + import.meta.env.VITE_APP_BASE_URL_NO_ENDPOINT);
    window.location.href = `${import.meta.env.VITE_APP_BASE_URL_NO_ENDPOINT}/oauth2/authorization/kakao`;
  };

  const moveGoogle = () => {
    // 구글 로그인 페이지로 이동
    window.location.href = `${import.meta.env.VITE_APP_BASE_URL_NO_ENDPOINT}/oauth2/authorization/google`;
  };

  return (
    <div className="login-container">
      <div className="login-buttons">
        <KakaoButton onClick={moveKakao} />
        <GoogleButton onClick={moveGoogle} />
      </div>
    </div>
  );
}
