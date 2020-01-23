// eslint-disable-next-line require-jsdoc
export function calculateCost(storage) {
  const rate = storage <= 10 ?
    5 :
    storage <= 100 ?
    2 :
    1;
  return rate*storage*100;
}
