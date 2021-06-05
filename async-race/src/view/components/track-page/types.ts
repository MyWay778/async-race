import {
  RemoveCarHandlerType,
  SelectCarHandlerType,
  UpdateCarHandlerType,
} from './car/types';
import { CreateCarHandlerType } from './panel/car-input/types';

export type TrackPageHandlersType = {
  createCarHandler: CreateCarHandlerType;
  removeCarHandler: RemoveCarHandlerType;
  selectCarHandler: SelectCarHandlerType;
  updateCarHandler: UpdateCarHandlerType;
};
