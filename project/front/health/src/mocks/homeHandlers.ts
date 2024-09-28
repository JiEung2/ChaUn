import { http, HttpResponse } from 'msw';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const exerciseTime = {
  weeklyAccumulatedExerciseTime: 0,
  dailyAccumulatedExerciseTime: 0,
};
export const homeHanders = [
  http.get(`${baseUrl}/:user_id/exercise-time`, () => {
    try {
      return HttpResponse.json(exerciseTime, { status: 200 });
    } catch (error) {
      console.error('msw: 홈화면에서 운동시간을 가져오던 중  에러 발생', error);
    }
  }),
];
