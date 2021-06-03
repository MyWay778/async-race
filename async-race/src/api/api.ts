import { Car } from "../store/state/types";

interface IApi {
  getCars: () => Promise<any>; // TODO: generic type
}

export default class Api implements IApi {
  constructor(private readonly baseUrl: string) {}

  getCars = async (): Promise<Car[]> => {
    return await (await fetch(`${this.baseUrl}garage/`)).json();
  };
}
