export type CarInputType = {
  name: string;
  color: string;
};

export type CreateCarHandlerType = (car: CarInputType) => void;
export type CarInputValuesType = {
  name: string;
  color: string;
};
