import Button from '../../../shared/button/button';
import BaseComponent from '../../../shared/base-component/base-component';
import ICarInput from './i_car-input';
import {
  CreateCarHandlerType,
  CarInputType,
  CarInputValuesType,
} from './types';
import './car-input.scss';

class CarInput extends BaseComponent implements ICarInput {
  readonly element: HTMLDivElement;
  private readonly btn: Button;
  private readonly nameInput: HTMLInputElement;
  private readonly colorInput: HTMLInputElement;

  constructor(btnText: string, private isDisabled = false) {
    super('div', 'car-input');

    this.nameInput = document.createElement('input');
    this.nameInput.classList.add('car-input__name');

    this.colorInput = document.createElement('input');
    this.colorInput.type = 'color';
    this.colorInput.classList.add('car-input__color');
    this.colorInput.value = '#ffffff';

    this.btn = new Button(btnText, ['car-input__button']);

    // this.btn = document.createElement('button');
    // this.btn.classList.add('car-input__button');
    // this.btn.textContent = btnText;

    this.checkDisabled();

    this.element.append(this.nameInput, this.colorInput, this.btn.element);
  }

  set onclick(handler: CreateCarHandlerType) {
    this.btn.element.onclick = () => {
      const newCar: CarInputType = {
        name: this.nameInput.value || 'Car',
        color: this.colorInput.value || '#ffffff',
      };
      handler(newCar);
      this.setValues({ color: '', name: '' });
    };
  }

  toggleDisabled = (isDisabled: boolean): void => {
    this.isDisabled = isDisabled;
    this.checkDisabled();
  };

  setValues = (values: CarInputValuesType): void => {
    this.nameInput.value = values?.name || '';
    this.colorInput.value = values?.color || '#ffffff';
  };

  private checkDisabled = () => {
    if (this.isDisabled) {
      this.nameInput.disabled = true;
      this.colorInput.disabled = true;
      (this.btn.element as HTMLButtonElement).disabled = true;
    } else {
      this.nameInput.disabled = false;
      this.colorInput.disabled = false;
      (this.btn.element as HTMLButtonElement).disabled = false;
    }
  };
}

export default CarInput;
