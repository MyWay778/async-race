import BaseComponent from '../../shared/base-component/base-component';
import { rowTableItemCreator, headerRowItemCreator } from './helper';
import { WinnerTableType } from './types';

export default class WinnerTable extends BaseComponent {
  private readonly wingsBtn: HTMLButtonElement;
  private readonly bestTimeBtn: HTMLButtonElement;
  private readonly body: HTMLElement;
  private readonly placeholder: HTMLElement;

  constructor() {
    super('table', 'winner-table');

    const header = document.createElement('thead');
    header.classList.add('winner-table__head');

    const headRow = document.createElement('tr');
    headRow.classList.add('winner-table__row');

    this.wingsBtn = document.createElement('button');
    this.wingsBtn.classList.add('winner-table__button');

    this.bestTimeBtn = document.createElement('button');
    this.bestTimeBtn.classList.add('winner-table__button');

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
    if (!winners.length) {
      this.element.replaceWith(this.placeholder);
    } else {
        this.placeholder.replaceWith(this.element);
    }
    if (this.body.children.length) {
      this.body.innerHTML = '';
    }
    winners.forEach((winner, ind) => {
      const tableRow = rowTableItemCreator(String(ind + 1), winner);
      this.body.append(tableRow);
    });
  }
}
