import { CarType } from '@store/state/types';
import IBaseComponent from '../shared/i_base-component';

export default interface ITrackPage extends IBaseComponent {
  showCars: (cars: CarType[]) => void;
  showCar: (car: CarType) => void;
  toggleDisableUpdateBtn: (isDisabled: boolean) => void;
  setUpdateInputValues: (car: CarType) => void;
}
