import { getCars } from '../services/api';
import CatalogClient from './CatalogClient';
import css from '../Home.module.css';
import { parseFilters } from '../services/filters';

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    brand?: string;
    price?: string;
    mileageFrom?: string;
    mileageTo?: string;
  }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page ?? 1);
  const limit = 12;
  const filters = parseFilters(params ?? {});

  const response = await getCars(page, limit, filters);
  const cars = response.cars;
  const totalPages =
    response.totalPages ?? Math.ceil((response.totalCars ?? 0) / limit);

  return (
    <div className={css.container}>
      <CatalogClient
        initialCars={cars}
        currentPage={page}
        totalPages={totalPages}
      />
    </div>
  );
}
