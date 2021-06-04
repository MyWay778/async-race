import { RemoveCarHandlerType } from './car/types';
import { CreateCarHandlerType } from './panel/car-input/types';

export type TrackPageHandlersType = {
  createCarHandler: CreateCarHandlerType;
  removeCarHandler: RemoveCarHandlerType
};
