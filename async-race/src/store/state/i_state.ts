import { AppPageType, CarType, WinnerType } from './types';

export type State = {
  cars: Array<CarType>;
  updatingCar?: CarType;
  winner?: WinnerType;
  raceStatus?: boolean;
  isPending?: boolean;
  currentPage: AppPageType;
  currentGaragePage: number;
  allCarsInGarage: number;
  carsOnPageLimit: number;
  winners: WinnerType[];
  winnersCount: string;
  winnersLimit: number;
  currentWinnersPage: number;
};

export type ChangeStatePropertyType = {
  [K in keyof State]: State[K];
};
