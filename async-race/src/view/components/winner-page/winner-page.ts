import IStore from '@store/i_store';
import { StoreListenerType, StoreWinnersPageType, WinnerType } from '@store/types';
import { createPageNumberBlock, createTitleBlock } from '../track-page/helpers';
import Paginator from '../track-page/paginator/paginator';
import { PaginatorHandlersType } from '../track-page/paginator/types';
import { InfoBlockSetterType } from '../track-page/types';
import IWinnerTable from './winner-table/i_winner-table';
import { WinnerTableType } from './winner-table/types';
import WinnerTable from './winner-table/winner-table';

import { BaseComponent } from '../index';

export default class WinnerPage extends BaseComponent {
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
    this.store.subscribe('winnersPage', this.stateListener);
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

  stateListener: StoreListenerType = (propName): void => {
    const winnersState = this.store.getState('winnersPage');

    if (propName === 'winners') {
      if (!this.winners.length) {
        this.winners = [];
      }
      this.winners = winnersState.winners;
      this.updateWinnerTable()
    }

    if (propName === 'winnersCount') {
      this.winnersCount = String(winnersState.winnersCount);
      this.updateWinnersCount();
    }

    if (propName === 'currentWinnersPage') {
      this.updatePageNumberBlock(winnersState);
    }

    if (propName === 'currentWinnersPage' || propName === 'winnersCount') {
      this.paginator.change(
        winnersState.currentWinnersPage,
        Number(winnersState.winnersCount),
        winnersState.winnersLimit
      );
    }
  };

  updatePageNumberBlock = (winnersState: StoreWinnersPageType): void => {
    this.maxPage = Math.ceil(
      Number(winnersState.winnersCount) / winnersState.winnersLimit
    );
    this.setPageNumberBlock(String(winnersState.currentWinnersPage));
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
}
