const strToNum = str => Number(str.replace(/[^0-9]/g, ''));
const numAddComma = num => new Intl.NumberFormat().format(num);
const roundToSecond = num =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  })
    .format(num)
    .slice(1);

export { strToNum, numAddComma, roundToSecond };
