import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const getTest = async () => {
  const response = await axios.get('https://example.com/test');
  console.log(response);
  return response.data;
};

export const getTest2 = async (nick: string) => {
  const response = await axios.post('https://example.com/nick', { nick: nick });
  console.log(response);
  return response.data;
};

export const nicknameCheck = async (nickname: string) => {
  const response = await axios.get(`${baseUrl}/users/validate-nickname${nickname}`);
  return response.data;
};
