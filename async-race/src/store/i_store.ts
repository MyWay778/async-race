import ICar from '@view/components/track-page/car/i_car';
import { MovementCharacteristicsType } from 'api/types';
import { CarType } from './state/types';

export default interface IStore {
  setCars: (cars: CarType[]) => void;
  setCar: (car: CarType) => void;
  setUpdatingCar: (car: CarType) => void;
  getUpdatingCar: () => CarType;
  updateCar: (car: CarType) => void;
  disableUpdateCarInput: () => void;
  startCar: (car: ICar, movementData: MovementCharacteristicsType) => void;
  stopCar: (car: ICar) => void;
}
