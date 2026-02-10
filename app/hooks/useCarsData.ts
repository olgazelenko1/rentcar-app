import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Car } from '../types/car';
import { getCars } from '../services/api';
import { parseFilters } from '../services/filters';

interface UseCarsDataProps {
  initialCars: Car[];
  currentPage: number;
  totalPages: number;
}

export const useCarsData = ({
  initialCars,
  currentPage,
  totalPages,
}: UseCarsDataProps) => {
  const [cars, setCars] = useState<Car[]>(initialCars ?? []);
  const [page, setPage] = useState<number>(currentPage ?? 1);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const limit = 12;

  const filters = useMemo(() => {
    const params = Object.fromEntries(searchParams?.entries() ?? []);
    return parseFilters(params);
  }, [searchParams]);

  useEffect(() => {
    setCars(initialCars ?? []);
    setPage(currentPage ?? 1);
  }, [initialCars, currentPage]);

  const loadCars = async (nextPage: number) => {
    setLoading(true);
    try {
      const resp = await getCars(nextPage, limit, filters);
      return Array.isArray(resp?.cars) ? resp.cars : [];
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (selected: number) => {
    const nextPage = Number(selected) + 1;
    const newCars = await loadCars(nextPage);
    setCars(newCars);
    setPage(nextPage);
  };

  const handleLoadMore = async () => {
    if (loading) return;
    const nextPage = page + 1;
    const newCars = await loadCars(nextPage);
    setCars((prev) => [...prev, ...newCars]);
    setPage(nextPage);
  };

  return {
    cars,
    page,
    loading,
    totalPages,
    handlePageChange,
    handleLoadMore,
  };
};
