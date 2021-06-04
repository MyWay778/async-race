import IController from '@controller/i_controller';
import { CarType } from '@store/state/types';
import { Header, TrackPage } from './components/index';
import ITrackPage from './components/track-page/i_track-page';
import IView from './i_view';

export { IView };

export default class View implements IView {
  private trackPage: ITrackPage;
  private controller: IController;

  constructor(private readonly root: HTMLElement) {}

  init = (controller: IController): void => {
    this.controller = controller;

    const header = new Header();
    header.render(this.root);

    this.trackPage = new TrackPage({
      createCarHandler: this.createCarHandler,
      removeCarHandler: this.removeCarHandler
    });
    this.trackPage.render(this.root);
  };

  showCars = (cars: CarType[]): void => {
    this.trackPage.showCars(cars);
  };

  showCar = (car: CarType): void => {
    this.trackPage.showCar(car);
  }

  private createCarHandler = (car: CarType): void => {
    this.controller.createCar(car);
  };

  private removeCarHandler = (carId: number): void => {
    this.controller.removeCar(carId);
  }
}
