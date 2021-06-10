import { CarType } from '@store/state/types';
import Panel from './panel/panel';
import './track-page.scss';
import BaseComponent from '../shared/base-component/base-component';
// import Paginator from './paginator/paginator';
import Car from './car/car';
import { createPageNumberBlock, createTitleBlock } from './helpers';
import ITrackPage from './i_track-page';
import { TrackPageHandlersType } from './types';
import IPanel from './panel/i_panel';
import ICar from './car/i_car';
import IPaginator from './paginator/i_paginator';

export { ITrackPage };

class TrackPage extends BaseComponent implements ITrackPage {
  private readonly carList: HTMLUListElement;
  private readonly panel: IPanel;
  private readonly paginator: IPaginator;
  private garage: ICar[] = [];
  // private setTitleBlock: (value: string) => void;

  constructor(
    private readonly handlers: TrackPageHandlersType,
    paginator: HTMLElement,
    titleBlock: HTMLElement,
    pageNumberBlock: HTMLElement
  ) {
    super('main', 'main');

    this.panel = new Panel({
      createCarHandler: this.handlers.createCarHandler,
      updateCarHandler: this.handlers.updateCarHandler,
      startRaceHandler: this.startRaceHandler,
      resetRaceHandler: this.resetRaceHandler,
      generateCarsHandler: this.handlers.generateCarsHandler,
    });

    const trackSection = document.createElement('section');
    // const [titleBlock, setTitleBlock] = createTitleBlock();
    // this.setTitleBlock = setTitleBlock;
    // const pageNumberBlock = createPageNumberBlock();

    this.carList = document.createElement('ul');
    this.carList.classList.add('car-list');

    // this.paginator = new Paginator({
    //   nextPageHandler: this.handlers.nextPageHandler,
    //   prevPageHandler: this.handlers.prevPageHandler,
    // });

    trackSection.append(
      this.panel.element,
      titleBlock,
      pageNumberBlock,
      this.carList,
      paginator
    );
    this.element.append(trackSection);
  }

  showCars = (cars: CarType[], carAmount?: number): void => {
    if (cars.length === 0) {
      this.carList.innerHTML = '';
      const messageLine = document.createElement('li');
      messageLine.classList.add('car-list__message');
      messageLine.textContent = 'The Garage is empty.';
      this.carList.append(messageLine);
      return;
    }

    if (this.carList.children.length !== 0) {
      this.carList.innerHTML = '';
      this.garage = [];
    }
    cars.forEach((car) => {
      this.showCar(car, carAmount);
    });
  };

  startRaceHandler = (): void => {
    this.handlers.startRaceHandler(this.garage);
  };

  resetRaceHandler = (): void => {
    this.handlers.resetRaceHandler(this.garage);
  };

  startAllCars = (): void => {
    this.garage.forEach((car) => car.startHandler());
  };

  resetAllCars = (): void => {
    this.garage.forEach((car) => car.stopHandler());
  };

  toggleDisableUpdateBtn = (isDisabled: boolean): void => {
    this.panel.toggleDisableUpdateInput(isDisabled);
  };

  toggleDisableCreateBtn = (isDisabled: boolean): void => {
    this.panel.toggleDisableCreateInput(isDisabled);
  };

  toggleDisableRaceBtn = (isDisabled: boolean): void => {
    this.panel.toggleDisableRaceBtn(isDisabled);
  };

  toggleDisableResetBtn = (isDisabled: boolean): void => {
    this.panel.toggleDisableResetBtn(isDisabled);
  };

  toggleDisableAllCarControl = (isDisabled: boolean): void => {
    this.garage.forEach((car) => car.toggleDisableBtn('all', isDisabled));
  };

  setUpdateInputValues = (car: CarType): void => {
    this.panel.setUpdateInputValues(car);
  };

  showCar = (car: CarType, carAmount?: number): void => {
    const newCar = new Car(car.id, car.name, car.color, this.handlers);
    this.garage.push(newCar);
    this.carList.append(newCar.element);
    // this.setTitleBlock(String(carAmount || this.garage.length));
  };

  setCarsAmount = (value: string): void => {
    // this.setTitleBlock(value);
  };

  toggleDisableGenerateBtn = (isDisabled: boolean): void => {
    this.panel.toggleDisableGenerateBtn(isDisabled);
  };
}

export default TrackPage;
