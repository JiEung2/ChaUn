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

export const postSnapshot = async (formData: FormData) => {
  try {
    // Axios 요청으로 FormData 전송
    const response = await exportAxios.post(`${baseUrl}/character/snapshot/save`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Snapshot successfully uploaded:', response);
    return response;
  } catch (error) {
    console.error('postSnapshot Error:', error);
    throw error;
  }
};

export const getSnapshotList = async () => {
  const response = await exportAxios.get(`${baseUrl}/users/character/snapshot`);
  return response;
};
