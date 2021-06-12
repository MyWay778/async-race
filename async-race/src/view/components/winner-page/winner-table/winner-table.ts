import BaseComponent from '../../shared/base-component/base-component';
import {
  rowTableItemCreator,
  headerRowItemCreator,
  sortingFns,
} from './helper';
import { WinnerTableSortFnType, WinnerTableType } from './types';

export default class WinnerTable extends BaseComponent {
  private readonly wingsBtn: HTMLButtonElement;
  private readonly bestTimeBtn: HTMLButtonElement;
  private readonly body: HTMLElement;
  private readonly placeholder: HTMLElement;
  private winners: WinnerTableType[];
  private sorting?: WinnerTableSortFnType;

  constructor() {
    super('table', 'winner-table');

    const header = document.createElement('thead');
    header.classList.add('winner-table__head');

    const headRow = document.createElement('tr');
    headRow.classList.add('winner-table__row');

    this.wingsBtn = document.createElement('button');
    this.wingsBtn.classList.add('winner-table__button');
    this.wingsBtn.onclick = this.sortHandler.bind(
      this,
      this.wingsBtn,
      sortingFns.sortWinsUp,
      sortingFns.sortWinsDown
    );

    this.bestTimeBtn = document.createElement('button');
    this.bestTimeBtn.classList.add('winner-table__button');
    this.bestTimeBtn.onclick = this.sortHandler.bind(
      this,
      this.bestTimeBtn,
      sortingFns.sortBestTimeUp,
      sortingFns.sortBestTimeDown
    );

    headRow.append(
      headerRowItemCreator('Number', ['winner-table__header']),
      headerRowItemCreator('Car', ['winner-table__header']),
      headerRowItemCreator('Name', ['winner-table__header']),
      headerRowItemCreator(
        'Wins',
        ['winner-table__header', 'winner-table__header_selected'],
        this.wingsBtn
      ),
      headerRowItemCreator(
        'BestTime',
        ['winner-table__header', 'winner-table__header_selected'],
        this.bestTimeBtn
      )
    );

    header.append(headRow);

    this.body = document.createElement('tbody');
    this.body.classList.add('winner-table__body');

    this.element.append(header, this.body);

    this.placeholder = document.createElement('p');
    this.placeholder.textContent = 'No winners yet';
  }

  setWinners(winners: WinnerTableType[]): void {
    this.winners = winners;
    if (this.sorting) {
      this.sortWinners(this.sorting);
    }
    this.showWinners();
  }

  private sortHandler = (
    button: HTMLButtonElement,
    sortUp: WinnerTableSortFnType,
    sortDown: WinnerTableSortFnType
  ): void => {
    if (!button.classList.contains('winner-table__btn_clicked')) {
      button.classList.add('winner-table__btn_clicked');
    }

    if (button.classList.contains('winner-table__btn_downSort')) {
      button.classList.replace(
        'winner-table__btn_downSort',
        'winner-table__btn_upSort'
      );
      this.sorting = sortUp;
    } else if (button.classList.contains('winner-table__btn_upSort')) {
      button.classList.replace(
        'winner-table__btn_upSort',
        'winner-table__btn_downSort'
      );
      this.sorting = sortDown;
    } else {
      button.classList.add('winner-table__btn_downSort');
      this.sorting = sortDown;
    }

    this.sortWinners(this.sorting);
    this.showWinners();
  };

  private sortWinners = (sortFn: WinnerTableSortFnType): void => {
    this.winners.sort(sortFn);
  };

  private showWinners = (): void => {
    if (!this.winners.length) {
      this.element.replaceWith(this.placeholder);
    } else {
      this.placeholder.replaceWith(this.element);
    }
    if (this.body.children.length) {
      this.body.innerHTML = '';
    }
    this.winners.forEach((winner, ind) => {
      const tableRow = rowTableItemCreator(String(ind + 1), winner);
      this.body.append(tableRow);
    });
  };
}
