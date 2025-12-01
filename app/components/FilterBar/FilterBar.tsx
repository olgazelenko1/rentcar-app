'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
  return (
    <div className="FilterBarContainer">
      <select
        onChange={(e) => updateQuery({ brand: e.target.value })}
        className="FilterSelect"
      >
        <option value="">Car brand</option>
        {/* Додайте інші опції брендів */}
      </select>
      <select
        onChange={(e) => updateQuery({ price: e.target.value })}
        className="FilterSelect"
      >
        <option value="">Price per hour</option>
        {/* Додайте інші опції цін */}
      </select>
      <input
        type="number"
        placeholder="Mileage from"
        onChange={(e) =>
          updateQuery({ mileageFrom: Number(e.target.value) || undefined })
        }
        className="FilterInput"
      />
      <input
        type="number"
        placeholder="Mileage to"
        onChange={(e) =>
          updateQuery({ mileageTo: Number(e.target.value) || undefined })
        }
        className="FilterInput"
      />
    </div>
  );
}
