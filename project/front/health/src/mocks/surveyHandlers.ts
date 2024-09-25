import { http, HttpResponse } from 'msw';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;
// interface NicknameRequest {
//   nick: string;
// }
const mockUser = ['닉네임'];

// const mockDatabase = {
//   users: [],
// };

export const surveyHandlers = [
  // get 테스트
  // http.get('https://example.com/test', () => {
  //   // ...and respond to them using this JSON response.
  //   return HttpResponse.json({
  //     user: {
  //       firstName: 'John',
  //       lastName: 'Maverick',
  //     },
  //   });
  // }),

  //닉네임 여부 테스트
  http.get(`${baseUrl}/users/validate-nickname/:nickname`, ({ params }) => {
    const { nickname } = params;
    const nicknameValue = Array.isArray(nickname) ? nickname[0] : nickname;

    if (mockUser.includes(nicknameValue)) {
      return HttpResponse.json({ message: '이미 존재하는 닉네임입니다.' }, { status: 409 });
    }

    return HttpResponse.json({ message: '사용 가능한 닉네임입니다.' }, { status: 200 });
  }),

  http.post(`${baseUrl}/users/survey/information`, async ({ request }) => {
    const body = await request.json();
    const { nickname, birthday, gender } = body as { nickname: string; birthday: string; gender: string };
    console.log(`${nickname}-${birthday}-${gender}`);

    // TODO - DB에 저장하는 부분 우선 생략
    // mockDatabase.users.push({ nick, birthday, gender });

    return HttpResponse.json({ message: '회원 정보 설문조사를 완료했습니다.' }, { status: 200 });
  }),

  //설문 - 체형
  http.post(`${baseUrl}/users/survey/body`, async ({ request }) => {
    const body = await request.json();
    const { height, weight, skeletalMuscleMass, bodyFatRatio, isMuscle, bodyType } = body as {
      height: number;
      weight: number;
      skeletalMuscleMass: number;
      bodyFatRatio: number;
      isMuscle: boolean;
      bodyType: number;
    };
    console.log(`${height}-${weight}-${skeletalMuscleMass}-${bodyFatRatio}-${isMuscle}-${bodyType}`);
    // mockDatabase.users.push({ nick, birthday, gender });

    return HttpResponse.json({ message: '회원 정보 설문조사를 완료했습니다.' }, { status: 200 });
  }),

  http.post(`${baseUrl}/users/survey/eating-habits`, async ({ request }) => {
    const body = await request.json();
    const { mealCount, mealType, snackFrequency, drinkFrequency } = body as {
      mealCount: number;
      mealType: string;
      snackFrequency: string;
      drinkFrequency: string;
    };
    console.log(`${mealCount}-${mealType}-${snackFrequency}-${drinkFrequency}`);

    // TODO - DB에 저장하는 부분 우선 생략
    // mockDatabase.users.push({ nick, birthday, gender });

    return HttpResponse.json({ message: '회원 정보 설문조사를 완료했습니다.' }, { status: 200 });
  }),
];
