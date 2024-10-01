import { http, HttpResponse } from 'msw';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const recordHandlers = [
  // 기본 체형 예측 조회
  http.get(`${baseUrl}/users/predict/basic`, () => {
    return HttpResponse.json({
      status: 200,
      message: 'Success',
      data: {
        userId: 1,
        current: 73.23,
        p30: 73.23,
        p90: 74.3,
        createdAt: '2024-09-20T05:10:42.658',
      },
    });
  }),

  // 추가 체형 예측 조회
  http.get(`${baseUrl}/users/predict/extra`, () => {
    return HttpResponse.json({
      status: 200,
      message: 'Success',
      data: {
        userId: 1,
        current: 73.23,
        p30: 72.23,
        p90: 70.3,
        createdAt: '2024-09-20T05:10:42.658',
        exercise: {
          exerciseId: 3,
          count: 2,
          duration: 30,
        },
      },
    });
  }),

  // 추가 체형 예측 정보 전송
  http.post(`${baseUrl}/users/predict/request-extra`, async ({ request }) => {
    const exercise = await request.json();
    const { exercise_id, count, duration } = exercise as {
      exercise_id: number;
      count: number;
      duration: number;
    };
    console.log(`${exercise_id}-${count}-${duration}`);

    return HttpResponse.json({ message: '운동 정보를 전송했습니다.' }, { status: 200 });
  }),

  // 나의 특정 달의 체형 기록 조회
  http.get(`${baseUrl}/users/body`, ({ request }) => {
    const url = new URL(request.url);
    try {
      const year = url.searchParams.get('year');
      const month = url.searchParams.get('month');
      console.log(year, month);
      return HttpResponse.json({
        status: 200,
        message: 'Success',
        data: {
          bodyHistoryDataList: [
            // {
            //   date: '2024-08-16T15:00:00',
            //   weight: 75.5,
            //   skeletalMuscleMass: 30,
            //   bodyFatRatio: 20,
            // },
            // {
            //   date: '2024-08-23T15:00:00',
            //   weight: 74,
            //   skeletalMuscleMass: 29.5,
            //   bodyFatRatio: 21,
            // },
          ],
        },
      });
    } catch (error) {
      console.error('msw handler에서 에러 발생', error);
      return HttpResponse.error();
    }
  }),

  // 회원 체형 설문 조사
];
