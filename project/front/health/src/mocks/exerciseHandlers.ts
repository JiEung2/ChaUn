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
// const exerciseHistoryList = [
//   {
//     id: 1,
//     exerciseDuration: 3600,
//     burnedCalories: 560,
//     exerciseName: '러닝',
//     createdAt: '2024-09-16T15:00:00',
//   },
//   {
//     id: 2,
//     exerciseDuration: 1800,
//     burnedCalories: 300,
//     exerciseName: '수영',
//     createdAt: '2024-09-17T10:00:00',
//   },
// ];
export const exerciseHandlers = [
  // 운동 및 카테고리 조회
  http.get(`${baseUrl}/exercise`, () => {
    return HttpResponse.json(exerciseCategory);
  }),
  //운동 추천 목록 조회
  http.get(`${baseUrl}/exercise/recommendation`, () => {
    return HttpResponse.json(exercises);
  }),

  // 특정 달의 운동 기록 조회
  http.get(`${baseUrl}/users/exercise-history/month`, async ({ request }) => {
    console.log('request', request);

    return HttpResponse.json({
      status: 200,
      message: 'Success',
      data: {
        recommendedExerciseList: [
          {
            exerciseName: '데드리프트',
            reason: '전체적인 근력 향상',
            description: '바벨이나 덤벨을 바닥에서 들어올리는 운동으로, 하체와 코어 근육을 강화하는 데 효과적입니다.',
          },
          {
            exerciseName: '벤치 프레스',
            reason: '상체 근육 발달',
            description: '벤치에 누워 바벨을 가슴 높이에서 밀어 올리는 운동으로, 주로 가슴과 삼두근을 강화합니다.',
          },
          {
            exerciseName: '풀업',
            reason: '등 근육 강화',
            description:
              '철봉에 몸을 매달고 팔을 이용해 몸을 위로 끌어올리는 운동으로, 등과 팔 근육을 집중적으로 발달시킵니다.',
          },
          {
            exerciseName: '런지',
            reason: '하체 지구력 향상',
            description:
              '한 발을 앞으로 내딛고 무릎을 굽혔다가 다시 원위치로 돌아오는 운동으로, 대퇴사두근, 햄스트링 등에 효과적입니다.',
          },
          {
            exerciseName: '버피',
            reason: '전신 유산소 운동',
            description: '스쿼트, 플랭크, 점핑 제트를 결합한 운동으로, 심박수를 높이고 전신 체력을 강화합니다.',
          },
        ],
      },
    });
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
