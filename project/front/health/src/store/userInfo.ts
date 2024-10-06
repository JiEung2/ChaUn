import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: 0,
      nickname: '',
      coin: 0,
      characterImageUrl: '',
      characterFileUrl: '',

      setUserId: (id: number) => set({ userId: id }),
      setNickname: (nickname: string) => set({ nickname }),
      setHasCoin: (hasCoin: number) => set({ coin: hasCoin }),
      setCharacterImageUrl: (characterImageUrl: string) => set({ characterImageUrl }),
      setCharacterFileUrl: (characterFileUrl: string) => set({ characterFileUrl }),
    }),
    {
      name: 'user-storage', // 저장될 스토리지의 키 이름
      // 필요한 경우 storage를 커스터마이즈할 수 있습니다. (예: sessionStorage)
      // getStorage: () => sessionStorage,
    }
  )
);

export default useUserStore;
