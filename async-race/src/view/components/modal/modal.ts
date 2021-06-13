import BaseComponent from '../shared/base-component/base-component';
import IModal from './i_modal';
import './modal.scss';

export default class Modal extends BaseComponent implements IModal {
  constructor() {
    super('div', 'modal');
  }
  
  setMessage = (message: string): void => {
    this.element.textContent = message;
  }

  show = (): void => {
    this.element.classList.add('modal_visible');

    document.body.addEventListener('click',() => {
      this.element.classList.remove('modal_visible');
      this.element.textContent = '';
    }, {once: true});
  }
 }
