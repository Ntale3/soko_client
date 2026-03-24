import { create } from "zustand";

interface SignUpStore {
  current: number;
  canProceed: boolean;
  role: string;
  setCanProceed: (valid: boolean) => void;
  setRole: (role: string) => void;
  next: () => void;
  back: () => void;
  reset: () => void;
}

export const useSignUpStore = create<SignUpStore>((set, get) => ({
  current: 0,
  canProceed: false,
  role: "",

  setCanProceed: (valid) => set({ canProceed: valid }),
  setRole: (role) => set({ role, canProceed: !!role }),

  next: () => {
    const { current, canProceed } = get();
    if (!canProceed) return;
    set({ current: current + 1, canProceed: false });
  },

  back: () => {
    const { current } = get();
    if (current === 0) return;
    set({ current: current - 1, canProceed: true });
  },

  reset: () => set({ current: 0, canProceed: false, role: "" }),
}));