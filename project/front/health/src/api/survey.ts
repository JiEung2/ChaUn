// import axios from 'axios';
import exportAxios from './axiosInstance';
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const nicknameCheck = async (nickname: string) => {
  const response = await exportAxios.get(`${baseUrl}/users/validate-nickname/${nickname}`);
  return response;
};

export const surveySubmit1 = async (nickname: string, birthday: string, send_gender: string) => {
  // console.log(nickname, birthday, gender);
  const gender = send_gender === '남성' ? 'MAN' : 'WOMAN';
  const response = await exportAxios.post(`${baseUrl}/users/survey/information`, {
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
  bodyTypeString: string
) => {
  // console.log(height, weight, skeletalMuscleMass, bodyFatRatio, isMuscle, bodyType);
  let bodyTypeNumber: number;

  switch (bodyTypeString) {
    case '슬림':
      bodyTypeNumber = 1;
      break;
    case '슬림탄탄':
      bodyTypeNumber = 2;
      break;
    case '약간슬림':
      bodyTypeNumber = 3;
      break;
    case '보통':
      bodyTypeNumber = 4;
      break;
    case '통통':
      bodyTypeNumber = 5;
      break;
    case '많이통통':
      bodyTypeNumber = 6;
      break;
    default:
      throw new Error('Invalid body type');
  }
  console.log(height, weight, skeletalMuscleMass, bodyFatRatio, isMuscle, bodyTypeNumber);
  const response = await exportAxios.post(`${baseUrl}/users/survey/body`, {
    height,
    weight,
    skeletalMuscleMass,
    bodyFatRatio,
    isMuscle,
    bodyType: bodyTypeNumber,
  });

  return response;
};

export const surveySubmit3 = async (
  str_ealCount: string,
  mealType: string,
  snackFrequency: string,
  drinkFrequency: string
) => {
  // console.log('surveySubmit3', str_ealCount, mealType, snackFrequency, drinkFrequency);

  let mealCount: number;

  switch (str_ealCount) {
    case '1끼':
      mealCount = 1;
      break;
    case '2끼':
      mealCount = 2;
      break;
    case '3끼':
      mealCount = 3;
      break;
    case '4끼 이상':
      mealCount = 4;
      break;
    default:
      throw new Error('Invalid meal count');
  }
  console.log('식습관 설문 보낼 데이터', mealCount, mealType, snackFrequency, drinkFrequency);
  const response = await exportAxios.post(`${baseUrl}/users/survey/eating-habits`, {
    mealCount,
    mealType,
    snackFrequency,
    drinkFrequency,
  });

  return response;
};
