import { WinnerType } from './types';

export type WinnersState = {
  winners: WinnerType[];
  winnersCount: number;
  winnersLimit: number;
  currentWinnersPage: number;
};
