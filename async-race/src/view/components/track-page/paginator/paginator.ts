import BaseComponent from '../../shared/base-component';
import './paginator.scss';

class Paginator extends BaseComponent {
  constructor() {
    super('section');
    this.element.classList.add('paginator');

    const content = `
      <button>prev</button>
      <button>next</button>
    `;

    this.element.innerHTML = content;
  }
}

export default Paginator;
