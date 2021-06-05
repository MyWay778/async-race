import { CarInputValuesType } from './types';

export default interface ICarInput {
  element: HTMLElement;
  toggleDisabled: (isDisabled: boolean) => void;
  setValues: (values: CarInputValuesType) => void;
}
