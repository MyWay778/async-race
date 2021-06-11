import IController from '@controller/i_controller';
import IStore from '@store/i_store';
import { State } from '@store/state/i_state';
import { CarType } from '@store/state/types';
import { MouseEventHandler } from '@store/types';
import { ToggleDisablingBtnType } from './components/track-page/panel/types';


export default interface IView {
  subscriber: (listener: (state: State) => void) => void; 
  subscribe: () => void;
  
  init: (controller: IController, store: IStore) => void;
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
  setCarsAmount: (value: string) => void;
  toggleDisableGenerateBtn: ToggleDisablingBtnType;
  toggleDisableCreateBtn: ToggleDisablingBtnType;
  toggleDisableAllCarControl: ToggleDisablingBtnType;
}
