import BaseComponent from '../base-component/base-component';
import './button.scss';

export default class Button extends BaseComponent {
  constructor(
    btnText: string,
    className: string[],
    clickHandler?: (e: MouseEvent) => void
  ) {
    super('button');
    this.element.className = `${className.join(' ')} button_default`;
    this.element.textContent = btnText;
    if (clickHandler) {
      this.element.onclick = clickHandler;
    }
  }

  toggleDisabling = (isDisabled: boolean): void => {
    if (this.element instanceof HTMLButtonElement) {
      if (isDisabled && !this.element.disabled) {
        this.element.disabled = isDisabled;
      } else if (!isDisabled && this.element.disabled) {
        this.element.disabled = isDisabled;
      }
    }
  };
}
