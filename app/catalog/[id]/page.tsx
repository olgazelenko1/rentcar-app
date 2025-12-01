import { notFound } from 'next/navigation';
import type { AxiosError } from 'axios';
import CarDetails from '@/app/components/CarDetails/CarDetails';
import BookingForm from '@/app/components/BookingForm/BookingForm';
import { getCarById } from '@/app/services/api';
import type { Car } from '@/app/types/car';

export const revalidate = 0;

export default async function CarPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const { id } = await params;
  if (!id) {
    notFound();
  }

  let apiCar;
  try {
    apiCar = await getCarById(id);
    if (!apiCar || !apiCar.id) {
      notFound();
    }
  } catch (e) {
    const err = e as AxiosError;
    if (err?.response?.status === 404) {
      notFound();
    }
    console.error('Car details fetch error:', err);
    throw err;
  }
  const car = normalizeCar(apiCar);
  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <CarDetails car={car} />
      <BookingForm carId={car.id} />
    </div>
  );
}

function normalizeCar(input: unknown): Car {
  const obj = (
    typeof input === 'object' && input !== null ? input : {}
  ) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === 'string' ? v : '');
  const num = (v: unknown) => (typeof v === 'number' ? v : Number(v) || 0);
  const arr = (v: unknown) => (Array.isArray(v) ? (v as string[]) : []);

  return {
    id: str(obj.id) || String(obj.id ?? ''),
    year:
      typeof obj.year === 'number'
        ? (obj.year as number)
        : typeof obj.yea === 'number'
          ? (obj.yea as number)
          : num(obj.year ?? obj.yea),
    brand: str(obj.brand),
    model: str(obj.model),
    type: str(obj.type),
    img: str(obj.img),
    description: str(obj.description),
    fuelConsumption: str(obj.fuelConsumption),
    engineSize: str(obj.engineSize),
    accessories: arr(obj.accessories),
    functionalities: arr(obj.functionalities),
    rentalPrice: str(obj.rentalPrice),
    rentalCompany: str(obj.rentalCompany),
    address: str(obj.address),
    rentalConditions: arr(obj.rentalConditions),
    mileage:
      typeof obj.mileage === 'number'
        ? (obj.mileage as number)
        : num(obj.mileage),
  };
}
