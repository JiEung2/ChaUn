import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BattleDataState {
  myTeamName: string;
  myTeamScore: number;
  opponentTeamName: string;
  opponentTeamScore: number;
  exerciseName: string;
  dDay: string;
  battleStatus: string;

  // 한꺼번에 battleData를 업데이트할 수 있는 메서드
  setBattleData: (battleData: Omit<BattleDataState, 'setBattleData'>) => void;
}

const useBattleDataStore = create<BattleDataState>()(
  persist(
    (set) => ({
      myTeamName: '',
      myTeamScore: 0,
      opponentTeamName: '',
      opponentTeamScore: 0,
      exerciseName: '',
      dDay: '',
      battleStatus: '',

      // battleData 객체를 받아서 한 번에 상태 업데이트
      setBattleData: (battleData) => set(battleData),
    }),
    {
      name: 'battle-data-storage', // localStorage에 저장될 키 이름
      // 필요에 따라 sessionStorage로 변경할 수 있습니다.
      // getStorage: () => sessionStorage,
    }
  )
);

export default useBattleDataStore;
