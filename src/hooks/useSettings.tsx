import { create } from "zustand";

type SettingsProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useSettings = create<SettingsProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
