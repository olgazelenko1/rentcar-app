export interface Car {
  id: string;
  year: number;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string; // value in JSON is a string like "10.5"
  engineSize: string; // e.g. "3.6L V6"
  accessories: string[];
  functionalities: string[];
  rentalPrice: string; // value in JSON is a string like "40"
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: number;
}

export interface CarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export interface CarFilters {
  brand?: string;
  price?: string | number;
  mileageFrom?: number;
  mileageTo?: number;
}

export default Car;
