import { CarType } from '@store/state/types';
import { CarInputType } from '@view/components/track-page/panel/car-input/types';

type Car = CarType | CarInputType;

const shallowCarEqual = (car1: Car, car2: Car): boolean => car1.name === car2.name && car1.color === car2.color;

export default shallowCarEqual;