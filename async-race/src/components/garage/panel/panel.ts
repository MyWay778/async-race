import BaseComponent from "../../base-component";
import CarInput from "./car-input";
import './panel.scss';

class Panel extends BaseComponent {
  readonly element: HTMLElement;

  constructor() {
    super('section');
    this.element.classList.add('garage-panel');

    const create = new CarInput('create');
    create.render(this.element);
  }

}

export default Panel;
