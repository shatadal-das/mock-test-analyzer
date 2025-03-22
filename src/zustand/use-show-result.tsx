import { create } from 'zustand';

interface ShowResultState {
  showResult: boolean;
  toggleShowResult: () => void;
  setShowResult: (show: boolean) => void;
}

const useShowResult = create<ShowResultState>((set) => ({
  showResult: false,
  toggleShowResult: () => set((state) => ({ showResult: !state.showResult })),
  setShowResult: (show) => set({ showResult: show }),
}));

export default useShowResult;