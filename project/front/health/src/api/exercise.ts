import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const getExercise = async () => {
  const response = await axios.get(`${baseUrl}/exercise`);
  return response;
};

export const getWeeklyExerciseRecord = async (year: number, month: number, week: number) => {
  try {
    const response = await axios.get(`${baseUrl}/users/exercise-history/week`, {
      params: {
        year,
        month,
        week,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('API 요청 중 에러 발생:', error);
    throw error; // 에러를 상위로 던짐
  }
};
