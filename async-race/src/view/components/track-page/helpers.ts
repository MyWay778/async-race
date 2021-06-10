import { TitleTupleType } from './types';

export const createTitleBlock = (): TitleTupleType => {
  const titleBlock = document.createElement('div');
  titleBlock.classList.add('garage-title');

  const title = document.createElement('h2');
  title.classList.add('garage-title__title');
  title.innerHTML = 'Garage&nbsp;';

  const carCount = document.createElement('span');
  carCount.classList.add('garage-title__count');
  carCount.textContent = '(0)';

  const changeCount = (newCount: string) => {
    carCount.textContent = `(${newCount})`;
  };

  titleBlock.append(title, carCount);

  return [titleBlock, changeCount];
};

export const createPageNumberBlock = (): TitleTupleType => {
  const pageNumberBlock = document.createElement('div');
  pageNumberBlock.classList.add('garage-page-number');

  const pageNumberTitle = document.createElement('h3');
  pageNumberTitle.classList.add('garage-page-number__title');
  pageNumberTitle.innerHTML = 'Page&nbsp;';

  const pageNumber = document.createElement('span');
  pageNumber.classList.add('garage-page-number__number');
  pageNumber.textContent = '#1';

  const changeCount = (newCount: string) => {
    pageNumber.textContent = `#${newCount}`;
  };

  pageNumberBlock.append(pageNumberTitle, pageNumber);

  return [pageNumberBlock, changeCount];
};
