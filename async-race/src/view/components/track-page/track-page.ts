import { CarType } from '@store/state/types';
import Panel from './panel/panel';
import './track-page.scss';
import BaseComponent from '../shared/base-component/base-component';
import Paginator from './paginator/paginator';
import Car from './car/car';
import { createPageNumberBlock, createTitleBlock } from './helpers';
import ITrackPage from './i_track-page';
import { TrackPageHandlersType } from './types';
import IPanel from './panel/i_panel';
import ICar from './car/types/i_car';

export { ITrackPage };

class TrackPage extends BaseComponent implements ITrackPage {
  private readonly carList: HTMLUListElement;
  private readonly panel: IPanel;
  private garage: ICar[] = [];

  constructor(private readonly handlers: TrackPageHandlersType) {
    super('main');
    this.element.classList.add('main');

    this.panel = new Panel({
      createCarHandler: this.handlers.createCarHandler,
      updateCarHandler: this.handlers.updateCarHandler,
      startRaceHandler: this.startRaceHandler,
      resetRaceHandler: this.resetRaceHandler,
    });

    const trackSection = document.createElement('section');
    const titleBlock = createTitleBlock();
    const pageNumberBlock = createPageNumberBlock();

    this.carList = document.createElement('ul');
    this.carList.classList.add('car-list');

    const paginator = new Paginator();

    trackSection.append(
      this.panel.element,
      titleBlock,
      pageNumberBlock,
      this.carList,
      paginator.element
    );
    this.element.append(trackSection);
  }

  showCars = (cars: CarType[]): void => {
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
      this.showCar(car);
    });
  };

  startRaceHandler = (): void => {
    this.handlers.startRaceHandler(this.garage);
  }

  resetRaceHandler = (): void => {
    this.handlers.resetRaceHandler(this.garage);
  }

  startAllCars = (): void => {
    this.garage.forEach(car => car.startHandler());
  };

  resetAllCars = (): void => {
    this.garage.forEach(car => car.stopHandler());
  };

  toggleDisableUpdateBtn = (isDisabled: boolean): void => {
    this.panel.toggleDisableUpdateInput(isDisabled);
  };

  toggleDisableRaceBtn = (isDisabled: boolean): void => {
    this.panel.toggleDisableRaceBtn(isDisabled);
  };

  toggleDisableResetBtn = (isDisabled: boolean): void => {
    this.panel.toggleDisableResetBtn(isDisabled);
  };

  setUpdateInputValues = (car: CarType): void => {
    this.panel.setUpdateInputValues(car);
  };

  showCar = (car: CarType): void => {
    const newCar = new Car(car.id, car.name, car.color, this.handlers);
    this.garage.push(newCar);
    this.carList.append(newCar.element);
  };
}

export default TrackPage;
