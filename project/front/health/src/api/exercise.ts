import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const getExercise = async () => {
  const response = await axios.get(`${baseUrl}/exercise`);
  // console.log(response);
  return response.data;
};

// 나의 운동 추천 목록 조회
export const getExerciseRecommendation = async () => {
  const response = await axios.get(`${baseUrl}/users/excercise/recommendation`);
  // console.log(response);
  return response.data;
};

// 특정 달의 운동 기록 조회
export const getExerciseHistory = async (year: number, month: number) => {};
