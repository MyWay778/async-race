import { WinnerTableType } from './types';

export default interface IWinnerTable {
  element: HTMLElement;
  setWinners: (winners: WinnerTableType[]) => void;
}
