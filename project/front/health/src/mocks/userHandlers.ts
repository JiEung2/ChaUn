import { http, HttpResponse } from 'msw';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const userHandlers = [
  // 회원 디테일
  http.get(`${baseUrl}/users/:userId`, ({ params }) => {
    const { userId } = params;
    console.log(userId);

    return HttpResponse.json({
      status: 200,
      message: '',
      data: {
        nickname: 'JiEung2',
        coin: 999999,
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
          {
            date: '2024-09-16T15:00:00',
            weight: 75.5,
          },
          {
            date: '2024-08-16T15:00:00',
            weight: 74,
          },
        ],
      },
    });
  }),
];
