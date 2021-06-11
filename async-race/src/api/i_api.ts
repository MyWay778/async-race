import { CarIdType, CarType, WinnerType } from '@store/state/types';
import {
  DriveModeStatusType,
  DriveSuccessType,
  EngineStatusType,
  MovementCharacteristicsType,
  ResponseGetCarsType,
} from './types';

export default interface IApi {
  getCar: (carId: number) => Promise<CarType>;
  getCars: (page: number, carLimit?: number) => Promise<ResponseGetCarsType>;
  createCar: (car: CarType) => Promise<CarType>;
  deleteCar: (carId: number) => Promise<Response>;
  engine: (
    carId: CarIdType,
    status: EngineStatusType
  ) => Promise<MovementCharacteristicsType>;
  driveMode: (
    carId: CarIdType,
    status: DriveModeStatusType
  ) => Promise<DriveSuccessType>;
  getWinner: (carId: CarIdType) => Promise<WinnerType>;
  updateWinner: (winner: WinnerType) => Promise<WinnerType>;
  createWinner: (winner: WinnerType) => Promise<WinnerType>;
}
