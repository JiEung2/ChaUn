// import axios from 'axios';
import exportAxios from './axiosInstance';
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const getExercise = async () => {
  const response = await exportAxios.get(`${baseUrl}/exercise`);
  // console.log(response);
  return response.data;
};

// 나의 운동 추천 목록 조회
export const getExerciseRecommendation = async () => {
  const response = await exportAxios.get(`${baseUrl}/users/excercise/recommendation`);
  // console.log(response);
  return response.data;
};

// 특정 달의 운동 기록 조회
export const getExerciseHistory = async (year: number, month: number) => {
  const response = await exportAxios.get(`${baseUrl}/users/exercise-history/month`, {
    params: {
      year,
      month,
    },
  });
  // console.log(response);
  return response.data;
};
//주간 운동 기록 조회
export const getWeeklyExerciseRecord = async (year: number, month: number, week: number) => {
  try {
    const response = await exportAxios.get(`${baseUrl}/users/exercise-history/week`, {
      params: {
        year,
        month,
        week,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('API 요청 중 에러 발생:', error);
    throw error; // 에러를 상위로 던짐
  }
};

// 운동 기록 추가
export const postExerciseRecord = async (
  exerciseId: number,
  exerciseTime: number,
  exerciseStartTime: string,
  exerciseEndTime: string
) => {
  // console.log(exerciseId, exerciseTime, exerciseStartTime, exerciseEndTime);
  const response = await exportAxios.post(`${baseUrl}/users/exercise-history`, {
    exerciseId,
    exerciseTime,
    exerciseStartTime,
    exerciseEndTime,
  });
  console.log(response);
  return response.data;
};
