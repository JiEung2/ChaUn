import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  userId: number;
  nickname: string;
  coin: number;
  gender: 'MAN' | 'WOMAN';
  characterImageUrl: string;
  characterFileUrl: string; // 단일 URL 유지
  cachedFiles: string[]; // 캐싱될 파일들의 배열
  setUserId: (id: number) => void;
  setNickname: (nickname: string) => void;
  setHasCoin: (hasCoin: number) => void;
  setGender: (gender: 'MAN' | 'WOMAN') => void;
  setCharacterImageUrl: (characterImageUrl: string) => void;
  setCharacterFileUrl: (characterFileUrl: string) => void; // 단일 캐릭터 파일 URL 설정
  addCachedFile: (fileUrl: string) => void; // 캐싱될 파일 추가
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      userId: 0,
      nickname: '',
      coin: 0,
      gender: 'MAN',
      characterImageUrl: '',
      characterFileUrl: '', // 단일 캐릭터 파일 URL
      cachedFiles: [], // 캐싱된 파일 경로 저장

      setUserId: (id: number) => set({ userId: id }),
      setNickname: (nickname: string) => set({ nickname }),
      setHasCoin: (hasCoin: number) => set({ coin: hasCoin }),
      setGender: (gender: 'MAN' | 'WOMAN') => set({ gender }),
      setCharacterImageUrl: (characterImageUrl: string) => set({ characterImageUrl }),

      setCharacterFileUrl: (fileUrl: string) => {
        set({ characterFileUrl: fileUrl });

        // 캐싱할 파일 추가
        const currentCachedFiles = get().cachedFiles;
        if (!currentCachedFiles.includes(fileUrl)) {
          set({ cachedFiles: [...currentCachedFiles, fileUrl] });
        }
      },
      addCachedFile: (fileUrl: string) => {
        const currentCachedFiles = get().cachedFiles;
        if (!currentCachedFiles.includes(fileUrl)) {
          set({ cachedFiles: [...currentCachedFiles, fileUrl] });
        }
      },
    }),
    {
      name: 'user-storage', // 저장될 스토리지의 키 이름
    }
  )
);

export default useUserStore;
