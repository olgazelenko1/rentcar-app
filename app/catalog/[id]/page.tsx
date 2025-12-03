import { notFound } from 'next/navigation';
import CarDetails from '@/app/components/CarDetails/CarDetails';
import BookingForm from '@/app/components/BookingForm/BookingForm';
import { getCarById } from '@/app/services/api';
import styles from './IdPage.module.css';
import css from '../../Home.module.css';

export const dynamic = 'force-dynamic';

export default async function CarPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const car = await getCarById(id);

  if (!car) {
    notFound();
  }

  return (
    <div className={`${css.container} ${styles.carPage}`}>
      <div className={styles.details}>
        <CarDetails car={car} />
        <div className={styles.fullDetails}>
          <h2 className="{car.info}">Details</h2>
          <ul>
            <li>
              <strong>Brand:</strong> {car.brand}
            </li>
            <li>
              <strong>Model:</strong> {car.model}
            </li>
            <li>
              <strong>Year:</strong> {car.year}
            </li>
            <li>
              <strong>Type:</strong> {car.type}
            </li>
            <li>
              <strong>Engine:</strong> {car.engineSize}
            </li>
            <li>
              <strong>Fuel Consumption:</strong> {car.fuelConsumption} L/100km
            </li>
            <li>
              <strong>Rental Price:</strong> ${car.rentalPrice} / day
            </li>
            <li>
              <strong>Company:</strong> {car.rentalCompany}
            </li>
            <li>
              <strong>Address:</strong> {car.address}
            </li>
            <li>
              <strong>Mileage:</strong> {car.mileage} km
            </li>
            {Array.isArray(car.accessories) && car.accessories.length > 0 && (
              <li>
                <strong>Accessories:</strong> {car.accessories.join(', ')}
              </li>
            )}
            {Array.isArray(car.functionalities) &&
              car.functionalities.length > 0 && (
                <li>
                  <strong>Functionalities:</strong>{' '}
                  {car.functionalities.join(', ')}
                </li>
              )}
            {Array.isArray(car.rentalConditions) &&
              car.rentalConditions.length > 0 && (
                <li>
                  <strong>Rental Conditions:</strong>{' '}
                  {car.rentalConditions.join(', ')}
                </li>
              )}
            {car.description && (
              <li>
                <strong>Description:</strong> {car.description}
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className={styles.formBottom}>
        <BookingForm carId={car.id} />
      </div>
    </div>
  );
}
