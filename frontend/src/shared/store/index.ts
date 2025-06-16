// store/useUserStore.ts
import { create } from "zustand";
import type { User, UserState } from "../types";

// Create the Zustand store
export const useUserStore = create<UserState>((set, get) => ({
  currentUser: null,
  getCurrentUser: () => get().currentUser,
  updateCurrentUser: (user: User) => {
    set({ currentUser: user });
  },
}));
