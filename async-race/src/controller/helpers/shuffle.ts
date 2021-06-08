const shuffle = <T>(array: Array<T>): Array<T> => {
  const copy: Array<T> = [];
  let n: number = array.length;
  let i: number;

  while (n) {
    i = Math.floor(Math.random() * n);
    n -= 1;
    copy.push(array.splice(i,1)[0]);
  }

  return copy;
}

export default shuffle;