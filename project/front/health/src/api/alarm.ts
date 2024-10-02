// import axios from 'axios';
import axiosInstance from './axiosInstance';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const getNotificationList = async () => {
  const response = await axiosInstance.get(`${baseUrl}/notification/get`);
  return response;
};

export const patchNotification = async (notificationId: number) => {
  const response = await axiosInstance.patch(`${baseUrl}/notification/read/${notificationId}`, notificationId);
  return response;
};
