import { UpdateCarHandlerType } from '../car/types';
import { CreateCarHandlerType } from './car-input/types';

export type PanelHandlersType = {
  createCarHandler: CreateCarHandlerType;
  updateCarHandler: UpdateCarHandlerType;
};
