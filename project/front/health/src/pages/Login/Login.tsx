import kakao from '@/assets/image/Login/kakaoLogin.png';
import google from '@/assets/image/Login/googleLogin.png';
import './Login.scss'; // SCSS 파일 임포트
import { useNavigate } from 'react-router-dom';
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
  };
  return (
    <div className="login-container">
      <h1 className="login-title">제목</h1>
      <div className="login-buttons">
        <img src={kakao} alt="kakao" onClick={moveKakao} />

        <img src={google} alt="google" onClick={moveGoogle} />
      </div>
    </div>
  );
}
