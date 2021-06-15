import {
  CarIdType,
  StoreAppPageType,
  StoreCarType,
  WinnerType,
} from '@store/types';
import { CarInputType } from '@view/components/track-page/panel/car-input/types';
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
    if (this.store.getState('global').isPending) {
      return;
    }
    this.store.changeState('global', 'isPending', true, { notNotify: true });

    const garageState = this.store.getState('garagePage');

    const carsResponse = await this.api.getCars(
      garageState.currentGaragePage,
      garageState.carsGarageLimit
    );

    this.store.changeState('global', 'isPending', false, { notNotify: true });
    this.store.changeState('garagePage', 'cars', carsResponse.cars);
    this.store.changeState(
      'garagePage',
      'carsGarageCount',
      Number(carsResponse.carsAmount)
    );
  };

  selectPage = async (pageName: StoreAppPageType): Promise<void> => {
    this.store.changeState('global', 'currentPage', pageName);
    if (pageName === 'winners') {
      this.getWinners();
    }
  };

  getWinners = async (): Promise<void> => {
    const winnersState = this.store.getState('winnersPage');

    const response = await this.api.getWinners(
      winnersState.currentWinnersPage,
      winnersState.winnersLimit
    );
    const winnersForTable = response.winners.map(async (winner) => {
      const car = await this.api.getCar(winner.id);
      const newWinner = winner;
      newWinner.color = car.color;
      newWinner.name = car.name;
      return newWinner;
    });
    Promise.all(winnersForTable).then((result) => {
      this.store.changeState(
        'winnersPage',
        'winnersCount',
        Number(response.winnersCount)
      );
      this.store.changeState('winnersPage', 'winners', result);
    });
  };

  createCar = async (car: CarInputType): Promise<void> => {
    if (this.store.getState('global').isPending) {
      return;
    }
    const createdCar = await this.api.createCar(car);
    const garageState = this.store.getState('garagePage');

    if (garageState.cars.length < garageState.carsGarageLimit) {
      this.store.changeState(
        'garagePage',
        'cars',
        garageState.cars.concat(createdCar)
      );
    }
    this.store.changeState(
      'garagePage',
      'carsGarageCount',
      garageState.carsGarageCount + 1
    );
  };

  updateCar = async (car: CarInputType): Promise<void> => {
    if (this.store.getState('global').isPending) {
      return;
    }

    const garageState = this.store.getState('garagePage');
    const { cars } = garageState;

    if (!shallowCarEqual(garageState.updatingCar, car)) {
      const response = await this.api.updateCar({
        id: garageState.updatingCar.id,
        name: car.name,
        color: car.color,
      });

      const stateCar = cars.find((c) => c.id === response.id);
      stateCar.name = response.name;
      stateCar.color = response.color;

      this.store.changeState('garagePage', 'cars', cars);
    }
    this.store.changeState('garagePage', 'updatingCar', null);
  };

  setWinner = async (car: StoreCarType, time: number): Promise<void> => {
    const winner = await this.api.getWinner(car.id);
    if (winner.wins) {
      winner.wins += 1;
      if (time < winner.time) {
        winner.time = time;
      }
      this.api.updateWinner(winner);
      winner.time = time;
    } else {
      const newWinner: WinnerType = {
        id: car.id,
        wins: 1,
        time,
      };
      this.api.createWinner(newWinner);
    }
  };

  startCar = async (carId: CarIdType): Promise<void> => {
    const garageState = this.store.getState('garagePage');
    const car = garageState.cars.find((c) => c.id === carId);

    if (car.isRace) {
      return;
    }

    this.store.changeState('global', 'isPending', true, { notNotify: true });

    const { cars } = garageState;

    const movementData = await this.getMovementData(carId);

    if (!garageState.raceStatus) {
      car.isRace = true;
    }

    car.movementData = Math.round(
      movementData.distance / movementData.velocity
    );

    this.store.changeState('garagePage', 'cars', cars);

    if (!garageState.raceStatus) {
      await this.setToDriveMode(car);
      this.store.changeState('garagePage', 'cars', cars);
    }
  };



  stopCar = async (carId: CarIdType): Promise<void> => {
    const garageState = this.store.getState('garagePage');
    const { cars } = garageState;
    const car = cars.find((c) => c.id === carId);

    if (car.abortController) {
      car.abortController?.abort();
      car.abortController= new AbortController();
    }
    
    if (car.movementData !== 0) {
      car.movementData = 0;
      this.store.changeState('garagePage', 'cars', cars);
    } 
  
    await this.api.engine(carId, 'stopped');
    car.isRace = false;
    car.movementData = null;
    this.store.changeState('garagePage', 'cars', cars);
    this.store.changeState('global','isPending', false, {notNotify: true});
  };

  selectUpdateCar = (car: StoreCarType): void => {
    if (this.store.getState('global').isPending) {
      return;
    }
    this.store.changeState('garagePage', 'updatingCar', car);
  };

  
  removeCar = async (carId: number): Promise<void> => {
    if (this.store.getState('global').isPending) {
      return;
    }
    const response = await this.api.deleteCar(carId);
    if (response.status === 200) {
      this.api.deleteWinner(carId);
      this.showCars();
    }
  };

  startRace = (): void => {
    const garageState = this.store.getState('garagePage');
    const { cars } = garageState;
    let isFail = false;

    if (
      this.store.getState('global').isPending &&
      cars.every((car) => !car.isRace)
    ) {
      return;
    }

    this.store.changeState('global', 'isPending', true, { notNotify: true });
    this.store.changeState('garagePage', 'raceStatus', true);
    this.store.changeState('garagePage', 'winner', null, { notNotify: true });

    const allСarGetMovementData = cars.map((car) => {
      if (car.isRace) {
        isFail = true;
      }
      return this.startCar(car.id);
    });

    if (isFail) {
      return;
    }

    const raceIsFinished: Promise<void>[] = [];

    Promise.allSettled(allСarGetMovementData).then(() => {
      cars.forEach((c) => {
        const copyCar = c;
        const time = copyCar.movementData;

        copyCar.isRace = true;

        const driveModeRequest = this.setToDriveMode(copyCar)
          .then(async (response) => {
            if (response.status === 200 && !garageState.winner) {
              const timeInSec = Number((time / 1000).toFixed(2));
              this.store.changeState('garagePage', 'winner', {
                ...copyCar,
                time: timeInSec,
              });
              await this.setWinner(copyCar, timeInSec);
            }
          })
          .finally(() => {
            this.store.changeState('garagePage', 'cars', cars);
          });

        raceIsFinished.push(driveModeRequest);
      });

      this.store.changeState('garagePage', 'cars', cars);

      Promise.allSettled(raceIsFinished).then(() => {
        this.store.changeState('global', 'isPending', false, {
          notNotify: true,
        });
        this.store.changeState('garagePage', 'raceStatus', false);
      });
    });
  };

  resetRace = (): void => {
    const garageState = this.store.getState('garagePage');
    const { cars } = garageState;

    const allCarsReset = cars.map((car) => this.stopCar(car.id));

    Promise.allSettled(allCarsReset).then(() => {
      this.store.changeState('garagePage', 'raceStatus', false);
    });
  };

  generateCars = async (): Promise<void> => {
    if (this.store.getState('global').isPending) {
      return;
    }
    const newCars = carGenerator();
    const allCarsGenerated: Promise<void>[] = [];
    newCars.forEach(async (car) => {
      allCarsGenerated.push(this.createCar(car));
    });
    await Promise.allSettled(allCarsGenerated);
    this.store.changeState('global', 'isPending', false);
  };

  changePaginationPage = (
    pageName: 'garage' | 'winners',
    direction: 'next' | 'prev'
  ): void => {
    const count = direction === 'next' ? 1 : -1;
    if (pageName === 'garage') {
      const { currentGaragePage } = this.store.getState('garagePage');
      this.store.changeState(
        'garagePage',
        'currentGaragePage',
        currentGaragePage + count
      );
      this.showCars();
    } else if (pageName === 'winners') {
      const { currentWinnersPage } = this.store.getState('winnersPage');
      this.store.changeState(
        'winnersPage',
        'currentWinnersPage',
        currentWinnersPage + count
      );
      this.getWinners();
    }
  };

  private setToDriveMode = async (car: StoreCarType): Promise<Response> => {
    const copyCar = car;
    let response: Response;

    copyCar.abortController = new AbortController;
    try {
      response = await this.api.driveMode(
        car.id,
        'drive',
        copyCar.abortController.signal
      );
      if (response.status === 404) {
        copyCar.isRace = false;
      }
      copyCar.movementData = 0;
    } catch (e) {
      if (e.code === 20) {
        copyCar.movementData = 0;
      }
    } 
    return response;
  };

  private getMovementData = (
    carId: CarIdType
  ): Promise<MovementCharacteristicsType> => this.api.engine(carId, 'started');
}
