import { create } from 'zustand';

interface BattleData {
  crewId: number; // Even though it's manually added, it must be part of the interface
  battleId: number;
  myTeamName: string;
  myTeamScore: number;
  opponentTeamName: string;
  opponentTeamScore: number;
  exerciseName: string;
  dDay: number;
  battleStatus: string; // Status like "STARTED", "ENDED", etc.
}

interface BattleDataState {
  battles: BattleData[]; // Store all battles
  setBattleData: (battleData: BattleData) => void; // Add or update a specific battle
  setMultipleBattles: (battleDataArray: BattleData[]) => void; // Add multiple battles at once
}

const useBattleDataStore = create<BattleDataState>((set) => ({
  battles: [], // Initialize with an empty array

  // Set or update a specific battle by battleId
  setBattleData: (battleData) =>
    set((state) => {
      const existingBattleIndex = state.battles.findIndex((battle) => battle.battleId === battleData.battleId);

      if (existingBattleIndex > -1) {
        // If the battle exists, update it
        const updatedBattles = [...state.battles];
        updatedBattles[existingBattleIndex] = battleData;
        return { battles: updatedBattles };
      } else {
        // If it's a new battle, add it
        return { battles: [...state.battles, battleData] };
      }
    }),

  // Set multiple battles at once (replace the entire list of battles)
  setMultipleBattles: (battleDataArray) =>
    set(() => ({
      battles: [...battleDataArray],
    })),
}));

export default useBattleDataStore;
