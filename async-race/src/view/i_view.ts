import IController from '@controller/i_controller';
import { CarType } from '@store/state/types';
import { MouseEventHandler } from '@store/types';
import { ToggleDisablingBtnType } from './components/track-page/panel/types';


export default interface IView {
  init: (controller: IController) => void;
  showCars: (cars: CarType[]) => void;
  showCar: (car: CarType) => void;
  toggleDisableUpdateBtn: ToggleDisablingBtnType;
  setUpdateInputValues: (car: CarType) => void;
  setEventListenerToRoot: (handler: MouseEventHandler, options?: AddEventListenerOptions) => void;
  removeEventListenerFromRoot: () => void;
  startRace: () => void;
  toggleDisableRaceBtn: ToggleDisablingBtnType;
  toggleDisableResetBtn: ToggleDisablingBtnType;
  resetRace: () => void;
}
