import { http, HttpResponse } from 'msw';

const crewList = [
  {
    crewId: 1,
    crewName: '달리자',
    exerciseName: '러닝',
    crewProfileImage: 'crew-profile-image.jpg',
  },
  {
    crewId: 2,
    crewName: '달리자',
    exerciseName: '러닝',
    crewProfileImage: 'crew-profile-image.jpg',
  },
];

const baseUrl = import.meta.env.VITE_APP_BASE_URL;
export const crewHandlers = [
  http.get(`${baseUrl}/users/crew-recommendation`, () => {
    //TODO - 현재 유사도만 주는데, 크루 데이터를 받아올 수 있는지?
    return HttpResponse.json(crewList, { status: 200 });
  }),

  http.get(`${baseUrl}/users/crew-recommendation/:crew_id`, ({ params }) => {
    const { crew_id } = params;
    return HttpResponse.json({
      crewName: '달리자',
      exerciseName: '러닝',
      description: '번개보다 빠른 러너들의 모임',
      crewProfileImage: 'crew-profile-image.jpg',
      bodyType: '미정',
      age: 29,
      rank: 31,
      dailyCaloricIntake: 1400,
      basicScore: 1000,
      activityScore: 1000,
      coin: 300,
    });
  }),
];
