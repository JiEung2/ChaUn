import { http, HttpResponse } from 'msw';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const exerciseHandlers = [
  // 운동 및 카테고리 조회
  http.get(`${baseUrl}/exercise`, () => {
    return HttpResponse.json({
      status: 200,
      message: '',
      data: [
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
      ],
    });
  }),

  // 이번주 운동 기록 조회
  http.get(`${baseUrl}/users/exercise-history/week`, () => {
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
            createdAt: '2024-09-16T15:00:00',
          },
          {
            id: 2,
            exerciseDuration: 1800,
            burnedCalories: 300,
            exerciseName: '수영',
            createdAt: '2024-09-17T10:00:00',
          },
        ],
      },
    });
  }),
];
