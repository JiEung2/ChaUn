// import axios from 'axios';
import exportAxios from './axiosInstance';
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

// 나의 특정 달의 체형 기록 조회
export const getBodyRecord = async (year: number, month: number) => {
  const response = await exportAxios.get(`${baseUrl}/users/body`, {
    params: {
      year,
      month,
    },
  });
  // console.log('체형 기록 조회', response);
  return response.data;
};

// 기본 체형 예측 조회
export const getPredictBasic = async () => {
  const response = await exportAxios.get(`${baseUrl}/users/predict/basic`);
  console.log('기본체형 예측', response);
  return response.data;
};

export const getPredictExtra = async () => {
  const response = await exportAxios.get(`${baseUrl}/users/predict/extra`);
  return response.data;
};

export const postPredictExerciseDetail = async (exercise_id: number, count: number, duration: number) => {
  const response = await exportAxios.post(`${baseUrl}/users/predict/request-extra`, { exercise_id, count, duration });
  return response.data;
};
