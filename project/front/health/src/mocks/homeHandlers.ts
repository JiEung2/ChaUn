import { http, HttpResponse } from 'msw';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

const exerciseTime = {
  weeklyAccumulatedExerciseTime: 0,
  dailyAccumulatedExerciseTime: 0,
};

const exerciseHistoryList = [
  {
    id: 1,
    exerciseDuration: 3600,
    burnedCalories: 560,
    exerciseName: '러닝',
    createdAt: '2024-09-16T15:00:00',
  },
  {
    id: 2,
    exerciseDuration: 1800,
    burnedCalories: 300,
    exerciseName: '수영',
    createdAt: '2024-09-17T10:00:00',
  },
];

export const homeHanders = [
  http.get(`${baseUrl}/users/my/exercise-time`, () => {
    try {
      return HttpResponse.json(exerciseTime, { status: 200 });
    } catch (error) {
      console.error('msw: 홈화면에서 운동시간을 가져오던 중  에러 발생', error);
    }
  }),

  // request 객체에서 url을 추출
  http.get(`${baseUrl}/users/exercise-history/week`, async ({ request }) => {
    try {
      const url = new URL(request.url);
      const year = url.searchParams.get('year');
      const month = url.searchParams.get('month');
      const week = url.searchParams.get('week');

      console.log('이번주 운동 기록 조회를 위한 정보', year, month, week);
      return HttpResponse.json(exerciseHistoryList, { status: 200 });
    } catch (error) {
      console.error('msw: 홈화면에서 운동 기록을 가져오던 중 에러 발생', error);
    }
  }),
];
