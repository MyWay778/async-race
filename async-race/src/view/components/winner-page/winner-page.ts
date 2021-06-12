import IStore from '@store/i_store';
import { State } from '@store/state/i_state';
import { WinnerType } from '@store/state/types';
import { StoreListenerType } from '@store/types';
import { BaseComponent } from '../index';
import { createPageNumberBlock, createTitleBlock } from '../track-page/helpers';
import Paginator from '../track-page/paginator/paginator';
import { PaginatorHandlersType } from '../track-page/paginator/types';
import { InfoBlockSetterType } from '../track-page/types';
import IWinnerTable from './winner-table/i_winner-table';
import { WinnerTableType } from './winner-table/types';
import WinnerTable from './winner-table/winner-table';

export default class WinnerPage extends BaseComponent {
  private state: State;
  private winners: WinnerType[] = [];
  private winnersCount: string;
  private maxPage: number;
  private setTitleBlock: InfoBlockSetterType;
  private setPageNumberBlock: InfoBlockSetterType;
  private winnerTable: IWinnerTable;
  private paginator: Paginator;

  constructor(private readonly store: IStore, handlers: PaginatorHandlersType) {
    super('main', 'main');

    this.paginator = new Paginator(handlers);

    this.initialization();
    this.store.subscribe(this.stateListener);
  }

  initialization = (): void => {
    const [titleBlock, setTitleBlock] = createTitleBlock('Winners');
    this.setTitleBlock = setTitleBlock;

    const [pageNumberBlock, setPageNumberBlock] = createPageNumberBlock();
    this.setPageNumberBlock = setPageNumberBlock;

    this.winnerTable = new WinnerTable();

    this.element.append(
      titleBlock,
      pageNumberBlock,
      this.winnerTable.element,
      this.paginator.element
    );
  };

  stateListener: StoreListenerType = (state: State): void => {
    if (!this.state) {
      this.state = state;
      this.updateAll();
      return;
    }

    if (this.winnersCount !== state.winnersCount) {
      this.winnersCount = state.winnersCount;
      this.updateWinnersCount();
    }

    if (this.state.currentWinnersPage !== state.currentWinnersPage) {
      this.updatePageNumberBlock();
    }

    if (this.winners !== state.winners) {
      this.winners = state.winners;
      this.updateWinnerTable();
    }

    this.paginator.change(state.currentWinnersPage, Number(state.winnersCount), state.winnersLimit);
  };

  updatePageNumberBlock = (): void => {
    this.maxPage = Math.ceil(
      Number(this.state.winnersCount) / this.state.winnersLimit
    );
    this.setPageNumberBlock(String(this.state.currentWinnersPage));
  };

  updateWinnersCount = (): void => {
    this.setTitleBlock(String(this.winnersCount));
  };

  updateWinnerTable = (): void => {
    const winners: WinnerTableType[] = [];
    this.winners.forEach((winner) => {
      const winnerForTable: WinnerTableType = {
        color: winner.color,
        name: winner.name,
        bestTime: winner.time,
        wins: winner.wins,
      };
      winners.push(winnerForTable);
    });

    this.winnerTable.setWinners(winners);
  };

  updateAll = (): void => {
    this.updatePageNumberBlock();
    this.updateWinnersCount();
    this.updateWinnerTable();
  };
}
