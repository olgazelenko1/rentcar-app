'use client';
import React from 'react';
import styles from './CarDetails.module.css';
import type { Car } from '../../types/car';
import Image from 'next/image';

interface CarDetailsProps {
  car: Car;
}

const CarDetails: React.FC<CarDetailsProps> = ({ car }) => {
  const parseCityCountry = (address?: string) => {
    if (!address) return { city: '', country: '' };
    const parts = address
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const country = parts[parts.length - 1] || '';
    const city = parts.length > 1 ? parts[parts.length - 2] : '';
    return { city, country };
  };
  const { city, country } = parseCityCountry(car.address);
  return (
    <div className={styles.cardVertical}>
      <Image
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        className={styles.imageVertical}
        width={400}
        height={250}
      />
      <div className={styles.infoVertical}>
        <h3 className={styles.title}>
          {car.brand} ({car.year})
        </h3>
        <p className={styles.price}>${car.rentalPrice} / day</p>
        {(city || country) && (
          <p className={styles.meta}>
            {city}
            {city && country ? ', ' : ''}
            {country}
          </p>
        )}
        <p className={styles.meta}>Mileage: {car.mileage} km</p>
      </div>
    </div>
  );
};

export default CarDetails;
