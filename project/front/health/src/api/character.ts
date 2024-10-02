import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const getPartsList = async () => {
  const response = await axios.get(`${baseUrl}/parts`);
  return response;
};

export const getUserCharacter = async (userId: number) => {
  const response = await axios.get(`${baseUrl}/users/:user_id/character`, { params: { userId } });
  return response;
};

export const getMyCharacter = async () => {
  const response = await axios.get(`${baseUrl}/users/my/character`);
  return response;
};

export const patchPartsOnOff = async (parts_id: number) => {
  const response = await axios.get(`${baseUrl}/users/character/parts/:parts_id`, { params: { parts_id } });
  return response;
};

export const postSnapshot = async (snapshot: string) => {
  const response = await axios.post(`${baseUrl}/character/snapshot`, { snapshot });
  return response;
};
