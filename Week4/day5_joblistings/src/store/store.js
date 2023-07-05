import { create } from "zustand";
import data from "../data.json";

const useStore = create((set) => ({
  data,
  languageFilters: [],
  addLanguages: (language) =>
    set((state) => ({
      languageFilters: [...state.languageFilters, language],
    })),
  removeLanguages: (language) =>
    set((state) => ({
      languageFilters: state.languageFilters?.filter((lang) => lang != language),
    })),
  clearLanguages: () =>
    set(() => ({
      languageFilters: [],
    })),
}));

export default useStore;
