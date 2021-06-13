import { StoreCarType, WinnerType } from '@store/types';

export type EngineStatusType = 'started' | 'stopped';
export type MovementCharacteristicsType = {
  velocity: number;
  distance: number;
};
export type DriveModeStatusType = 'drive';
export type DriveSuccessType = {
  success: true;
};

export type ResponseGetCarsType = {
  cars: StoreCarType[];
  carsAmount: string;
};

export type GetWinnersSortType = 'id' | 'wins' | 'time';

export type GetWinnersOrderType = 'ASC' | 'DESC';

export type ResponseGetWinnersType = {
  winners: WinnerType[];
  winnersCount: string;
};
