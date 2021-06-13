import { PaginatorBtnNameType } from './types';

export default interface IPaginator {
  element: HTMLElement;
  toggleDisableBtn: (
    btnName: PaginatorBtnNameType,
    isDisabled: boolean
  ) => void;
  change: (currentPage: number, allItems: number, itemsLimit: number) => void;
}
