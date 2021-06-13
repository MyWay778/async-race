export type CarBtnNameType = 'start' | 'stop' | 'select' | 'remove' | 'all';
export type CarControlType = {
  [K in CarBtnNameType]?: HTMLButtonElement;
};
