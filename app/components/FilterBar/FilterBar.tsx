'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './FilterBar.module.css';

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
  const brand = params?.get('brand') ?? '';
  const price = params?.get('price') ?? '';
  const mileageFrom = params?.get('mileageFrom') ?? '';
  const mileageTo = params?.get('mileageTo') ?? '';
  return (
    <section className={styles.container} aria-label="Filters">
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="brand" className={styles.label}>
            Brand
          </label>
          <select
            id="brand"
            onChange={(e) => updateQuery({ brand: e.target.value })}
            className={styles.select}
            defaultValue={brand}
          >
            <option value="" disabled>
              Select brand
            </option>
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
            onChange={(e) => updateQuery({ price: e.target.value })}
            className={styles.select}
            defaultValue={price}
          >
            <option value="" disabled>
              Select max price
            </option>
            <option value="10">Up to $10</option>
            <option value="20">Up to $20</option>
            <option value="30">Up to $30</option>
            <option value="40">Up to $40</option>
            <option value="50">Up to $50</option>
            <option value="60">Up to $60</option>
            <option value="70">Up to $70</option>
            <option value="80">Up to $80</option>
            <option value="90">Up to $90</option>
            <option value="100">Up to $100</option>
          </select>
        </div>

        <div className={styles.fieldGroup}>
          <span className={styles.label}>Mileage</span>
          <div className={styles.mileageRow}>
            <input
              id="mileageFrom"
              type="number"
              inputMode="numeric"
              min={0}
              placeholder="from"
              defaultValue={mileageFrom}
              onChange={(e) =>
                updateQuery({
                  mileageFrom: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
              className={styles.input}
              aria-label="Mileage from"
            />
            <input
              id="mileageTo"
              type="number"
              inputMode="numeric"
              min={0}
              placeholder="to"
              defaultValue={mileageTo}
              onChange={(e) =>
                updateQuery({
                  mileageTo: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                })
              }
              className={styles.input}
              aria-label="Mileage to"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
