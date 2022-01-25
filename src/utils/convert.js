const strToNum = str => Number(str.replace(/[^0-9]/g, ''));
const numAddComma = num => new Intl.NumberFormat().format(num);

export { strToNum, numAddComma };
