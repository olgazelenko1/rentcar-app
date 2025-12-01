'use client';

import React from 'react';
import Image from 'next/image';
import type { Car } from '@/app/types/car';
import styles from './CarDetails.module.css';

interface CarDetailsProps {
  car: Car;
}

const CarDetails: React.FC<CarDetailsProps> = ({ car }) => {
  return (
    <div className={styles.card}>
      <Image
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        width={400}
        height={250}
      />
      <h2>
        {car.brand} {car.model} ({car.year})
      </h2>
      <p>{car.description}</p>
      <p>Price: ${Number(car.rentalPrice)} / day</p>
      <p>Mileage: {car.mileage.toLocaleString()} km</p>
      <ul>
        <li>Type: {car.type}</li>
        <li>Engine: {car.engineSize}</li>
        <li>Fuel: {car.fuelConsumption} L/100km</li>
        <li>Company: {car.rentalCompany}</li>
      </ul>
      <ul>
        <li>Accessories: {car.accessories.join(', ')}</li>
        <li>Functionalities: {car.functionalities.join(', ')}</li>
      </ul>
    </div>
  );
};

export default CarDetails;
