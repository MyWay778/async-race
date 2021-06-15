import { StoreCarType } from '@store/types';
import Button from '../../shared/button/button';
import BaseComponent from '../../shared/base-component/base-component';
import CarInput from './car-input/car-input';
import { CarInputType } from './car-input/types';
import IPanel from './i_panel';
import './panel.scss';
import { PanelHandlersType } from './types';
import elementStatus from './constants';

class Panel extends BaseComponent implements IPanel {
  readonly element: HTMLElement;
  private readonly create: CarInput;
  private readonly update: CarInput;
  private readonly raceBtn: Button;
  private readonly resetBtn: Button;
  private readonly generateBtn: Button;
  readonly blockBtnStatus = {
    create: false,
    update: false,
    race: false,
    reset: false,
    generate: false,
  };

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

    this.update.element.onclick = (e) => {
      e.stopPropagation();
    };

    this.raceBtn = new Button('Race', ['garage-panel__btn'], () => {
      this.raceBtn.toggleDisabling(elementStatus.disabled);
      handlers.startRaceHandler();
    });
    this.raceBtn.render(this.element);

    this.resetBtn = new Button(
      'Reset',
      ['garage-panel__btn'],
      handlers.resetRaceHandler
    );
    this.resetBtn.render(this.element);

    this.generateBtn = new Button(
      'Generate',
      ['garage-panel__btn'],
      handlers.generateCarsHandler
    );
    this.generateBtn.render(this.element);
  }

  toggleDisableUpdateInput = (isDisabled: boolean): void => {
    this.blockBtnStatus.update = isDisabled;
    this.update.toggleDisabled(isDisabled);
  };

  toggleDisableCreateInput = (isDisabled: boolean): void => {
    this.blockBtnStatus.create = isDisabled;
    this.create.toggleDisabled(isDisabled);
  };

  toggleDisableRaceBtn = (isDisabled: boolean): void => {
    this.blockBtnStatus.race = isDisabled;
    this.raceBtn.toggleDisabling(isDisabled);
  };

  toggleDisableResetBtn = (isDisabled: boolean): void => {
    this.blockBtnStatus.reset = isDisabled;
    this.resetBtn.toggleDisabling(isDisabled);
  };

  toggleDisableGenerateBtn = (isDisabled: boolean): void => {
    this.blockBtnStatus.generate = isDisabled;
    this.generateBtn.toggleDisabling(isDisabled);
  };

  setUpdateInputValues = (car: StoreCarType): void => {
    this.update.setValues(car);
  };
}

export default Panel;
