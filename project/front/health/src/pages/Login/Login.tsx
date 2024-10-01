import './Login.scss'; // SCSS 파일 임포트
import { useNavigate } from 'react-router-dom';
import KakaoButton from '@/components/Button/LoginButton/KakaoButtom';
import GoogleButton from '@/components/Button/LoginButton/Google';
import MainGirl from '@/assets/image/maingirl.png';
import MainBoy from '@/assets/image/mainboy.png';

export default function LoginPage() {
  const navigate = useNavigate();
  const moveKakao = () => {
    // TODO : 카카오 로그인 페이지로 이동
    // window.location.href = "카카오 로그인 페이지 URL";
    // 임시로 servey 페이지로 이동
    navigate('/survey');
  };
  const moveGoogle = () => {
    //TODO : 구글 로그인 페이지로 이동
    // window.location.href = "구글 로그인 페이지 URL";
    navigate('/survey');
  };
  return (
    <div className="login-container">
      <h1 className="login-title">캐운</h1>
      <div className="mainChar">
        <img src={MainBoy} alt="mainboy" />
        <img src={MainGirl} alt="maingirl" />
      </div>
      <div className="login-buttons">
        <KakaoButton onClick={moveKakao} />
        <GoogleButton onClick={moveGoogle} />
      </div>
    </div>
  );
}
