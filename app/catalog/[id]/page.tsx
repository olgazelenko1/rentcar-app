import { notFound } from 'next/navigation';
import CarDetails from '@/app/components/CarDetails/CarDetails';
import BookingForm from '@/app/components/BookingForm/BookingForm';
import { getCarById } from '@/app/services/api';
import styles from './IdPage.module.css';

export const dynamic = 'force-dynamic'; // щоб нові машини відображались одразу

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
    <div className={styles.carPage}>
      <div className={styles.details}>
        <CarDetails car={car} variant="horizontal" />
      </div>

      <div className={styles.formBottom}>
        <BookingForm carId={car.id} />
      </div>
    </div>
  );
}
