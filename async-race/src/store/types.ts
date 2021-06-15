export type StoreCarType = {
  name: string;
  color: string;
  id: number;
  isRace?: boolean;
  movementData?: number;
  abortController?: AbortController;
};

export type CarIdType = number;

export type WinnerType = {
  id: number;
  name?: string;
  color?: string;
  wins?: number;
  time?: number;
};

export type StoreAppPageType = 'garage' | 'winners';

export type StoreStateType = {
  global: StoreGlobalType;
  garagePage: StoreGaragePageType;
  winnersPage: StoreWinnersPageType;
};

export type ChangeStatePropertyType = {
  [K in keyof StoreStateType]: StoreStateType[K];
};

export type StoreListenersType = {
  [K in keyof StoreStateType]: StoreListenerType[];
};

export type StoreGlobalType = {
  currentPage: StoreAppPageType;
  showModal: boolean;
  modalData: string;
  isPending?: boolean;
  antiClickSpam?: boolean;
};

export type StoreGaragePageType = {
  cars: Array<StoreCarType>;
  winner?: WinnerType;
  raceStatus?: boolean;
  currentGaragePage: number;
  carsGarageCount: number;
  carsGarageLimit: number;
  updatingCar?: StoreCarType;
};

export type StoreWinnersPageType = {
  winners: WinnerType[];
  winnersCount: number;
  winnersLimit: number;
  currentWinnersPage: number;
};

export type MouseEventHandler = (e: MouseEvent) => void;
export type StoreStateNameType = 'state' | 'winnersState';

export type StoreListenerType = <
  K extends keyof StoreStateType,
  S extends StoreStateType[K],
  P extends keyof S
>(
  propName: P
) => void;

export type WinnersStateListenerType = (state: WinnersState) => void;

export type StateListenersType = StoreListenerType | WinnersStateListenerType;

export type SubscriberType = {
  state: StoreListenerType;
  winnersState: WinnersStateListenerType;
};

export type StoresType = StoreStateType | WinnersState;

export type StoreCurrentDataPageNumber =
  | 'currentGaragePage'
  | 'currentWinnersPage';

export type WinnersState = {
  winners: WinnerType[];
  winnersCount: number;
  winnersLimit: number;
  currentWinnersPage: number;
};

export type StoreChangeStateOptionsType = {
  notNotify: boolean;
};
