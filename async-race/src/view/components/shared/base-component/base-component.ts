import IBaseComponent from './i_base-component';

class BaseComponent implements IBaseComponent {
  readonly element: HTMLElement;

  constructor(
    elementTag: keyof HTMLElementTagNameMap,
    className?: string,
    children?: HTMLElement[]
  ) {
    this.element = document.createElement(elementTag);
    this.element.classList.add(className);

    if (children) {
      this.element.append(...children);
    }
  }

  render(root?: HTMLElement): void {
    if (root) {
      root.append(this.element);
    }
  }
}

export default BaseComponent;
