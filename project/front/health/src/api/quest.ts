import axiosInstance from './axiosInstance';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const getQuest = async () => {
  const response = await axiosInstance.get(`${baseUrl}/quest/get/user`);
  return response.data;
};
