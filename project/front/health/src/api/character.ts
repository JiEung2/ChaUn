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
  const response = await exportAxios.patch(`${baseUrl}/users/character/parts/${parts_id}`, { parts_id });
  return response;
};

export const postSnapshot = async (snapshot: string) => {
  try {
    // FormData 객체 생성
    const formData = new FormData();

    // FormData에 'snapshot'이라는 이름으로 base64 이미지 데이터 추가
    formData.append('snapshot', snapshot);

    // Axios 요청
    const response = await exportAxios.post(`${baseUrl}/character/snapshot/save`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
    console.error('postSnapshot Error:', error);
  }
};

export const getSnapshotList = async () => {
  const response = await exportAxios.get(`${baseUrl}/users/character/snapshot`);
  return response;
};
