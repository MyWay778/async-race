import { CarType, WinnerType } from './types';

export type State = {
  cars: Array<CarType>;
  updatingCar?: CarType;
  winner?: WinnerType;
  race?: boolean;
};
