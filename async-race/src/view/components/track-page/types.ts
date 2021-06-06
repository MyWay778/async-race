import {
  FinishedCarHandler,
  RemoveCarHandlerType,
  SelectCarHandlerType,
  StartCarHandlerType,
  StopCarHandlerType,
  UpdateCarHandlerType,
} from './car/types/handlers';
import { CreateCarHandlerType } from './panel/car-input/types';

export type TrackPageHandlersType = {
  createCarHandler: CreateCarHandlerType;
  removeCarHandler: RemoveCarHandlerType;
  selectCarHandler: SelectCarHandlerType;
  updateCarHandler: UpdateCarHandlerType;
  startCarHandler: StartCarHandlerType;
  stopCarHandler: StopCarHandlerType;
  finishedCarHandler: FinishedCarHandler;
  startRaceHandler: () => void;
};
