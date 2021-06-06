import inputState from '@view/components/track-page/panel/constants';
import { MovementCharacteristicsType } from 'api/types';
import ICar from '@view/components/track-page/car/types/i_car';
import { State } from './state/i_state';
import IStore from './i_store';
import { CarType, WinnerType } from './state/types';
import IView from '../view/i_view';
import disableUpdateCarInputHandler from './helpers/disable-update-car-input-handler';
import noId from './constants';

export default class Store implements IStore {
  state: State;

  constructor(private readonly view: IView) {}

  setCars = (cars: CarType[]): void => {
    this.state = {
      ...this.state,
      cars,
    };
    this.showCars();
  };

  setCar = (car: CarType): void => {
    this.state = {
      ...this.state,
      cars: [...this.state.cars, car],
    };
    this.view.showCar(car);
  };

  setUpdatingCar = (car: CarType): void => {
    this.state.updatingCar = car;
    this.view.toggleDisableUpdateBtn(inputState.undisabled);
    this.view.setUpdateInputValues(car);

    const carUpdateInputDisabling = (): void => {
      this.disableUpdateCarInput();
      this.view.removeEventListenerFromRoot();
    };

    this.view.setEventListenerToRoot(
      disableUpdateCarInputHandler(carUpdateInputDisabling)
    );
  };

  disableUpdateCarInput = (): void => {
    this.view.setUpdateInputValues({ id: noId, name: '', color: '' });
    this.view.toggleDisableUpdateBtn(inputState.disabled);
    this.state.updatingCar = undefined;
  };

  getUpdatingCar = (): CarType => this.state?.updatingCar;

  updateCar = (updatedCar: CarType): void => {
    const updatedCarIndex = this.state.cars.findIndex(
      (car) => updatedCar.id === car.id
    );
    this.state.cars[updatedCarIndex] = updatedCar;
    this.showCars();
    this.disableUpdateCarInput();
  };

  startCar = (car: ICar, movementData: MovementCharacteristicsType): void => {
    const movementTime = Math.round(
      movementData.distance / movementData.velocity
    );
    car.start(movementTime);
  };

  stopCar = (car: ICar): void => {
    car.stop();
  };

  bringBackCar = (
    car: ICar,
    movementData: MovementCharacteristicsType
  ): void => {
    if (movementData.velocity === 0) {
      car.stop();
      car.comeBack();
    }
  };

  checkWinner = (): boolean => !!this.state.winner;

  setWinner = (winner: WinnerType): void => {
    this.state.winner = winner;
    console.log(this.state.winner);
  };

  startRace = (): void => {
    this.view.startRace();
    this.state.race = true;
  }

  private showCars = (): void => {
    this.view.showCars(this.state.cars);
  };

  private showCar = (car: CarType): void => {
    this.view.showCar(car);
  };
}
