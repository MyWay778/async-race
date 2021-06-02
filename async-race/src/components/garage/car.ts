import BaseComponent from "../base-component";
import './car.scss';

class Car extends BaseComponent {
  constructor() {
    super('section');
    this.element.classList.add('car');

    const container = `
      <div class="car">
        <div class="car-header">
          <div class="car-panel">
            <button class="car-panel__btn">select</button>
            <button class="car-panel__btn">remove</button>
          </div>
          <div class="car-header__name">Name</div>
        </div>
        <div class="car-track">
          <div class="car-track-engine-control">
            <button class="car-track-engine-control__btn">A</button>
            <button class="car-track-engine-control__btn">B</button>
          </div>
          <div class="car-track__car">car</div>
          <div class="car-track__finish>flag</div>
        </div>
      </div>
    `;

    this.element.innerHTML = container;
  }
}

export default Car;