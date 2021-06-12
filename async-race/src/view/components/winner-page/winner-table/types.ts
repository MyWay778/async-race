export type WinnerTableType = {
  color: string;
  name: string;
  wins: number;
  bestTime: number;
};

export type WinnerTableSortFnType = (
  a: WinnerTableType,
  b: WinnerTableType
) => number;

export type WinnerTableSortFnsType = {
  sortWinsUp: WinnerTableSortFnType;
  sortWinsDown: WinnerTableSortFnType;
  sortBestTimeUp: WinnerTableSortFnType;
  sortBestTimeDown: WinnerTableSortFnType;
};
