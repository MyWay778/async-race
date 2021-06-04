import { State } from './state/i_state';
import IStore from './i_store';
import { CarType } from './state/types';
import IView from '../view/i_view';

export default class Store implements IStore {
  private state: State;

  constructor(private readonly view: IView) {}

  setCars = (cars: CarType[]): void => {
    this.state = {
      ...this.state,
      cars,
    };
    console.log(this.state);
    
    this.showCars();
  };

  setCar = (car: CarType): void => {
    this.state = {
      ...this.state,
      cars: [...this.state.cars, car]
    }
    this.view.showCar(car);
  }

  private showCars = (): void => {
    this.view.showCars(this.state.cars);
  };

  private showCar = (car: CarType): void => {
    this.view.showCar(car);
  }
}
