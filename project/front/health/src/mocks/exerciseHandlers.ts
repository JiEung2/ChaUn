import { http, HttpResponse } from 'msw';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const exercises = [
  {
    id: 1,
    name: '러닝',
    description: '심폐 지구력을 높이는 유산소 운동',
  },
  {
    id: 2,
    name: '사이클링',
    description: '자전거를 이용한 유산소 운동',
  },
];

const exerciseCategory = [
  {
    categoryName: 'Cardio',
    exercises: [
      {
        id: 1,
        name: '러닝',
        description: '심폐 지구력을 높이는 유산소 운동',
      },
      {
        id: 2,
        name: '사이클링',
        description: '자전거를 이용한 유산소 운동',
      },
    ],
  },
  {
    categoryName: 'Strength',
    exercises: [
      {
        id: 3,
        name: '벤치 프레스',
        description: '가슴 근육을 키우는 근력 운동',
      },
      {
        id: 4,
        name: '스쿼트',
        description: '하체 근육을 키우는 근력 운동',
      },
    ],
  },
];

// 특정 달의 운동 기록
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
export const exerciseHandlers = [
  // 운동 및 카테고리 조회
  http.get(`${baseUrl}/exercise`, () => {
    return HttpResponse.json(exerciseCategory);
  }),
  //운동 추천 목록 조회
  http.get(`${baseUrl}/users/excercise/recommendation`, () => {
    return HttpResponse.json(exercises);
  }),

  // 특정 달의 운동 기록 조회
  http.get(`${baseUrl}/users/exercise-history/month`, async ({ request }) => {
    console.log('request', request);

    return HttpResponse.json(exerciseHistoryList);
  }),

  // 이번주 운동 기록 조회
  http.get(`${baseUrl}/users/exercise-history/week`, ({ request }) => {
    const url = new URL(request.url);
    try {
      const year = url.searchParams.get('year');
      const month = url.searchParams.get('month');
      const week = url.searchParams.get('week');
      console.log(year, month, week);

      return HttpResponse.json({
        status: 200,
        message: '',
        data: {
          exerciseHistoryList: [
            {
              id: 1,
              exerciseDuration: 3600,
              burnedCalories: 560,
              exerciseName: '러닝',
              createdAt: '2024-09-24T15:00:00',
            },
            {
              id: 2,
              exerciseDuration: 1800,
              burnedCalories: 300,
              exerciseName: '수영',
              createdAt: '2024-09-25T10:00:00',
            },
            {
              id: 3,
              exerciseDuration: 1800,
              burnedCalories: 300,
              exerciseName: '수영',
              createdAt: '2024-09-25T10:00:00',
            },
          ],
        },
      });
    } catch (error) {
      console.error('MSW handler에서 에러 발생', error);
      return HttpResponse.error();
    }
  }),
];
