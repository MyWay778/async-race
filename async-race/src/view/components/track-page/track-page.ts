import { CarType } from '@store/state/types';
import Panel from './panel/panel';
import './track-page.scss';
import BaseComponent from '../shared/base-component';
import Paginator from './paginator/paginator';
import Car from './car/car';
import { createPageNumberBlock, createTitleBlock } from './helpers';
import ITrackPage from './i_track-page';
import { TrackPageHandlersType } from './types';
import IPanel from './panel/i_panel';

export { ITrackPage };

class TrackPage extends BaseComponent implements ITrackPage {
  private readonly carList: HTMLUListElement;
  private readonly panel: IPanel;

  constructor(private readonly handlers: TrackPageHandlersType) {
    super('main');
    this.element.classList.add('main');

    this.panel = new Panel({
      createCarHandler: this.handlers.createCarHandler,
      updateCarHandler: this.handlers.updateCarHandler,
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
      const messageLine = document.createElement('li');
      messageLine.classList.add('car-list__message');
      messageLine.textContent = 'The Garage is empty.';
      this.carList.append(messageLine);
      return;
    }

    if (this.carList.children.length !== 0) {
      this.carList.innerHTML = '';
    }
    cars.forEach((car) => {
      const newCar = new Car(car.id, car.name, car.color, this.handlers);
      this.carList.append(newCar.element);
    });
  };

  toggleDisableUpdateBtn = (isDisabled: boolean): void => {
    this.panel.toggleDisableUpdateInput(isDisabled);
  };

  setUpdateInputValues = (car: CarType): void => {
    this.panel.setUpdateInputValues(car);
  }

  showCar = (car: CarType): void => {
    const newCar = new Car(car.id, car.name, car.color, this.handlers);
    this.carList.append(newCar.element);
  };
}

export default TrackPage;
