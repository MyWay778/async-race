import { MouseEventHandler } from '@store/types';

const disableUpdateCarInputHandler =
  (procedure: () => void): MouseEventHandler =>
  (e: MouseEvent) => {
    const { target } = e;
    if (target instanceof HTMLElement) {
      const parent = target.parentElement;
      if (
        target.dataset.type !== 'update' &&
        parent.dataset.type !== 'update'
      ) {
        procedure();
      }
    }
  };
export default disableUpdateCarInputHandler;
