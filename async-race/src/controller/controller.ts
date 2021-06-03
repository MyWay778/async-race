import Api from '../api/api';
import IStore from '../store/i_store';
import { Car } from '../store/state/types';
import IController from './i_controller';
export { IController };

const baseUrl = 'http://localhost:3000/';

export default class Controller implements IController {
  private readonly api;

  constructor(private readonly store: IStore) {
    this.api = new Api(baseUrl);
  }

  showCars = async (): Promise<void> => {
    const cars = await this.api.getCars();
    this.store.setCars(cars);
  }
}
