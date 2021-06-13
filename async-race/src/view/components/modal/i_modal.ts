import IBaseComponent from '../shared/base-component/i_base-component';

export default interface IModal extends IBaseComponent {
  element: HTMLElement;
  setMessage: (data: string) => void;
  show: () => void;
}
