import { create } from "zustand";

interface User {
  accessToken: string;
  email: string;
  image: string;
  name: string;
  role: string;
}
type Store = {
  user: User | null;

  setUser: (user: User) => void;
};

export const useStore = create<Store>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
