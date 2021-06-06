import { CarIdType, CarType, WinnerType } from '@store/state/types';
import { CarInputType } from '@view/components/track-page/panel/car-input/types';
import IApi from './i_api';
import {
  DriveModeStatusType,
  DriveSuccessType,
  EngineStatusType,
  MovementCharacteristicsType,
} from './types';

export default class Api implements IApi {
  constructor(private readonly baseUrl: string) {}

  getCars = async (): Promise<CarType[]> =>
    (await fetch(`${this.baseUrl}garage/`)).json();

  createCar = async (car: CarInputType): Promise<CarType> =>
    (
      await fetch(`${this.baseUrl}garage/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
      })
    ).json();

  deleteCar = async (carId: number): Promise<Response> =>
    fetch(`${this.baseUrl}garage/${carId}`, {
      method: 'DELETE',
    });

  updateCar = async (car: CarType): Promise<CarType> =>
    (
      await fetch(`${this.baseUrl}garage/${car.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: car.name,
          color: car.color,
        }),
      })
    ).json();

  engine = async (
    carId: CarIdType,
    status: EngineStatusType
  ): Promise<MovementCharacteristicsType> =>
    (await fetch(`${this.baseUrl}engine?id=${carId}&status=${status}`)).json();

  driveMode = async (
    carId: CarIdType,
    status: DriveModeStatusType
  ): Promise<DriveSuccessType> =>
    (await fetch(`${this.baseUrl}engine?id=${carId}&status=${status}`)).json();

  getWinner = async (carId: CarIdType): Promise<WinnerType> =>
    (await fetch(`${this.baseUrl}winners/${carId}`)).json();

  updateWinner = async (winner: WinnerType): Promise<WinnerType> =>
    (
      await fetch(`${this.baseUrl}winners/${winner.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wins: winner.wins,
          time: winner.time,
        }),
      })
    ).json();

  createWinner = async (winner: WinnerType): Promise<WinnerType> =>
    (
      await fetch(`${this.baseUrl}winners/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wins: winner.wins,
          time: winner.time,
        }),
      })
    ).json();
}
