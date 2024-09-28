import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;
interface ExerciseTimeResponse {
  dailyAccumulatedExerciseTime: number;
  weeklyAccumulatedExerciseTime: number;
}

export const exerciseTime = async (user_id: number): Promise<ExerciseTimeResponse> => {
  const response = await axios.get<ExerciseTimeResponse>(`${baseUrl}/${user_id}/exercise-time`);
  return response.data;
};
