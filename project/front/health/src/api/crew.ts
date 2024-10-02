// import axios from 'axios';
import axiosInstance from './axiosInstance';
const baseURL = import.meta.env.VITE_APP_BASE_URL;

//추천 크루 리스트
export const getCrewRecommendList = async () => {
  const response = await axiosInstance.get(`${baseURL}/users/recommend-crew`);
  // console.log('크루 추천 리스트', response);
  return response.data;
};

// 크루 추천 상세 모달
export const getCrewRecommendModal = async (crew_id: number) => {
  const response = await axiosInstance.get(`${baseURL}/users/crew-recommendation/${crew_id}`);
  // console.log(response);
  return response;
};

// 크루 상세보기
export const getCrewDetail = async (crew_id: number) => {
  const response = await axiosInstance.get(`${baseURL}/crew/${crew_id}/detail`);
  console.log('크루 상세', response);
  return response;
};

// 크루 내 랭킹 조회
export const getCrewRanking = async (crew_id: number) => {
  const response = await axiosInstance.get(`${baseURL}/crew/${crew_id}/ranking`);
  return response;
};

// 크루 가입 신청
export const joinToCrew = async (crew_id: number) => {
  const response = await axiosInstance.post(`${baseURL}/crew/${crew_id}/join`);
  return response.data;
};
// 크루 배틀 현황 조회
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
  const response = await axiosInstance.get(`${baseURL}/crew/${crew_id}/battle`);
  return response.data;
};

// 가입된 크루 조회
export const getUserCrewList = async (userId: number) => {
  const response = await axiosInstance.get(`${baseURL}/users/${userId}/crew-list`);
  return response.data;
};
