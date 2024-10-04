// Access Token 설정
export const setAccessToken = (token: string) => {
  localStorage.setItem('accessToken', token);
};

// Access Token 가져오기
export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

// Access Token 삭제
export const removeAccessToken = () => {
  localStorage.removeItem('accessToken');
};
