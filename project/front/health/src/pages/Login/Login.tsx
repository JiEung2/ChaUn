import './Login.scss'; // SCSS 파일 임포트
// import { useNavigate } from 'react-router-dom';
import KakaoButton from '@/components/Button/LoginButton/KakaoButtom';
import GoogleButton from '@/components/Button/LoginButton/Google';
import MainGirl from '@/assets/image/maingirl.png';
import MainBoy from '@/assets/image/mainboy.png';

export default function LoginPage() {
  // const navigate = useNavigate();
  const moveKakao = () => {
    // TODO : 카카오 로그인 페이지로 이동
    window.location.href = `${import.meta.env.VITE_APP_BASE_URL_NO_ENDPOINT}/oauth2/authorization/kakao`;
    // 임시로 servey 페이지로 이동
    // navigate('/survey');
  };
  const moveGoogle = () => {
    //TODO : 구글 로그인 페이지로 이동
    window.location.href = `${import.meta.env.VITE_APP_BASE_URL_NO_ENDPOINT}/oauth2/authorization/google`;
    // navigate('/survey');
  };
  return (
    <div className="login-container">
      <p className="login-title">캐운</p>
      <div className="mainChar">
        <img src={MainBoy} alt="mainboy" className="mainboy" />
        <img src={MainGirl} alt="maingirl" className="maingirl" />
      </div>
      <div className="login-buttons">
        <KakaoButton onClick={moveKakao} />
        <GoogleButton onClick={moveGoogle} />
      </div>
    </div>
  );
}
