import { create } from "zustand";
import { persist } from "zustand/middleware"; // Pastikan Anda mengimpor middleware persist
import { getProperty, getPropertyById } from "../api/property";

const usePropertyStore = create(
  persist(
    (set) => (
      {
        property: null, // State untuk menyimpan data properti
        getPropertyById: async (id) => {
          try {
            const property = await getPropertyById(id); // Panggil API untuk mengambil data properti
            set({ property }); // Simpan data properti ke dalam state
          } catch (error) {
            console.error("Error fetching property:", error); // Tangani error
          }
        },
      },
      {
        getProperty: async () => {
          try {
            const property = await getProperty(); // Panggil API untuk mengambil data properti
            set({ property }); // Simpan data properti ke dalam state
          } catch (error) {
            console.error("Error fetching property:", error); // Tangani error
          }
        },
      }
    ),
    {
      name: "user-storage", // Nama untuk localStorage
      getStorage: () => localStorage, // Penyimpanan yang digunakan (bisa disesuaikan)
    }
  )
);

export default usePropertyStore;
