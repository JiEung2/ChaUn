import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const getBodyRecord = async (year: number, month: number) => {
  const response = await axios.get(`${baseUrl}/users/body`, {
    params: {
      year,
      month,
    },
  });
  return response;
};
