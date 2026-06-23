import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthStore = {
  user: User | null;
  setUser: (user: User | null) => void;
  loadUser: () => void;
  logout: () => void;
};

const useAuthStore = create<AuthStore>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  loadUser: () => {
    const stored = localStorage.getItem("user");
    if (stored) set({ user: JSON.parse(stored) });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null });
  },
}));

export default useAuthStore;