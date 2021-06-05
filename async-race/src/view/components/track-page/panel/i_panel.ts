import { CarType } from '@store/state/types';

export default interface IPanel {
  element: HTMLElement;
  toggleDisableUpdateInput: (isDisabled: boolean) => void;
  setUpdateInputValues: (car: CarType) => void;
}
