import ICar from '@view/components/track-page/car/i_car';
import { MovementCharacteristicsType } from 'api/types';
import { State } from './state/i_state';
import { CarType, WinnerType } from './state/types';
import { StoreListenerType } from './types';

export default interface IStore {
  state: State;
  subscribe: (listener: StoreListenerType) => void;
  // subscriber: (listener: StoreListenerType) => void;
  changeState: <T extends keyof State, K extends State[T]>(
    prop: T,
    value: K
  ) => void;
  setCars: (cars: CarType[]) => void;
  setCar: (car: CarType) => void;
  setUpdatingCar: (car: CarType) => void;
  getUpdatingCar: () => CarType;
  updateCar: (car: CarType) => void;
  disableUpdateCarInput: () => void;
  startCar: (car: ICar, movementData: MovementCharacteristicsType) => void;
  stopCar: (car: ICar) => void;
  bringBackCar: (car: ICar, movementData: MovementCharacteristicsType) => void;
  checkWinner: () => boolean;
  setWinner: (winner: WinnerType) => void;
  startRace: () => void;
  resetRace: () => void;
  allCarsAreDropped: () => void;
  setCarsAmount: (value: string) => void;
  carsGeneration: (isGeneration?: boolean) => void;
  finishedCar: (car: ICar) => void;
  readyToStart: () => void;
  allCarsFinished: () => void;
}
