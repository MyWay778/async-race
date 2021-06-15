import IBaseComponent from '../shared/base-component/i_base-component';

export default interface ITrackPage extends IBaseComponent {
  element: HTMLElement;
  init: () => void;
}
