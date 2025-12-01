'use client';
import React from 'react';
import styles from './CarDetails.module.css';
import type { Car } from '../../types/car';
import Image from 'next/image';

interface CarDetailsProps {
  car: Car;
}

const CarDetails: React.FC<CarDetailsProps> = ({ car }) => {
  return (
    <div className={styles.card}>
      <Image
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        className={styles.image}
        width={400}
        height={250}
      />
      <div className={styles.info}>
        <h2 className={styles.title}>
          {car.brand} {car.model} ({car.year})
        </h2>
        <p className={styles.price}>Price: ${car.rentalPrice} / day</p>
        <p className={styles.description}>{car.description}</p>
        <ul className={styles.detailsList}>
          <li>Type: {car.type}</li>
          <li>Engine: {car.engineSize}</li>
          <li>Fuel: {car.fuelConsumption} L/100km</li>
          <li>Mileage: {car.mileage} km</li>
          <li>Company: {car.rentalCompany}</li>
        </ul>
      </div>
    </div>
  );
};

export default CarDetails;
