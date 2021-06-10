import { CarType } from '@store/state/types';
import { ToggleDisablingBtnType } from './types';

export default interface IPanel {
  element: HTMLElement;
  toggleDisableUpdateInput: ToggleDisablingBtnType;
  setUpdateInputValues: (car: CarType) => void;
  toggleDisableRaceBtn: ToggleDisablingBtnType;
  toggleDisableResetBtn: ToggleDisablingBtnType;
  toggleDisableGenerateBtn: ToggleDisablingBtnType;
  toggleDisableCreateInput: ToggleDisablingBtnType;
}
