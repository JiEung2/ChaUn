import { setAccessToken } from '@/utils/localUtils'; // AccessToken을 저장하는 유틸리티 함수
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 사용
import { useEffect } from 'react'; // 특정 작업을 수행하기 위해 사용
import axios from 'axios';

// Access Token을 재발급받기 위한 함수
const reissueAccessToken = async () => {
  try {
    const baseURL = import.meta.env.VITE_APP_BASE_URL;
    // console.log('reissueAccessToken 함수 실행');
    // Access Token 재발급 요청
    console.log(`${baseURL}/reissue`);
    const response = await axios.get(`${baseURL}/reissue`, {
      withCredentials: true, // 쿠키를 포함하여 요청
    });
    // console.log('로그인 response', response);

    if (response.status === 200) {
      // console.log('로그인 성공');
      // 응답 헤더에서 새로운 Access Token 가져오기
      console.log('성공 헤더', response.headers);
      const newAccessToken = response.headers['access'];
      console.log(newAccessToken);
      // 새로운 Access Token을 저장 또는 사용
      //   console.log('New Access Token:', newAccessToken);

      // localUtils.js의 함수 사용
      setAccessToken(newAccessToken);
      // 여기서 필요한 작업 수행 (예: localStorage에 저장)
      // localStorage.setItem('accessToken', newAccessToken);
      // alert('Access token stored in local storage');
    } else {
      // 실패 처리 (예: Refresh Token 만료 등)
      // console.error('Failed to reissue access token:', response.statusText);
    }
  } catch (error) {
    console.error('토큰을 가져오던 중 에러 발생', error);
  }
};

// OAuthCallback 컴포넌트 정의
const OAuthCallback = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지를 이동합니다.

  useEffect(() => {
    // 페이지에 들어오면 reissueAccessToken 함수 실행
    reissueAccessToken().then(() => {
      // 토큰 재발급 후 필요한 작업 수행 (예: 페이지 이동)
      navigate('/survey');
    });
  }, [navigate]);

  // 이 컴포넌트는 화면에 아무것도 렌더링하지 않습니다.
  return null;
};

export default OAuthCallback;
