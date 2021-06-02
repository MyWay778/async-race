import Garage from './components/garage/garage';
import Header from './components/header/header';

import './style.scss';

class App {
  private root: HTMLElement;

  constructor(root: HTMLElement) {
    this.root = root;

    const header = new Header();
    header.render(root);

    const garage = new Garage();
    garage.render(root);
  }
}

export default App;
