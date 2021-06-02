import BaseComponent from '../base-component';
import Car from './car';
import Paginator from './paginator';
import Panel from './panel/panel';

import './garage.scss';

const createTitleBlock = () => {
  const titleBlock = document.createElement('div');
  titleBlock.classList.add('garage-title');

  const title = document.createElement('h2');
  title.classList.add('garage-title__title');
  title.innerHTML = 'Garage&nbsp;';

  const carCount = document.createElement('span');
  carCount.classList.add('garage-title__count');
  carCount.textContent = '(0)';

  titleBlock.append(title, carCount);

  return titleBlock;
};

const createPageNumberBlock = () => {
  const pageNumberBlock = document.createElement('div');
  pageNumberBlock.classList.add('garage-page-number');

  const pageNumberTitle = document.createElement('h3');
  pageNumberTitle.classList.add('garage-page-number__title');
  pageNumberTitle.innerHTML = 'Page&nbsp;';

  const pageNumber = document.createElement('span');
  pageNumber.classList.add('garage-page-number__number');
  pageNumber.textContent = '#1';

  pageNumberBlock.append(pageNumberTitle, pageNumber);
  
  return pageNumberBlock;
};

class Garage extends BaseComponent {
  constructor() {
    super('main');
    this.element.classList.add('main');
    const panel = new Panel();

    const trackSection = document.createElement('section');
    const titleBlock = createTitleBlock();
    const pageNumberBlock = createPageNumberBlock();

    const carList = document.createElement('ul');
    carList.classList.add('car-list');
    
    const car = new Car();
    carList.append(car.element);

    const paginator = new Paginator();

    trackSection.append(panel.element, titleBlock, pageNumberBlock, carList, paginator.element);
    this.element.append(trackSection);
  }
}

export default Garage;
