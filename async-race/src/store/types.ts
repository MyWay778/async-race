import { State } from './state/i_state';
import { WinnersState } from './state/i_winnersState';

export type MouseEventHandler = (e: MouseEvent) => void;
export type StoreStateNameType = 'state' | 'winnersState';

export type StoreListenerType = (state: State) => void;
export type WinnersStateListenerType = (state: WinnersState) => void;

export type StateListenersType = StoreListenerType | WinnersStateListenerType;

export type SubscriberType = {
  state: StoreListenerType, 
  winnersState: WinnersStateListenerType
};

export type StoresType = State | WinnersState;
