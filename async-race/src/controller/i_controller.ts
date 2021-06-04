import { CarInputType } from '@view/components/track-page/panel/car-input/types';

export default interface IController {
  showCars: () => void;
  createCar: (car: CarInputType) => void;
  removeCar: (carId: number) => void;
}
