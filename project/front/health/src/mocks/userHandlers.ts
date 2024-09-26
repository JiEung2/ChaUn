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
];
