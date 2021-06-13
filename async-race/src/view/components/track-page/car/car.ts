import IController from '@controller/i_controller';
import BaseComponent from '../../shared/base-component/base-component';
import './car.scss';
import carSvgImage from './constants';
import createSvgCar from './helpers';
import ICar from './i_car';
import { CarBtnNameType, CarControlType } from './types';

export default class Car extends BaseComponent implements ICar {
  private car: HTMLElement;
  private carImage: SVGSVGElement;
  private requestAnimationId: number;
  private startBtn: HTMLButtonElement;
  private stopBtn: HTMLButtonElement;
  private selectBtn: HTMLButtonElement;
  private removeBtn: HTMLButtonElement;
  private control: CarControlType = {};
  status: 'started' | 'stopped' | 'ready' = 'ready';

  constructor(
    readonly id: number,
    private readonly name: string,
    private readonly color: string,
    private readonly controller: IController
  ) {
    super('li', 'car-list__car');
    this.init();
  }

  init = (): void => {
    this.createCarHeader();
    this.createCarTrack();
  };

  start = (movementTime: number): void => {
    this.status = 'started';
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
        this.controller.finishCar(this.id, movementTime); // Check needed
      }
    };
    this.requestAnimationId = requestAnimationFrame(animate);
  };

  stop = (): void => {
    if (this.requestAnimationId) {
      cancelAnimationFrame(this.requestAnimationId);
      this.requestAnimationId = undefined;
      this.status = 'stopped';
    }
  };

  comeBack = (): void => {
    this.stop();
    this.carImage.style.left = '0%';
    this.status = 'ready';
  };

  startHandler = (): void => {
    this.startBtn.disabled = true;
    return this.controller.startCar(this.id);
  };

  stopHandler = (): void => {
    this.stopBtn.disabled = true;
    return this.controller.stopCar(this.id);
  };

  toggleStopBtn = (isDisabled: boolean): void => {
    this.stopBtn.disabled = isDisabled;
  };

  toggleStartBtn = (isDisabled: boolean): void => {
    this.startBtn.disabled = isDisabled;
  };

  toggleDisableBtn = (
    button: CarBtnNameType | CarBtnNameType[],
    isDisabled: boolean
  ): void => {
    if (button instanceof Array) {
      button.forEach((btn) => {
        this.control[btn].disabled = isDisabled;
      });
    } else {
      if (button === 'all') {
        Object.values(this.control).forEach((btn) => {
          const btnCopy = btn; // For Lint
          btnCopy.disabled = isDisabled;
        });
        return;
      }
      this.control[button].disabled = isDisabled;
    }
  };

  toggleDisableAllButtons = (isDisabled: boolean): void => {
    this.startBtn.disabled = isDisabled;
    this.stopBtn.disabled = isDisabled;
    this.selectBtn.disabled = isDisabled;
    this.removeBtn.disabled = isDisabled;
  };

  private createCarHeader() {
    const header = document.createElement('div');
    header.classList.add('car-header');

    const carPanel = document.createElement('div');
    carPanel.classList.add('car-panel');

    this.selectBtn = document.createElement('button');
    this.selectBtn.classList.add('car-panel__btn', 'car-panel__btn_select');
    this.selectBtn.textContent = 'Select';
    this.control.select = this.selectBtn;
    this.selectBtn.onclick = (e: MouseEvent) => {
      e.stopPropagation(); // To prevent the root listener from capturing the event
      this.controller.selectUpdateCar({
        id: this.id,
        name: this.name,
        color: this.color,
      });
    };

    this.removeBtn = document.createElement('button');
    this.removeBtn.classList.add('car-panel__btn', 'car-panel__btn_remove');
    this.removeBtn.textContent = 'Remove';
    this.control.remove = this.removeBtn;
    this.removeBtn.onclick = () => {
      this.controller.removeCar(this.id);
    };

    const carName = document.createElement('div');
    carName.classList.add('car-header__name');
    carName.textContent = this.name;

    carPanel.append(this.selectBtn, this.removeBtn);
    header.append(carPanel, carName);
    this.element.append(header);
  }

  private createCarTrack() {
    const carTrack = document.createElement('div');
    carTrack.classList.add('car-track');

    const startStopControl = document.createElement('div');
    startStopControl.classList.add('car-track-engine-control');

    this.startBtn = document.createElement('button');
    this.startBtn.classList.add('car-track-engine-control__btn');
    this.startBtn.textContent = '🏁';
    this.startBtn.onclick = this.startHandler;
    this.control.start = this.startBtn;

    this.stopBtn = document.createElement('button');
    this.stopBtn.classList.add('car-track-engine-control__btn');
    this.stopBtn.textContent = '⛔';
    this.stopBtn.disabled = true;
    this.stopBtn.onclick = this.stopHandler;
    this.control.stop = this.stopBtn;

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
}
