import { CarIdType, CarType } from '@store/state/types';
import { DriveModeStatusType, DriveSuccessType, EngineStatusType, MovementCharacteristicsType } from './types';

export default interface IApi {
  getCars: () => Promise<CarType[]>;
  createCar: (car: CarType) => Promise<CarType>;
  deleteCar: (carId: number) => Promise<Response>;
  engine: (carId: CarIdType, status: EngineStatusType) => Promise<MovementCharacteristicsType>;
  driveMode: (carId: CarIdType, status: DriveModeStatusType) => Promise<DriveSuccessType>
}
