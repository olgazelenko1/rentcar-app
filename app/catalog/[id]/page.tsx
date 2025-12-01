// export default CarDetails;
import CarDetails from '@/app/components/CarDetails/CarDetails';
import { getCarById } from '@/app/services/api';

export default async function CarPage({ params }: { params: { id: string } }) {
  let car = null;
  let error = null;
  try {
    car = await getCarById(params.id);
  } catch (e) {
    error = e;
    console.error('Error loading car:', e);
  }
  if (error) return <div>Error loading car</div>;
  if (!car) return <div>Car not found</div>;
  return <CarDetails car={car} />;
}
