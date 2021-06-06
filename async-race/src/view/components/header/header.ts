import BaseComponent from '../shared/base-component/base-component';
import './header.scss';

class Header extends BaseComponent {
  readonly element: HTMLElement;
  private readonly buttons: HTMLButtonElement[];

  constructor() {
    super('header');
    this.element.classList.add('header');
    const nav = document.createElement('nav');

    const garageBtn = document.createElement('button');
    garageBtn.classList.add('header__btn');
    garageBtn.textContent = 'to garage';

    const winnersBtn = document.createElement('button');
    winnersBtn.classList.add('header__btn');
    winnersBtn.textContent = 'to winners';

    nav.append(garageBtn, winnersBtn);

    this.element.append(nav);
  }
}

export default Header;
