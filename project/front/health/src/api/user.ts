import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const getUserDetail = async (userId: number) => {
  const response = await axios.get(`${baseUrl}/users/${userId}`, { params: { userId } });
  return response;
};

export const getUserExerciseTime = async (userId: number) => {
  const response = await axios.get(`${baseUrl}/users/${userId}/exercise-time`, { params: { userId } });
  return response;
};

export const getUserWeight6 = async (userId: number) => {
  const response = await axios.get(`${baseUrl}/users/${userId}/weight`, { params: { userId } });
  return response;
};
