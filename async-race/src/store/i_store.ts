import { CarType } from './state/types';

export default interface IStore {
  setCars: (cars: CarType[]) => void;
  setCar: (car: CarType) => void;
}
