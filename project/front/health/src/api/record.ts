import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const getBodyRecord = async (year: number, month: number) => {
  const response = await axios.get(`${baseUrl}/users/body`, {
    params: {
      year: year,
      month: month,
    },
  });
  console.log(response);
  return response;
};

// type BodyHistory = {
//   date: string;
//   weight: number;
//   skeletalMuscleMass: number;
//   bodyFatRatio: number;
// };

// type BodyHistoryResponse = {
//   status: number;
//   message: string;
//   data: {
//     bodyHistoryDataList: BodyHistory[];
//   };
// };

// export const getBodyRecord = async (year: number, month: number): Promise<BodyHistoryResponse> => {
//   try {
//     const response = await axios.get<BodyHistoryResponse>(`${baseUrl}/users/body`, {
//       params: {
//         year: year,
//         month: month,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('API 호출 중 에러 발생:', error);
//     throw new Error('Failed to fetch body record');
//   }
// };
