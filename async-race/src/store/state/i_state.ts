import { CarType } from './types';

export type State = {
  cars: Array<CarType>;
  updatingCar?: CarType;
};
