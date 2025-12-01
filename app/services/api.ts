import axios from 'axios';
import { Car } from '../types/car';
export const api = axios.create({
  baseURL: 'https://car-rental-api.goit.global',
});

export const getCars = async (
  page = 1,
  limit = 12,
  filters: Record<string, string | number | boolean> = {}
) => {
  const response = await api.get('cars', {
    params: {
      page,
      limit,
      ...filters,
    },
  });
  return response.data;
};

export const getCarById = async (id: string) => {
  const response = await api.get<Car>(`cars/${id}`);
  return response.data;
};
export const getBrands = async () => {
  const response = await api.get<string[]>('cars/brands');
  return response.data;
};
