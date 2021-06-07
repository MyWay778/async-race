import { CarType } from '@store/state/types';
import IBaseComponent from '../shared/base-component/i_base-component';
import { ToggleDisablingBtnType } from './panel/types';


export default interface ITrackPage extends IBaseComponent {
  showCars: (cars: CarType[]) => void;
  showCar: (car: CarType) => void;
  toggleDisableUpdateBtn: ToggleDisablingBtnType;
  setUpdateInputValues: (car: CarType) => void;
  startAllCars: () => void;
  resetAllCars: () => void;
  toggleDisableRaceBtn: ToggleDisablingBtnType;
  toggleDisableResetBtn: ToggleDisablingBtnType;
}
