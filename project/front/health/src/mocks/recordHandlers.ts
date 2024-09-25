import { http, HttpResponse } from 'msw';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const recordHandlers = [

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
            {
              date: '2024-08-16T15:00:00',
              weight: 75.5,
              skeletalMuscleMass: 30,
              bodyFatRatio: 20,
            },
            {
              date: '2024-08-23T15:00:00',
              weight: 74,
              skeletalMuscleMass: 29.5,
              bodyFatRatio: 21,
            },
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
