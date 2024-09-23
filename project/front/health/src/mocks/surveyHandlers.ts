import { http, HttpResponse } from 'msw';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;
// interface NicknameRequest {
//   nick: string;
// }
const mockUser = ['닉네임'];

// const mockDatabase = {
//   users: [],
// };

export const handlers = [
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
    const { nick, birthday, gender } = body as { nick: string; birthday: string; gender: string };

    if (!nick || !birthday || !gender) {
      return HttpResponse.json({ message: '필수 정보가 누락되었습니다.' }, { status: 400 });
    }
    // mockDatabase.users.push({ nick, birthday, gender });

    return HttpResponse.json({ message: '회원 정보 설문조사를 완료했습니다.' }, { status: 200 });
  }),
];
