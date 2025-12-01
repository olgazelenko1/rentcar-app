import { create } from 'zustand';
import type { Car } from '../types/car';

interface CarsState {
  cars: Car[];
  filters: {
    brand?: string;
    price?: string;
    mileageFrom?: number;
    mileageTo?: number;
  };
  favorites: string[]; // масив id обраних авто
  setCars: (cars: Car[]) => void;
  setFilters: (filters: Partial<CarsState['filters']>) => void;
  resetCars: () => void;
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}

export const useCarsStore = create<CarsState>((set) => ({
  cars: [],
  filters: {},
  favorites: [],
  setCars: (cars) => set({ cars }),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetCars: () => set({ cars: [] }),
  addFavorite: (id) =>
    set((state) => ({ favorites: [...state.favorites, id] })),
  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((favId) => favId !== id),
    })),
}));
