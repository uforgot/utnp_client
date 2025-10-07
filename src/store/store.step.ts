import { create } from 'zustand';

interface Data {
  step: number;
}

type Actions = {
  setStep: (step: number) => void;
};

const useStoreStep = create<Data & Actions>()((set, get) => ({
  step: 0,
  setStep: (step: number) => {
    set({ step });
  },
}));

export default useStoreStep;
