import { CarIdType, StoreCarType, WinnerType } from '@store/types';
import { CarInputType } from '@view/components/track-page/panel/car-input/types';
import IApi from './i_api';
import {
  DriveModeStatusType,
  EngineStatusType,
  GetWinnersOrderType,
  GetWinnersSortType,
  MovementCharacteristicsType,
  ResponseGetCarsType,
  ResponseGetWinnersType,
} from './types';

export default class Api implements IApi {
  constructor(private readonly baseUrl: string) {}

  getCar = async (carId: number): Promise<StoreCarType> =>
    (await fetch(`${this.baseUrl}garage/${carId}`)).json();

  getCars = async (page = 1, carLimit = 7): Promise<ResponseGetCarsType> => {
    const response = await fetch(
      `${this.baseUrl}garage/?_page=${page}&_limit=${carLimit}`
    );
    return {
      cars: await response.json(),
      carsAmount: response.headers.get('X-Total-Count'),
    };
  };

  createCar = async (car: CarInputType): Promise<StoreCarType> =>
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

  updateCar = async (car: StoreCarType): Promise<StoreCarType> =>
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
    status: DriveModeStatusType,
    signal?: AbortSignal
  ): Promise<Response> =>
    fetch(`${this.baseUrl}engine?id=${carId}&status=${status}`, {
      signal,
    });

  getWinner = async (carId: CarIdType): Promise<WinnerType> =>
    (await fetch(`${this.baseUrl}winners/${carId}`)).json();

  getWinners = async (
    page = 1,
    limit = 10,
    sort: GetWinnersSortType = 'id',
    order: GetWinnersOrderType = 'ASC'
  ): Promise<ResponseGetWinnersType> => {
    const response = await fetch(
      `${this.baseUrl}winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`
    );

    return {
      winners: await response.json(),
      winnersCount: response.headers.get('X-Total-Count'),
    };
  };

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
          id: winner.id,
          wins: winner.wins,
          time: winner.time,
        }),
      })
    ).json();

  deleteWinner = async (winnerId: number): Promise<Response> =>
    fetch(`${this.baseUrl}winners/${winnerId}`, { method: 'DELETE' });
}
