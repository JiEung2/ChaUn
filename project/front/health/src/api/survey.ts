import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const nicknameCheck = async (nickname: string) => {
  const response = await axios.get(`${baseUrl}/users/validate-nickname/${nickname}`);
  return response;
};

export const surveySubmit1 = async (nickname: string, birthday: string, gender: string) => {
  try {
    const response = await axios.post(`${baseUrl}/users/survey/information`, {
      nickname,
      birthday,
      gender,
    });

    return response;
  } catch (e) {
    console.error('서버로 데이터 전송 중 에러 발생:', e);
  }
};
