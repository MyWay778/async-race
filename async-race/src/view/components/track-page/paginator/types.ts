import Button from '@view/components/shared/button/button';

export type PaginatorHandlersType = {
  nextPageHandler: () => void;
  prevPageHandler: () => void;
};

export type PaginatorBtnNameType = 'prev' | 'next' | 'all';

export type PaginatorButtonsType = {
  [key in PaginatorBtnNameType]?: Button;
};
