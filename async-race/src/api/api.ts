import { CarType } from '@store/state/types';
import { CarInputType } from '@view/components/track-page/panel/car-input/types';
import IApi from './i_api';

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
}
