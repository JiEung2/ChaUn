// import axios from 'axios';
import exportAxios from './axiosInstance';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const getPartsList = async () => {
  const response = await exportAxios.get(`${baseUrl}/parts`);
  return response;
};

export const getUserCharacter = async (userId: number) => {
  const response = await exportAxios.get(`${baseUrl}/users/:user_id/character`, { params: { userId } });
  return response;
};

export const getMyCharacter = async () => {
  const response = await exportAxios.get(`${baseUrl}/users/my/character`);
  return response;
};

export const patchPartsOnOff = async (parts_id: number) => {
  const response = await exportAxios.get(`${baseUrl}/users/character/parts/:parts_id`, { params: { parts_id } });
  return response;
};

export const postSnapshot = async (snapshot: string) => {
  // FormData 객체 생성
  const formData = new FormData();
  formData.append('snapshot', snapshot);

  // POST 요청 보내기
  const response = await exportAxios.post(`${baseUrl}/character/snapshot`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  console.log(response);
  return response;
};
