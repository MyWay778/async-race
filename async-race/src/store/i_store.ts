import { StoreListenerType, StoreStateType } from './types';

export default interface IStore {
  state: StoreStateType;
  subscribe: <K extends keyof StoreStateType>(
    state: K,
    listener: StoreListenerType
  ) => void;
  changeState: <
    S extends keyof StoreStateType,
    K extends keyof StoreStateType[S],
    H extends StoreStateType[S],
    T extends H[K]
  >(
    state: S,
    prop: K,
    value: T
  ) => void;
  getState: <T extends keyof StoreStateType>(stateName: T) => StoreStateType[T];

  // subscriber: (listener: StoreListenerType) => void;
  // setCars: (cars: CarType[]) => void;
  // setCar: (car: CarType) => void;
  // setUpdatingCar: (car: CarType) => void;
  // getUpdatingCar: () => CarType;
  // updateCar: (car: CarType) => void;
  // disableUpdateCarInput: () => void;
  // startCar: (car: ICar, movementData: MovementCharacteristicsType) => void;
  // stopCar: (car: ICar) => void;
  // bringBackCar: (car: ICar, movementData: MovementCharacteristicsType) => void;
  // checkWinner: () => boolean;
  // setWinner: (winner: WinnerType) => void;
  // startRace: () => void;
  // resetRace: () => void;
  // allCarsAreDropped: () => void;
  // setCarsAmount: (value: string) => void;
  // carsGeneration: (isGeneration?: boolean) => void;
  // finishedCar: (car: ICar) => void;
  // readyToStart: () => void;
  // allCarsFinished: () => void;
}
