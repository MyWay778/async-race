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
  private abortController;

  constructor(private readonly store: IStore) {
    this.api = new Api(baseUrl);
    this.abortController = new AbortController();
  }

  showCars = async (): Promise<void> => {
    if (this.store.getState('global').isPending) {
      return;
    }
    this.store.changeState('global', 'isPending', true , {notNotify: true});

    const garageState = this.store.getState('garagePage');

    const carsResponse = await this.api.getCars(
      garageState.currentGaragePage,
      garageState.carsGarageLimit
    );

    this.store.changeState('global', 'isPending', false, {notNotify: true});
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

  finishCar = async (carId: CarIdType, movementTime: number): Promise<void> => {
    const garageState = this.store.getState('garagePage');
    let { cars } = garageState;

    cars = cars.map((car) =>
      car.id === carId ? { ...car, movementData: null } : car
    );
    const car = cars.find((c) => c.id === carId);
    car.movementData = null;
    this.store.changeState('garagePage', 'cars', cars);

    if (!garageState.raceStatus || garageState.winner) {
      return;
    }

    const time = Number((movementTime / 1000).toFixed(2));
    this.store.changeState('garagePage', 'winner', { id: carId, time });

    const winner = await this.api.getWinner(carId);
    if (winner.wins) {
      winner.wins += 1;
      if (time < winner.time) {
        winner.time = time;
      }
      this.api.updateWinner(winner);
      winner.time = time;
      // this.store.changeState('garagePage', 'winner', winner);
    } else {
      const newWinner: WinnerType = {
        id: carId,
        wins: 1,
        time,
      };
      this.api.createWinner(newWinner);
      // this.store.changeState('garagePage', 'winner', winner);
    }

    const winnerForModal = garageState.cars.find((c) => c.id === carId);

    // this.store.changeState(
    //   'global',
    //   'modalData',
    //   `Winner ${winnerForModal.name} time: ${time}`
    // );
    // this.store.changeState('global', 'showModal', true);
  };

  startCar = async (carId: CarIdType): Promise<void> => {
    if (
      this.store.getState('garagePage').cars.find((car) => car.id === carId)
        .isRace ||
      this.store.getState('global').antiClickSpam
    ) {
      return;
    }
    this.store.changeState('global', 'isPending', true);
    const garageState = this.store.getState('garagePage');
    const { cars } = garageState;

    try {
      const movementData = await this.getMovementData(carId);

      const car = cars.find((c) => c.id === carId);
      if (!garageState.raceStatus) {
        car.isRace = true;
      }
      car.movementData = movementData;
      this.store.changeState('garagePage', 'cars', cars);
      if (!garageState.raceStatus) {
        this.switchDriveMode(carId, this.abortController.signal)
          .catch(() => {
            car.movementData = null;
            this.store.changeState('garagePage', 'cars', cars);
          })
          .finally(() => {
            car.movementData = null;
            this.store.changeState('garagePage', 'cars', cars);
            this.store.changeState('global', 'isPending', false);
          });
      }
    } catch (e) {
      this.api.engine(carId, 'stopped');
    }
  };

  stopCar = async (carId: CarIdType): Promise<void> => {
    const garageState = this.store.getState('garagePage');
    const { cars } = garageState;
    const car = cars.find((c) => c.id === carId);

    await this.api.engine(carId, 'stopped');

    car.isRace = false;
    car.movementData = null;
    this.store.changeState('garagePage', 'cars', cars);
  };

  selectUpdateCar = (car: StoreCarType): void => {
    if (this.store.getState('global').isPending) {
      return;
    }
    this.store.changeState('garagePage', 'updatingCar', car);
  };

  private getMovementData = (
    carId: CarIdType
  ): Promise<MovementCharacteristicsType> => this.api.engine(carId, 'started');

  removeCar = async (carId: number): Promise<void> => {
    if (this.store.getState('global').isPending) {
      return;
    }
    // this.store.changeState('global', 'isPending', true);
    const response = await this.api.deleteCar(carId);
    if (response.status === 200) {
      // const garageState = this.store.getState('garagePage');
      // let { cars } = garageState;

      // cars = garageState.cars.filter((car) => car.id !== carId);

      this.api.deleteWinner(carId);
      this.showCars();
      // this.store.changeState('garagePage', 'cars', cars);
    }
    // this.store.changeState('global', 'isPending', false);
  };

  startRace = (): void => {
    if (
      this.store.getState('global').isPending &&
      this.store.getState('garagePage').cars.every((car) => !car.isRace)
    ) {
      return;
    }
    this.store.changeState('global', 'isPending', true);
    const garageState = this.store.getState('garagePage');
    const { cars } = garageState;

    this.store.changeState('garagePage', 'raceStatus', true);

    this.store.changeState('garagePage', 'winner', null);
    const allCarsStarted = cars.map((car) => this.startCar(car.id));
    const raceIsFinished: Promise<void>[] = [];

    Promise.allSettled(allCarsStarted).then(() => {
      cars.forEach((c) => {
        const copyCar = c;
        const driveModeRequest = this.switchDriveMode(
          copyCar.id,
          this.abortController.signal
        ).catch(() => {
          copyCar.movementData = null;
          this.store.changeState('garagePage', 'cars', cars);
        });

        raceIsFinished.push(driveModeRequest);
        copyCar.isRace = true;
      });

      Promise.allSettled(raceIsFinished).then(() => {
        this.store.changeState('global', 'isPending', false);
        this.store.changeState('garagePage', 'raceStatus', false);
        // this.store.changeState('garagePage', 'winner', null);
      });

      this.store.changeState('garagePage', 'cars', cars);
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

  private switchDriveMode = async (
    carId: CarIdType,
    signal?: AbortSignal
  ): Promise<void> => {
    await this.api.driveMode(carId, 'drive', signal);
  };
}
