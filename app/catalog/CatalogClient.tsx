'use client';

import CarDetails from '../components/CarDetails/CarDetails';
import Link from 'next/link';
import Pagination from '../components/Pagination/Pagination';
import type { Car } from '../types/car';
import styles from './CatalogClient.module.css';
import FilterBar from '../components/FilterBar/FilterBar';
import { useCarsData } from '../hooks/useCarsData';
import { useFavorites } from '../hooks/useFavorites';

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
  const { cars, page, loading, handlePageChange, handleLoadMore } = useCarsData(
    {
      initialCars,
      currentPage,
      totalPages,
    }
  );
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className={styles.container}>
      <FilterBar />

      <div>
        <h2>Catalog</h2>

        <div className={styles.grid}>
          {Array.isArray(cars) &&
            cars.map((car: Car) => {
              const isFav = isFavorite(car.id);
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

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          alignItems: 'center',
        }}
      >
        <Pagination pageCount={totalPages} onPageChange={handlePageChange} />
        {page < totalPages && (
          <button
            className={styles.loadMoreBtn}
            onClick={handleLoadMore}
            disabled={loading}
            aria-disabled={loading}
          >
            {loading ? 'Loading…' : 'Load More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default CatalogClient;
