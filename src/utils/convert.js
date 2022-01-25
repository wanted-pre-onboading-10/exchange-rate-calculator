const strToNum = str => Number(str.replace(/[^0-9]/g, ''));
const numAddComma = num => new Intl.NumberFormat().format(num);
const mathRound = num =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(num);

export { strToNum, numAddComma, mathRound };
