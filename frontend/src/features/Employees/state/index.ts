import { create } from "zustand";
import type { Employee } from "../models";

interface UpdateEmployeeModalState {
  isOpen: boolean;
  selectedEmployee: Employee | null;
  openModal: (employee: Employee) => void;
  closeModal: () => void;
  toggleModal: () => void;
}

const useUpdateEmployeeModalStore = create<UpdateEmployeeModalState>((set) => ({
  isOpen: false,
  selectedEmployee: null,
  openModal: (employee: Employee) => set({ isOpen: true, selectedEmployee: employee }),
  closeModal: () => set({ isOpen: false, selectedEmployee: null }),
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useUpdateEmployeeModalStore;
