import { CarType } from '@store/state/types';

export type CarHandlersType = {
  removeCarHandler: RemoveCarHandlerType;
  selectCarHandler: SelectCarHandlerType;
};

export type RemoveCarHandlerType = (carId: number) => void;
export type SelectCarHandlerType = (car: CarType) => void;
export type UpdateCarHandlerType = (car: CarType) => void;
