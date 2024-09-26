import axios from 'axios';

const baseURL = import.meta.env.VITE_APP_BASE_URL;

//추천 크루 리스트
export const getCrewRecommendList = async () => {
  const response = await axios.get(`${baseURL}/users/crew-recommendation`);
  return response;
};
// 크루 추천 상세 모달
export const getCrewRecommendModal = async (crewId: number) => {
  const response = await axios.get(`${baseURL}/users/crew-recommendation/${crewId}`);
  console.log(response);
  return response;
};
