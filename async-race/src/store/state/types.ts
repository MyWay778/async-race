export type CarType = {
  name: string;
  color: string;
  id: number;
};

export type CarIdType = number;

export type WinnerType = {
  id: number;
  name?: string,
  color?: string
  wins: number;
  time: number;
};

export type AppPageType = 'garage' | 'winners';