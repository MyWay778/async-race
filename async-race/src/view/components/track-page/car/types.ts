export type CarHandlersType = {
  removeCarHandler: RemoveCarHandlerType;
}
export type RemoveCarHandlerType = (carId: number) => void;