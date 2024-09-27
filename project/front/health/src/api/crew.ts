import axios from 'axios';

const baseURL = import.meta.env.VITE_APP_BASE_URL;

//추천 크루 리스트
export const getCrewRecommendList = async () => {
  const response = await axios.get(`${baseURL}/users/crew-recommendation`);
  return response;
};

export interface CrewBattleStatusResponse {
  status: number;
  message: string;
  data: {
    battleId: number;
    myTeamName: string;
    myTeamScore: number;
    opponentTeamName: string;
    opponentTeamScore: number;
    exerciseName: string;
    dDay: number;
    battleStatus: string;
  };
}

export const fetchCrewBattleStatus = async (crew_id: number): Promise<CrewBattleStatusResponse> => {
  const response = await axios.get(`${baseURL}/crew/${crew_id}/battle`);
  return response.data;
};
