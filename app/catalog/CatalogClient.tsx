'use client';

import CarDetails from '../components/CarDetails/CarDetails';
import Link from 'next/link';
import Pagination from '../components/Pagination/Pagination';
import type { Car } from '../types/car';
import styles from './CatalogClient.module.css';
import css from './CatalogClient.module.css';
import { useCarsStore } from '../store/useCarsStore';
import FilterBar from '../components/FilterBar/FilterBar';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getCars } from '../services/api';

interface Props {
  initialCars: Car[];
  currentPage: number;
  totalPages: number;
}

const CatalogClient: React.FC<Props> = ({
  initialCars,
  currentPage,
  totalPages,
}) => {
  const [cars, setCars] = useState<Car[]>(initialCars ?? []);
  const [page, setPage] = useState<number>(currentPage ?? 1);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const limit = 12;

  useEffect(() => {
    setCars(initialCars ?? []);
    setPage(currentPage ?? 1);
  }, [initialCars, currentPage]);

  const filters = useMemo(() => {
    const params = Object.fromEntries(searchParams?.entries() ?? []);
    const f: Record<string, string | number | boolean> = {};
    if (params.brand) f.brand = params.brand;
    if (params.price) f.price = params.price;
    if (params.mileageFrom) f.mileageFrom = Number(params.mileageFrom);
    if (params.mileageTo) f.mileageTo = Number(params.mileageTo);
    return f;
  }, [searchParams]);
  const favorites = useCarsStore((s) => s.favorites);
  const addFavorite = useCarsStore((s) => s.addFavorite);
  const removeFavorite = useCarsStore((s) => s.removeFavorite);
  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) removeFavorite(id);
    else addFavorite(id);
  };

  return (
    <div className={css.container}>
      <FilterBar />

      <div>
        <h2>Catalog</h2>

        <div className={styles.grid}>
          {Array.isArray(cars) &&
            cars.map((car: Car) => {
              const isFav = favorites.includes(car.id);
              return (
                <div key={car.id} className={styles.item}>
                  <button
                    aria-label={
                      isFav ? 'Remove from favorites' : 'Add to favorites'
                    }
                    className={
                      isFav
                        ? `${styles.favoriteOverlayBtn} ${styles.fav}`
                        : styles.favoriteOverlayBtn
                    }
                    onClick={() => toggleFavorite(car.id)}
                    type="button"
                  >
                    {isFav ? '💙' : '🤍'}
                  </button>
                  <CarDetails car={car} />
                  <Link
                    href={`/catalog/${car.id}`}
                    className={styles.readMoreBtn}
                    aria-label={`Read more about ${car.brand} ${car.model}`}
                  >
                    Read more
                  </Link>
                </div>
              );
            })}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Pagination currentPage={page} totalPages={totalPages} />
        <button
          className={styles.loadMoreBtn}
          onClick={async () => {
            if (loading) return;
            if (page >= totalPages) return;
            setLoading(true);
            try {
              const nextPage = page + 1;
              const resp = await getCars(nextPage, limit, filters);
              const nextCars = Array.isArray(resp?.cars) ? resp.cars : [];
              setCars((prev) => [...prev, ...nextCars]);
              setPage(nextPage);
            } finally {
              setLoading(false);
            }
          }}
          disabled={loading || page >= totalPages}
          aria-disabled={loading || page >= totalPages}
        >
          {loading
            ? 'Loading…'
            : page < totalPages
              ? 'Load More'
              : 'No more cars'}
        </button>
      </div>
    </div>
  );
};

export default CatalogClient;
