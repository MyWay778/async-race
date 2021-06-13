import IController from '@controller/i_controller';
import IStore from '@store/i_store';
import { StoreListenerType } from '@store/types';
import { Header, TrackPage } from './components/index';
import ITrackPage from './components/track-page/i_track-page';
import WinnerPage from './components/winner-page/winner-page';
import IView from './i_view';

export { IView };

export default class View implements IView {
  private root: HTMLElement;
  private trackPage: ITrackPage;
  private winnerPage: WinnerPage;

  constructor(
    private readonly controller: IController,
    private readonly store: IStore
  ) {}

  init = (root: HTMLElement): void => {
    this.root = root;

    this.store.subscribe('global', this.viewListener);

    const header = new Header({
      selectGaragePage: this.controller.selectPage.bind(
        this.controller,
        'garage'
      ),
      selectWinnersPage: this.controller.selectPage.bind(
        this.controller,
        'winners'
      ),
    });
    header.render(this.root);

    this.trackPage = new TrackPage(this.store, this.controller);

    this.trackPage.render(this.root);
    this.trackPage.init();
    this.winnerPage = new WinnerPage(this.store, {
      nextPageHandler: this.controller.changePaginationPage.bind(
        null,
        'winners',
        'next'
      ),
      prevPageHandler: this.controller.changePaginationPage.bind(
        null,
        'winners',
        'prev'
      ),
    });
  };

  viewListener: StoreListenerType = (propName): void => {
    if (propName === 'currentPage') {
      const { currentPage } = this.store.getState('global');

      if (currentPage === 'winners') {
        if (!this.root.contains(this.winnerPage.element)) {
          this.trackPage.element.replaceWith(this.winnerPage.element);
        }
      } else if (currentPage === 'garage') {
        if (!this.root.contains(this.trackPage?.element) && this.trackPage) {
          this.winnerPage.element.replaceWith(this.trackPage.element);
        }
      }
    }
  };
}
