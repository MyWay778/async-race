import BaseComponent from '../../shared/base-component/base-component';
import './car.scss';
import createSvgCar from './helpers';
import carSvgImage from './constants';
import { CarHandlersType } from './types/handlers';
import ICar from './types/i_car';

export default class Car extends BaseComponent implements ICar {
  private car: HTMLElement;
  private carImage: SVGSVGElement;
  private requestAnimationId: number;
  private startBtn: HTMLButtonElement;
  private stopBtn: HTMLButtonElement;

  constructor(
    readonly id: number,
    private readonly name: string,
    private readonly color: string,
    private readonly handlers: CarHandlersType
  ) {
    super('li');
    this.element.classList.add('car');
    this.init();
  }

  init = (): void => {
    this.createCarHeader();
    this.createCarTrack();
  };

  start = (movementTime: number): void => {
    const start = performance.now();
    const animate = (time: number): void => {
      let timeFraction = (time - start) / movementTime;
      if (timeFraction > 1) {
        timeFraction = 1;
      }

      const progress = timeFraction;
      this.carImage.style.left = `${progress * 100}%`;

      if (timeFraction < 1) {
        this.requestAnimationId = requestAnimationFrame(animate);
      } else {
        this.handlers.finishedCarHandler(this.id, movementTime);
      }
    };
    this.requestAnimationId = requestAnimationFrame(animate);
  };

  stop = (): void => {
    if (this.requestAnimationId) {
      cancelAnimationFrame(this.requestAnimationId);
      this.requestAnimationId = undefined;
    }
  };

  comeBack = (): void => {
    this.stop();
    this.carImage.style.left = '0%';
  };

  startHandler = (): void => {
    this.startBtn.disabled = true;
    this.stopBtn.disabled = false;

    this.handlers.startCarHandler(this);
  };

  private createCarTrack() {
    const carTrack = document.createElement('div');
    carTrack.classList.add('car-track');

    const startStopControl = document.createElement('div');
    startStopControl.classList.add('car-track-engine-control');

    this.startBtn = document.createElement('button');
    this.startBtn.classList.add('car-track-engine-control__btn');
    this.startBtn.textContent = 'A';
    this.startBtn.onclick = this.startHandler;

    this.stopBtn = document.createElement('button');
    this.stopBtn.classList.add('car-track-engine-control__btn');
    this.stopBtn.textContent = 'B';
    this.stopBtn.disabled = true;
    this.stopBtn.onclick = (): void => {
      this.stopBtn.disabled = true;
      this.startBtn.disabled = false;

      this.handlers.stopCarHandler(this);
    };

    this.car = document.createElement('figure');
    this.car.classList.add('car-track-car');

    this.carImage = createSvgCar(
      carSvgImage.className,
      carSvgImage.width,
      carSvgImage.height,
      carSvgImage.viewBox,
      carSvgImage.imageHref,
      carSvgImage.imageId
    );
    this.carImage.style.fill = this.color;

    const flag = document.createElement('figure');
    flag.classList.add('car-track__finish');

    this.car.append(this.carImage);
    startStopControl.append(this.startBtn, this.stopBtn);
    carTrack.append(startStopControl, this.car, flag);
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
    selectBtn.onclick = (e: MouseEvent) => {
      e.stopPropagation(); // To prevent the root listener from capturing the event
      this.handlers.selectCarHandler({
        id: this.id,
        name: this.name,
        color: this.color,
      });
    };

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('car-panel__btn');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => {
      this.handlers.removeCarHandler(this.id);
    };

    const carName = document.createElement('div');
    carName.classList.add('car-header__name');
    carName.textContent = this.name;

    carPanel.append(selectBtn, removeBtn);
    header.append(carPanel, carName);
    this.element.append(header);
  }
}
