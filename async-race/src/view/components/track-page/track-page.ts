import { CarType } from '@store/state/types';
import Panel from './panel/panel';
import './track-page.scss';
import BaseComponent from '../shared/base-component';
import Paginator from './paginator/paginator';
import Car from './car/car';
import { createPageNumberBlock, createTitleBlock } from './helpers';
import ITrackPage from './i_track-page';
import { TrackPageHandlersType } from './types';

export {ITrackPage};

class TrackPage extends BaseComponent implements ITrackPage {
  private readonly carList: HTMLUListElement;

  constructor(private readonly handlers: TrackPageHandlersType) {
    super('main');
    this.element.classList.add('main');

    const panel = new Panel();
    panel.setCreateBtnHandler(this.handlers.createCarHandler);

    const trackSection = document.createElement('section');
    const titleBlock = createTitleBlock();
    const pageNumberBlock = createPageNumberBlock();

    this.carList = document.createElement('ul');
    this.carList.classList.add('car-list');

    const paginator = new Paginator();

    trackSection.append(
      panel.element,
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
      messageLine.textContent = 'The Garage is empty.'
      this.carList.append(messageLine);
      return;
    } 

    if (this.carList.children.length !== 0) {
      this.carList.innerHTML = '';
    }
    cars.forEach(car => {
      const newCar = new Car(car.id, car.name, car.color, this.handlers);
      this.carList.append(newCar.element);
    })
  };

  showCar = (car: CarType): void => {
    console.log('track-page', car);
    const newCar = new Car(car.id, car.name, car.color, this.handlers);
    this.carList.append(newCar.element);
  }
}

export default TrackPage;
