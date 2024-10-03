// import axios from 'axios';
import axiosInstance from './axiosInstance';
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

// 회원 디테일
export const getUserDetail = async (userId: number) => {
  const response = await axiosInstance.get(`${baseUrl}/users/${userId}`, { params: { userId } });
  return response;
};

// 다른 사람의 이번주, 오늘 운동 시간
export const getUserExerciseTime = async (userId: number) => {
  const response = await axiosInstance.get(`${baseUrl}/users/${userId}/exercise-time`, { params: { userId } });
  return response;
};

// 나의 이번주, 오늘 운동 시간
export const getMyExerciseTime = async () => {
  const response = await axiosInstance.get(`${baseUrl}/users/exercise-time`);
  return response;
};

// 몸무게 6개월
export const getUserWeight6 = async (userId: number) => {
  const response = await axiosInstance.get(`${baseUrl}/users/${userId}/weight`, { params: { userId } });
  return response;
};
