// store/useUserStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, UserState } from "../schema";

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      getCurrentUser: () => get().currentUser,
      updateCurrentUser: (user: User | null) => {
        set({ currentUser: user });
      },
    }),
    {
      name: "user-store",
    }
  )
);
