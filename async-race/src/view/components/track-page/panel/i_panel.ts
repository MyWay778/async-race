import { StoreCarType } from '@store/types';
import { ToggleDisablingBtnType } from './types';

export default interface IPanel {
  element: HTMLElement;
  blockBtnStatus: {
    create: boolean;
    update: boolean;
    race: boolean;
    reset: boolean;
    generate: boolean;
  };
  toggleDisableUpdateInput: ToggleDisablingBtnType;
  setUpdateInputValues: (car: StoreCarType) => void;
  toggleDisableRaceBtn: ToggleDisablingBtnType;
  toggleDisableResetBtn: ToggleDisablingBtnType;
  toggleDisableGenerateBtn: ToggleDisablingBtnType;
  toggleDisableCreateInput: ToggleDisablingBtnType;
}
