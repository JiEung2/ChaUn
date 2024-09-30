import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const getNotificationList = async () => {
  const response = await axios.get(`${baseUrl}/notification/get`);
  return response;
};

export const patchNotification = async (notificationId: number) => {
  const response = await axios.patch(`${baseUrl}/notification/read/${notificationId}`);
  return response;
};
