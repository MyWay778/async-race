import { CarType } from '@store/state/types';
import ICar from '@view/components/track-page/car/i_car';
import { CarInputType } from '@view/components/track-page/panel/car-input/types';

export default interface IController {
  showCars: () => void;
  createCar: (car: CarInputType) => void;
  removeCar: (carId: number) => void;
  selectUpdateCar: (car: CarType) => void;
  updateCar: (car: CarInputType) => void;
  startCar: (car: ICar) => void;
  stopCar: (car: ICar) => void;
  finishCar: (carId: number, movementTime: number) => void;
  startRace: (cars: ICar[]) => void;
  resetRace: (cars: ICar[]) => void;
  generateCars: () => void;
  nextPage: () => void;
  prevPage: () => void;
}
