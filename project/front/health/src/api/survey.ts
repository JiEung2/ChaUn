// import axios from 'axios';
import axiosInstance from './axiosInstance';
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const nicknameCheck = async (nickname: string) => {
  const response = await axiosInstance.get(`${baseUrl}/users/validate-nickname/${nickname}`);
  return response;
};

export const surveySubmit1 = async (nickname: string, birthday: string, gender: string) => {
  // console.log(nickname, birthday, gender);
  const newGender = gender === '남성' ? 'MAN' : 'WOMAN';
  const response = await axiosInstance.post(`${baseUrl}/users/survey/information`, {
    nickname,
    birthday,
    newGender,
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
  const response = await axiosInstance.post(`${baseUrl}/users/survey/body`, {
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
  mealCount: number,
  mealType: string,
  snackFrequency: string,
  drinkFrequency: string
) => {
  const response = await axiosInstance.post(`${baseUrl}/users/survey/eating-habits`, {
    mealCount,
    mealType,
    snackFrequency,
    drinkFrequency,
  });

  return response;
};
