import { create } from "zustand";

interface TimeStore {
  timeElapsed: number;
  clearTimeElapsed: () => void;
  increaseTimeElapsed: () => void;
}

const useTimeStore = create<TimeStore>((set) => ({
  timeElapsed: 0,
  increaseTimeElapsed: () =>
    set((state) => ({ timeElapsed: state.timeElapsed + 1 })),
  clearTimeElapsed: () => set({ timeElapsed: 0 }),
}));

export default useTimeStore;
