import { CarIdType, StoreCarType } from '@store/types';
import ICar from './i_car';

export type CarHandlersType = {
  removeCarHandler: RemoveCarHandlerType;
  selectCarHandler: SelectCarHandlerType;
  startCarHandler: StartCarHandlerType;
  stopCarHandler: StopCarHandlerType;
  finishedCarHandler: FinishedCarHandler;
};

export type RemoveCarHandlerType = (carId: number) => void;
export type SelectCarHandlerType = (car: StoreCarType) => void;
export type UpdateCarHandlerType = (car: StoreCarType) => void;
export type StartCarHandlerType = (car: ICar) => void;
export type StopCarHandlerType = (car: ICar) => void;
export type FinishedCarHandler = (
  carId: CarIdType,
  movementTime: number
) => void;
