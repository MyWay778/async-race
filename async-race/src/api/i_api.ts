import { CarType } from '@store/state/types';

export default interface IApi {
  getCars: () => Promise<CarType[]>;
  createCar: (car: CarType) => Promise<CarType>;
  deleteCar: (carId: number) => Promise<Response>;
}
