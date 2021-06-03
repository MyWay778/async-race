const createSvgCar = (
  className: string,
  width: number,
  height: number,
  viewBox: string,
  imageHref: string,
  imageId: string
): SVGSVGElement => {
  const car = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  car.classList.add(className);
  car.setAttribute('height', `${height}px`);
  car.setAttribute('width', `${width}px`);
  car.setAttribute('viewBox', viewBox);
  car.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

  const use = document.createElementNS('http://www.w3.org/2000/svg','use');
  use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `${imageHref}#${imageId}`);
  car.append(use);
  return car;
};

export default createSvgCar;
