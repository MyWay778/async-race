import { CarIdType, StoreAppPageType, StoreCarType } from '@store/types';
import { CarInputType } from '@view/components/track-page/panel/car-input/types';

export default interface IController {
  showCars: () => void;
  selectPage: (pageName: StoreAppPageType) => void;
  createCar: (car: CarInputType) => void;
  updateCar: (car: CarInputType) => void;
  finishCar: (carId: CarIdType, movementTime: number) => void;
  startCar: (carId: CarIdType) => void;
  stopCar: (carId: CarIdType) => void;
  selectUpdateCar: (car: StoreCarType) => void;
  removeCar: (carId: number) => void;
  startRace: () => void;
  resetRace: () => void;
  generateCars: () => void;
  changePaginationPage: (pageName: 'garage' | 'winners', direction: 'next' | 'prev') => void;

  // removeCar: (carId: number) => void;
  // selectUpdateCar: (car: CarType) => void;
  // startCar: (car: ICar) => void;
  // startRace: (cars: ICar[]) => void;
  // resetRace: (cars: ICar[]) => void;
  // generateCars: () => void;
  // nextPage: () => void;
  // prevPage: () => void;
  // selectPage: (pageName: AppPageType) => void;
  // nextWinnerPage: ()  => void;
  // prevWinnerPage: ()  => void;
  // closeModal: () => void;
}
