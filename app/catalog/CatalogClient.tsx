'use client';

import CarDetails from '../components/CarDetails/CarDetails';
import Link from 'next/link';
import { useCarsStore } from '../store/useCarsStore';
import type { Car } from '../types/car';

const CatalogClient = () => {
  const cars = useCarsStore((state) => state.cars);

  return (
    <div>
      {/* Панель фільтрів */}
      <div>
        <select>
          <option>Car brand</option>
        </select>
        <select>
          <option>Price per hour</option>
        </select>
        <input type="number" placeholder="Mileage from" />
        <input type="number" placeholder="Mileage to" />
        <button type="button" className="SearchButton">
          Search
        </button>
      </div>

      <div>
        <h2>Catalog</h2>

        <div>
          {Array.isArray(cars) &&
            cars.map((car: Car) => (
              <div key={car.id} style={{ marginBottom: 32 }}>
                <Link href={`/catalog/${car.id}`}>
                  <CarDetails car={car} />
                </Link>
              </div>
            ))}
        </div>
      </div>

      {/* Кнопка Load More */}
      <button className="LoadMoreButton">Load More</button>
    </div>
  );
};

export default CatalogClient;
