import IController from '@controller/i_controller';
import { CarType } from '@store/state/types';
import { MouseEventHandler } from '@store/types';
import { Header, TrackPage } from './components/index';
import ITrackPage from './components/track-page/i_track-page';
import { CarInputType } from './components/track-page/panel/car-input/types';
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

    this.trackPage = new TrackPage({
      createCarHandler: this.createCarHandler,
      removeCarHandler: this.removeCarHandler,
      selectCarHandler: this.selectCarHandler,
      updateCarHandler: this.updateCarHandler,
      startCarHandler: this.controller.startCar,
      stopCarHandler: this.controller.stopCar,
    });
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

  private createCarHandler = (car: CarType): void => {
    this.controller.createCar(car);
  };

  private removeCarHandler = (carId: number): void => {
    this.controller.removeCar(carId);
  };

  private selectCarHandler = (car: CarType): void => {
    this.controller.selectUpdateCar(car);
  };

  private updateCarHandler = (car: CarInputType): void => {
    this.controller.updateCar(car);
  };
}
