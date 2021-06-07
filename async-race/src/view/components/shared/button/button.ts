import BaseComponent from '../base-component/base-component';

export default class Button extends BaseComponent {
  constructor(
    btnText: string,
    className: string[],
    clickHandler?: (e: MouseEvent) => void
  ) {
    super('button');
    this.element.classList.add(...className);
    this.element.textContent = btnText;
    if (clickHandler) {
      this.element.onclick = clickHandler;
    }
  }

  toggleDisabling = (isDisabled: boolean): void => {
    if (this.element instanceof HTMLButtonElement) {
      this.element.disabled = isDisabled;
    }
  };
}
