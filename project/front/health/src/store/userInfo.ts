import { create } from 'zustand';

interface UserState {
  userId: number;
  nickname: string;
  coin: number;
  characterImageUrl: string;
  characterFileUrl: string;
  setUserId: (id: number) => void;
  setNickname: (nickname: string) => void;
  setHasCoin: (hasCoin: number) => void;
  setCharacterImageUrl: (characterImageUrl: string) => void;
  setCharacterFileUrl: (characterFileUrl: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  userId: 0, // 초기값 설정
  nickname: '',
  coin: 0,
  characterImageUrl: '',
  characterFileUrl: '',

  // userId를 업데이트하는 함수
  setUserId: (id: number) => set({ userId: id }),

  // nickname을 업데이트하는 함수
  setNickname: (nickname: string) => set({ nickname }),

  // hasCoin을 업데이트하는 함수
  setHasCoin: (hasCoin: number) => set({ coin: hasCoin }),

  // characterImageUrl을 업데이트하는 함수
  setCharacterImageUrl: (characterImageUrl: string) => set({ characterImageUrl }),

  // characterFileUrl을 업데이트하는 함수

  setCharacterFileUrl: (characterFileUrl: string) => set({ characterFileUrl }),
}));

export default useUserStore;
