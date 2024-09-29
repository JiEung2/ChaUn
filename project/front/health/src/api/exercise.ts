import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const getExercise = async () => {
  const response = await axios.get(`${baseUrl}/exercise`);
  return response;
};

export const getWeeklyExerciseRecord = async () => {
  const response = await axios.get(`${baseUrl}/users/exercise-history/week`);
  return response;
};
