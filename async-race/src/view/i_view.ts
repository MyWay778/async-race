import { Car } from "../store/state/types";

export default interface IView {
  init: () => void;
  showCars: (cars: Car[]) => void;
}