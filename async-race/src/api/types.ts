import { CarType } from '@store/state/types';

export type EngineStatusType = 'started' | 'stopped';
export type MovementCharacteristicsType = {
  velocity: number;
  distance: number;
};
export type DriveModeStatusType = 'drive';
export type DriveSuccessType = {
  success: true;
};

export type ResponseGerCarsType = {
  cars: CarType[];
  carsAmount: string;
};
