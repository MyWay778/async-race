import BaseComponent from '../../shared/base-component';
import './car.scss';
import ICar from './i_car';
import image from '../../../../assets/images/sedan-car.svg';
import createSvgCar from './helpers';

const carSvgImage = {
  className: 'car-track-car__image',
  width: 70,
  height: 22,
  viewBox: '0 0 99 37',
  imageHref: image,
  imageId: 'car'
}

class Car extends BaseComponent implements ICar {
  constructor(private name: string, private color: string) {
    super('li');
    this.element.classList.add('car');

    this.init();
  }

  init() {
    this.createCarHeader();
    this.createCarTrack();
  }

  private createCarTrack() {
    const carTrack = document.createElement('div');
    carTrack.classList.add('car-track');

    const startStopControl = document.createElement('div');
    startStopControl.classList.add('car-track-engine-control');

    const startBtn = document.createElement('button');
    startBtn.classList.add('car-track-engine-control__btn');
    startBtn.textContent = 'A';

    const stopBtn = document.createElement('button');
    stopBtn.classList.add('car-track-engine-control__btn');
    stopBtn.textContent = 'B';
    
    const car = document.createElement('figure');
    car.classList.add('car-track-car');

    // const carImage = `
    //   <svg height="22px" width="70px" style="fill: ${this.color || '#fff'}" viewbox="0 0 99 37" xmlns="http://www.w3.org/2000/svg">
    //     <use xlink:href="${image}#car"></use>
    //   </svg>`
    
    const carImage2 = createSvgCar(
      carSvgImage.className,
      carSvgImage.width,
      carSvgImage.height,
      carSvgImage.viewBox,
      carSvgImage.imageHref,
      carSvgImage.imageId
    );
    carImage2.style.fill = this.color;

    const flag = document.createElement('figure');
    flag.classList.add('car-track__finish');

    car.append(carImage2);
    startStopControl.append(startBtn, stopBtn);
    carTrack.append(startStopControl, car, flag);
    this.element.append(carTrack);
  }

  private createCarHeader() {
    const header = document.createElement('div');
    header.classList.add('car-header');

    const carPanel = document.createElement('div');
    carPanel.classList.add('car-panel');

    const selectBtn = document.createElement('button');
    selectBtn.classList.add('car-panel__btn');
    selectBtn.textContent = 'Select';

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('car-panel__btn');
    removeBtn.textContent = 'Remove';

    const carName = document.createElement('div');
    carName.classList.add('car-header__name');
    carName.textContent = this.name;

    carPanel.append(selectBtn, removeBtn);
    header.append(carPanel, carName);
    this.element.append(header);
  }
}

export default Car;
