import { CarType } from '@store/state/types';
import Button from '../../shared/button/button';
import BaseComponent from '../../shared/base-component/base-component';
import CarInput from './car-input/car-input';
import { CarInputType } from './car-input/types';
import IPanel from './i_panel';
import './panel.scss';
import { PanelHandlersType } from './types';

class Panel extends BaseComponent implements IPanel {
  readonly element: HTMLElement;
  private readonly create: CarInput;
  private readonly update: CarInput;
  private readonly raceBtn: Button;

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

    this.raceBtn = new Button('Race', ['garage-panel__btn', 'async-race_btn'], handlers.startRaceHandler);
    this.raceBtn.render(this.element);
  }

  toggleDisableUpdateInput = (isDisabled: boolean): void => {
    this.update.toggleDisabled(isDisabled);
  };

  setUpdateInputValues = (car: CarType): void => {
    this.update.setValues(car);
  };
}

export default Panel;
