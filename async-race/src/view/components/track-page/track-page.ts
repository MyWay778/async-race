import IController from '@controller/i_controller';
import { StoreCarType, StoreListenerType } from '@store/types';
import IStore from '@store/i_store';
import './track-page.scss';
import BaseComponent from '../shared/base-component/base-component';
import ITrackPage from './i_track-page';
import IPanel from './panel/i_panel';
import ICar from './car/i_car';
import IPaginator from './paginator/i_paginator';
import Car from './car/car';
import Panel from './panel/panel';
import { createPageNumberBlock, createTitleBlock } from './helpers';
import Paginator from './paginator/paginator';
import elementStatus from './panel/constants';
import Modal from '../modal/modal';
import IModal from '../modal/i_modal';

export { ITrackPage };

export default class TrackPage extends BaseComponent implements ITrackPage {
  private carList: HTMLUListElement;
  private panel: IPanel;
  private paginator: IPaginator;
  private garage: ICar[] = [];
  private setTitleBlock: (value: string) => void;
  private setPageNumberBlock: (value: string) => void;
  private modal: IModal;

  constructor(
    private readonly store: IStore,
    private readonly controller: IController
  ) {
    super('main', 'main');
  }

  init = (): void => {
    this.store.subscribe('garagePage', this.garagePageListener);

    this.panel = new Panel({
      createCarHandler: this.controller.createCar,
      updateCarHandler: this.controller.updateCar,
      startRaceHandler: this.controller.startRace,
      resetRaceHandler: this.controller.resetRace,
      generateCarsHandler: this.controller.generateCars,
    });
    this.panel.toggleDisableResetBtn(elementStatus.disabled);

    const trackSection = document.createElement('section');

    const [titleBlock, setTitleBlock] = createTitleBlock();
    this.setTitleBlock = setTitleBlock;

    const [pageNumberBlock, setPageNumberBlock] = createPageNumberBlock();
    this.setPageNumberBlock = setPageNumberBlock;

    this.carList = document.createElement('ul');
    this.carList.classList.add('car-list');

    this.paginator = new Paginator({
      nextPageHandler: this.controller.changePaginationPage.bind(
        null,
        'garage',
        'next'
      ),
      prevPageHandler: this.controller.changePaginationPage.bind(
        null,
        'garage',
        'prev'
      ),
    });

    this.modal = new Modal();

    trackSection.append(
      this.panel.element,
      titleBlock,
      pageNumberBlock,
      this.carList,
      this.paginator.element
    );
    this.element.append(trackSection, this.modal.element);

    this.showCars();
  };

  private garagePageListener: StoreListenerType = (propName) => {
    const garageState = this.store.getState('garagePage');

    if (propName === 'cars') {
      const { cars } = garageState;
      if (this.garage.length !== cars.length) {
        this.showCars();
      } else {
        cars.forEach((stateCar) => {
          const garageCar = this.garage.find((c) => c.id === stateCar.id);

          if (stateCar.isRace || stateCar.movementData) {
            this.panel.toggleDisableRaceBtn(elementStatus.disabled);
            this.panel.toggleDisableResetBtn(elementStatus.undisabled);
            this.panel.toggleDisableGenerateBtn(elementStatus.disabled);
            this.panel.toggleDisableCreateInput(elementStatus.disabled);
            garageCar.toggleDisableBtn('start', elementStatus.disabled);
            garageCar.toggleDisableBtn('remove', elementStatus.disabled);
            garageCar.toggleDisableBtn('select', elementStatus.disabled);
            if (!garageState.raceStatus) {
              garageCar.toggleDisableBtn('stop', elementStatus.undisabled);
            }
            this.paginator.toggleDisableBtn('next', elementStatus.disabled);
            this.paginator.toggleDisableBtn('prev', elementStatus.disabled);
          }

          if (
            !stateCar.isRace &&
            stateCar.movementData === null &&
            !garageState.raceStatus
          ) {
            this.panel.toggleDisableRaceBtn(elementStatus.undisabled);
            this.panel.toggleDisableResetBtn(elementStatus.disabled);
            this.panel.toggleDisableGenerateBtn(elementStatus.undisabled);
            this.panel.toggleDisableCreateInput(elementStatus.undisabled);
            garageCar.toggleDisableBtn('start', elementStatus.undisabled);
            garageCar.toggleDisableBtn('remove', elementStatus.undisabled);
            garageCar.toggleDisableBtn('select', elementStatus.undisabled);
            garageCar.toggleDisableBtn('stop', elementStatus.disabled);
            this.paginator.change(
              garageState.currentGaragePage,
              garageState.carsGarageCount,
              garageState.carsGarageLimit
            );
          }

          if (!garageCar) {
            this.showCars();
            return;
          }

          if (stateCar.isRace && stateCar.movementData) {
            garageCar.start(stateCar.movementData);
          } else if (stateCar.isRace && stateCar.movementData === 0) {
            garageCar.stop();
          } else if (!stateCar.isRace && stateCar.movementData === null) {
            garageCar.comeBack();
            garageCar.status = 'ready';
          }
        });
      }
    }

    if (propName === 'carsGarageCount') {
      this.setTitleBlock(
        String(this.store.getState('garagePage').carsGarageCount)
      );
    }

    if (propName === 'updatingCar') {
      if (!garageState.updatingCar) {
        this.showCars();
        this.panel.toggleDisableUpdateInput(elementStatus.disabled);
      } else {
        this.panel.toggleDisableUpdateInput(elementStatus.undisabled);
        document.body.addEventListener(
          'click',
          () => {
            this.panel.toggleDisableUpdateInput(elementStatus.disabled);
            this.panel.setUpdateInputValues(null);
          },
          { once: true }
        );
      }
      this.panel.setUpdateInputValues(garageState.updatingCar);
    }

    if (propName === 'carsGarageCount' || propName === 'currentGaragePage') {
      if (propName === 'currentGaragePage') {
        this.garage = [];
      }
      this.paginator.change(
        garageState.currentGaragePage,
        garageState.carsGarageCount,
        garageState.carsGarageLimit
      );
    }

    if (propName === 'currentGaragePage') {
      this.setPageNumberBlock(String(garageState.currentGaragePage));
    }

    if (propName === 'winner') {
      if (garageState.winner?.time) {
        const winner = { ...garageState.winner };
        garageState.cars.forEach((car) => {
          if (car.id === winner.id) {
            winner.name = car.name;
          }
        });
        this.modal.setMessage(
          `Winner! \n ${winner.name || 'Some Car'} in ${winner.time || 1.0}!`
        );
        this.modal.show();
      }
    }
  };

  showCars = (): void => {
    const garageState = this.store.getState('garagePage');
    if (garageState.cars.length === 0) {
      this.carList.innerHTML = '';
      const messageLine = document.createElement('li');
      messageLine.classList.add('car-list__message');
      messageLine.textContent = 'The Garage is empty.';
      this.carList.append(messageLine);
      return;
    }

    if (this.carList.children.length !== 0) {
      this.carList.innerHTML = '';
      this.garage = [];
    }
    garageState.cars.forEach((car) => {
      this.showCar(car);
    });
  };

  showCar = (car: StoreCarType): void => {
    const newCar = new Car(car.id, car.name, car.color, this.controller);
    this.garage.push(newCar);
    this.carList.append(newCar.element);
  };
}
