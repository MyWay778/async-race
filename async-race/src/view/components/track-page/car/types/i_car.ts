export default interface ICar {
  id: number;
  init: () => void;
  start: (movementTime: number) => void;
  stop: () => void;
  comeBack: () => void;
  startHandler: () => void;
  stopHandler: () => void;
  toggleStopBtn: (isDisabled: boolean) => void;
  toggleStartBtn: (isDisabled: boolean) => void;
}
