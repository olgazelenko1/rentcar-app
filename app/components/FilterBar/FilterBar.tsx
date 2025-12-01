import { useCarsStore } from '../../store/useCarsStore';

type FilterType = {
  brand?: string;
  price?: string;
  mileageFrom?: number;
  mileageTo?: number;
};

const handleFilterChange = (newFilters: FilterType) => {
  useCarsStore.getState().resetCars(); // скидає попередні результати
  useCarsStore.getState().setFilters(newFilters);
  // Далі робите новий запит і оновлюєте cars через setCars
};
export default function FilterBar() {
  return (
    <div className="FilterBarContainer">
      <select
        onChange={(e) => handleFilterChange({ brand: e.target.value })}
        className="FilterSelect"
      >
        <option value="">Car brand</option>
        {/* Додайте інші опції брендів */}
      </select>
      <select
        onChange={(e) => handleFilterChange({ price: e.target.value })}
        className="FilterSelect"
      >
        <option value="">Price per hour</option>
        {/* Додайте інші опції цін */}
      </select>
      <input
        type="number"
        placeholder="Mileage from"
        onChange={(e) =>
          handleFilterChange({ mileageFrom: Number(e.target.value) })
        }
        className="FilterInput"
      />
      <input
        type="number"
        placeholder="Mileage to"
        onChange={(e) =>
          handleFilterChange({ mileageTo: Number(e.target.value) })
        }
        className="FilterInput"
      />
    </div>
  );
}
