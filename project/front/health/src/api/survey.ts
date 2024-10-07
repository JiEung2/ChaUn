// import axios from 'axios';
import exportAxios from './axiosInstance';
const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const nicknameCheck = async (nickname: string) => {
  const response = await exportAxios.get(`${baseUrl}/users/validate-nickname/${nickname}`);
  return response;
};

export const surveySubmit1 = async (nickname: string, birthday: string, send_gender: string) => {
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
  let bodyTypeNumber: number;

  switch (
    bodyTypeString.replace(/\s+/g, '') // 모든 공백 제거
  ) {
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
  pre_mealCount: string,
  pre_dietType: string,
  pre_snackFrequency: string,
  pre_drinkFrequency: string
) => {
  console.log('surveySubmit3', pre_mealCount, pre_dietType, pre_snackFrequency, pre_drinkFrequency);

  let mealCount: number;
  switch (
    pre_mealCount.replace(/\s+/g, '') // 모든 공백 제거
  ) {
    case '1끼':
      mealCount = 1;
      break;
    case '2끼':
      mealCount = 2;
      break;
    case '3끼':
      mealCount = 3;
      break;
    case '4끼이상': // 공백이 없어지므로 '4끼 이상' -> '4끼이상'
      mealCount = 4;
      break;
    default:
      mealCount = 1;
      console.log('pre_mealCount', pre_mealCount);
  }

  let dietType: string;
  switch (
    pre_dietType.replace(/\s+/g, '') // 모든 공백 제거
  ) {
    case '주로채식(채소,과일중심)':
      dietType = 'VEGETARIAN';
      break;
    case '균형잡힌식사(단백질,탄수화물,지방의균형)':
      dietType = 'BALANCED';
      break;
    case '주로고기류와탄수화물':
      dietType = 'HIGH_MEAT_CARB';
      break;
    case '주로패스트푸드,가공식품':
      dietType = 'FAST_FOOD_PROCESSED';
      break;
    default:
      console.log('pre_dietType', pre_dietType);
      dietType = 'VEGETARIAN';
  }

  let snackFrequency: string;
  switch (
    pre_snackFrequency.replace(/\s+/g, '') // 모든 공백 제거
  ) {
    case '전혀섭취하지않음':
      snackFrequency = 'NEVER';
      break;
    case '가끔(1-2회)':
      snackFrequency = 'RARELY';
      break;
    case '자주(3-4회)':
      snackFrequency = 'OFTEN';
      break;
    case '매우자주(5회이상)':
      snackFrequency = 'VERY_OFTEN';
      break;
    default:
      console.log('pre_snackFrequency', pre_snackFrequency);
      snackFrequency = 'NEVER';
  }

  let drinkFrequency: string;
  switch (
    pre_drinkFrequency.replace(/\s+/g, '') // 모든 공백 제거
  ) {
    case '전혀섭취하지않음':
      drinkFrequency = 'NEVER';
      break;
    case '가끔(1-2회)':
      drinkFrequency = 'RARELY';
      break;
    case '자주(3-4회)':
      drinkFrequency = 'OFTEN';
      break;
    case '매우자주(5회이상)':
      drinkFrequency = 'VERY_OFTEN';
      break;
    default:
      console.log('pre_drinkFrequency', pre_drinkFrequency);
      drinkFrequency = 'NEVER';
  }

  console.log('식습관 설문 보낼 데이터', mealCount, dietType, snackFrequency, drinkFrequency);

  const response = await exportAxios.post(`${baseUrl}/users/survey/eating-habits`, {
    mealCount,
    mealType: dietType,
    snackFrequency,
    drinkFrequency,
  });

  return response;
};
