import axios from 'axios';
import { getAccessToken, setAccessToken, removeAccessToken } from '@/utils/localUtils';

// 환경 변수에서 API 기본 URL 가져오기
const baseURL = import.meta.env.VITE_APP_BASE_URL;

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 1000000,
  headers: {
    'Content-Type': 'application/json',
    // 'Origin': 'https://i11c205.p.ssafy.io', // 여기에 Origin 헤더 추가
  },
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      // 액세스 토큰이 있으면 헤더에 추가
      config.headers.access = `${token}`;
    } else {
      // 액세스 토큰이 없으면 로그인 필요 메시지와 함께 로그인 페이지로 리디렉션
      alert('로그인 후 이용해주세요.[1]');
      window.location.href = '/';
      return Promise.reject(new Error('No access token found'));
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response.data, // 정상 응답에서 데이터만 추출

  // 토큰이 만료되거나 오류가 발생한 경우 동작하는 코드
  async (error) => {
    const originalRequest = error.config; // 실패한 요청의 설정 가져오기
    // console.error('Error response:', error.response);
    // 오류가 발생하면 아래 요청 수행
    if ((error.response && error.response.status === 401) || (error.response && error.response.status === 403)) {
      // 요청이 이미 한 번 재시도 되었는지 확인
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // 토큰 재발급 요청
          const response = await axios.get(`${baseURL}/api/reissue`);
          const newAccessToken = response.headers['access']; // 새로운 액세스 토큰 가져오기
          setAccessToken(newAccessToken); // 새로운 액세스 토큰 저장

          // 수정: 요청에 새로운 액세스 토큰 포함
          originalRequest.headers.access = `${newAccessToken}`;

          return axiosInstance(originalRequest); // 원래 요청 재시도
        } catch (err) {
          // console.error('Token reissue error: ', err);
          alert('로그인 후 이용해주세요.[2]');
          removeAccessToken(); // 실패 시 토큰 제거
          window.location.href = '/'; // 로그인 페이지로 리디렉션
          return Promise.reject(err);
        }
      } else {
        // 재시도가 이미 이루어진 경우, 무한 루프를 방지하기 위해 즉시 오류 반환
        alert('세션이 만료되었습니다. 다시 로그인해주세요.');
        removeAccessToken(); // 실패 시 토큰 제거
        window.location.href = '/'; // 로그인 페이지로 리디렉션
        return Promise.reject(error);
      }
    }

    // console.error('API call failed on instance:', error);
    return Promise.reject(error); // 모든 다른 오류는 그대로 반환
  }
);

export default axiosInstance;
