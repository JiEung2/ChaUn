import { setAccessToken } from '@/utils/localUtils'; // AccessToken을 저장하는 유틸리티 함수
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 사용
import { useEffect } from 'react'; // 특정 작업을 수행하기 위해 사용
import axios from 'axios';
import useUserStore from '@/store/userInfo';
import { checkSurvey } from '@/api/survey';
import { getUserDetail } from '@/api/user'; // 유저 정보를 가져오는 API

const OAuthCallback = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지를 이동합니다.
  const { setUserId, setNickname, setHasCoin, setGender, setCharacterFileUrl } = useUserStore(); // 훅을 컴포넌트 내부로 이동

  const reissueAccessToken = async () => {
    try {
      const baseURL = import.meta.env.VITE_APP_BASE_URL;
      console.log('baseURL:', baseURL);
      const response = await axios.get(`${baseURL}/reissue`, {
        withCredentials: true, // 쿠키를 포함하여 요청
      });

      if (response.status === 200) {
        console.log('토큰 재발급 성공:', response.headers);
        setUserId(response.headers['userid']);
        const newAccessToken = response.headers['access'];
        setAccessToken(newAccessToken);

        // 유저 상세 정보 가져오기
        const userDetailResponse = await getUserDetail(response.headers['userid']);
        setNickname(userDetailResponse.nickname);
        setHasCoin(userDetailResponse.coin);
        setGender(userDetailResponse.gender);
        setCharacterFileUrl(userDetailResponse.characterFileUrl);

        // 서비스 워커에 캐싱 요청
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({ action: 'cache-files' });
        }
      } else {
        // 실패 처리
        console.error('Failed to reissue access token:', response.statusText);
      }
    } catch (error) {
      console.error('토큰을 가져오던 중 에러 발생', error);
    }
  };

  useEffect(() => {
    // 페이지에 들어오면 reissueAccessToken 함수 실행
    reissueAccessToken().then(() => {
      // 토큰 재발급 후 필요한 작업 수행 (예: 페이지 이동)
      checkSurvey().then((response) => {
        console.log('response:', response);
        if (response.surveyCompleted === true) {
          navigate('/home');
        } else {
          navigate('/survey');
        }
      });
    });
  }, [navigate]);

  return null;
};

export default OAuthCallback;
