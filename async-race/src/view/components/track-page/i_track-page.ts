import IBaseComponent from "../shared/i_base-component";
import Car from "./car/car";

export default interface ITrackPage extends IBaseComponent {
  showCars: (cars: Car[]) => void;
}