import Button from '../../shared/button/button';
import BaseComponent from '../../shared/base-component/base-component';
import IPaginator from './i_paginator';
import './paginator.scss';
import {
  PaginatorBtnNameType,
  PaginatorButtonsType,
  PaginatorHandlersType,
} from './types';
import elementStatus from '../panel/constants';

class Paginator extends BaseComponent implements IPaginator {
  private buttons: PaginatorButtonsType = {};

  constructor(handlers: PaginatorHandlersType) {
    super('section');
    this.element.classList.add('paginator');

    this.buttons.prev = new Button(
      'Prev',
      ['paginator__button'],
      handlers.prevPageHandler
    );
    this.buttons.prev.render(this.element);

    this.buttons.next = new Button(
      'Next',
      ['paginator__button'],
      handlers.nextPageHandler
    );
    this.buttons.next.render(this.element);
  }

  toggleDisableBtn = (
    btnName: PaginatorBtnNameType,
    isDisabled: boolean
  ): void => {
    if (btnName === 'all') {
      Object.values(this.buttons).forEach((btn) =>
        btn.toggleDisabling(isDisabled)
      );
      return;
    }
    this.buttons[btnName].toggleDisabling(isDisabled);
  };

  change = (
    currentPage: number,
    allItems: number,
    itemsLimit: number
  ): void => {
    const maxPage = Math.ceil(allItems / itemsLimit);

    this.toggleDisableBtn('all', elementStatus.disabled);

    if (currentPage === maxPage && maxPage !== 1) {
      this.toggleDisableBtn('prev', elementStatus.undisabled);
    }

    if (currentPage < maxPage) {
      this.toggleDisableBtn('next', elementStatus.undisabled);
    }
    if (currentPage > 1) {
      this.toggleDisableBtn('prev', elementStatus.undisabled);
    }
  };
}

export default Paginator;
