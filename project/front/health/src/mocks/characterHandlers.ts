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
            partsType: 'HAIR',
            cost: 100,
            partsImage: 'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/bb8eba8d-3f41-463a-8992-b717c75932a4.png',
          },
          {
            id: 2,
            partsType: 'PANTS',
            cost: 200,
            partsImage: 'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/bb8eba8d-3f41-463a-8992-b717c75932a4.png',
          },
          {
            id: 3,
            partsType: 'HAIR',
            cost: 300,
            partsImage: 'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/bb8eba8d-3f41-463a-8992-b717c75932a4.png',
          },
          {
            id: 4,
            partsType: 'LEG',
            cost: 200,
            partsImage: 'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/bb8eba8d-3f41-463a-8992-b717c75932a4.png',
          },
          {
            id: 5,
            partsType: 'ARM',
            cost: 300,
            partsImage: 'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/bb8eba8d-3f41-463a-8992-b717c75932a4.png',
          },
        ],
      },
    });
  }),

  // 회원의 캐릭터 조회
  http.get(`${baseUrl}/users/:user_id/character`, ({ params }) => {
    const { user_id } = params;
    console.log('회원ID : ', user_id);
    if (user_id === 'my') return;
    return HttpResponse.json({
      status: 200,
      message: '',
      data: {
        characterUrl: 'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/GBstanding.glb',
        gender: 'FEMALE',
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
        characterUrl: 'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/B5.glb',
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
        characterUrl: 'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/81190a19-5560-4931-9169-c65e7767cf13.glb',
      },
    });
  }),

  // 캐릭터 스냅샷 조회
  http.get(`${baseUrl}/users/character/snapshot`, () => {
    return HttpResponse.json({
      status: 200,
      message: '',
      data: {
        snapshots: [
          {
            snapshotUrl: 'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/5ba56469-0c4c-4a11-9381-19fa1166dc06.png',
            createdAt: '2024-09-16T15:00:00',
          },
        ],
      },
    });
  }),

  // 캐릭터 스냅샷 저장
  http.post(`${baseUrl}/character/snapshot`, async ({ request }) => {
    const snapshot = await request.formData();
    console.log(`${snapshot}`);
    return HttpResponse.json({
      status: 200,
      message: '',
      data: {
        message: '스냅샷을 저장하였습니다.',
      },
    });
  }),
];
