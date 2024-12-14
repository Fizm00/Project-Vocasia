import { persist, devtools } from "zustand/middleware";
import { create } from "zustand";

const initialState = {
  id: null,
  name: null,
  email: null,
  token: null,
};

export const useAuthStore = create(
  persist(
    (set) => ({
      ...initialState,
      setData: ({ id, name, email, token }) => {
        set({ id, name, email, token });
      },
    }),
    {
      name: "user-storage", // Nama key di localStorage
      getStorage: () => localStorage,
    }
  )
);
