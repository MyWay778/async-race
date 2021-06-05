import IController from '@controller/i_controller';
import { CarType } from '@store/state/types';
import { MouseEventHandler } from '@store/types';


export default interface IView {
  init: (controller: IController) => void;
  showCars: (cars: CarType[]) => void;
  showCar: (car: CarType) => void;
  toggleDisableUpdateBtn: (isDisabled: boolean) => void;
  setUpdateInputValues: (car: CarType) => void;
  setEventListenerToRoot: (handler: MouseEventHandler, options?: AddEventListenerOptions) => void;
  removeEventListenerFromRoot: () => void;
}
