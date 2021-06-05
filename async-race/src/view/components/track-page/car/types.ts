import { CarType } from '@store/state/types';
import ICar from './i_car';

export type CarHandlersType = {
  removeCarHandler: RemoveCarHandlerType;
  selectCarHandler: SelectCarHandlerType;
  startCarHandler: StartCarHandlerType;
  stopCarHandler: StopCarHandlerType;
};

export type RemoveCarHandlerType = (carId: number) => void;
export type SelectCarHandlerType = (car: CarType) => void;
export type UpdateCarHandlerType = (car: CarType) => void;
export type StartCarHandlerType = (car: ICar) => void;
export type StopCarHandlerType = (car: ICar) => void;
