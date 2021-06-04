import BaseComponent from '../../../shared/base-component';
import { CreateCarHandlerType, CarInputType } from './types';

class CarInput extends BaseComponent {
  readonly element: HTMLDivElement;
  private readonly btn: HTMLButtonElement;
  private readonly nameInput: HTMLInputElement;
  private readonly colorInput: HTMLInputElement;

  constructor(btnText: string) {
    super('div');
    this.element.classList.add('car-input');

    this.nameInput = document.createElement('input');
    this.nameInput.classList.add('car-input__name');

    this.colorInput = document.createElement('input');
    this.colorInput.type = 'color';
    this.colorInput.classList.add('car-input__color');

    this.btn = document.createElement('button');
    this.btn.classList.add('car-input__button');
    this.btn.textContent = btnText;

    this.element.append(this.nameInput, this.colorInput, this.btn);
  }

  set onclick(handler: CreateCarHandlerType) {
    this.btn.onclick = () => {
      const newCar: CarInputType = {
        name: this.nameInput.value || 'Car',
        color: this.colorInput.value || '#fff',
      };
      handler(newCar);
    };
  }
}

export default CarInput;
