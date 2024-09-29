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
export const exerciseHandlers = [
  // 운동 및 카테고리 조회
  http.get(`${baseUrl}/exercise`, () => {
    return HttpResponse.json(exerciseCategory);
  }),
  //운동 추천 목록 조회
  http.get(`${baseUrl}/users/excercise/recommendation`, () => {
    return HttpResponse.json(exercises);
  }),
];
