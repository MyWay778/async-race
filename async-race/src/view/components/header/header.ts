import BaseComponent from '../shared/base-component/base-component';
import Button from '../shared/button/button';
import './header.scss';
import { HeaderHandlersType } from './types';

class Header extends BaseComponent {
  readonly element: HTMLElement;
  private readonly buttons: HTMLButtonElement[];

  constructor(handlers: HeaderHandlersType) {
    super('header');
    this.element.classList.add('header');
    const nav = document.createElement('nav');

    const garageBtn = new Button('garage', ['header__btn'], handlers.selectGaragePage);
    const winnersBtn = new Button('winners', ['header__btn'], handlers.selectWinnersPage);

    nav.append(garageBtn.element, winnersBtn.element);

    this.element.append(nav);
  }
}

export default Header;
