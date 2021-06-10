import { State } from '@store/state/i_state';
import { PaginatorBtnNameType } from './types';

export default interface IPaginator {
  element: HTMLElement;
  toggleDisableBtn: (btnName: PaginatorBtnNameType, isDisabled: boolean) => void;
  subscribe: (subscriber: (listener: (state: State) => void) => void) => void;
}
