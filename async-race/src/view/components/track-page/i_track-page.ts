import { CarType } from '@store/state/types';
import IBaseComponent from '../shared/base-component/i_base-component';
import { ToggleDisablingBtnType } from './panel/types';


export default interface ITrackPage extends IBaseComponent {
  element: HTMLElement;
  showCars: (cars: CarType[], carAmount?: number) => void;
  showCar: (car: CarType, carAmount?: number) => void;
  toggleDisableUpdateBtn: ToggleDisablingBtnType;
  setUpdateInputValues: (car: CarType) => void;
  startAllCars: () => void;
  resetAllCars: () => void;
  toggleDisableRaceBtn: ToggleDisablingBtnType;
  toggleDisableResetBtn: ToggleDisablingBtnType;
  setCarsAmount: (value: string) => void;
  toggleDisableGenerateBtn: ToggleDisablingBtnType;
  toggleDisableCreateBtn: ToggleDisablingBtnType;
  toggleDisableAllCarControl: ToggleDisablingBtnType;
}
