import { Car } from '../store/state/types';
import { Header } from './components/index';
import ITrackPage from './components/track-page/i_track-page';
import TrackPage from './components/track-page/track-page';
import IView from './i_view';
export { IView };

export default class View implements IView {
  private trackPage: ITrackPage;
  constructor(private readonly root: HTMLElement) {}

  init() {
    const header = new Header();
    header.render(this.root);

    this.trackPage = new TrackPage();
    this.trackPage.render(this.root);
  }

  showCars(cars: Car[]) {
    
  }
}
