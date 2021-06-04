import { CreateCarHandlerType } from './car-input/types';

export default interface IPanel {
  setCreateBtnHandler: (handler: CreateCarHandlerType) => void;
}
