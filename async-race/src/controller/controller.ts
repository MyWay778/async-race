import { CarIdType, CarType, WinnerType } from '@store/state/types';
import ICar from '@view/components/track-page/car/types/i_car';
import { CarInputType } from '@view/components/track-page/panel/car-input/types';
import elementStatus from '@view/components/track-page/panel/constants';
import { MovementCharacteristicsType } from 'api/types';
import Api from '../api/api';
import IStore from '../store/i_store';
import carGenerator from './helpers/car-generator';
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
    if (this.checkIsPendingAppStatus()) {
      return;
    }

    try {
      const carsResponse = await this.api.getCars();
      this.store.state.isPending = false;
      this.store.setCars(carsResponse.cars);
      this.store.setCarsAmount(carsResponse.carsAmount);
    } catch (e) {
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
    if (this.checkIsPendingAppStatus()) {
      return;
    }
    const movementData = await this.getMovementData(car);
    this.store.startCar(car, movementData);
    await this.setDriveMode(car);
    this.store.finishedCar(car);
  };

  stopCar = async (car: ICar): Promise<void> => {
    const movementData = await this.api.engine(car.id, 'stopped');
    this.store.bringBackCar(car, movementData);
  };

  finishCar = async (carId: CarIdType, movementTime: number): Promise<void> => {
    if (!this.store.state.raceStatus || this.store.state.winner) {
      return;
    }
    const time = Number((movementTime / 1000).toFixed(2));
    const winner = await this.api.getWinner(carId);
    if (winner.id) {
      winner.wins += 1;
      if (time < winner.time) {
        winner.time = time;
      }
      this.store.setWinner(winner);
      this.api.updateWinner(winner);
    } else {
      const newWinner: WinnerType = {
        id: carId,
        wins: 1,
        time,
      };
      this.api.createWinner(newWinner);
      this.store.setWinner(newWinner);
    }
    this.store.state.raceStatus = false;
    this.store.state.winner = undefined;
  };

  startRace = (cars: ICar[]): void => {
    if (this.checkIsPendingAppStatus()) {
      return;
    }
    this.store.startRace();
    cars.forEach((car) => {
      car.toggleStartBtn(elementStatus.disabled);
    });
    const allCarsMovementData = cars.map((car) => this.getMovementData(car));
    const allCarsFinishedResponses: Promise<void>[] = [];
    Promise.allSettled(allCarsMovementData).then((data) => {
      cars.forEach((car, ind) => {
        const movementData = (
          data[ind] as PromiseFulfilledResult<MovementCharacteristicsType>
        ).value;
        if (this.store.state.raceStatus) {
          this.store.startCar(car, movementData);
          allCarsFinishedResponses.push(this.setDriveMode(car));
        }
      });
      Promise.allSettled(allCarsFinishedResponses).then(() => {
        this.store.state.isPending = false;
      });
    });
  };

  resetRace = (cars: ICar[]): void => {
    this.store.resetRace();
    const allCarsFinished = cars.map((car) => car.stopHandler());
    Promise.allSettled(allCarsFinished).then(() => {
      this.store.allCarsAreDropped();
    });
  };

  generateCars = async (): Promise<void> => {
    if (this.checkIsPendingAppStatus()) {
      return;
    }
    this.store.carsGeneration();
    const cars = carGenerator();
    const requests = cars.map((car) => this.api.createCar(car));
    Promise.allSettled(requests).then(() => {
      this.store.state.isPending = false;
      this.store.carsGeneration(false);
      this.showCars();
    });
  };

  private getMovementData = (car: ICar): Promise<MovementCharacteristicsType> =>
    this.api.engine(car.id, 'started');

  private setDriveMode = async (car: ICar): Promise<void> => {
    try {
      await this.api.driveMode(car.id, 'drive');
    } catch (e) {
      this.store.stopCar(car);
    }
  };

  private checkIsPendingAppStatus = (): boolean => {
    if (this.store.state.isPending) {
      return true;
    }
    this.store.state.isPending = true;
    return false;
  };
}
