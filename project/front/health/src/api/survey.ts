import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const nicknameCheck = async (nickname: string) => {
  const response = await axios.get(`${baseUrl}/users/validate-nickname/${nickname}`);
  return response;
};

export const surveySubmit1 = async (nickname: string, birthday: string, gender: string) => {
  const response = await axios.post(`${baseUrl}/users/survey/information`, {
    nickname,
    birthday,
    gender,
  });

  return response;
};

export const surveySubmit2 = async (
  height: number,
  weight: number,
  skeletalMuscleMass: number,
  bodyFatRatio: number,
  isMuscle: boolean,
  bodyType: number
) => {
  const response = await axios.post(`${baseUrl}/users/survey/body`, {
    height,
    weight,
    skeletalMuscleMass,
    bodyFatRatio,
    isMuscle,
    bodyType,
  });

  return response;
};

export const surveySubmit3 = async (
  mealCount: number,
  mealType: string,
  snackFrequency: string,
  drinkFrequency: string
) => {
  const response = await axios.post(`${baseUrl}/users/survey/eating-habits`, {
    mealCount,
    mealType,
    snackFrequency,
    drinkFrequency,
  });

  return response;
};
