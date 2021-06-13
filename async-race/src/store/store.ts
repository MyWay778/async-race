import IStore from './i_store';

import { StoreListenersType, StoreListenerType, StoreStateType } from './types';

export default class Store implements IStore {
  state: StoreStateType = {
    global: {
      currentPage: 'garage',
      showModal: false,
      modalData: '',
      isPending: false,
      antiClickSpam: false,
    },
    garagePage: {
      cars: [],
      winner: null,
      raceStatus: false,
      currentGaragePage: 1,
      carsGarageCount: 0,
      carsGarageLimit: 7,
      updatingCar: null,
    },
    winnersPage: {
      winners: [],
      winnersCount: 0,
      winnersLimit: 10,
      currentWinnersPage: 1,
    },
  };

  private readonly listeners: StoreListenersType = {
    global: [],
    garagePage: [],
    winnersPage: [],
  };

  subscribe = <K extends keyof StoreStateType>(
    state: K,
    listener: StoreListenerType
  ): void => {
    this.listeners[state].push(listener);
  };

  changeState = <
    S extends keyof StoreStateType,
    K extends keyof StoreStateType[S],
    H extends StoreStateType[S],
    T extends H[K]
  >(
    state: S,
    prop: K,
    value: T
  ): void => {
    console.log(this.state.garagePage.winner);
    this.state[state][prop] = value;
    this.notify(state, (prop as never));
  };

  getState = <T extends keyof StoreStateType>(
    stateName: T
  ): StoreStateType[T] => this.state[stateName];

  private notify = <L extends keyof StoreListenersType>(listener: L, prop: never): void => {
    this.listeners[listener].forEach(ltr => ltr(prop));
  }
}
