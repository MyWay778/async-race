import BaseComponent from "../../base-component";

class CarInput  extends BaseComponent {
  readonly element: HTMLDivElement;

  constructor(btnText: string) {
    super('div');
    this.element.classList.add('car-input');

    const nameInput = document.createElement('input');
    nameInput.classList.add('car-input__name');

    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    colorInput.classList.add('car-input__color');

    const btn = document.createElement('button');
    btn.classList.add('car-input__button');
    btn.textContent = btnText;
    
    this.element.append(nameInput, colorInput, btn);
  }
}

export default CarInput;