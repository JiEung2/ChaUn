import { http, HttpResponse } from 'msw';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

// type BodyHistory = {
//   date: string;
//   weight: number;
//   skeletalMuscleMass: number;
//   bodyFatRatio: number;
// };

// const bodyHistoryDataList: BodyHistory[] = [
//   {
//     date: '2024-09-16T15:00:00',
//     weight: 75.5,
//     skeletalMuscleMass: 30,
//     bodyFatRatio: 20,
//   },
//   {
//     date: '2024-09-23T15:00:00',
//     weight: 74,
//     skeletalMuscleMass: 29.5,
//     bodyFatRatio: 21,
//   },
// ];

export const recordHandlers = [
  // 월 당 나의 체형 조회
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
              date: '2024-09-16T15:00:00',
              weight: 75.5,
              skeletalMuscleMass: 30,
              bodyFatRatio: 20,
            },
            {
              date: '2024-09-23T15:00:00',
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
];
