import BaseComponent from '../../shared/base-component';
import CarInput from './car-input/car-input';
import { CreateCarHandlerType } from './car-input/types';
import IPanel from './i_panel';
import './panel.scss';

class Panel extends BaseComponent implements IPanel{
  readonly element: HTMLElement;
  private readonly create: CarInput;

  constructor() {
    super('section');
    this.element.classList.add('garage-panel');

    this.create = new CarInput('create');
    this.create.render(this.element);
  }

  setCreateBtnHandler(handler: CreateCarHandlerType): void {
    this.create.onclick = handler;
  }
}

export default Panel;
