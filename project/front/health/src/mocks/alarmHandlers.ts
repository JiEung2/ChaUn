import { http, HttpResponse } from 'msw';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const alarmHandlers = [
  // 읽지 않은 알림 목록 조회
  http.get(`${baseUrl}/notification/get`, () => {
    return HttpResponse.json({
      status: 200,
      message: 'Success',
      data: [
        {
          notificationId: 5,
          notificationType: 'BATTLE',
          additionalData: {
            battleDetail: {
              myTeamName: '달리자크루',
              myTeamScore: 400,
              opponentTeamName: '크크크루',
              opponentTeamScore: 500,
              exerciseName: '러닝',
              battleStatus: 'FINISHED',
            },
            coinDetail: {
              crewCoin: 200,
              myCoin: 50,
            },
          },
          content: '크루 배틀이 종료되었어요! 결과를 확인하세요!',
          createdAt: '2024-09-27T14:28:26.1466152',
        },
        {
          notificationId: 4,
          notificationType: 'BATTLE',
          additionalData: {
            battleDetail: {
              battleId: 1,
              myTeamName: '달리자크루',
              myTeamScore: 400,
              opponentTeamName: '크크크루',
              opponentTeamScore: 500,
              exerciseName: '러닝',
              battleStatus: 'STARTED',
            },
            coinDetail: null,
          },
          content: '크루 배틀이 시작되었어요! 현황을 확인하세요!',
          createdAt: '2024-09-27T14:28:26.008885',
        },
        {
          notificationId: 1,
          notificationType: 'SURVEY',
          additionalData: {
            lastSurveyedDate: null,
          },
          content: '체형 입력을 통해 정확도 높은 예측을 받아보세요!',
          createdAt: '2024-09-27T14:14:13.869796',
        },
        {
          notificationId: 2,
          notificationType: 'QUEST',
          additionalData: {
            lastSurveyedDate: null,
          },
          content: '퀘스트를 달성했어요!',
          createdAt: '2024-09-27T14:14:13.869796',
        },
      ],
    });
  }),
];
