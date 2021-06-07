import IController from '@controller/i_controller';
import { CarType } from '@store/state/types';
import { MouseEventHandler } from '@store/types';
import { Header, TrackPage } from './components/index';
import ITrackPage from './components/track-page/i_track-page';
import IView from './i_view';

export { IView };

export default class View implements IView {
  private trackPage: ITrackPage;
  private controller: IController;
  private rootEventHandler: MouseEventHandler;

  constructor(private readonly root: HTMLElement) {}

  init = (controller: IController): void => {
    this.controller = controller;

    const header = new Header();
    header.render(this.root);

    const trackPageHandlers = {
      createCarHandler: this.controller.createCar,
      removeCarHandler: this.controller.removeCar,
      selectCarHandler: this.controller.selectUpdateCar,
      updateCarHandler: this.controller.updateCar,
      startCarHandler: this.controller.startCar,
      stopCarHandler: this.controller.stopCar,
      finishedCarHandler: this.controller.finishCar,
      startRaceHandler: this.controller.startRace,
      resetRaceHandler: this.controller.resetRace,
    };

    this.trackPage = new TrackPage(trackPageHandlers);
    this.trackPage.render(this.root);
  };

  showCars = (cars: CarType[]): void => {
    this.trackPage.showCars(cars);
  };

  showCar = (car: CarType): void => {
    this.trackPage.showCar(car);
  };

  toggleDisableUpdateBtn = (isDisabled: boolean): void => {
    this.trackPage.toggleDisableUpdateBtn(isDisabled);
  };

  toggleDisableRaceBtn = (isDisabled: boolean): void => {
    this.trackPage.toggleDisableRaceBtn(isDisabled);
  };

  toggleDisableResetBtn = (isDisabled: boolean): void => {
    this.trackPage.toggleDisableResetBtn(isDisabled);
  }

  setUpdateInputValues = (car: CarType): void => {
    this.trackPage.setUpdateInputValues(car);
  };

  setEventListenerToRoot = (
    handler: (e: MouseEvent) => void,
    options?: AddEventListenerOptions
  ): void => {
    this.rootEventHandler = handler;
    this.root.addEventListener('click', this.rootEventHandler, options);
  };

  removeEventListenerFromRoot = (): void => {
    this.root.removeEventListener('click', this.rootEventHandler);
    this.rootEventHandler = undefined;
  };

  startRace = (): void => {
    this.trackPage.startAllCars();
  };

  resetRace = (): void => {
    this.trackPage.resetAllCars();
  }
}
