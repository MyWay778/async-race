import IController from '@controller/i_controller';
import { State } from '@store/state/i_state';
import { CarType } from '@store/state/types';
import { MouseEventHandler } from '@store/types';
import { Header, TrackPage } from './components/index';
import {
  createPageNumberBlock,
  createTitleBlock,
} from './components/track-page/helpers';
import ITrackPage from './components/track-page/i_track-page';
import Paginator from './components/track-page/paginator/paginator';
import IView from './i_view';

export { IView };

export default class View implements IView {
  private trackPage: ITrackPage;
  private controller: IController;
  subscriber: (listener: (state: State) => void) => void;
  private rootEventHandler: MouseEventHandler;
  private paginator: Paginator;
  private setTitleBlock: (value: string) => void;
  private setPageNumberBlock: (value: string) => void;

  constructor(private readonly root: HTMLElement) {}

  subscribe = (): void => {
    this.subscriber(this.viewListener);
  };

  viewListener = (state: State): void => {
    if (this.setTitleBlock) {
      this.setTitleBlock(String(state.allCarsInGarage));
    }
    if (this.setPageNumberBlock) {
      this.setPageNumberBlock(String(state.currentPage));
    }
  };

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
      generateCarsHandler: this.controller.generateCars,
      nextPageHandler: this.controller.nextPage,
      prevPageHandler: this.controller.prevPage,
    };

    const [titleBlock, setTitleBlock] = createTitleBlock();
    this.setTitleBlock = setTitleBlock;

    const [pageNumberBlock, setPageNumberBlock] = createPageNumberBlock();
    this.setPageNumberBlock = setPageNumberBlock;

    this.paginator = new Paginator(trackPageHandlers);
    this.paginator.subscribe(this.subscriber);

    this.trackPage = new TrackPage(
      trackPageHandlers,
      this.paginator.element,
      titleBlock,
      pageNumberBlock
    );
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

  toggleDisableCreateBtn = (isDisabled: boolean): void => {
    this.trackPage.toggleDisableCreateBtn(isDisabled);
  };

  toggleDisableRaceBtn = (isDisabled: boolean): void => {
    this.trackPage.toggleDisableRaceBtn(isDisabled);
  };

  toggleDisableResetBtn = (isDisabled: boolean): void => {
    this.trackPage.toggleDisableResetBtn(isDisabled);
  };

  toggleDisableAllCarControl = (isDisabled: boolean): void => {
    this.trackPage.toggleDisableAllCarControl(isDisabled);
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

  startRace = (): void => {
    this.trackPage.startAllCars();
  };

  resetRace = (): void => {
    this.trackPage.resetAllCars();
  };

  setCarsAmount = (value: string): void => {
    this.trackPage.setCarsAmount(value);
  };

  toggleDisableGenerateBtn = (isDisabled: boolean): void => {
    this.trackPage.toggleDisableGenerateBtn(isDisabled);
  };
}
