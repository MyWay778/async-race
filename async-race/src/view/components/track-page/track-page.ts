import Panel from './panel/panel';

import './track-page.scss';
import BaseComponent from '../shared/base-component';
import Paginator from './paginator/paginator';
import Car from './car/car';
import { createPageNumberBlock, createTitleBlock } from './helpers';
import ITrackPage from './i_track-page';


class TrackPage extends BaseComponent implements ITrackPage{
  constructor() {
    super('main');
    this.element.classList.add('main');
    const panel = new Panel();

    const trackSection = document.createElement('section');
    const titleBlock = createTitleBlock();
    const pageNumberBlock = createPageNumberBlock();

    const carList = document.createElement('ul');
    carList.classList.add('car-list');
    
    const car = new Car('dsa', '#fff');
    carList.append(car.element);

    const paginator = new Paginator();

    trackSection.append(panel.element, titleBlock, pageNumberBlock, carList, paginator.element);
    this.element.append(trackSection);
  }

  showCars(cars: []) {

  }
}

export default TrackPage;
