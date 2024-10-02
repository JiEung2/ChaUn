import { http, HttpResponse } from 'msw';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const characterHandlers = [
  // 파츠 조회
  http.get(`${baseUrl}/parts`, () => {
    return HttpResponse.json({
      status: 200,
      message: '',
      data: {
        partsList: [
          {
            id: 1,
            partsType: 'hair',
            cost: 100,
            partsImage: 'https://example.com/images/helmet.png',
          },
          {
            id: 2,
            partsType: 'hair',
            cost: 200,
            partsImage: 'https://example.com/images/armor.png',
          },
        ],
      },
    });
  }),

  // 회원의 캐릭터 조회
  http.get(`${baseUrl}/users/:user_id/character`, ({ params }) => {
    const { user_id } = params;
    console.log('회원ID : ', user_id);
    return HttpResponse.json({
      status: 200,
      message: '',
      data: {
        characterUrl: 'character-url.jpg',
        gender: 'MAN',
        bodyTypeId: 7,
      },
    });
  }),

  // 본인의 캐릭터 조회
  http.get(`${baseUrl}/users/my/character`, () => {
    return HttpResponse.json({
      status: 200,
      message: '',
      data: {
        characterUrl: 'character-url.jpg',
        gender: 'MAN',
        bodyTypeId: 7,
      },
    });
  }),
  // 나의 캐릭터에 파츠 장착/해제
  http.patch(`${baseUrl}/users/character/parts/:parts_id`, ({ params }) => {
    const { parts_id } = params;
    console.log('파츠 장착 및 해제 : ', parts_id);
    return HttpResponse.json({
      status: 200,
      message: '',
      data: {
        characterUrl: 'character-url.jpg',
      },
    });
  }),
];
