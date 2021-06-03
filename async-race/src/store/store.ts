import { State } from './state/i_state';
import IStore from './i_store';
import { Car } from './state/types';
import IView from '../view/i_view';

export default class Store implements IStore {
  private state: State

  constructor(private readonly view: IView) {}

  setCars = (cars: Car[]): void => {
    this.state = {
      ...this.state,
      cars: cars
    }
    console.log(this.state);
  };

  private showCars = (cars: Car[]): void => {
    this.view
  }
}
