import { create } from 'zustand';

interface UserState {
  userId: number;
  nickname: string;
  coin: number;
  setUserId: (id: number) => void;
  setNickname: (nickname: string) => void;
  setHasCoin: (hasCoin: number) => void;
}

const useUserStore = create<UserState>((set) => ({
  userId: 0, // 초기값 설정
  nickname: '',
  coin: 0,

  // userId를 업데이트하는 함수
  setUserId: (id: number) => set({ userId: id }),

  // nickname을 업데이트하는 함수
  setNickname: (nickname: string) => set({ nickname }),

  // hasCoin을 업데이트하는 함수
  setHasCoin: (hasCoin: number) => set({ coin: hasCoin }),
}));

export default useUserStore;
