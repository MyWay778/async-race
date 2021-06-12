import IBaseComponent from '../shared/base-component/i_base-component';

export default interface IModal extends IBaseComponent {
  setMessage: (data: string) => void;
  show: () => void;
}
