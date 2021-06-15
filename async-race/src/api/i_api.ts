import { CarIdType, StoreCarType, WinnerType } from '@store/types';
import {
  DriveModeStatusType,
  EngineStatusType,
  MovementCharacteristicsType,
  ResponseGetCarsType,
} from './types';

export default interface IApi {
  getCar: (carId: number) => Promise<StoreCarType>;
  getCars: (page: number, carLimit?: number) => Promise<ResponseGetCarsType>;
  createCar: (car: StoreCarType) => Promise<StoreCarType>;
  deleteCar: (carId: number) => Promise<Response>;
  engine: (
    carId: CarIdType,
    status: EngineStatusType
  ) => Promise<MovementCharacteristicsType>;
  driveMode: (
    carId: CarIdType,
    status: DriveModeStatusType
  ) => Promise<Response>;
  getWinner: (carId: CarIdType) => Promise<WinnerType>;
  updateWinner: (winner: WinnerType) => Promise<WinnerType>;
  createWinner: (winner: WinnerType) => Promise<WinnerType>;
  deleteWinner: (carId: number) => Promise<Response>;
}
