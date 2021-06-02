class BaseComponent {
  readonly element: HTMLElement;

  constructor(elementTag: keyof HTMLElementTagNameMap) {
    this.element = document.createElement(elementTag);
  }

  render(root: HTMLElement) {
    root.append(this.element);
  }
}

export default BaseComponent;