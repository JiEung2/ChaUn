// import axios from 'axios';
import exportAxios from './axiosInstance';
const baseUrl = import.meta.env.VITE_APP_BASE_URL;
// interface userInformation {
//   nickname: string;
//   coin: number;
// }
// 회원 디테일
export const getUserDetail = async (user_id: number) => {
  const response = await exportAxios.get(`${baseUrl}/users/${user_id}`, { params: { user_id } });
  return response.data;
};

// 다른 사람의 이번주, 오늘 운동 시간
export const getUserExerciseTime = async (userId: number) => {
  const response = await exportAxios.get(`${baseUrl}/users/${userId}/exercise-time`, { params: { userId } });
  return response.data;
};

// 나의 이번주, 오늘 운동 시간
export const getMyExerciseTime = async () => {
  const response = await exportAxios.get(`${baseUrl}/users/exercise-time`);
  return response.data;
};

// 몸무게 6개월
export const getUserWeight6 = async (userId: number) => {
  const response = await exportAxios.get(`${baseUrl}/users/${userId}/weight`, { params: { userId } });
  return response.data;
};

// 기기 등록
export const patchDeviceToken = async (deviceToken: string) => {
  console.log('axios test:', deviceToken);
  const response = await exportAxios.patch(`${baseUrl}/users/register-device`, { deviceToken });
  return response;
};
