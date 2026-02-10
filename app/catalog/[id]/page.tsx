import { notFound } from 'next/navigation';

import BookingForm from '@/app/components/BookingForm/BookingForm';
import { getCarById } from '@/app/services/api';
import styles from './IdPage.module.css';
import Image from 'next/image';
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
      <h1 className={styles.mainTitle}>
        {car.brand} {car.model} ({car.year})
      </h1>

      <div className={styles.priceTag}>
        <span className={styles.price}>${car.rentalPrice}</span>
        <span className={styles.perDay}> / day</span>
      </div>

      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <div className={styles.imageWrapper}>
            <Image
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              width={640}
              height={420}
              className={styles.carImage}
              priority
            />
          </div>

          <section className={styles.detailsSection}>
            <h2 className={styles.sectionTitle}>Vehicle Details</h2>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Brand</span>
                <span className={styles.detailValue}>{car.brand}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Model</span>
                <span className={styles.detailValue}>{car.model}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Year</span>
                <span className={styles.detailValue}>{car.year}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Type</span>
                <span className={styles.detailValue}>{car.type}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Engine</span>
                <span className={styles.detailValue}>{car.engineSize}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Fuel Consumption</span>
                <span className={styles.detailValue}>
                  {car.fuelConsumption} L/100km
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Mileage</span>
                <span className={styles.detailValue}>{car.mileage} km</span>
              </div>
            </div>
          </section>

          {car.description && (
            <section className={styles.descriptionSection}>
              <h2 className={styles.sectionTitle}>Description</h2>
              <p className={styles.description}>{car.description}</p>
            </section>
          )}

          {Array.isArray(car.accessories) && car.accessories.length > 0 && (
            <section className={styles.featuresSection}>
              <h2 className={styles.sectionTitle}>Accessories</h2>
              <ul className={styles.featuresList}>
                {car.accessories.map((accessory, index) => (
                  <li key={index} className={styles.featureItem}>
                    {accessory}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {Array.isArray(car.functionalities) &&
            car.functionalities.length > 0 && (
              <section className={styles.featuresSection}>
                <h2 className={styles.sectionTitle}>Functionalities</h2>
                <ul className={styles.featuresList}>
                  {car.functionalities.map((functionality, index) => (
                    <li key={index} className={styles.featureItem}>
                      {functionality}
                    </li>
                  ))}
                </ul>
              </section>
            )}

          {Array.isArray(car.rentalConditions) &&
            car.rentalConditions.length > 0 && (
              <section className={styles.conditionsSection}>
                <h2 className={styles.sectionTitle}>Rental Conditions</h2>
                <ul className={styles.conditionsList}>
                  {car.rentalConditions.map((condition, index) => (
                    <li key={index} className={styles.conditionItem}>
                      {condition}
                    </li>
                  ))}
                </ul>
              </section>
            )}

          <section className={styles.companySection}>
            <h2 className={styles.sectionTitle}>Rental Company</h2>
            <div className={styles.companyInfo}>
              <p className={styles.companyName}>{car.rentalCompany}</p>
              <p className={styles.companyAddress}>{car.address}</p>
            </div>
          </section>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.bookingFormWrapper}>
            <BookingForm carId={car.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
