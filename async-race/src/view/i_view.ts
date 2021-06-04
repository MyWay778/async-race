import IController from '@controller/i_controller';
import { CarType } from '@store/state/types';


export default interface IView {
  init: (controller: IController) => void;
  showCars: (cars: CarType[]) => void;
  showCar: (car: CarType) => void;
}
