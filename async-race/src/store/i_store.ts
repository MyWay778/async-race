import {
  StoreChangeStateOptionsType,
  StoreListenerType,
  StoreStateType,
} from './types';

export default interface IStore {
  state: StoreStateType;
  subscribe: <K extends keyof StoreStateType>(
    state: K,
    listener: StoreListenerType
  ) => void;
  changeState: <
    S extends keyof StoreStateType,
    K extends keyof StoreStateType[S],
    H extends StoreStateType[S],
    T extends H[K]
  >(
    state: S,
    prop: K,
    value: T,
    options?: StoreChangeStateOptionsType
  ) => void;
  getState: <T extends keyof StoreStateType>(stateName: T) => StoreStateType[T];
}
