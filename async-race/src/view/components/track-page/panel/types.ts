import { UpdateCarHandlerType } from '../car/types/handlers';
import { CreateCarHandlerType } from './car-input/types';

export type PanelHandlersType = {
  createCarHandler: CreateCarHandlerType;
  updateCarHandler: UpdateCarHandlerType;
  startRaceHandler: () => void;
  resetRaceHandler: () => void;
  generateCarsHandler: () => void;
};

export type ToggleDisablingBtnType = (isDisabled: boolean) => void;