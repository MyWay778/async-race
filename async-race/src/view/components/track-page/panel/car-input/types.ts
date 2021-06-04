export type CarInputType = {
  name: string,
  color: string
}

export type CreateCarHandlerType = (car: CarInputType) => void;