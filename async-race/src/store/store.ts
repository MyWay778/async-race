import elementStatus from '@view/components/track-page/panel/constants';
import { MovementCharacteristicsType } from 'api/types';
import ICar from '@view/components/track-page/car/i_car';
import { State } from './state/i_state';
import IStore from './i_store';
import { CarType, WinnerType } from './state/types';
import IView from '../view/i_view';
import disableUpdateCarInputHandler from './helpers/disable-update-car-input-handler';
import noId from './constants';

export default class Store implements IStore {
  state: State = {
    cars: [],
    currentPage: 1,
    allCarsInGarage: 0,
    carsOnPageLimit: 7,
  };

  listeners: Array<(state: State) => void> = [];

  constructor(private readonly view: IView) {
    this.view.subscriber = this.subscriber;
    this.view.subscribe();
    // this.notify();
  }

  notify = (): void => {
    this.listeners.forEach((listener) => listener(this.state));
  }

  changeState = <T extends keyof State, K extends State[T]>(
    prop: T,
    value: K
  ): void => {
    this.state[prop] = value;
    this.notify();
  };



  subscriber = (listener: (state: State) => void): void => {
    this.listeners.push(listener);
    this.notify();
  };

  setCars = (cars: CarType[]): void => {
    this.state.cars = cars;
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
    this.view.toggleDisableUpdateBtn(elementStatus.undisabled);
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
    this.view.toggleDisableUpdateBtn(elementStatus.disabled);
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
      car.toggleDisableBtn('start', elementStatus.undisabled);
      this.view.toggleDisableRaceBtn(elementStatus.undisabled);
      this.view.toggleDisableResetBtn(elementStatus.disabled);
    }
  };

  readyToStart = (): void => {
    this.view.toggleDisableCreateBtn(elementStatus.disabled);
    this.view.toggleDisableUpdateBtn(elementStatus.disabled);
    this.view.toggleDisableRaceBtn(elementStatus.disabled);
    this.view.toggleDisableGenerateBtn(elementStatus.disabled);
  };

  checkWinner = (): boolean => !!this.state.winner;

  setWinner = (winner: WinnerType): void => {
    this.state.winner = winner;
  };

  startRace = (): void => {
    this.view.toggleDisableRaceBtn(elementStatus.disabled);
    // this.view.toggleDisableResetBtn(elementStatus.undisabled);
    this.view.toggleDisableGenerateBtn(elementStatus.disabled);
    this.view.toggleDisableCreateBtn(elementStatus.disabled);
    this.state.raceStatus = true;
  };

  allCarsFinished = (): void => {
    this.view.toggleDisableResetBtn(elementStatus.undisabled);
  };

  resetRace = (): void => {
    this.view.toggleDisableResetBtn(elementStatus.disabled);
    this.view.toggleDisableRaceBtn(elementStatus.disabled);
    this.state.raceStatus = false;
  };

  private showCars = (): void => {
    this.view.showCars(this.state.cars);
  };

  private showCar = (car: CarType): void => {
    this.view.showCar(car);
  };

  allCarsAreDropped = (): void => {
    this.view.toggleDisableRaceBtn(elementStatus.undisabled);
    this.view.toggleDisableGenerateBtn(elementStatus.undisabled);
    this.view.toggleDisableCreateBtn(elementStatus.undisabled);
  };

  setCarsAmount = (value: string): void => {
    this.state.allCarsInGarage = Number(value);
    this.view.setCarsAmount(value);
  };

  carsGeneration = (isGeneration = true): void => {
    const isDisabled = isGeneration;
    this.view.toggleDisableGenerateBtn(isDisabled);
    this.view.toggleDisableCreateBtn(isDisabled);
    this.view.toggleDisableRaceBtn(isDisabled);
    // this.view.toggleDisableResetBtn(isDisabled);
    this.view.toggleDisableAllCarControl(isDisabled);
  };

  finishedCar = (car: ICar): void => {
    car.toggleStopBtn(elementStatus.undisabled);
    this.state.isPending = false;
    this.view.toggleDisableCreateBtn(elementStatus.undisabled);
    // this.view.toggleDisableRaceBtn(elementStatus.undisabled);
    this.view.toggleDisableResetBtn(elementStatus.undisabled);
    this.view.toggleDisableGenerateBtn(elementStatus.undisabled);
  };
}
