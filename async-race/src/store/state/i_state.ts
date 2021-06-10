import { CarType, WinnerType } from './types';

export type State = {
  cars: Array<CarType>;
  updatingCar?: CarType;
  winner?: WinnerType;
  raceStatus?: boolean;
  isPending?: boolean;
  currentPage: number;
  allCarsInGarage: number;
  carsOnPageLimit: number;
};

export type ChangeStatePropertyType = {
  [K in keyof State]: State[K];
};
