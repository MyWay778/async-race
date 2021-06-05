import { CarType } from '@store/state/types';
import ICar from '@view/components/track-page/car/i_car';
import { CarInputType } from '@view/components/track-page/panel/car-input/types';
import Api from '../api/api';
import IStore from '../store/i_store';
import shallowCarEqual from './helpers/shallowCarEqual';

import IController from './i_controller';

export { IController };

const baseUrl = 'http://localhost:3000/';

export default class Controller implements IController {
  private readonly api;

  constructor(private readonly store: IStore) {
    this.api = new Api(baseUrl);
  }

  showCars = async (): Promise<void> => {
    let cars: CarType[];
    try {
      cars = await this.api.getCars();
      this.store.setCars(cars);
    } catch (e) {
      console.log('Error ', e);
      this.store.setCars([]);
    }
  };

  createCar = async (car: CarInputType): Promise<void> => {
    const createdCar = await this.api.createCar(car);
    this.store.setCar(createdCar);
  };

  removeCar = async (carId: number): Promise<void> => {
    const response = await this.api.deleteCar(carId);
    if (response.status === 200) {
      this.showCars();
    }
  };

  selectUpdateCar = (car: CarType): void => {
    this.store.setUpdatingCar(car);
  };

  updateCar = async (car: CarInputType): Promise<void> => {
    const updatingCarFromStore = this.store.getUpdatingCar();

    if (!shallowCarEqual(updatingCarFromStore, car)) {
      const response = await this.api.updateCar({
        id: updatingCarFromStore.id,
        name: car.name,
        color: car.color,
      });

      this.store.updateCar(response);
    } else {
      this.store.disableUpdateCarInput();
    }
  };

  startCar = async (car: ICar): Promise<void> => {
    const movementData = await this.api.engine(car.id, 'started');
    this.store.startCar(car, movementData);

    try {
      await this.api.driveMode(car.id, 'drive');
    } catch (e) {
      this.store.stopCar(car);
    }
  };

  stopCar = async (car: ICar): Promise<void> => {
    const movementData = await this.api.engine(car.id, 'stopped');
    this.store.bringBackCar(car, movementData);
  };
}
