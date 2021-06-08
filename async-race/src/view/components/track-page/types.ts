import {
  FinishedCarHandler,
  RemoveCarHandlerType,
  SelectCarHandlerType,
  StartCarHandlerType,
  StopCarHandlerType,
  UpdateCarHandlerType,
} from './car/types/handlers';
import ICar from './car/types/i_car';
import { CreateCarHandlerType } from './panel/car-input/types';

export type TrackPageHandlersType = {
  createCarHandler: CreateCarHandlerType;
  removeCarHandler: RemoveCarHandlerType;
  selectCarHandler: SelectCarHandlerType;
  updateCarHandler: UpdateCarHandlerType;
  startCarHandler: StartCarHandlerType;
  stopCarHandler: StopCarHandlerType;
  finishedCarHandler: FinishedCarHandler;
  startRaceHandler: (cars: ICar[]) => void;
  resetRaceHandler: (cars: ICar[]) => void;
  generateCarsHandler: () => void;
};

export type TitleTupleType = [HTMLElement, (value: string) => void];