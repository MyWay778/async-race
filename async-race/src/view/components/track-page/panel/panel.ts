import { CarType } from '@store/state/types';
import BaseComponent from '../../shared/base-component';
import CarInput from './car-input/car-input';
import { CarInputType } from './car-input/types';
import IPanel from './i_panel';
import './panel.scss';
import { PanelHandlersType } from './types';

class Panel extends BaseComponent implements IPanel {
  readonly element: HTMLElement;
  private readonly create: CarInput;
  private readonly update: CarInput;

  constructor(handlers: PanelHandlersType) {
    super('section');
    this.element.classList.add('garage-panel');

    this.create = new CarInput('create');
    this.create.onclick = (car: CarInputType) => {
      handlers.createCarHandler(car);
      this.create.setValues({ name: '', color: '' });
    };
    this.create.render(this.element);

    this.update = new CarInput('update', true);
    this.update.render(this.element);
    this.update.element.dataset.type = 'update'; // To deactivate by clicking outside
    this.update.onclick = handlers.updateCarHandler;
  }

  toggleDisableUpdateInput = (isDisabled: boolean): void => {
    this.update.toggleDisabled(isDisabled);
  };

  setUpdateInputValues = (car: CarType): void => {
    this.update.setValues(car);
  };
}

export default Panel;
