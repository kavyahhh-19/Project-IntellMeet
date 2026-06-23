import { create } from "zustand";

type Notification = {
  id: string;
  message: string;
  type: "info" | "success" | "warning";
  time: number;
};

type Store = {
  notifications: Notification[];
  addNotification: (n: Notification) => void;
  clear: () => void;
};

const useNotificationStore = create<Store>((set) => ({
  notifications: [],

  addNotification: (n) =>
    set((state) => ({
      notifications: [n, ...state.notifications],
    })),

  clear: () => set({ notifications: [] }),
}));

export default useNotificationStore;