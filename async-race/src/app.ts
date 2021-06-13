import Controller from './controller/controller';
import View from './view/view';
import Store from './store/store';

import './style.scss';

export default class App {
  constructor(private readonly root: HTMLElement) {}

  init(): void {
    const store = new Store();
    const controller = new Controller(store);
    const view = new View(controller, store);

    view.init(this.root);

    controller.showCars();
  }
}
