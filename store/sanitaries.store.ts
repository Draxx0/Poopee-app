import { create } from 'zustand';
import { Sanitaries } from '~/types';
import SANITARIES from '~/data/sanitaries.json';

interface SanitariesState {
  sanitaries: Sanitaries[];
  setSanitaries: (sanitaries: Sanitaries[] | null) => void;
}

export const useSanitariesStore = create<SanitariesState>()((set) => ({
  sanitaries: SANITARIES as Sanitaries[],
  setSanitaries: (sanitaries: Sanitaries[] | null) =>
    set(() => ({ sanitaries: sanitaries || (SANITARIES as Sanitaries[]) })),
}));
