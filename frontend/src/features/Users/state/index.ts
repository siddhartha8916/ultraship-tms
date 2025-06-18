import { create } from "zustand";

interface CreateEmployeeModalState {
  isOpen: boolean;
  selectedUserId: string | null;
  openModal: (userId: string) => void;
  closeModal: () => void;
  toggleModal: () => void;
}

const useCreateEmployeeModalStore = create<CreateEmployeeModalState>((set) => ({
  isOpen: false,
  selectedUserId: null,
  openModal: (userId: string) => set({ isOpen: true, selectedUserId: userId }),
  closeModal: () => set({ isOpen: false, selectedUserId: null }),
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useCreateEmployeeModalStore;
