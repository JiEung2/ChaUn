import { http, HttpResponse } from 'msw';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const userHandlers = [
  // 회원 디테일
  http.get(`${baseUrl}/users/:user_id`, ({ params }) => {
    const { user_id } = params;
    // userId가 'recommend-crew'가 아닌 경우에만 처리
    if (user_id === 'recommend-crew') {
      return;
    }

    console.log(user_id);

    return HttpResponse.json({
      status: 200,
      message: '',
      data: {
        nickname: 'JiEung2',
        gender: 'FEMALE',
        characterImageUrl: 'image.png',
        characterFileUrl: 'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/0569937f-c1d7-4117-a373-55a8e821f3cd.glb',
      },
    });
  }),

  // 회원 운동 시간
  http.get(`${baseUrl}/users/:userId/exercise-time`, ({ params }) => {
    const { userId } = params;
    console.log(userId);

    return HttpResponse.json({
      status: 0,
      message: 'Success',
      data: {
        dailyAccumulatedExerciseTime: 12312,
        weeklyAccumulatedExerciseTime: 1231230,
      },
    });
  }),

  // 몸무게 6개월
  http.get(`${baseUrl}/users/:userId/weight`, ({ params }) => {
    const { userId } = params;
    console.log(userId);

    return HttpResponse.json({
      status: 200,
      message: 'Success',
      data: {
        weightDataList: [
          // {
          //   date: '2024-09-16T15:00:00',
          //   weight: 75.5,
          // },
        ],
      },
    });
  }),

  http.patch(`${baseUrl}/users/register-device`, async ({ request }) => {
    const device = await request.json();
    const { deviceToken } = device as {
      deviceToken: string;
    };
    console.log(deviceToken);
    return HttpResponse.json({
      status: 200,
      message: '기기가 등록되었습니다.',
      data: {},
    });
  }),
];
