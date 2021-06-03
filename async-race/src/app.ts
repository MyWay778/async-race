import Controller, { IController } from './controller/controller';
import View, { IView } from './view/view';
import Store from './store/store';

import './style.scss';

export default class App {
  private controller: IController;
  private view: IView;
  private store: any;

  constructor(private readonly root: HTMLElement) {}

  init(): void {
    this.view = new View(this.root);
    this.view.init();

    this.store = new Store(this.view);

    this.controller = new Controller(this.store);
    this.controller.showCars();
    
  }
}
