'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './FilterBar.module.css';
import React from 'react';

const useUpdateQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (updates: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams(
      searchParams ? Array.from(searchParams.entries()) : []
    );
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === '') params.delete(key);
      else params.set(key, String(value));
    });
    // Reset to first page on filter change
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };
};
export default function FilterBar() {
  const updateQuery = useUpdateQuery();
  const params = useSearchParams();
  const [brand, setBrand] = React.useState<string>(params?.get('brand') ?? '');
  const [price, setPrice] = React.useState<string>(params?.get('price') ?? '');
  const [mileageFrom, setMileageFrom] = React.useState<string>(
    params?.get('mileageFrom') ?? ''
  );
  const [mileageTo, setMileageTo] = React.useState<string>(
    params?.get('mileageTo') ?? ''
  );
  return (
    <section className={styles.container} aria-label="Filters">
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="brand" className={styles.label}>
            Brand
          </label>
          <select
            id="brand"
            onChange={(e) => setBrand(e.target.value)}
            className={styles.select}
            value={brand}
          >
            <option value="">All brands</option>
            <option value="Buick">Buick</option>
            <option value="Audi">Audi</option>
            <option value="BMW">BMW</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Tesla">Tesla</option>
            <option value="Toyota">Toyota</option>
            <option value="Ford">Ford</option>
            <option value="Honda">Honda</option>
            <option value="Hyundai">Hyundai</option>
            <option value="Kia">Kia</option>
            <option value="Volkswagen">Volkswagen</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="price" className={styles.label}>
            Price/hour
          </label>
          <select
            id="price"
            onChange={(e) => setPrice(e.target.value)}
            className={styles.select}
            value={price}
          >
            <option value="" disabled>
              Select max price
            </option>
            <option value="30">Up to $30</option>
            <option value="40">Up to $40</option>
            <option value="50">Up to $50</option>
            <option value="60">Up to $60</option>
            <option value="70">Up to $70</option>
            <option value="80">Up to $80</option>
          </select>
        </div>

        <div className={styles.fieldGroup}>
          <span className={styles.label}>Mileage</span>
          <div className={styles.mileageRow}>
            <input
              id="mileageFrom"
              type="number"
              inputMode="numeric"
              min={3000}
              placeholder="from"
              value={mileageFrom}
              onChange={(e) => setMileageFrom(e.target.value)}
              className={styles.input}
              aria-label="Mileage from"
            />
            <input
              id="mileageTo"
              type="number"
              inputMode="numeric"
              min={5000}
              placeholder="to"
              value={mileageTo}
              onChange={(e) => setMileageTo(e.target.value)}
              className={styles.input}
              aria-label="Mileage to"
            />
          </div>
        </div>

        <div className={styles.actionsRow}>
          <button
            type="button"
            className={styles.searchBtn}
            onClick={() =>
              updateQuery({
                brand: brand || undefined,
                price: price || undefined,
                mileageFrom: mileageFrom ? Number(mileageFrom) : undefined,
                mileageTo: mileageTo ? Number(mileageTo) : undefined,
              })
            }
            aria-label="Apply filters"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
