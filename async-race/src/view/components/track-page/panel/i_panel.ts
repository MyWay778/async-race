import { StoreCarType } from '@store/types';
import { ToggleDisablingBtnType } from './types';

export default interface IPanel {
  element: HTMLElement;
  toggleDisableUpdateInput: ToggleDisablingBtnType;
  setUpdateInputValues: (car: StoreCarType) => void;
  toggleDisableRaceBtn: ToggleDisablingBtnType;
  toggleDisableResetBtn: ToggleDisablingBtnType;
  toggleDisableGenerateBtn: ToggleDisablingBtnType;
  toggleDisableCreateInput: ToggleDisablingBtnType;
}
