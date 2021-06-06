import IBaseComponent from './i_base-component';

class BaseComponent implements IBaseComponent {
  readonly element: HTMLElement;

  constructor(elementTag: keyof HTMLElementTagNameMap) {
    this.element = document.createElement(elementTag);
  }

  render(root: HTMLElement): void {
    root.append(this.element);
  }
}

export default BaseComponent;
