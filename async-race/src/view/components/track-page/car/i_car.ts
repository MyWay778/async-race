import { CarBtnNameType } from './types';

export default interface ICar {
  status: 'started' | 'stopped' | 'ready';
  id: number;
  init: () => void;
  start: (movementTime: number) => void;
  stop: () => void;
  comeBack: () => void;
  startHandler: () => void;
  stopHandler: () => void;
  toggleStopBtn: (isDisabled: boolean) => void;
  toggleStartBtn: (isDisabled: boolean) => void;
  toggleDisableAllButtons: (isDisabled: boolean) => void;
  toggleDisableBtn: (button: CarBtnNameType | CarBtnNameType[], isDisabled: boolean) => void;
}
