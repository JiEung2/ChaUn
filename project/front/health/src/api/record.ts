// import axios from 'axios';
import axiosInstance from './axiosInstance';
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const getBodyRecord = async (year: number, month: number) => {
  const response = await axiosInstance.get(`${baseUrl}/users/body`, {
    params: {
      year,
      month,
    },
  });
  return response;
};

export const getPredictBasic = async () => {
  const response = await axiosInstance.get(`${baseUrl}/users/predict/basic`);
  return response;
};

export const getPredictExtra = async () => {
  const response = await axiosInstance.get(`${baseUrl}/users/predict/extra`);
  return response;
};

export const postPredictExerciseDetail = async (exercise_id: number, count: number, duration: number) => {
  const response = await axiosInstance.post(`${baseUrl}/users/predict/request-extra`, { exercise_id, count, duration });
  return response;
};
