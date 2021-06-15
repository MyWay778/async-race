import { CarIdType, StoreAppPageType, StoreCarType } from '@store/types';
import { CarInputType } from '@view/components/track-page/panel/car-input/types';

export default interface IController {
  showCars: () => void;
  selectPage: (pageName: StoreAppPageType) => void;
  createCar: (car: CarInputType) => void;
  updateCar: (car: CarInputType) => void;
  startCar: (carId: CarIdType) => void;
  stopCar: (carId: CarIdType) => void;
  selectUpdateCar: (car: StoreCarType) => void;
  removeCar: (carId: number) => void;
  startRace: () => void;
  resetRace: () => void;
  generateCars: () => void;
  changePaginationPage: (
    pageName: 'garage' | 'winners',
    direction: 'next' | 'prev'
  ) => void;
}
