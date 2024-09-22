import { http, HttpResponse } from 'msw';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;
interface NicknameRequest {
  nick: string;
}
const mockUser = ['닉네임'];

export const handlers = [
  // get 테스트
  http.get('https://example.com/test', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json({
      user: {
        firstName: 'John',
        lastName: 'Maverick',
      },
    });
  }),

  //닉네임 여부 테스트
  http.get(`${baseUrl}/users/validate-nickname/:nickname`, async ({ params }) => {
    const { nickname } = params;
    const nicknameValue = Array.isArray(nickname) ? nickname[0] : nickname;

    if (mockUser.includes(nicknameValue)) {
      return HttpResponse.json({ message: '이미 존재하는 닉네임입니다.' }, { status: 409 });
    }

    return HttpResponse.json({ message: '사용 가능한 닉네임입니다.' }, { status: 200 });
  }),
];
